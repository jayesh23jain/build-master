import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, validateEmail, validatePassword } from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      role,
      trade,
      license,
    } = await request.json();

    // Validate required fields
    if (!email || !password || !confirmPassword || !firstName || !lastName || !role) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Validate role
    if (!['customer', 'vendor'].includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role' },
        { status: 400 }
      );
    }

    // Vendor-specific validation
    if (role === 'vendor' && (!trade || !license)) {
      return NextResponse.json(
        { success: false, message: 'Trade and license required for vendors' },
        { status: 400 }
      );
    }

    // ✅ Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered. Please login or use a different email.' },
        { status: 409 } // Conflict status code
      );
    }

    // ✅ Hash password
    const passwordHash = await hashPassword(password);

    // ✅ Create user and profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          role,
        },
      });

      // 2. Create Profile
      if (role === 'vendor') {
        // Double check license uniqueness within transaction (though DB also enforces it)
        const existingLicense = await tx.vendorProfile.findUnique({
          where: { license },
        });

        if (existingLicense) {
          throw new Error('LICENSE_EXISTS');
        }

        await tx.vendorProfile.create({
          data: {
            userId: user.id,
            trade,
            license,
            rating: 0,
            reviews: 0,
          },
        });
      } else {
        await tx.customerProfile.create({
          data: {
            userId: user.id,
          },
        });
      }

      return user;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Please login.',
        user: {
          id: result.id,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error details:', error);

    if (error.message === 'LICENSE_EXISTS') {
      return NextResponse.json(
        { success: false, message: 'This license number is already registered to another vendor.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
