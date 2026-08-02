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
  turbopack: {},
};

export default nextConfig;
