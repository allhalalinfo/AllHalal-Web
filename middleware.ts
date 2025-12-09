import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  // CSP - Allow Three.js WebGL rendering (requires unsafe-eval for shaders)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' https: data: blob:;
    font-src 'self' https://fonts.gstatic.com data:;
    connect-src 'self' https://*.vercel-insights.com;
    media-src 'none';
    object-src 'none';
    child-src 'self' blob:;
    worker-src 'self' blob:;
    frame-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    manifest-src 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Security Headers - A+ Configuration
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '0'); // Disabled as CSP is stronger
  
  // HSTS - 2 years with preload
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  
  // Permissions Policy - Block all unnecessary features
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), ' +
    'display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(self), ' +
    'geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), ' +
    'payment=(), picture-in-picture=(), publickey-credentials-get=(), ' +
    'screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
  );

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  // Note: Cross-Origin-Embedder-Policy disabled for WebGL/Three.js compatibility
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

  // Enforce HTTPS in production
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(`https://${request.headers.get('host')}${request.nextUrl.pathname}`, 301);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
