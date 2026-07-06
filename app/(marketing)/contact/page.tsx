// app/(marketing)/contact/page.tsx
import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ikrar Gempur Tirani, an AI Engineer and Data Scientist building RAG systems and production ML. Open to internships, research collaborations, and project discussions.',
  keywords: [
    'contact Ikrar Gempur Tirani',
    'AI Engineer contact',
    'Data Science internship',
    'Machine Learning internship',
    'research collaboration',
    'RAG project discussion',
    'Indonesia AI Engineer',
    'ML Engineer',
    'Hasanuddin University'
  ],
  openGraph: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'AI Engineer and Data Scientist open to internships, research collaborations, and project discussions. Let\'s connect.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Ikrar Gempur Tirani - Student Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'AI Engineer and Data Scientist open to internships and research collaborations.',
  },
}

export default function ContactPage() {
  const CONTACT_INFO = {
    EMAIL: 'ikrargempurtrn@gmail.com',
    WHATSAPP: '+6281214590205',
    LINKEDIN: 'https://www.linkedin.com/in/ikrar-gempur-tirani-867537283/',
    LOCATION: 'Makassar, South Sulawesi, Indonesia',
    TIMEZONE: 'UTC+8 (WITA)'
  }

  return <ContactClient contactInfo={CONTACT_INFO} />
}
