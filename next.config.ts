import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // Tambahkan domain eksternal jika nanti pakai gambar remote
    // remotePatterns: [{ protocol: 'https', hostname: 'images.example.com' }],
  },
}

export default nextConfig