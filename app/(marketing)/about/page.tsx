// app/(marketing)/about/page.tsx
import type { Metadata } from 'next'
import AboutClient from './about-client'
import skillsData from '@/data/skills.json'
import type { Skill } from '@/components/skills/skills-list'

export const metadata: Metadata = {
  title: 'About',
  description: 'Get to know Ikrar Gempur Tirani — a passionate graphic designer and Informatics Engineering student from Hasanuddin University. With over 5 years of experience in creative media, brand identity, and tech community building, I create designs that connect with people.',
  keywords: [
    'about Ikrar Gempur Tirani',
    'graphic designer Indonesia',
    'Hasanuddin University',
    'creative media specialist',
    'UI/UX designer Makassar',
    'brand identity designer',
    'tech community leader',
    'Google Developer Groups',
    'design portfolio',
    'Informatics Engineering student',
    'Gorontalo designer',
    'Indonesian creative professional'
  ],
  openGraph: {
    title: 'About — Ikrar Gempur Tirani',
    description: 'Get to know me — a passionate graphic designer and Informatics Engineering student with over 5 years of experience in creative media and tech community building.',
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
    title: 'About — Ikrar Gempur Tirani',
    description: 'Get to know me — a passionate graphic designer and Informatics Engineering student with over 5 years of experience.',
  },
}

export default function AboutPage() {
  const skills = skillsData as Skill[]

  return <AboutClient skills={skills} />
}
