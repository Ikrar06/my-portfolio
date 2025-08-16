import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Tambahkan domain eksternal jika nanti pakai gambar remote
    // remotePatterns: [{ protocol: 'https', hostname: 'images.example.com' }],
  },
}

export default nextConfig
