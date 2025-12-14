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
  // Handle internationalization first
  const response = intlMiddleware(request);
  
  // CSP - Allow Three.js WebGL rendering (requires unsafe-eval for shaders)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' https: data: blob:;
    font-src 'self' https://fonts.gstatic.com data:;
    connect-src 'self' https://*.vercel-insights.com https://api.web3forms.com;
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
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - admin (admin panel - no locale prefix)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     * - app-screens (app screenshots)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico|assets|app-screens|.*\\..*).*)',
  ],
};
