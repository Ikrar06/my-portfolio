// app/projects/[slug]/page.tsx - COMPLETELY REWRITTEN WITH PROPER INTEGRATION
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx'
import { getRelatedProjects, type ExtendedProjectMeta } from '@/lib/projects-helpers'
import ProjectCard from '@/components/cards/project-card'
import SmartFinalResults, { AdvancedFinalResults, AdvancedExploration } from '@/components/project/SmartFinalResult'

// ====== SSG params ======
export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

// ====== SEO per project ======
type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const { meta } = await getProjectBySlug(slug)
    const { 
      title, 
      summary, 
      cover, 
      category, 
      tags, 
      skills, 
      organizationWork, 
      competitionWork,
      eventWork 
    } = meta

    const keywords = [
      ...(tags || []),
      ...(skills || []),
      category,
      'design',
      'portfolio'
    ].filter(Boolean)

    // Determine page type
    let pageType = 'Project Case Study'
    if (eventWork) {
      pageType = 'Event Work'
      keywords.push('event work', 'event design')
    } else if (competitionWork) {
      pageType = 'Competition Entry'
      keywords.push('competition work', 'design competition')
    } else if (organizationWork) {
      pageType = 'Organization Work'
      keywords.push('organization work', 'social media')
    } else {
      keywords.push('case study', 'design project')
    }

    return {
      title: `${title} — ${pageType}`,
      description: summary,
      keywords: keywords.join(', '),
      openGraph: {
        title: `${title} — ${pageType}`,
        description: summary,
        type: 'article',
        images: cover ? [{ 
          url: cover, 
          width: 1200, 
          height: 630,
          alt: `${title} ${pageType.toLowerCase()} cover image`
        }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} — ${pageType}`,
        description: summary,
        images: cover ? [cover] : undefined,
      },
    }
  } catch (error) {
    console.error('Error generating metadata for project:', error)
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  
  try {
    const { meta, content } = await getProjectBySlug(slug)
    
    // Safe destructuring with proper fallbacks
    const {
      title = 'Untitled Project',
      role = '',
      tools = [],
      skills = [],
      year = new Date().getFullYear(),
      duration = '',
      team = '',
      client = '',
      organization = '',
      organizationType = '',
      organizationWork = false,
      competitionWork = false,
      competitionName = '',
      competitionCategory = '',
      // Event fields
      eventWork = false,
      eventName = '',
      eventType = '',
      eventRole = '',
      eventDuration = '',
      eventLocation = '',
      category = '',
      tags = [],
      cover = '',
      summary = '',
      final = [],
      applications = [],
      explorations = [],
      socialPosts = [],
      socialMediaSections = [],
      campaigns = [],
      brandMaterials = [],
      // Event-specific arrays
      eventMaterials = [],
      eventDocumentation = [],
      eventPromotion = [],
      metrics = [],
      credits = [],
      challenges = '',
      solutions = '',
      impact = '',
      testimonial,
      liveUrl = '',
      githubUrl = '',
      behanceUrl = '',
      dribbbleUrl = '',
      instagramUrl = '',
      linkedinUrl = ''
    } = meta

    // Get related projects with proper parameters
    const relatedProjectsOptions: Parameters<typeof getRelatedProjects>[1] = {
      category: category || undefined,
      tags: tags.length > 0 ? tags : undefined,
      organizationWork: organizationWork || undefined,
      competitionWork: competitionWork || undefined,
      eventWork: eventWork || undefined,
      limit: 3
    }

    // Add specific filters based on work type
    if (competitionWork && competitionName) {
      relatedProjectsOptions.competitionName = competitionName
    }
    if (eventWork && eventName) {
      relatedProjectsOptions.eventName = eventName
    }
    if (eventWork && eventType) {
      relatedProjectsOptions.eventType = eventType
    }
    if (organizationWork && organizationType) {
      relatedProjectsOptions.organizationType = organizationType
    }

    const relatedProjects = await getRelatedProjects(slug, relatedProjectsOptions)

    // Determine work type and navigation
    let workType = 'Projects'
    let workTypeLabel = 'Project'
    let backText = 'Back to Projects'
    
    if (eventWork) {
      workType = 'Events'
      workTypeLabel = 'Event Work'
      backText = 'Back to Events'
    } else if (competitionWork) {
      workType = 'Competitions'
      workTypeLabel = 'Competition'
      backText = 'Back to Competitions'
    } else if (organizationWork) {
      workType = 'Organization Work'
      workTypeLabel = 'Organization Work'
      backText = 'Back to Work'
    }

    // Combine images for "More from this work" section
    let morePool: string[] = []
    
    if (eventWork) {
      morePool = [
        ...eventMaterials,
        ...eventDocumentation,
        ...eventPromotion,
        ...applications,
        ...explorations
      ]
    } else if (organizationWork) {
      // Combine all organization-related images
      const socialMediaImages = socialMediaSections.flatMap(section => section.images || [])
      morePool = [
        ...socialPosts,
        ...socialMediaImages,
        ...campaigns,
        ...brandMaterials,
        ...applications,
        ...explorations
      ]
    } else {
      morePool = [...applications, ...explorations]
    }

    const more = morePool.slice(0, 6)

    return (
      <article className="space-y-12">
        {/* Breadcrumb & Back Navigation */}
        <nav className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
          <Link 
            href="/" 
            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link 
            href="/projects" 
            className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            {workType}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">{title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-8">
          <div className="space-y-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {backText}
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {/* Category Badge */}
                {category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl font-medium dark:bg-blue-900 dark:text-blue-200">
                    {category}
                  </span>
                )}
                
                {/* Work Type Badges */}
                {eventWork ? (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-xl font-medium dark:bg-indigo-900 dark:text-indigo-200">
                    Event Work
                  </span>
                ) : competitionWork ? (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-xl font-medium dark:bg-orange-900 dark:text-orange-200">
                    Competition
                  </span>
                ) : organizationWork ? (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-xl font-medium dark:bg-purple-900 dark:text-purple-200">
                    Organization Work
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl font-medium dark:bg-emerald-900 dark:text-emerald-200">
                    Project
                  </span>
                )}

                {/* Specific Work Badges */}
                {eventWork && eventName && (
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-xl font-medium dark:bg-violet-900 dark:text-violet-200">
                    {eventName}
                  </span>
                )}
                
                {eventWork && eventType && (
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-xl font-medium dark:bg-cyan-900 dark:text-cyan-200">
                    {eventType}
                  </span>
                )}

                {competitionWork && competitionName && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-xl font-medium dark:bg-amber-900 dark:text-amber-200">
                    {competitionName}
                  </span>
                )}
                
                {competitionWork && competitionCategory && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-xl font-medium dark:bg-yellow-900 dark:text-yellow-200">
                    {competitionCategory}
                  </span>
                )}

                {/* Time Badges */}
                <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-xl font-medium dark:bg-neutral-800 dark:text-neutral-300">
                  {year}
                </span>
                {(duration || eventDuration) && (
                  <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-xl font-medium dark:bg-neutral-800 dark:text-neutral-300">
                    {eventDuration || duration}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {title}
              </h1>
              
              <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
                {summary}
              </p>
            </div>

            {/* Project/Organization/Event Links */}
            {(liveUrl || githubUrl || behanceUrl || dribbbleUrl || instagramUrl || linkedinUrl) && (
              <div className="flex flex-wrap items-center gap-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {behanceUrl && (
                  <a
                    href={behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors font-medium"
                  >
                    Behance
                  </a>
                )}
                {dribbbleUrl && (
                  <a
                    href={dribbbleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors font-medium"
                  >
                    Dribbble
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Meta Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
            {(role || eventRole) && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                  Role
                </h3>
                <p className="text-neutral-900 dark:text-neutral-100 font-medium">{eventRole || role}</p>
              </div>
            )}
            
            {/* Conditional rendering based on work type */}
            {eventWork ? (
              <>
                {eventName && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                      Event
                    </h3>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium">{eventName}</p>
                    {eventType && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{eventType}</p>
                    )}
                  </div>
                )}
                {eventLocation && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                      Location
                    </h3>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium">{eventLocation}</p>
                  </div>
                )}
              </>
            ) : competitionWork ? (
              <>
                {competitionName && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                      Competition
                    </h3>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium">{competitionName}</p>
                    {competitionCategory && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{competitionCategory}</p>
                    )}
                  </div>
                )}
              </>
            ) : organizationWork ? (
              <>
                {organization && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                      Organization
                    </h3>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium">{organization}</p>
                    {organizationType && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{organizationType}</p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {client && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                      Client
                    </h3>
                    <p className="text-neutral-900 dark:text-neutral-100 font-medium">{client}</p>
                  </div>
                )}
              </>
            )}

            {team && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                  Team
                </h3>
                <p className="text-neutral-900 dark:text-neutral-100 font-medium">{team}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2">
                Timeline
              </h3>
              <p className="text-neutral-900 dark:text-neutral-100 font-medium">
                {(duration || eventDuration) ? `${eventDuration || duration} • ${year}` : year}
              </p>
            </div>
          </div>

          {/* Cover Image */}
          {cover && (
            <figure className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-lg">
              <div className="relative w-full flex justify-center bg-neutral-50 dark:bg-neutral-900">
                <Image
                  src={cover}
                  alt={`${title} — ${workTypeLabel.toLowerCase()} cover`}
                  width={1600}
                  height={1200}
                  className="max-w-full h-auto"
                  quality={100}
                  priority
                />
              </div>
            </figure>
          )}
        </header>

        {/* Skills & Tools */}
        {(skills.length > 0 || tools.length > 0) && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Skills & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-emerald-700 dark:text-emerald-400">
                    Skills Applied
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, index: number) => (
                      <span
                        key={`skill-${index}`}
                        className="px-3 py-2 bg-emerald-50 text-emerald-800 rounded-xl font-medium border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tools.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400">
                    Tools & Software
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool: string, index: number) => (
                      <span
                        key={`tool-${index}`}
                        className="px-3 py-2 bg-blue-50 text-blue-800 rounded-xl font-medium border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Enhanced Gallery Section */}
        <section className="space-y-12">
          {/* Event-specific galleries */}
          {eventWork && (
            <>
              {/* Event Materials - Masonry */}
              {eventMaterials.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Event Materials</h2>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {eventMaterials.map((src: string, index: number) => (
                      <figure
                        key={`event-material-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — event material ${index + 1}`}
                            width={1200}
                            height={900}
                            quality={100}
                            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Documentation - Masonry */}
              {eventDocumentation.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Event Documentation</h2>
                  <div className="columns-1 md:columns-2 gap-6 space-y-6">
                    {eventDocumentation.map((src: string, index: number) => (
                      <figure
                        key={`event-doc-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — event documentation ${index + 1}`}
                            width={1200}
                            height={800}
                            quality={100}
                            sizes="(min-width:768px) 50vw, 100vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Promotion - Masonry (keeping 4 columns for social posts) */}
              {eventPromotion.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Event Promotion</h2>
                  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {eventPromotion.map((src: string, index: number) => (
                      <figure
                        key={`event-promo-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-4"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — event promotion ${index + 1}`}
                            width={1080}
                            height={1080}
                            quality={100}
                            sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Organization work galleries */}
          {organizationWork && (
            <>
              {/* Social Media Sections - Masonry */}
              {socialMediaSections.map((section, sectionIndex) => (
                <div key={`social-section-${sectionIndex}`} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {section.title || `Social Media Section ${sectionIndex + 1}`}
                    </h2>
                    {section.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                        {section.description}
                      </p>
                    )}
                  </div>
                  
                  {section.images && section.images.length > 0 && (
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                      {section.images.map((src: string, imageIndex: number) => (
                        <figure
                          key={`social-${sectionIndex}-${imageIndex}`}
                          className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-4"
                        >
                          <div className="relative w-full">
                            <Image
                              src={src}
                              alt={`${section.title || 'Social media post'} ${imageIndex + 1}`}
                              width={1080}
                              height={1080}
                              quality={100}
                              sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                          {section.captions && section.captions[imageIndex] && (
                            <div className="p-3 bg-neutral-50 dark:bg-neutral-800">
                              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                {section.captions[imageIndex]}
                              </p>
                            </div>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Legacy Social Posts - Masonry */}
              {socialPosts.length > 0 && socialMediaSections.length === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Social Media Posts</h2>
                  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {socialPosts.map((src: string, index: number) => (
                      <figure
                        key={`legacy-social-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-4"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — social post ${index + 1}`}
                            width={1080}
                            height={1080}
                            quality={100}
                            sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Campaigns - Masonry */}
              {campaigns.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Campaign Materials</h2>
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {campaigns.map((src: string, index: number) => (
                      <figure
                        key={`campaign-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — campaign ${index + 1}`}
                            width={1200}
                            height={900}
                            quality={100}
                            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Brand Materials - Masonry */}
              {brandMaterials.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Brand Materials</h2>
                  <div className="columns-1 md:columns-2 gap-6 space-y-6">
                    {brandMaterials.map((src: string, index: number) => (
                      <figure
                        key={`brand-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — brand material ${index + 1}`}
                            width={1200}
                            height={800}
                            quality={100}
                            sizes="(min-width:768px) 50vw, 100vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Regular Project Gallery - Enhanced with Orientation-Aware Final Results */}
          {(final?.length > 0 || applications?.length > 0 || explorations?.length > 0) && (
            <>
              {final && final.length > 0 && (
                <AdvancedFinalResults final={final} title={title} />
              )}

              {/* Applications - Masonry */}
              {applications && applications.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
                  <div className="columns-1 md:columns-2 gap-6 space-y-6">
                    {applications.map((src: string, index: number) => (
                      <figure
                        key={`application-${index}`}
                        className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
                      >
                        <div className="relative w-full">
                          <Image
                            src={src}
                            alt={`${title} — application ${index + 1}`}
                            width={1200}
                            height={800}
                            quality={100}
                            sizes="(min-width:768px) 50vw, 100vw"
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Design Explorations - Masonry */}
              {explorations && explorations.length > 0 && (
                <AdvancedExploration final={explorations} title={title} />
              )}
            </>
          )}
        </section>

        {/* Project Story - Challenges, Solutions, Impact */}
        {(challenges || solutions || impact) && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {challenges && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Challenges</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{challenges}</p>
              </div>
            )}

            {solutions && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Solutions</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{solutions}</p>
              </div>
            )}

            {impact && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Impact</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{impact}</p>
              </div>
            )}
          </section>
        )}

        {/* Main Content - MDX Content */}
        <section className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-ul:list-disc prose-ol:list-decimal prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
          {content}
        </section>

        {/* Testimonial */}
        {testimonial && testimonial.quote && (
          <section className="py-12 px-8 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
              <blockquote className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-neutral-600 dark:text-neutral-400 font-medium">
                — {testimonial.author || 'Anonymous'}
                {testimonial.role && (
                  <span className="text-neutral-500 dark:text-neutral-500">
                    , {testimonial.role}
                  </span>
                )}
                {testimonial.company && (
                  <span className="text-neutral-500 dark:text-neutral-500">
                    {testimonial.role ? ' at ' : ', '}{testimonial.company}
                  </span>
                )}
              </cite>
            </div>
          </section>
        )}

        {/* Metrics & Credits */}
        {(metrics.length > 0 || credits.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metrics.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  {eventWork ? 'Event Results' : organizationWork ? 'Work Results' : 'Project Metrics'}
                </h2>
                <div className="space-y-3">
                  {metrics.map((metric: string, index: number) => (
                    <div key={`metric-${index}`} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0" />
                      <p className="text-neutral-700 dark:text-neutral-300">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {credits.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Credits & Acknowledgments</h2>
                <div className="space-y-3">
                  {credits.map((credit: string, index: number) => (
                    <div key={`credit-${index}`} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 flex-shrink-0" />
                      <p className="text-neutral-700 dark:text-neutral-300">{credit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {eventWork ? 'Event Tags' : organizationWork ? 'Work Tags' : 'Project Tags'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: string, index: number) => (
                <Link
                  key={`tag-${index}`}
                  href={`/projects?tag=${encodeURIComponent(tag)}`}
                  className="group px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-200 hover:scale-105"
                >
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* More from this work - Masonry */}
        {more.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {eventWork ? 'More Event Materials' : organizationWork ? 'More Work Samples' : 'More Visuals'}
            </h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {more.map((src: string, index: number) => (
                <figure
                  key={`more-${index}`}
                  className="group overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-300 break-inside-avoid mb-6"
                >
                  <div className="relative w-full">
                    <Image
                      src={src}
                      alt={`${title} — additional material ${index + 1}`}
                      width={1200}
                      height={900}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-6 border-t border-neutral-200 dark:border-neutral-800 pt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {eventWork ? 'Related Events' : organizationWork ? 'Related Work' : 'Related Projects'}
              </h2>
              <Link 
                href="/projects"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                {eventWork ? 'View all events →' : organizationWork ? 'View all work →' : 'View all projects →'}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project: any, index: number) => (
                <ProjectCard key={`related-${index}-${project.slug}`} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/projects"
            className="flex-1 group p-6 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800 transition-colors text-center"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {eventWork ? 'Browse All Events' : organizationWork ? 'Browse All Work' : 'Browse All Projects'}
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {eventWork 
                ? 'Discover more event work and creative projects' 
                : organizationWork 
                ? 'Discover more organization work and creative projects' 
                : 'Discover more case studies and creative work'
              }
            </p>
          </Link>
        </nav>
      </article>
    )

  } catch (error) {
    console.error('Error loading project:', error)
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Project Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            The project you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      </div>
    )
  }
}