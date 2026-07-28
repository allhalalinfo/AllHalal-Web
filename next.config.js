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
  // Cache control headers for optimal performance
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=21600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },
  // Redirects for URL changes (old blog → news)
  async redirects() {
    return [
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
      // Merged duplicate halal checks — each pair targeted the same query with
      // near-identical (sometimes contradicting) content.
      ...[
        ['is-carmine-e120-halal', 'is-carmine-halal'],
        ['is-takis-fuego-halal', 'is-takis-halal'],
        ['is-celsius-energy-halal', 'is-celsius-energy-drink-halal'],
        ['is-e471-mono-and-diglycerides-halal', 'is-e471-halal'],
        ['is-msg-e621-halal', 'is-e621-halal'],
        ['is-skittles-halal-us', 'is-skittles-halal'],
        ['is-mcdonalds-fries-halal-us', 'is-mcdonalds-fries-halal'],
        ['is-haribo-gummy-bears-halal', 'is-haribo-halal'],
      ].map(([from, to]) => ({
        source: `/is-it-halal/${from}`,
        destination: `/is-it-halal/${to}`,
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
