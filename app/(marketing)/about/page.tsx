// app/(marketing)/about/page.tsx
import type { Metadata } from 'next'
import AboutClient from './about-client'
import skillsData from '@/data/skills.json'
import type { Skill } from '@/components/skills/skills-list'

export const metadata: Metadata = {
  title: 'About',
  description: 'Informatics Engineering student at Hasanuddin University (GPA 3.92/4.00) with hands-on experience in AI/ML engineering, RAG systems, and full-stack development. Building LLM-powered products and leading creative teams.',
  keywords: [
    'about Ikrar Gempur Tirani',
    'AI Engineer',
    'Data Scientist',
    'Machine Learning Engineer',
    'RAG',
    'NLP',
    'Statistical Analysis',
    'Hasanuddin University',
    'PyTorch',
    'TensorFlow',
    'vLLM',
    'Full-Stack Developer',
    'Indonesia'
  ],
  openGraph: {
    title: 'About — Ikrar Gempur Tirani',
    description: 'Informatics student at Hasanuddin University (GPA 3.92/4.00) building production RAG and ML systems. Hands-on experience in statistical analysis, NLP, and full-stack development.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Ikrar Gempur Tirani - Student Portfolio',
      },
    ],
  },
  twitter: {
    title: 'About — Ikrar Gempur Tirani',
    description: 'Informatics student building AI products with RAG, LLM serving, and full-stack development.',
  },
}

export default function AboutPage() {
  const skills = skillsData as Skill[]

  return <AboutClient skills={skills} />
}
