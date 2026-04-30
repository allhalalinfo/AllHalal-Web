import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Locales removed when site switched to English-only URLs */
const OLD_LOCALE_SEGMENTS = new Set([
  'en',
  'ru',
  'nl',
  'de',
  'fr',
  'es',
  'it',
  'ar',
]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.nextUrl.hostname;

  // Canonical domain: www.allhalal.info → allhalal.info (301 permanent)
  if (hostname === 'www.allhalal.info') {
    const url = request.nextUrl.clone();
    url.hostname = 'allhalal.info';
    return NextResponse.redirect(url, 301);
  }

  // Canonical home: /index and legacy static names → /
  if (pathname === '/index' || pathname === '/index.html') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // Redirect old locale paths to new /* (301 permanent)
  const firstSeg = pathname.split('/').filter(Boolean)[0];
  if (firstSeg && OLD_LOCALE_SEGMENTS.has(firstSeg)) {
    const url = request.nextUrl.clone();
    if (pathname === `/${firstSeg}`) {
      url.pathname = '/';
    } else {
      url.pathname = pathname.replace(new RegExp(`^/${firstSeg}/`), '/');
    }
    return NextResponse.redirect(url, 301);
  }
  
  // Short admin redirect: /admin → /admin/custom-articles/login
  if (pathname === '/admin') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/custom-articles/login';
    return NextResponse.redirect(url, 307);
  }
  
  // Handle app-ads.txt directly in middleware to bypass Vercel domain redirects
  if (pathname === '/app-ads.txt') {
    const content = 'google.com, pub-5317347727083675, DIRECT, f08c47fec0942fa0\n';
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
  
  // Handle IndexNow key file for search engine verification
  if (pathname === '/indexnow-key.txt') {
    const indexNowKey = process.env.INDEXNOW_KEY || '';
    return new NextResponse(indexNowKey, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  }
  
  // Skip middleware for other static files
  if (
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/app-screens/')
  ) {
    return NextResponse.next();
  }
  
  if (pathname === '/robots.txt') {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // CSP - Allow Three.js WebGL rendering
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://va.vercel-scripts.com https://pagead2.googlesyndication.com https://*.googletagmanager.com https://fundingchoicesmessages.google.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: data: blob:;
    font-src 'self' data:;
    connect-src 'self' https://*.vercel-insights.com https://api.web3forms.com https://api.allhalal.info https://nominatim.openstreetmap.org https://api.aladhan.com https://*.google-analytics.com https://*.googletagmanager.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com;
    media-src 'none';
    object-src 'none';
    child-src 'self' blob:;
    worker-src 'self' blob:;
    frame-src 'self' https://www.youtube.com https://www.openstreetmap.org https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    manifest-src 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Security Headers
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '0');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), autoplay=(), camera=(), ' +
    'display-capture=(), encrypted-media=(), fullscreen=(self "https://www.youtube.com"), ' +
    'geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), midi=(), ' +
    'payment=(), picture-in-picture=(self "https://www.youtube.com"), publickey-credentials-get=(), ' +
    'screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

  return response;
}

export const config = {
  matcher: [
    '/app-ads.txt',
    '/indexnow-key.txt',
    '/((?!api|_next/static|_next/image|favicon.ico|assets|app-screens|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
