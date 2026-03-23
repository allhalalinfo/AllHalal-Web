const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Explicit CDN hosts from typical RSS / briefs APIs (next/image + docs tooling)
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'static01.nyt.com' },
      { protocol: 'https', hostname: 'ichef.bbci.co.uk' },
      { protocol: 'https', hostname: 'www.middleeasteye.net' },
      { protocol: 'https', hostname: 'www.aljazeera.com' },
      { protocol: 'https', hostname: 'cdn.cnn.com' },
      { protocol: 'https', hostname: 'media.premiumtimesng.com' },
      { protocol: 'https', hostname: 'muslimmatters.org' },
      { protocol: 'https', hostname: 'aboutislam.net' },
      { protocol: 'https', hostname: 'www.islamicinformation.net' },
      // Any other HTTPS origin (brief cards use <img> + /api/img proxy; this helps next/image where used)
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Trailing slash configuration
  trailingSlash: false,
  // Security headers
  poweredByHeader: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Redirects for URL changes
  async redirects() {
    return [
      {
        source: '/:locale/blog',
        destination: '/:locale/news',
        permanent: true,
      },
      {
        source: '/:locale/blog/:slug',
        destination: '/:locale/news/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
