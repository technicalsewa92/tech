/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true, // ✅ Enable for better development experience
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore lint warnings during builds for now
    dirs: ['app', 'components', 'lib', 'utils'], // Only lint these directories
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  // Asset prefix for CDN (only in production)
  // assetPrefix:
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://cdn.jsdelivr.net/gh/technicalsewa/technicalsewa@main'
  //     : undefined,
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.technicalsewa.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crm.technicalsewa.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Redirect from www to non-www
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.technicalsewa.com',
          },
        ],
        destination: 'https://technicalsewa.com/:path*',
        permanent: true,
      },
      {
        // Redirect from www to non-www
        source: '/spareparts',
        has: [
          {
            type: 'host',
            value: 'www.technicalsewa.com',
          },
        ],
        destination: 'https://technicalsewa.com/spareparts',
        permanent: true,
      },
      {
        // Redirect from non-www to www
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'technicalsewa.com',
          },
        ],
        destination: 'https://www.technicalsewa.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
