// app/(marketing)/page.tsx
import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the portfolio of Ikrar Gempur Tirani. Creating designs that make people smile. Passionate graphic designer and Informatics Engineering student specializing in brand identity, UI/UX design, and digital experiences.',
  keywords: ['graphic designer', 'UI/UX designer', 'portfolio', 'Ikrar Gempur Tirani', 'Hasanuddin University', 'creative direction', 'brand identity', 'web design', 'Indonesia designer', 'Makassar'],
  openGraph: {
    title: 'Home — Ikrar Gempur Tirani',
    description: 'Creating designs that make people smile. Passionate graphic designer and Informatics Engineering student specializing in brand identity and digital experiences.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Ikrar Gempur Tirani - Graphic Designer & Developer',
      },
    ],
  },
  twitter: {
    title: 'Home — Ikrar Gempur Tirani',
    description: 'Creating designs that make people smile. Portfolio of creative work and projects.',
  },
}

export default async function MarketingHomePage() {
  // Fetch top 6 featured/recent projects dynamically
  const featuredProjects = await getAllProjects({ featuredFirst: true, limit: 6 })

  return <HomeClient featuredProjects={featuredProjects} />
}
