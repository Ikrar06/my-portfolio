// app/(marketing)/layout.tsx
import type { Metadata } from 'next'
import { OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    template: '%s — Ikrar Gempur Tirani',
    default: 'Ikrar Gempur Tirani | AI Engineer',
  },
  description: 'AI Engineer building RAG systems, NLP models, and the full-stack products around them. Informatics Engineering student at Hasanuddin University (GPA 3.92).',
  authors: [{ name: 'Ikrar Gempur Tirani' }],
  creator: 'Ikrar Gempur Tirani',
  publisher: 'Ikrar Gempur Tirani',
  keywords: ['AI Engineer', 'Machine Learning Engineer', 'RAG', 'LLM', 'NLP', 'Statistical Analysis', 'Deep Learning', 'PyTorch', 'Python', 'Production ML', 'Full-Stack Developer', 'AI Products'],
  openGraph: {
    images: [OG_IMAGE],
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    siteName: 'Ikrar Gempur Tirani Portfolio',
    title: 'Ikrar Gempur Tirani | AI Engineer',
    description: 'AI Engineer building RAG systems, NLP models, and full-stack AI products.',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
    creator: '@krarnotfound',
    title: 'Ikrar Gempur Tirani | AI Engineer',
    description: 'AI Engineer building RAG systems, NLP models, and full-stack AI products.',
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