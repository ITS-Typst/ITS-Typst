import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // pdfjs-dist is only imported client-side (inside useEffect) — no canvas needed
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' });
    return config;
  },
};

export default nextConfig;
