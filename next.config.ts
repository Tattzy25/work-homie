import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Domain configuration for musarty.com
  env: {
    SITE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://musarty.com',
  },
  // Ensure proper headers for security
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
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Image optimization settings
  images: {
    domains: ['musarty.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'musarty.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
