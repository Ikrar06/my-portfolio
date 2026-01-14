'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface FloatingElement {
  id: string
  text?: string
  icon?: string
  x: string
  y: string
  rotate: number
}

export function InteractiveHeroText() {
  const [hoverState, setHoverState] = useState<'code' | 'design' | null>(null)

  // Icon elements untuk code (tensorflow, python, pytorch, react)
  const codeElements: FloatingElement[] = [
    { id: 'code-1', icon: '/images/tensorflow.svg', x: '-13%', y: '-15%', rotate: -8 },
    { id: 'code-2', icon: '/images/python.svg', x: '104%', y: '-10%', rotate: 12 },
    { id: 'code-3', icon: '/images/pytorch.svg', x: '-14%', y: '105%', rotate: 5 },
    { id: 'code-4', icon: '/images/react.svg', x: '103%', y: '108%', rotate: -15 },
  ]

  // Icon elements untuk design (photoshop, illustrator, figma, premiere pro)
  const designElements: FloatingElement[] = [
    { id: 'design-1', icon: '/images/adobe-photoshop.svg', x: '-10%', y: '-18%', rotate: 10 },
    { id: 'design-2', icon: '/images/adobe-illustrator.svg', x: '103%', y: '-8%', rotate: -6 },
    { id: 'design-3', icon: '/images/figma.svg', x: '-15%', y: '110%', rotate: -12 },
    { id: 'design-4', icon: '/images/adobe-premiere.svg', x: '106%', y: '112%', rotate: 8 },
  ]

  return (
    <div className="relative">
      {/* Floating elements container - Hidden on mobile */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
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
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight relative z-10 px-2" style={{ lineHeight: '1.15' }}>
        <span
          className="block pb-1 bg-gradient-to-t from-neutral-500 to-neutral-300 bg-clip-text text-transparent overflow-visible"
          style={{ lineHeight: '1.15' }}
        >
          Building with
        </span>
        <span className="block">
          <span
            className="cursor-pointer transition-all duration-300 inline-block relative z-20 hover:scale-105 text-white"
            onMouseEnter={() => setHoverState('code')}
            onMouseLeave={() => setHoverState(null)}
            style={{
              textShadow: hoverState === 'code'
                ? '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.15)'
                : '0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)',
            }}
          >
            Code
          </span>
          <span className="bg-gradient-to-t from-neutral-500 to-neutral-300 bg-clip-text text-transparent">
            {' and '}
          </span>
          <span
            className="cursor-pointer transition-all duration-300 inline-block relative z-20 hover:scale-105 text-white"
            onMouseEnter={() => setHoverState('design')}
            onMouseLeave={() => setHoverState(null)}
            style={{
              textShadow: hoverState === 'design'
                ? '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.15)'
                : '0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)',
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
  const uniformSize = 120 // Ukuran sama untuk semua icon

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
                    width: `${uniformSize}px`,
                    height: `${uniformSize}px`
                  }}
                >
                  <img
                    src={el.icon}
                    alt=""
                    width={uniformSize}
                    height={uniformSize}
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