/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true 
  },
  eslint: { 
    ignoreDuringBuilds: true 
  },
  trailingSlash: true,
  // Optional: Add these for better error handling
  typescript: {
    ignoreBuildErrors: true, // Add if you have TypeScript errors
  },
  experimental: {
    esmExternals: true,
  }
};

module.exports = nextConfig;