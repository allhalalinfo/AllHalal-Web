/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    remotePatterns: [],
  },
  // Trailing slash configuration
  trailingSlash: false,
  // Output configuration for Vercel
  output: 'standalone',
};

module.exports = nextConfig;

