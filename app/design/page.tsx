// app/design/page.tsx
import type { Metadata } from 'next'
import { getDesignProjects } from '@/lib/projects'
import { getAllShots } from '@/lib/shots'
import DesignClient from './design-client'
import { OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Design',
  description: 'UI/UX design, graphic design, branding, and creative explorations by Ikrar Gempur Tirani. From comprehensive design projects to visual experiments and creative shots.',
  keywords: [
    'UI/UX design portfolio',
    'graphic design',
    'branding',
    'design projects',
    'creative shots',
    'visual experiments',
    'design exploration',
    'Figma',
    'Adobe Creative Suite',
    'Ikrar Gempur Tirani design work'
  ],
  openGraph: {
    images: [OG_IMAGE],
    title: 'Design — Ikrar Gempur Tirani',
    description: 'UI/UX design, graphic design, branding, and creative explorations. A collection of comprehensive design projects and visual experiments.',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/design',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
    title: 'Design — Ikrar Gempur Tirani',
    description: 'UI/UX design, graphic design, branding, and creative explorations.',
  },
}

export default async function DesignPage() {
  // Fetch all design projects (sorted by newest first)
  const designProjects = await getDesignProjects()

  // Fetch all shots
  const shots = await getAllShots()

  return <DesignClient projects={designProjects} shots={shots} />
}
