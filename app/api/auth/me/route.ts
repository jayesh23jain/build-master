import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    // ✅ Get JWT token from cookie
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // ✅ Verify JWT token
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // ✅ Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        vendorProfile: true,
        customerProfile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // ✅ Return user session
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
          role: user.role,
          vendorProfile: user.vendorProfile,
          customerProfile: user.customerProfile,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Session verification failed' },
      { status: 500 }
    );
  }
}
