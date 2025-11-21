/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Trailing slash configuration
  trailingSlash: false,
  // Security headers
  poweredByHeader: false,
};

module.exports = nextConfig;

