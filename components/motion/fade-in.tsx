// components/motion/fade-in.tsx
'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type FadeInProps = PropsWithChildren<{
  delay?: number
  duration?: number
  y?: number
  className?: string
  once?: boolean
  margin?: string // viewport margin, mis. '-80px'
}>

/**
 * FadeIn aman SSR:
 * - Sebelum mount: render statis (visible) -> tidak ada "hilang" jika JS telat.
 * - Setelah mount: animasi whileInView dengan framer-motion.
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 16,
  className,
  once = true,
  margin = '-80px',
}: FadeInProps) {
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || reduce) {
    // Fallback non-animasi (atau prefers-reduced-motion)
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once, margin }}
    >
      {children}
    </motion.div>
  )
}
