// components/design/design-shots.tsx
'use client'

import Image from 'next/image'
import FadeIn from '@/components/motion/fade-in'

interface Shot {
  title: string
  caption?: string
  images: string[]
  tags?: string[]
  year: number
}

interface DesignShotsProps {
  shots: Shot[]
}

export default function DesignShots({ shots }: DesignShotsProps) {

  if (shots.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          No shots available yet
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
          Creative experiments and visual explorations will appear here soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Shot count */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{shots.length}</span> creative shot{shots.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Shots Grid */}
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shots.map((shot, index) => {
          const images = Array.isArray(shot.images) ? shot.images : []
          const displayImages = images.slice(0, 4)

          const getGridClass = (imageCount: number) => {
            if (imageCount === 1) return 'grid-cols-1'
            if (imageCount === 2) return 'grid-cols-2'
            if (imageCount === 3) return 'grid-cols-2 grid-rows-2'
            if (imageCount >= 4) return 'grid-cols-2 grid-rows-2'
            return 'grid-cols-1'
          }

          return (
            <FadeIn
              key={`shot-${shot.title}-${index}`}
              delay={0.04 + index * 0.03}
              once
              margin="-10% 0px -10% 0px"
            >
              <article className="group overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                {/* Images Grid */}
                {displayImages.length > 0 && (
                  <div className={`grid gap-0.5 sm:gap-1 ${getGridClass(displayImages.length)} overflow-hidden`}>
                    {displayImages.map((src, imageIndex) => {
                      const isSpecialLayout = displayImages.length === 3 && imageIndex === 0

                      return (
                        <figure
                          key={`${shot.title}-img-${imageIndex}`}
                          className={`
                            relative overflow-hidden
                            ${isSpecialLayout ? 'col-span-2' : ''}
                            ${displayImages.length === 1 ? 'aspect-[5/4] mx-4 mt-4' : 'aspect-square bg-neutral-100 dark:bg-neutral-800'}
                          `}
                        >
                          <Image
                            src={src}
                            alt={`${shot.title} — visual ${imageIndex + 1}`}
                            fill
                            sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                            className={`${displayImages.length === 1 ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                            loading="lazy"
                          />

                          {/* Overlay for multiple images indicator */}
                          {images.length > 4 && imageIndex === 3 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-semibold text-lg">
                                +{images.length - 4}
                              </span>
                            </div>
                          )}
                        </figure>
                      )
                    })}
                  </div>
                )}

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold leading-tight group-hover:text-framer-blue transition-colors">
                      {shot.title}
                    </h2>
                    {shot.caption && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                        {shot.caption}
                      </p>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-sm">
                    {/* Year */}
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {shot.year}
                    </span>

                    {/* Image count */}
                    {images.length > 1 && (
                      <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 bg-framer-blue/10 text-framer-blue rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {images.length}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {Array.isArray(shot.tags) && shot.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      {shot.tags.slice(0, 4).map((tag) => (
                        <span
                          key={`${shot.title}-tag-${tag}`}
                          className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium border border-neutral-200 dark:border-neutral-700/50"
                        >
                          #{tag}
                        </span>
                      ))}
                      {shot.tags.length > 4 && (
                        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium">
                          +{shot.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </div>
  )
}
