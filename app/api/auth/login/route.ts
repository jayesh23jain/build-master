import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  comparePassword,
  generateAccessToken,
  generateRememberMeToken,
  createSessionCookie,
  createRememberMeCookie,
} from '@/lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, rememberMe } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password required' },
        { status: 400 }
      );
    }

    // ✅ Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // ✅ If email not found, tell user to register
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email not registered. Please register first.',
          requiresRegistration: true,
        },
        { status: 401 }
      );
    }

    // ✅ Verify password hash
    const passwordValid = await comparePassword(password, user.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // ✅ Validate role if provided
    if (role && user.role !== role) {
      return NextResponse.json(
        { 
          success: false, 
          message: `This email is registered as a ${user.role}. Please sign in using the correct portal.` 
        },
        { status: 401 }
      );
    }

    // ✅ Generate JWT token
    const token = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'customer' | 'vendor',
    });

    // ✅ Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          profileImage: user.profileImage,
        },
      },
      { status: 200 }
    );

    // ✅ Set JWT token in HttpOnly cookie
    const sessionCookie = createSessionCookie(token);
    response.headers.set('Set-Cookie', sessionCookie);

    // ✅ Handle Remember Me
    if (rememberMe) {
      const { token: rememberToken, expiry } = generateRememberMeToken();

      // Store remember me token in database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          rememberMeToken: rememberToken,
          rememberMeExpiry: expiry,
        },
      });

      // Set remember me cookie
      const rememberCookie = createRememberMeCookie(rememberToken, expiry);
      response.headers.append('Set-Cookie', rememberCookie);
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
