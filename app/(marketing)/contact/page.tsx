// app/(marketing)/contact/page.tsx
import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ikrar Gempur Tirani, Informatics student learning Data Science and ML. Open to internships, learning opportunities, research collaborations, and project discussions. Always eager to learn and contribute.',
  keywords: [
    'contact Ikrar Gempur Tirani',
    'student contact',
    'Data Science internship',
    'Machine Learning internship',
    'research collaboration student',
    'AI project discussion',
    'Indonesia student',
    'learning opportunities',
    'ML student',
    'Hasanuddin University student'
  ],
  openGraph: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'Informatics student open to internships, learning opportunities, and research collaborations. Let\'s connect and learn together.',
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
    description: 'Student open to internships, learning opportunities, and research collaborations.',
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
