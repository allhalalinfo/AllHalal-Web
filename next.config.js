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
  // Redirects for URL changes (old blog → news, old locales → root)
  async redirects() {
    return [
      // Old blog → news
      {
        source: '/blog',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
      // Old locale paths → root (site is now English-only)
      // /en/* → /*
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /ru/* → /*
      {
        source: '/ru/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /nl/* → /*
      {
        source: '/nl/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /de/* → /*
      {
        source: '/de/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /fr/* → /*
      {
        source: '/fr/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /es/* → /*
      {
        source: '/es/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /it/* → /*
      {
        source: '/it/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /ar/* → /*
      {
        source: '/ar/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Special case: /index → /
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
