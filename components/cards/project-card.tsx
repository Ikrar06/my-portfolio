// components/cards/project-card.tsx - HIGH QUALITY VERSION
import Link from 'next/link'
import Image from 'next/image'
import type { ProjectMeta } from '@/lib/projects'
import CoverFallback from '@/components/cards/cover-fallback'

type ProjectCardProps = { 
  project: ProjectMeta 
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, summary, cover, year, category, tags, projectType } = project

  // Validasi cover image - pastikan tidak kosong atau undefined
  const hasCover = cover && cover.trim() !== ''

  return (
    <article className="group">
      <Link
        href={`/${projectType === 'coding' ? 'project' : 'design'}/${slug}`}
        className="block glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_1px_rgba(0,153,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-framer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        aria-label={`View project details: ${title}`}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
          {hasCover ? (
            <Image
              src={cover}
              alt={`Cover image for project ${title}`}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          ) : (
            <CoverFallback title={title} tools={project.tools} />
          )}
          
          {/* Overlay gradient untuk readability yang lebih baik */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Category badge */}
          {category && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded-xl backdrop-blur-sm">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 rounded-b-xl">
          <div className="space-y-2">
            <h3 className="text-base md:text-lg font-semibold leading-tight text-white group-hover:text-framer-blue transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
              {summary}
            </p>
          </div>

          {/* Tags - NEUTRAL COLORS MATCHING SHOTS PAGE */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-xl border border-neutral-200 dark:border-neutral-700/50"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-xl">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <time
              className="text-xs font-medium text-text-tertiary bg-bg-tertiary px-2 py-1 rounded-full"
              dateTime={year.toString()}
            >
              {year}
            </time>
            <span className="text-xs font-medium text-framer-blue flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
              View details
              <svg
                className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
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