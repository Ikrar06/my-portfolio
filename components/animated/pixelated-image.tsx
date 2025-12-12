// components/animated/pixelated-image.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PixelatedImageProps {
  src: string
  pixelatedSrc?: string // Optional: path to pixelated version, if not provided will show placeholder
  alt: string
  className?: string
}

export function PixelatedImage({
  src,
  pixelatedSrc,
  alt,
  className = ''
}: PixelatedImageProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front - Original Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 260px, 380px"
            priority
            quality={100}
            className="rounded-3xl object-cover"
          />
        </div>

        {/* Back - Pixelated Image or Placeholder */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {pixelatedSrc ? (
            <Image
              src={pixelatedSrc}
              alt={`${alt} (Pixelated)`}
              fill
              sizes="(max-width: 768px) 260px, 380px"
              quality={100}
              className="rounded-3xl object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          ) : (
            // Placeholder for pixelated version
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-6xl mb-4">🎮</div>
                <p className="text-white/60 text-sm font-medium">
                  Pixelated Version
                </p>
                <p className="text-white/40 text-xs mt-1">
                  Coming Soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
