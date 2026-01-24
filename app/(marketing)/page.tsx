// app/(marketing)/page.tsx
import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Ikrar Gempur Tirani - Informatics Engineering student at Hasanuddin University (GPA 3.92/4.00) learning Data Science and Machine Learning. Exploring Natural Language Processing, statistical modeling, and building ML systems while developing full-stack skills.',
  keywords: ['Ikrar Gempur Tirani', 'Data Science Student', 'Machine Learning Student', 'NLP', 'Python', 'TensorFlow', 'PyTorch', 'Hasanuddin University', 'Student Portfolio', 'Learning AI'],
  openGraph: {
    title: 'Ikrar Gempur Tirani — Student Portfolio',
    description: 'Informatics student learning Data Science and ML at Hasanuddin University. Exploring machine learning, NLP, and statistical modeling through hands-on projects.',
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
    title: 'Ikrar Gempur Tirani — Student Portfolio',
    description: 'Informatics student learning Data Science and ML. Portfolio of learning projects and technical explorations.',
  },
}

export default async function MarketingHomePage() {
  // Fetch top 6 featured/recent projects dynamically
  const featuredProjects = await getAllProjects({ featuredFirst: true, limit: 6 })

  return <HomeClient featuredProjects={featuredProjects} />
}
