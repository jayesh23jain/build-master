import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '@/lib/prisma';
import { 
  generateAccessToken, 
  createSessionCookie, 
  sanitizeUser 
} from '@/lib/auth-utils';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: NextRequest) {
  try {
    const { token, role } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Google token is required' },
        { status: 400 }
      );
    }

    // 1. Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, message: 'Invalid Google token' },
        { status: 401 }
      );
    }

    const { email, given_name, family_name, picture } = payload;

    // 2. Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
      include: {
        customerProfile: true,
        vendorProfile: true,
      },
    });

    // 3. Register user if they don't exist
    if (!user) {
      // If role is not provided, we can't register - though UI should ensure this
      if (!role) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Please select whether you are a Customer or Vendor first.' 
          },
          { status: 400 }
        );
      }

      // Create new user in a transaction
      user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email,
            passwordHash: 'SOCIAL_AUTH_PROVIDER', // Placeholder for social users
            firstName: given_name || 'User',
            lastName: family_name || '',
            role: role as 'customer' | 'vendor',
          },
        });

        // Create the associated profile
        if (role === 'vendor') {
          await tx.vendorProfile.create({
            data: {
              userId: newUser.id,
              trade: 'TBD', // To be filled later
              license: `GOOGLE-${Date.now()}`, // Temporary unique license
              rating: 0,
              reviews: 0,
            },
          });
        } else {
          await tx.customerProfile.create({
            data: {
              userId: newUser.id,
            },
          });
        }

        return tx.user.findUnique({
          where: { id: newUser.id },
          include: {
            customerProfile: true,
            vendorProfile: true,
          },
        });
      }) as any;
    }

    if (!user) {
      throw new Error('Failed to retrieve user after processing');
    }

    // 4. Generate Session Token
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'customer' | 'vendor',
    });

    // 5. Create Response with Cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: sanitizeUser(user),
      },
      { status: 200 }
    );

    response.headers.set('Set-Cookie', createSessionCookie(accessToken));

    return response;
  } catch (error: any) {
    console.error('Google Auth Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Authentication failed. Please try again.' 
      },
      { status: 500 }
    );
  }
}
