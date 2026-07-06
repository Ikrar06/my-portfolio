// app/(marketing)/page.tsx
import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Ikrar Gempur Tirani - Informatics Engineering student at Hasanuddin University (GPA 3.92/4.00) building production RAG and ML systems. Hands-on experience in NLP, statistical modeling, and full-stack development.',
  keywords: ['Ikrar Gempur Tirani', 'AI Engineer', 'Data Scientist', 'Machine Learning Engineer', 'RAG', 'NLP', 'Python', 'TensorFlow', 'PyTorch', 'vLLM', 'Hasanuddin University', 'Student Portfolio'],
  openGraph: {
    title: 'Ikrar Gempur Tirani — Student Portfolio',
    description: 'Informatics student at Hasanuddin University building AI products: RAG systems, ML pipelines, and full-stack applications.',
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
    description: 'Informatics student building AI products with RAG, LLM serving, and full-stack development.',
  },
}

export default async function MarketingHomePage() {
  // Fetch top 6 featured/recent projects dynamically
  const featuredProjects = await getAllProjects({ featuredFirst: true, limit: 6 })

  return <HomeClient featuredProjects={featuredProjects} />
}
