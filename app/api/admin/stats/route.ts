import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Proxy route for admin stats from backend API
 * This ensures backend URL is not exposed to client and adds authentication check
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    if (!backendUrl) {
      return NextResponse.json(
        { error: 'Backend URL not configured' },
        { status: 503 }
      );
    }

    // Get stats type from query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    // Map type to backend endpoints
    const endpoints: Record<string, string> = {
      database: '/admin/stats/database',
      etl: '/admin/stats/etl',
      api: '/admin/stats/api',
      health: '/admin/health/system',
      // 'all' doesn't exist on backend, we'll fetch database and health separately
      all: '/admin/stats/database', // Fallback to database for overview
    };

    const endpoint = endpoints[type] || endpoints.database;
    const url = `${backendUrl}${endpoint}`;

    // Fetch from backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any auth headers if backend requires them
        // 'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
      },
      // Don't cache admin stats
      cache: 'no-store',
    });

    if (!response.ok) {
      // If backend returns error, forward it
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Admin stats proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats from backend', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
