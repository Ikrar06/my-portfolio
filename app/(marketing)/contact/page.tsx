// app/(marketing)/contact/page.tsx
import type { Metadata } from 'next'
import ContactClient from './contact-client'
import { OG_IMAGE } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ikrar Gempur Tirani, an AI Engineer building RAG systems and production ML. Open to internships, research collaborations, and project discussions.',
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
    images: [OG_IMAGE],
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'AI Engineer open to internships, research collaborations, and project discussions. Let\'s connect.',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'AI Engineer open to internships and research collaborations.',
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
