'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type Side = 'left' | 'right'

type FloatingIcon = {
  id: string
  icon: string
  side: Side
  top: string
  rotate: number
}

// Icons shown around the headline when hovering "Models"
const modelIcons: FloatingIcon[] = [
  { id: 'pytorch', icon: '/images/pytorch.svg', side: 'left', top: '-5%', rotate: -8 },
  { id: 'tensorflow', icon: '/images/tensorflow.svg', side: 'left', top: '55%', rotate: 6 },
  { id: 'huggingface', icon: '/images/huggingface.svg', side: 'right', top: '-5%', rotate: 8 },
  { id: 'scikit-learn', icon: '/images/scikit-learn.svg', side: 'right', top: '55%', rotate: -6 },
]

// Icons shown around the headline when hovering "Products"
const productIcons: FloatingIcon[] = [
  { id: 'react', icon: '/images/react.svg', side: 'left', top: '-5%', rotate: -10 },
  { id: 'nextjs', icon: '/images/nextdotjs.svg', side: 'left', top: '55%', rotate: 6 },
  { id: 'fastapi', icon: '/images/fastapi.svg', side: 'right', top: '-5%', rotate: 8 },
  { id: 'docker', icon: '/images/docker.svg', side: 'right', top: '55%', rotate: -8 },
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
      {/* Wraps both lines so the hover icons sit the same distance from the text on each side */}
      <span className="relative inline-block">
        <span className="block pb-1 whitespace-nowrap">
          <span className={muted}>Turning </span>
          <HoverWord active={hover === 'models'} onEnter={() => setHover('models')} onLeave={() => setHover(null)}>
            Models
          </HoverWord>
        </span>
        <span className="block pb-1 whitespace-nowrap">
          <span className={muted}>into </span>
          <HoverWord active={hover === 'products'} onEnter={() => setHover('products')} onLeave={() => setHover(null)}>
            Products
          </HoverWord>
        </span>
        <FloatingIcons icons={modelIcons} show={hover === 'models'} />
        <FloatingIcons icons={productIcons} show={hover === 'products'} />
      </span>
    </h1>
  )
}

function HoverWord({
  children,
  active,
  onEnter,
  onLeave,
}: {
  children: React.ReactNode
  active: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  return (
    <span
      className="inline-block cursor-default text-white transition-[text-shadow] duration-300"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ textShadow: glow(active) }}
    >
      {children}
    </span>
  )
}

function FloatingIcons({ icons, show }: { icons: FloatingIcon[]; show: boolean }) {
  return (
    <span className="hidden md:block pointer-events-none" aria-hidden>
      <AnimatePresence>
        {show &&
          icons.map((el, index) => (
            <motion.img
              key={el.id}
              src={el.icon}
              alt=""
              draggable={false}
              className="absolute w-16 h-16 lg:w-20 lg:h-20 object-contain select-none"
              style={{
                top: el.top,
                ...(el.side === 'left' ? { right: 'calc(100% + 2.5rem)' } : { left: 'calc(100% + 2.5rem)' }),
              }}
              initial={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
              animate={{ opacity: 0.8, scale: 1, y: 0, rotate: el.rotate }}
              exit={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
      </AnimatePresence>
    </span>
  )
}
