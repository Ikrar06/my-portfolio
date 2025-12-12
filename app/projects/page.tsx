// app/projects/page.tsx - ENHANCED VERSION with Multiple Filters
import { getAllProjects } from '@/lib/projects'
import { getProjectFilterOptions } from '@/lib/projects-helpers'
import ProjectCard from '@/components/cards/project-card'
import FadeIn from '@/components/motion/fade-in'
import ProjectFilters from '@/components/filters/project-filters'
import SortDropdown from '@/components/ui/sort-dropdown'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Data Science, ML Engineering, and Full-Stack projects by Ikrar Gempur Tirani. From statistical analysis with 7,500-agent simulations to fine-tuning transformers with 90%+ accuracy. Real-world ML systems in production.',
  keywords: ['Data Science projects', 'Machine Learning portfolio', 'NLP projects', 'Deep Learning', 'Statistical Analysis', 'Production ML systems', 'PyTorch', 'Full-Stack development', 'AI products', 'Ikrar Gempur Tirani'],
  openGraph: {
    title: 'Projects — Ikrar Gempur Tirani',
    description: 'Data Science, ML Engineering, and Full-Stack projects. From agent-based simulations to production NLP systems with 90%+ accuracy.',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000') + '/projects',
    images: [{
      url: '/images/foto-ikrar.jpg',
      width: 1200,
      height: 630,
      alt: 'Data Science & ML Projects by Ikrar Gempur Tirani'
    }],
  },
  twitter: {
    title: 'Projects — Ikrar Gempur Tirani',
    description: 'Data Science, ML Engineering, and Full-Stack projects. Real-world ML systems in production.',
  },
}

