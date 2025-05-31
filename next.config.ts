// portfolio/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ESSENTIAL for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mithran.org', // For your other project images
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https', // Or http if your screenshot server is not on https
        hostname: 'screenshot.mithran.org', // Your screenshot server
        port: '',
        pathname: '/**', // Allow any path on this domain
      },
    ],
  },
};

export default nextConfig;