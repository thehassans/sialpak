/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
