import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  try {
    // We make the request from the Next.js Server to the Backend API.
    // This completely bypasses browser CORS restrictions and hides the backend URL.
    const res = await fetch(`https://api.allhalal.info/api/v1/prayer-times?lat=${lat}&lon=${lon}`, {
      headers: {
        'Accept': 'application/json',
        // 'User-Agent': 'allhalal.info-web' // optional, helps backend identify the source
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
