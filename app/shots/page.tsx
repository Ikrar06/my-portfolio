// app/shots/page.tsx - ENHANCED VERSION
import type { Metadata } from 'next'
import Image from 'next/image'
import { getAllShots } from '@/lib/shots'
import FadeIn from '@/components/motion/fade-in'

export const metadata: Metadata = {
  title: 'Shots — Portfolio',
  description: 'A curated collection of visual experiments, design explorations, and creative shots that showcase artistic vision and technical skills.',
  keywords: 'design shots, visual experiments, creative work, design inspiration, dribbble shots, portfolio gallery, design exploration',
  openGraph: {
    title: 'Shots — Creative Visual Gallery',
    description: 'A curated collection of visual experiments, design explorations, and creative shots that showcase artistic vision and technical skills.',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/shots',
    type: 'website',
    images: [{ 
      url: '/images/og-shots.png', 
      width: 1200, 
      height: 630, 
      alt: 'Shots - Creative Visual Gallery' 
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shots — Creative Visual Gallery',
    description: 'A curated collection of visual experiments, design explorations, and creative shots.',
    images: ['/images/og-shots.png'],
  },
}

export default async function ShotsPage() {
  const shots = await getAllShots()

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Shots
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Visual experiments, design explorations, and creative shots that don't fit into full case studies. 
            Quick glimpses of the creative process.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {shots.length} shot{shots.length !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Creative experiments
          </span>
        </div>
      </header>

      {/* Gallery Grid */}
      {shots.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shots.map((shot, index) => {
            // Handle different image array structures
            const images = Array.isArray(shot.images) ? shot.images : []
            const displayImages = images.slice(0, 4) // Max 4 images per shot
            
            // Determine grid layout based on image count
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
                <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  {/* Images Grid */}
                  {displayImages.length > 0 && (
                    <div className={`grid gap-1 ${getGridClass(displayImages.length)} overflow-hidden`}>
                      {displayImages.map((src, imageIndex) => {
                        // Special layout for 3 images - first image spans 2 columns
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
                            {displayImages.length > 4 && imageIndex === 3 && (
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
                  <div className="p-5 space-y-3">
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {shot.title}
                      </h2>
                      {shot.caption && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                          {shot.caption}
                        </p>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between gap-3 text-sm">
                      {/* Year */}
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl font-medium">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {shot.year}
                      </span>

                      {/* Image count */}
                      {images.length > 1 && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-medium">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {images.length}
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {Array.isArray(shot.tags) && shot.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                        {shot.tags.slice(0, 4).map((tag) => (
                          <span
                            key={`${shot.title}-tag-${tag}`}
                            className="inline-flex items-center px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-700/50"
                          >
                            #{tag}
                          </span>
                        ))}
                        {shot.tags.length > 4 && (
                          <span className="inline-flex items-center px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-xl text-xs font-medium">
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
      ) : (
        /* Empty State */
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            No shots available yet
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
            Creative experiments and visual explorations will appear here soon. 
            Check back later for fresh inspiration!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View Full Projects
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 text-blue-700 rounded-2xl hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/30 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go Back Home
            </a>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      {shots.length > 0 && (
        <div className="text-center py-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
              Looking for detailed case studies?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
              Explore comprehensive project breakdowns with process insights, challenges, and solutions.
            </p>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              View Full Projects
            </a>
          </div>
        </div>
      )}
    </section>
  )
}