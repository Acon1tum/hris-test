const { config } = require('dotenv');
const path = require('path');

// Load .env from root directory
config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hris/shared-types', '@hris/constants', '@hris/utils'],
  env: {
    // Explicitly expose environment variables to Next.js
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },
  // Proxy API requests to backend when running in Docker (same container)
  // In production, this allows API calls to work seamlessly
  async rewrites() {
    // Only enable rewrites in production Docker environment
    // In development, use NEXT_PUBLIC_API_URL directly
    if (process.env.NODE_ENV === 'production' && process.env.DOCKER_ENV === 'true') {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://localhost:3001/api/v1/:path*',
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;

