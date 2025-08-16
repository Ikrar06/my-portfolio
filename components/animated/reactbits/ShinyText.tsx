// components/animated/reactbits/ShinyText.tsx
'use client'

import * as React from 'react'

type ShinyTextProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  children: React.ReactNode
  speedMs?: number
}

/**
 * ShinyText: efek kilau halus via background-clip + mask + keyframes.
 * - Tidak pakai lib berat
 * - Reduced motion: non-animated fallback
 */
export default function ShinyText({
  as: Tag = 'span',
  className,
  children,
  speedMs = 2200,
}: ShinyTextProps) {
  return (
    <Tag
      className={[
        'relative inline-block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent',
        'will-change-[mask-position]',
        'motion-safe:animate-[shiny_var(--speed)_infinite_linear]',
        className || '',
      ].join(' ')}
      style={
        {
          '--speed': `${speedMs}ms`,
          WebkitMaskImage:
            'linear-gradient(120deg, transparent 35%, rgba(0,0,0,0.6) 50%, transparent 65%)',
          WebkitMaskSize: '250% 100%',
          WebkitMaskPosition: '0% 0%',
        } as React.CSSProperties
      }
    >
      {children}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          :global(.motion-safe\:animate-\[shiny_var\(--speed\)_infinite_linear\]) {
            animation: none !important;
          }
        }
        @keyframes shiny {
          to {
            -webkit-mask-position: 250% 0%;
          }
        }
      `}</style>
    </Tag>
  )
}
