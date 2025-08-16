// components/animated/reactbits/AnimatedContent.tsx
'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'

type AnimatedContentProps = {
  id: string | number
  children: React.ReactNode
}

/**
 * AnimatedContent: transisi halus saat konten berubah berdasarkan "id".
 * Pakai di area yang kontennya bisa swap (opsional).
 */
export default function AnimatedContent({ id, children }: AnimatedContentProps) {
  const reduced = useReducedMotion()
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduced ? 0 : -8 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
