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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;

