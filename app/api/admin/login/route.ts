import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { password, rememberMe } = await request.json();

    // Get admin password from environment
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD not configured');
      return NextResponse.json(
        { error: 'Admin authentication not configured' },
        { status: 503 }
      );
    }

    // Check password
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Set secure session cookie
    // If "Remember Me" is checked, cookie expires in 30 days, otherwise 7 days
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30 days or 7 days
    
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: maxAge,
      path: '/',
    });

    return NextResponse.json({ 
      success: true,
      expiresIn: rememberMe ? '30 days' : '7 days'
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
