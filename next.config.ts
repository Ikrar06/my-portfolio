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
  
  // Ganti experimental.serverComponentsExternalPackages dengan serverExternalPackages
  serverExternalPackages: [],
  
  // Hapus experimental.serverComponentsExternalPackages
  experimental: {
    // experimental configs lainnya bisa ditambahkan di sini jika diperlukan
  },
  
  // Output standalone untuk Vercel
  output: 'standalone',
}

export default nextConfig