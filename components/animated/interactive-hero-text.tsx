'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Side = 'left' | 'right'

type FloatingIcon = {
  id: string
  icon: string
  top: string
  rotate: number
}

// Icons shown when hovering "Models" (placed to its left)
const modelIcons: FloatingIcon[] = [
  { id: 'pytorch', icon: '/images/pytorch.svg', top: '-85%', rotate: -8 },
  { id: 'tensorflow', icon: '/images/tensorflow.svg', top: '75%', rotate: 6 },
]

// Icons shown when hovering "Products" (placed to its right)
const productIcons: FloatingIcon[] = [
  { id: 'react', icon: '/images/react.svg', top: '-85%', rotate: 10 },
  { id: 'python', icon: '/images/python.svg', top: '75%', rotate: -8 },
]

const glow = (active: boolean) =>
  active
    ? '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.15)'
    : '0 0 15px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)'

const muted = 'bg-gradient-to-t from-neutral-500 to-neutral-300 bg-clip-text text-transparent'

export function InteractiveHeroText() {
  const [hover, setHover] = useState<'models' | 'products' | null>(null)

  return (
    <h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-bold tracking-tight relative z-10 px-2"
      style={{ lineHeight: '1.12' }}
    >
      <span className={`block pb-1 ${muted}`}>Turning</span>
      <span className="block md:whitespace-nowrap">
        <HoverWord
          active={hover === 'models'}
          onEnter={() => setHover('models')}
          onLeave={() => setHover(null)}
          icons={modelIcons}
          side="left"
        >
          Models
        </HoverWord>
        <span className={muted}> into </span>
        <HoverWord
          active={hover === 'products'}
          onEnter={() => setHover('products')}
          onLeave={() => setHover(null)}
          icons={productIcons}
          side="right"
        >
          Products
        </HoverWord>
      </span>
    </h1>
  )
}

function HoverWord({
  children,
  active,
  onEnter,
  onLeave,
  icons,
  side,
}: {
  children: React.ReactNode
  active: boolean
  onEnter: () => void
  onLeave: () => void
  icons: FloatingIcon[]
  side: Side
}) {
  return (
    <span
      className="relative inline-block cursor-default text-white transition-[text-shadow] duration-300"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ textShadow: glow(active) }}
    >
      {children}
      <span className="hidden md:block pointer-events-none" aria-hidden>
        <AnimatePresence>
          {active &&
            icons.map((el, index) => (
              <motion.img
                key={el.id}
                src={el.icon}
                alt=""
                draggable={false}
                className="absolute w-20 h-20 lg:w-24 lg:h-24 object-contain select-none"
                style={{
                  top: el.top,
                  ...(side === 'left' ? { right: 'calc(100% + 2rem)' } : { left: 'calc(100% + 2rem)' }),
                }}
                initial={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
                animate={{ opacity: 0.8, scale: 1, y: 0, rotate: el.rotate }}
                exit={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
        </AnimatePresence>
      </span>
    </span>
  )
}
