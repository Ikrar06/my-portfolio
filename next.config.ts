import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Tambahkan domain eksternal jika nanti pakai gambar remote
    // remotePatterns: [{ protocol: 'https', hostname: 'images.example.com' }],
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Disable trace untuk menghindari build error
  output: 'standalone',
}

export default nextConfig