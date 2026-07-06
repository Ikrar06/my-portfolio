// app/layout.tsx
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../styles/globals.css'

import Nav from '@/components/nav'
import Footer from '@/components/footer'
import StructuredData from '@/components/structured-data'
import ConsoleEasterEgg from '@/components/console-easter-egg'

// Base metadata akan di-override oleh metadata di (marketing)/layout.tsx
export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: 'Ikrar Gempur Tirani | AI Engineer & Data Scientist',
    description: 'Informatics Engineering student at Hasanuddin University (GPA 3.92/4.00) with hands-on experience in RAG systems, NLP, and production ML. Building AI products with Python, vLLM, TensorFlow, and PyTorch.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    icons: {
      icon: '/icon.ico',
      shortcut: '/icon.ico',
      apple: '/icon.ico',
    },
    keywords: [
      'Ikrar Gempur Tirani',
      'Informatics Student',
      'Data Science Student',
      'Machine Learning',
      'Hasanuddin University',
      'NLP',
      'Python',
      'TensorFlow',
      'PyTorch',
      'Student Portfolio',
    ],
    authors: [{ name: 'Ikrar Gempur Tirani' }],
    creator: 'Ikrar Gempur Tirani',
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      siteName: 'Ikrar Gempur Tirani Portfolio',
      title: 'Ikrar Gempur Tirani | AI Engineer & Data Scientist',
      description: 'Informatics student at Hasanuddin University building RAG systems and production ML',
      images: [
        {
          url: '/images/foto-ikrar.jpg',
          width: 1200,
          height: 630,
          alt: 'Ikrar Gempur Tirani',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ikrar Gempur Tirani | AI Engineer & Data Scientist',
      description: 'Informatics student building RAG systems and production ML',
      images: ['/images/foto-ikrar.jpg'],
    },
  }

  return baseMetadata
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YMGy-xLqu4sGFHbgPyxg3CJAN1bpomnZX0X4wCUAWT8" />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {/* Console Easter Egg */}
        <ConsoleEasterEgg />

        {/* Structured Data for SEO */}
        <StructuredData />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-emerald-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Jump to main content
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