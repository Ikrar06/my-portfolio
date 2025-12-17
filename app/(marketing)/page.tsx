// app/(marketing)/page.tsx
import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Ikrar Gempur Tirani - Informatics Engineering student at Hasanuddin University (GPA 3.91/4.00) focusing on Data Science and Machine Learning. Learning Natural Language Processing, statistical modeling, and production ML systems with full-stack development experience.',
  keywords: ['Data Science Student', 'Machine Learning', 'NLP', 'Deep Learning', 'Python', 'TensorFlow', 'PyTorch', 'Statistical Modeling', 'Ikrar Gempur Tirani', 'Hasanuddin University', 'AI Portfolio'],
  openGraph: {
    title: 'Ikrar Gempur Tirani — Data Science & ML Portfolio',
    description: 'Informatics student focusing on Data Science and ML. Learning to build end-to-end machine learning solutions with Python, TensorFlow, and PyTorch.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Ikrar Gempur Tirani - Data Science & ML Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Ikrar Gempur Tirani — Data Science & ML Portfolio',
    description: 'Informatics student focusing on Data Science and ML. Portfolio of machine learning projects and technical work.',
  },
}

export default async function MarketingHomePage() {
  // Fetch top 6 featured/recent projects dynamically
  const featuredProjects = await getAllProjects({ featuredFirst: true, limit: 6 })

  return <HomeClient featuredProjects={featuredProjects} />
}
