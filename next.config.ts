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
  
  // Gabungkan semua experimental config dalam satu object
  experimental: {
    // Untuk mengatasi masalah dengan route groups
    optimizePackageImports: ['@/components'],
  },
  
  // Temporary: tidak pakai standalone untuk debugging
  // output: 'standalone',
}

export default nextConfig