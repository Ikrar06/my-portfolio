// app/layout.tsx
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../styles/globals.css'

import Nav from '@/components/nav'
import Footer from '@/components/footer'

export async function generateMetadata(): Promise<Metadata> {
  // Base metadata
  const baseMetadata: Metadata = {
    title: 'Portfolio — Graphic Designer',
    description: 'Modern, profesional, cepat, mudah di-update.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  }

  return baseMetadata
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Lompat ke konten utama
        </a>

        <Nav />

        <main id="main-content" className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {children}
        </main>

        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}