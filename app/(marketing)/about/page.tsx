// app/(marketing)/about/page.tsx
import type { Metadata } from 'next'
import AboutClient from './about-client'
import skillsData from '@/data/skills.json'
import type { Skill } from '@/components/skills/skills-list'

export const metadata: Metadata = {
  title: 'About',
  description: 'Informatics Engineering student at Hasanuddin University (GPA 3.91) specializing in Data Science and Machine Learning. From statistical analysis to production ML systems, combining technical rigor with 5 years of design leadership experience.',
  keywords: [
    'about Ikrar Gempur Tirani',
    'Data Scientist Indonesia',
    'Machine Learning Engineer',
    'NLP specialist',
    'Statistical Analysis',
    'Hasanuddin University',
    'Deep Learning PyTorch',
    'Production ML systems',
    'Full-Stack Developer',
    'AI product development',
    'Informatics Engineering',
    'Data Science portfolio',
    'ML Engineering Indonesia'
  ],
  openGraph: {
    title: 'About — Ikrar Gempur Tirani',
    description: 'Data Scientist specializing in statistical analysis, NLP, and production ML systems. Informatics student at UNHAS (GPA 3.91) with 5 years of leadership experience.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Ikrar Gempur Tirani - Data Scientist & ML Engineer',
      },
    ],
  },
  twitter: {
    title: 'About — Ikrar Gempur Tirani',
    description: 'Data Scientist specializing in statistical analysis, NLP, and production ML systems. Building AI products with full-stack skills.',
  },
}

export default function AboutPage() {
  const skills = skillsData as Skill[]

  return <AboutClient skills={skills} />
}
