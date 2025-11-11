// app/(marketing)/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s — Ikrar Gempur Tirani',
    default: 'Ikrar Gempur Tirani — Portfolio',
  },
  description: 'Ikrar Gempur Tirani — Portfolio of a passionate graphic designer and Informatics Engineering student from Hasanuddin University. Specializing in brand identity, UI/UX design, creative direction, and tech community building in Makassar, Indonesia.',
  authors: [{ name: 'Ikrar Gempur Tirani' }],
  creator: 'Ikrar Gempur Tirani',
  publisher: 'Ikrar Gempur Tirani',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    siteName: 'Ikrar Gempur Tirani Portfolio',
    images: [{
      url: '/images/foto-ikrar.jpg',
      width: 1200,
      height: 630,
      alt: 'Ikrar Gempur Tirani - Graphic Designer & Informatics Engineering Student'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@krarnotfound',
    images: ['/images/foto-ikrar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}