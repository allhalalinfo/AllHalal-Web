import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const madhhab = searchParams.get('madhhab');
  const date = searchParams.get('date');
  const method = searchParams.get('method');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  try {
    const backendUrl = new URL('https://api.allhalal.info/api/v1/prayer-times');
    backendUrl.searchParams.set('lat', lat);
    backendUrl.searchParams.set('lon', lon);
    if (madhhab) {
      backendUrl.searchParams.set('madhhab', madhhab);
    }
    if (date) {
      backendUrl.searchParams.set('date', date);
    }
    if (method) {
      backendUrl.searchParams.set('method', method);
    }

    // We make the request from the Next.js Server to the Backend API.
    // This completely bypasses browser CORS restrictions and hides the backend URL.
    const res = await fetch(backendUrl.toString(), {
      headers: {
        'Accept': 'application/json',
        'X-Source': 'web',
      },
      // Cache for 1 hour to reduce load on the backend API
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      throw new Error(`Backend API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Prayer times proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prayer times from backend' },
      { status: 500 }
    );
  }
}
