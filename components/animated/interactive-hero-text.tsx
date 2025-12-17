// components/animated/interactive-hero-text.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface FloatingElement {
  id: string
  text?: string
  icon?: string
  x: string // Changed to string for percentage-based positioning
  y: string
  rotate: number // Rotation in degrees
  size?: number // Icon size in pixels
}

export function InteractiveHeroText() {
  const [hoverState, setHoverState] = useState<'code' | 'design' | null>(null)

  // Icon elements for code (tensorflow, python, pytorch, react)
  const codeElements: FloatingElement[] = [
    { id: 'code-1', icon: '/images/tensorflow.png', x: '-13%', y: '-15%', rotate: -8, size: 100 },
    { id: 'code-2', icon: '/images/python.png', x: '104%', y: '-10%', rotate: 12, size: 100 },
    { id: 'code-3', icon: '/images/pytorch.png', x: '-14%', y: '105%', rotate: 5, size: 130 },
    { id: 'code-4', icon: '/images/react.png', x: '103%', y: '108%', rotate: -15, size: 100 },
  ]

  // Icon elements for design (photoshop, illustrator, figma, premiere pro)
  const designElements: FloatingElement[] = [
    { id: 'design-1', icon: '/images/photoshop.png', x: '-10%', y: '-18%', rotate: 10, size: 100 },
    { id: 'design-2', icon: '/images/illustrator.png', x: '103%', y: '-8%', rotate: -6, size: 100 },
    { id: 'design-3', icon: '/images/figma.png', x: '-15%', y: '110%', rotate: -12, size: 100 },
    { id: 'design-4', icon: '/images/premierepro.png', x: '106%', y: '112%', rotate: 8, size: 100 },
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
            className="cursor-pointer transition-all duration-300 inline-block relative z-20 hover:scale-105"
            onMouseEnter={() => setHoverState('code')}
            onMouseLeave={() => setHoverState(null)}
            style={{
              textShadow: hoverState === 'code'
                ? '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)'
                : '0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
          >
            Code
          </span>
          {' and '}
          <span
            className="cursor-pointer transition-all duration-300 inline-block relative z-20 hover:scale-105"
            onMouseEnter={() => setHoverState('design')}
            onMouseLeave={() => setHoverState(null)}
            style={{
              textShadow: hoverState === 'design'
                ? '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)'
                : '0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
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
                opacity: 0.7,
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
              className="absolute select-none"
              style={{
                left: el.x,
                top: el.y,
              }}
            >
              {el.icon ? (
                <div
                  style={{
                    width: `${el.size || 80}px`,
                    height: `${el.size || 80}px`
                  }}
                >
                  <Image
                    src={el.icon}
                    alt=""
                    width={el.size || 80}
                    height={el.size || 80}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              ) : (
                <span className="text-2xl md:text-4xl lg:text-5xl text-white/30 font-bold whitespace-nowrap">
                  {el.text}
                </span>
              )}
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  )
}
