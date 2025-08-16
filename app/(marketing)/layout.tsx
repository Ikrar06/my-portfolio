// app/(marketing)/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio — Creative Visual Designer',
  description: 'Crafting compelling visual narratives that connect brands with their audiences. Strategic design solutions that inspire action and drive results.',
  openGraph: {
    title: 'Portfolio — Creative Visual Designer',
    description: 'Crafting compelling visual narratives that connect brands with their audiences. Strategic design solutions that inspire action and drive results.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Creative Design Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Creative Visual Designer',
    description: 'Crafting compelling visual narratives that connect brands with their audiences. Strategic design solutions that inspire action and drive results.',
    images: ['/images/og-default.png'],
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}