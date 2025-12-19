// app/(marketing)/about/page.tsx
import type { Metadata } from 'next'
import AboutClient from './about-client'
import skillsData from '@/data/skills.json'
import type { Skill } from '@/components/skills/skills-list'

export const metadata: Metadata = {
  title: 'About',
  description: 'Informatics Engineering student at Hasanuddin University (GPA 3.91/4.00) learning Data Science and Machine Learning. Passionate about exploring statistical analysis, NLP, and building ML systems while developing full-stack skills and leadership experience.',
  keywords: [
    'about Ikrar Gempur Tirani',
    'Informatics Student',
    'Data Science Student',
    'Machine Learning Student',
    'NLP',
    'Statistical Analysis',
    'Hasanuddin University',
    'PyTorch',
    'TensorFlow',
    'Python Student',
    'Student Portfolio',
    'Learning AI',
    'Indonesia Student'
  ],
  openGraph: {
    title: 'About — Ikrar Gempur Tirani',
    description: 'Informatics student at Hasanuddin University (GPA 3.91/4.00) learning Data Science and ML. Exploring statistical analysis, NLP, and building ML systems through hands-on projects.',
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
    description: 'Informatics student learning Data Science and ML. Passionate about building AI projects and exploring machine learning.',
  },
}

export default function AboutPage() {
  const skills = skillsData as Skill[]

  return <AboutClient skills={skills} />
}
