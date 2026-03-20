import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

// Create next-intl middleware with locale detection
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // Always add locale prefix (including /en for English)
  localeDetection: true // Auto-detect user's preferred language
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle app-ads.txt directly in middleware to bypass Vercel domain redirects
  // This ensures both apex (allhalal.info) and www (www.allhalal.info) return 200
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
  
  // Skip middleware for other static files that should be served directly
  if (
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/app-screens/')
  ) {
    return NextResponse.next();
  }
  
  // robots.txt is handled by route handler, skip middleware
  if (pathname === '/robots.txt') {
    return NextResponse.next();
  }
  
  // Handle internationalization first
  let response = intlMiddleware(request);
  
  // 301 Redirect for non-English content paths
  // Force content-heavy paths to English to avoid SEO duplication
  const contentPaths = ['/is-it-halal', '/finance', '/learn', '/news', '/prayer-times'];
  
  // Check if current path is a localized path (e.g. /ru/is-it-halal)
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0];
  
  // If it's a known locale, not English, and starts with one of our content paths
  if (currentLocale && currentLocale !== 'en' && locales.includes(currentLocale as any)) {
    const pathAfterLocale = '/' + segments.slice(1).join('/');
    
    // Check if the path belongs to one of the content areas
    const isContentPath = contentPaths.some(cp => 
      pathAfterLocale === cp || pathAfterLocale.startsWith(cp + '/')
    );

    if (isContentPath) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathAfterLocale}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // CSP - Allow Three.js WebGL rendering (requires unsafe-eval for shaders)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://va.vercel-scripts.com https://pagead2.googlesyndication.com https://*.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: data: blob:;
    font-src 'self' data:;
    connect-src 'self' https://*.vercel-insights.com https://api.web3forms.com https://api.allhalal.info https://nominatim.openstreetmap.org https://api.aladhan.com https://*.google-analytics.com https://*.googletagmanager.com https://pagead2.googlesyndication.com;
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
  
    // Permissions Policy - Block all unnecessary features (allow geolocation, picture-in-picture for youtube)
    response.headers.set(
      'Permissions-Policy',
      'accelerometer=(), autoplay=(), camera=(), ' +
      'display-capture=(), encrypted-media=(), fullscreen=(self "https://www.youtube.com"), ' +
      'geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), midi=(), ' +
      'payment=(), picture-in-picture=(self "https://www.youtube.com"), publickey-credentials-get=(), ' +
      'screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
    );

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

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
     * - app-screens (app screenshots)
     * 
     * Note: app-ads.txt is explicitly included to handle it directly in middleware
     * to bypass Vercel domain redirects and return 200 on both apex and www domains
     */
    '/app-ads.txt', // Handle app-ads.txt directly in middleware (before regex exclusion)
    '/((?!api|_next/static|_next/image|favicon.ico|assets|app-screens|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
