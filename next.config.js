/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Trailing slash configuration
  trailingSlash: false,
  // Optimize for production
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;

