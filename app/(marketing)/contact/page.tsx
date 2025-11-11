// app/(marketing)/contact/page.tsx
import type { Metadata } from 'next'
import ContactClient from './contact-client'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ikrar Gempur Tirani for your creative projects. Whether you need brand identity, social media graphics, or creative direction, let\'s collaborate to bring your vision to life. Currently booking Q3-Q4 2025.',
  keywords: [
    'contact graphic designer',
    'hire UI/UX designer',
    'brand identity services',
    'creative media specialist',
    'social media design',
    'Indonesia designer contact',
    'Makassar creative services',
    'freelance graphic designer',
    'design consultation',
    'creative collaboration',
    'project inquiry',
    'design services Indonesia'
  ],
  openGraph: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'Let\'s work together on your next creative project. Get in touch for brand identity, social media graphics, and creative direction services.',
    images: [
      {
        url: '/images/foto-ikrar.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Ikrar Gempur Tirani - Graphic Designer',
      },
    ],
  },
  twitter: {
    title: 'Contact — Ikrar Gempur Tirani',
    description: 'Let\'s work together on your next creative project. Currently booking Q3-Q4 2025.',
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
