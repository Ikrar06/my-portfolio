// app/(marketing)/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s — Ikrar Gempur Tirani',
    default: 'Ikrar Gempur Tirani | Data Scientist & ML Engineer',
  },
  description: 'Data Scientist specializing in statistical analysis, NLP, and production ML systems. Building AI products with full-stack skills and design thinking. Informatics Engineering student at Hasanuddin University (GPA 3.92).',
  authors: [{ name: 'Ikrar Gempur Tirani' }],
  creator: 'Ikrar Gempur Tirani',
  publisher: 'Ikrar Gempur Tirani',
  keywords: ['Data Scientist', 'Machine Learning Engineer', 'NLP', 'Statistical Analysis', 'Deep Learning', 'PyTorch', 'Python', 'Production ML', 'Full-Stack Developer', 'AI Products'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    siteName: 'Ikrar Gempur Tirani Portfolio',
    title: 'Ikrar Gempur Tirani | Data Scientist & ML Engineer',
    description: 'Transforming data into insights through statistical analysis and building production ML systems. Focused on NLP, RAG engineering, and AI product development.',
    images: [{
      url: '/images/foto-ikrar.jpg',
      width: 1200,
      height: 630,
      alt: 'Ikrar Gempur Tirani - Data Scientist & ML Engineer'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@krarnotfound',
    title: 'Ikrar Gempur Tirani | Data Scientist & ML Engineer',
    description: 'Data Scientist specializing in statistical analysis, NLP, and production ML systems.',
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