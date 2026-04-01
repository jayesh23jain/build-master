import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear auth token cookie
    response.cookies.set('authToken', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
    });

    // Clear remember me cookie
    response.cookies.set('rememberMe', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}
