import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Check if user is authenticated
 * This endpoint is needed because httpOnly cookies are not accessible from JavaScript
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');
    
    if (adminSession && adminSession.value === 'authenticated') {
      return NextResponse.json({ authenticated: true });
    }
    
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
