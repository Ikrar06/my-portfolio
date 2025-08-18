// app/page.tsx
import dynamic from 'next/dynamic'

// Dynamic import tanpa ssr: false untuk Next.js 15
const MarketingHomePage = dynamic(() => import('./(marketing)/page'))

export default function HomePage() {
  return <MarketingHomePage />
}