// Per Next 15: searchParams adalah Promise di Server Components
type PageProps = { 
  searchParams: Promise<Record<string, string | string[] | undefined>> 
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const sp = await searchParams
  
  // Parse multiple filters - support both single and multiple values
  const parseFilters = (param: string | string[] | undefined): string[] => {
    if (!param) return []
    if (Array.isArray(param)) return param
    // Split by comma and filter out empty strings
    return param.split(',').filter(Boolean).map(s => s.trim())
  }

  // Get current sort option
  const sortParam = typeof sp?.sort === 'string' ? sp.sort : 'newest'

  // Note: parameter names are pluralized to be consistent with the filter component
  const tags = parseFilters(sp?.tags)
  const categories = parseFilters(sp?.categories) 
  const skills = parseFilters(sp?.skills)
  const yearsParam = parseFilters(sp?.years)
  const years = yearsParam.map(y => Number(y)).filter(y => !isNaN(y))

  // Backward compatibility - also check singular forms for existing bookmarks/links
  const legacyTag = typeof sp?.tag === 'string' ? [sp.tag] : []
  const legacyCategory = typeof sp?.category === 'string' ? [sp.category] : []
  const legacySkill = typeof sp?.skill === 'string' ? [sp.skill] : []
  const legacyYear = typeof sp?.year === 'string' ? [Number(sp.year)].filter(y => !isNaN(y)) : []

  // Combine new and legacy params
  const selectedTags = [...new Set([...tags, ...legacyTag])]
  const selectedCategories = [...new Set([...categories, ...legacyCategory])]
  const selectedSkills = [...new Set([...skills, ...legacySkill])]
  const selectedYears = [...new Set([...years, ...legacyYear])]

  // Get filter options
  const filterOptions = await getProjectFilterOptions()
  const { 
    categories: availableCategories, 
    skills: availableSkills, 
    tags: availableTags, 
    years: availableYears 
  } = filterOptions

  // Get all projects and filter them
  const allProjects = await getAllProjects({ featuredFirst: true })
  
  // Filter projects based on multiple criteria
  const projects = allProjects.filter((project: any) => {
    // Helper function untuk akses property yang fleksibel
    const getProperty = (prop: string, fallback: any = undefined) => {
      return project[prop] !== undefined ? project[prop] : project.meta?.[prop] ?? fallback
    }

    // Tags filter - project harus memiliki setidaknya satu tag yang dipilih
    if (selectedTags.length > 0) {
      const projectTags = getProperty('tags', [])
      const hasMatchingTag = selectedTags.some(tag => projectTags.includes(tag))
      if (!hasMatchingTag) return false
    }

    // Categories filter - project harus memiliki salah satu kategori yang dipilih
    if (selectedCategories.length > 0) {
      const projectCategory = getProperty('category')
      if (!selectedCategories.includes(projectCategory)) return false
    }

    // Skills filter - project harus memiliki setidaknya satu skill yang dipilih
    if (selectedSkills.length > 0) {
      const projectSkills = getProperty('skills', [])
      const hasMatchingSkill = selectedSkills.some(skill => projectSkills.includes(skill))
      if (!hasMatchingSkill) return false
    }

    // Years filter - project harus memiliki salah satu tahun yang dipilih
    if (selectedYears.length > 0) {
      const projectYear = getProperty('year')
      if (!selectedYears.includes(projectYear)) return false
    }

    return true
  })

  // Sort projects based on selected option
  const sortedProjects = [...projects].sort((a, b) => {
    const getProperty = (project: any, prop: string, fallback: any = undefined) => {
      return project[prop] !== undefined ? project[prop] : project.meta?.[prop] ?? fallback
    }

    switch (sortParam) {
      case 'oldest':
        const yearA = getProperty(a, 'year', 0)
        const yearB = getProperty(b, 'year', 0)
        const monthA = getProperty(a, 'month', 12)
        const monthB = getProperty(b, 'month', 12)
        if (yearA !== yearB) return yearA - yearB
        return monthA - monthB

      case 'title':
        const titleA = getProperty(a, 'title', '').toLowerCase()
        const titleB = getProperty(b, 'title', '').toLowerCase()
        return titleA.localeCompare(titleB)

      case 'featured':
        const featuredA = getProperty(a, 'featured', false) || getProperty(a, 'tags', []).includes('featured')
        const featuredB = getProperty(b, 'featured', false) || getProperty(b, 'tags', []).includes('featured')
        if (featuredA && !featuredB) return -1
        if (!featuredA && featuredB) return 1
        // If both are featured or both are not, sort by year and month (newest first)
        const yearFeatA = getProperty(a, 'year', 0)
        const yearFeatB = getProperty(b, 'year', 0)
        const monthFeatA = getProperty(a, 'month', 12)
        const monthFeatB = getProperty(b, 'month', 12)
        if (yearFeatB !== yearFeatA) return yearFeatB - yearFeatA
        return monthFeatB - monthFeatA

      case 'newest':
      default:
        const yearADesc = getProperty(a, 'year', 0)
        const yearBDesc = getProperty(b, 'year', 0)
        const monthADesc = getProperty(a, 'month', 12)
        const monthBDesc = getProperty(b, 'month', 12)
        if (yearBDesc !== yearADesc) return yearBDesc - yearADesc
        return monthBDesc - monthADesc
    }
  })

  const hasActiveFilters = selectedTags.length > 0 || selectedCategories.length > 0 || selectedSkills.length > 0 || selectedYears.length > 0

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A collection of design projects spanning UI/UX design, graphic design, branding, 
            web development, and creative explorations.
          </p>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-3 p-5 bg-bg-secondary rounded-3xl border border-border backdrop-blur-sm">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              Active filters:
            </span>

            {/* Display selected tags */}
            {selectedTags.map(tag => (
              <span key={`tag-${tag}`} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 max-w-xs">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0"></span>
                <span className="truncate">#{tag}</span>
              </span>
            ))}

            {/* Display selected categories */}
            {selectedCategories.map(category => (
              <span key={`cat-${category}`} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 max-w-xs">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0"></span>
                <span className="truncate">{category}</span>
              </span>
            ))}

            {/* Display selected skills */}
            {selectedSkills.map(skill => (
              <span key={`skill-${skill}`} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 max-w-xs">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0"></span>
                <span className="truncate">{skill}</span>
              </span>
            ))}

            {/* Display selected years */}
            {selectedYears.map(year => (
              <span key={`year-${year}`} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 max-w-xs">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0"></span>
                <span className="truncate">{year}</span>
              </span>
            ))}

            {/* Clear all filters button */}
            <a
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-framer-blue hover:bg-framer-blue-hover rounded-2xl border border-framer-blue hover:border-framer-blue-hover transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear all
            </a>
          </div>
        )}
      </header>

      {/* Interactive Filter Section - Client Component */}
      <ProjectFilters
        allCategories={availableCategories}
        allSkills={availableSkills}
        allTags={availableTags}
        allYears={availableYears}
        selectedTags={selectedTags}
        selectedCategories={selectedCategories}
        selectedSkills={selectedSkills}
        selectedYears={selectedYears}
      />

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-semibold">
            {hasActiveFilters ? 'Filtered Projects' : 'All Projects'}
            <span className="ml-2 text-sm font-normal text-neutral-500">
              ({sortedProjects.length} project{sortedProjects.length !== 1 ? 's' : ''})
            </span>
          </h2>

          {/* Sort Options */}
          <SortDropdown />
        </div>

        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProjects.map((project: any, index: number) => (
              <FadeIn 
                key={project.slug} 
                delay={0.04 + index * 0.03} 
                once 
                margin="-10% 0px -10% 0px"
              >
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              No projects match your filters
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              Try adjusting your filter selection or browse all projects to discover more work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-framer-blue text-white rounded-2xl hover:bg-framer-blue-hover transition-colors font-medium shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                View All Projects
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary rounded-2xl hover:bg-bg-secondary hover:text-text-primary hover:border-border-hover transition-colors font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Back Home
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}