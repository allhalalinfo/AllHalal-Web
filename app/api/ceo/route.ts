import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Proxy route for CEO endpoints from backend API
 * Uses same authentication as admin panel
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication (same as admin)
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

    // Get endpoint type from query params
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';

    // Map type to backend CEO endpoints
    const endpoints: Record<string, string> = {
      overview: '/ceo/overview',
      tables: '/ceo/tables',
      'missing-barcodes': '/ceo/missing-barcodes',
      'ingredients-unknown': '/ceo/ingredients/unknown',
      'products-recent': '/ceo/products/recent',
      'stats-growth': '/ceo/stats/growth',
      'brands-top': '/ceo/brands/top',
      'quality-issues': '/ceo/quality/issues',
    };

    const endpoint = endpoints[type] || endpoints.overview;
    const url = `${backendUrl}${endpoint}`;

    // Fetch from backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      
      // Более информативные ошибки
      let errorMessage = `Backend error: ${response.status}`;
      if (response.status === 404) {
        errorMessage = `Endpoint не найден: ${endpoint}. Возможно, endpoint не реализован на backend.`;
      } else if (response.status === 500) {
        errorMessage = `Внутренняя ошибка сервера на ${endpoint}`;
      }
      
      return NextResponse.json(
        { 
          error: errorMessage, 
          details: typeof errorData === 'string' ? errorData : JSON.stringify(errorData),
          endpoint: endpoint,
          backend_url: backendUrl
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Логируем успешный запрос для отладки
    console.log(`✅ CEO endpoint ${endpoint} returned data`);
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('CEO proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from backend', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
