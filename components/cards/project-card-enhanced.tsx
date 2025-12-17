// components/cards/project-card-enhanced.tsx
'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { ProjectMeta } from '@/lib/projects'

type ProjectCardProps = {
  project: ProjectMeta
}

export default function ProjectCardEnhanced({ project }: ProjectCardProps) {
  const { slug, title, summary, cover, year, category, tags, projectType } = project
  const cardRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Validasi cover image
  const hasCover = cover && cover.trim() !== ''

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 50, y: 50 })
  }

  // Calculate tilt based on mouse position
  const tiltX = isHovered ? (mousePosition.y - 50) / 10 : 0
  const tiltY = isHovered ? -(mousePosition.x - 50) / 10 : 0

  return (
    <article
      ref={cardRef}
      className="group h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <Link
        href={`/${projectType === 'coding' ? 'project' : 'design'}/${slug}`}
        className="block glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_1px_rgba(0,153,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary relative h-full flex flex-col"
        aria-label={`View project details: ${title}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 153, 255, 0.1), transparent 40%)`,
          }}
        />

        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
          {hasCover ? (
            <div className="relative w-full h-full">
              <Image
                src={cover}
                alt={`Cover image for project ${title}`}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                priority={false}
                quality={100}
                unoptimized={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyejRAjhcUNZJZUKm50sA3/2Q=="
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              {/* Vignette effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
                }}
              />
            </div>
          ) : (
            // Fallback placeholder
            <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-slate-500/30 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <p className="text-xs text-slate-400 font-medium">Project Preview</p>
              </div>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Category badge with enhanced animation */}
          {category && (
            <div className="absolute top-3 left-3 transform transition-all duration-300 group-hover:scale-110">
              <span className="px-2.5 py-1 text-xs font-medium bg-black/60 text-white rounded-xl backdrop-blur-md border border-white/10">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 rounded-b-xl flex-1 flex flex-col">
          <div className="space-y-2 flex-1">
            <h3 className="text-base md:text-lg font-semibold leading-tight text-white group-hover:text-framer-blue transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
              {summary}
            </p>
          </div>

          {/* Tags with stagger animation */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-xl border border-neutral-200 dark:border-neutral-700/50 transition-all duration-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700/50 group-hover:border-neutral-300 dark:group-hover:border-neutral-600/50"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-xl transition-all duration-300 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <time
              className="text-xs font-medium text-text-tertiary bg-bg-tertiary px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-framer-blue/10 group-hover:text-framer-blue"
              dateTime={year.toString()}
            >
              {year}
            </time>
            <span className="text-xs font-medium text-framer-blue flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-all duration-300">
              View details
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
