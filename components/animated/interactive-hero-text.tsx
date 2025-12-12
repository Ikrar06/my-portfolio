// components/animated/interactive-hero-text.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface FloatingElement {
  id: string
  text: string
  x: string // Changed to string for percentage-based positioning
  y: string
  rotate: number // Rotation in degrees
}

export function InteractiveHeroText() {
  const [hoverState, setHoverState] = useState<'code' | 'design' | null>(null)

  // Fewer, larger elements positioned closer and overlapping the heading with varied rotations
  const codeElements: FloatingElement[] = [
    { id: 'code-1', text: 'Python', x: '-18%', y: '-12%', rotate: -8 },
    { id: 'code-2', text: 'PyTorch', x: '108%', y: '3%', rotate: 12 },
    { id: 'code-3', text: '90%+', x: '-22%', y: '85%', rotate: 5 }, // Kiri bawah - turun dan ke kiri lebih
    { id: 'code-4', text: 'NLP', x: '110%', y: '88%', rotate: -15 },
  ]

  const designElements: FloatingElement[] = [
    { id: 'design-1', text: 'Figma', x: '-16%', y: '-8%', rotate: 10 },
    { id: 'design-2', text: 'Leadership', x: '100%', y: '12%', rotate: -6 },
    { id: 'design-3', text: '1M+ views', x: '-30%', y: '110%', rotate: -12 }, // Kiri bawah - turun dan ke kiri lebih
    { id: 'design-4', text: 'Brand', x: '107%', y: '110%', rotate: 8 },
  ]

  return (
    <div className="relative">
      {/* Floating elements container - positioned absolutely, can overlap the text */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingElements
          elements={codeElements}
          show={hoverState === 'code'}
        />
        <FloatingElements
          elements={designElements}
          show={hoverState === 'design'}
        />
      </div>

      {/* Main heading */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight relative z-10">
        <span className="block">Building with</span>
        <span className="block">
          <span
            className="cursor-pointer transition-colors inline-block relative z-20"
            onMouseEnter={() => setHoverState('code')}
            onMouseLeave={() => setHoverState(null)}
          >
            Code
          </span>
          {' and '}
          <span
            className="cursor-pointer transition-colors inline-block relative z-20"
            onMouseEnter={() => setHoverState('design')}
            onMouseLeave={() => setHoverState(null)}
          >
            Design
          </span>
        </span>
      </h1>
    </div>
  )
}

function FloatingElements({
  elements,
  show
}: {
  elements: FloatingElement[]
  show: boolean
}) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {elements.map((el, index) => (
            <motion.div
              key={el.id}
              initial={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
              animate={{
                opacity: 0.4,
                scale: 1,
                y: 0,
                rotate: el.rotate,
              }}
              exit={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute text-2xl md:text-4xl lg:text-5xl text-white/30 font-bold whitespace-nowrap select-none"
              style={{
                left: el.x,
                top: el.y,
              }}
            >
              {el.text}
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  )
}
