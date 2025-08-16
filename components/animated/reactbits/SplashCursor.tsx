// components/animated/reactbits/SplashCursor.tsx
'use client'

import * as React from 'react'

/**
 * SplashCursor: lingkaran kecil yang mengikuti kursor secara halus.
 * - Dinonaktifkan untuk prefers-reduced-motion.
 * - Ringan: hanya satu div absolut + requestAnimationFrame.
 */
export default function SplashCursor() {
  const dotRef = React.useRef<HTMLDivElement | null>(null)
  const reduced = React.useMemo(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  React.useEffect(() => {
    if (reduced) return
    const dot = dotRef.current
    if (!dot) return

    let x = 0, y = 0, tx = 0, ty = 0
    const ease = 0.15

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const raf = () => {
      x += (tx - x) * ease
      y += (ty - y) * ease
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = requestAnimationFrame(raf)
    }

    window.addEventListener('mousemove', onMove)
    let frame = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 backdrop-blur-sm"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}
