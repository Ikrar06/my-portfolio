// components/layout/bento-grid.tsx
'use client'

import { ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode[]
}

export function BentoGrid({ children }: BentoGridProps) {
  // Pattern untuk Bento Grid: mengulang setiap 6 items
  // 1 = large (col-span-2 row-span-2), 2-4 = medium (col-span-1), 5 = large (col-span-2), 6 = medium
  const getBentoClass = (index: number) => {
    const position = index % 6

    switch (position) {
      case 0: // Large featured card
        return 'md:col-span-2 md:row-span-2'
      case 1:
      case 2:
      case 3:
        return 'md:col-span-1'
      case 4: // Wide card
        return 'md:col-span-2'
      case 5:
        return 'md:col-span-1'
      default:
        return 'md:col-span-1'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {children.map((child, index) => (
        <div key={index} className={getBentoClass(index)}>
          {child}
        </div>
      ))}
    </div>
  )
}
