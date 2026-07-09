/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: '**' }
    ]
  },
  compress: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ['recharts'] }
};
module.exports = nextConfig;
