// app/page.tsx
import dynamic from 'next/dynamic'

// Dynamic import untuk menghindari masalah SSR/build
const MarketingHomePage = dynamic(() => import('./(marketing)/page'), {
  ssr: false, // Karena komponen menggunakan 'use client'
})

export default function HomePage() {
  return <MarketingHomePage />
}