// app/(marketing)/contact/page.tsx
import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ikrar Gempur Tirani for Data Science and ML Engineering opportunities. Open to full-time roles, internships, and research collaborations. Let\'s build AI products that make an impact.',
  keywords: [
    'contact Data Scientist',
    'hire ML Engineer',
    'Data Science opportunities',
    'Machine Learning jobs',
    'NLP specialist contact',
    'AI product development',
    'Indonesia Data Scientist',
    'research collaboration',
    'ML internship',
    'Data Science consultation',
    'AI project inquiry',
    'production ML systems'
  ],
  openGraph: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'Open to Data Science and ML Engineering opportunities. Let\'s collaborate on building AI products and production ML systems.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Ikrar Gempur Tirani - Data Scientist & ML Engineer',
      },
    ],
  },
  twitter: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'Open to Data Science/ML roles, internships, and research collaborations.',
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
