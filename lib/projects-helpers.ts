// lib/projects-helpers.ts
// Enhanced helper functions with organization work, competition, event support, and socialMediaSections

import { getAllProjects, type SocialMediaSection } from '@/lib/mdx'

// Enhanced type definition to match your project structure
export interface ExtendedProjectMeta {
  title: string
  role?: string
  tools?: string[]
  skills?: string[]
  year?: number
  duration?: string
  team?: string
  client?: string
  organization?: string
  organizationType?: string
  organizationWork?: boolean
  competitionWork?: boolean
  competitionName?: string
  competitionCategory?: string
  // ← ADD EVENT FIELDS
  eventWork?: boolean
  eventName?: string
  eventType?: string
  eventRole?: string
  eventDuration?: string
  eventLocation?: string
  category?: string
  tags?: string[]
  cover?: string
  summary: string
  final?: string[]
  applications?: string[]
  explorations?: string[]
  socialPosts?: string[]
  socialMediaSections?: SocialMediaSection[]
  campaigns?: string[]
  brandMaterials?: string[]
  // ← ADD EVENT-SPECIFIC ARRAYS
  eventMaterials?: string[]
  eventDocumentation?: string[]
  eventPromotion?: string[]
  metrics?: string[]
  credits?: string[]
  challenges?: string
  solutions?: string
  impact?: string
  testimonial?: {
    quote: string
    author: string
    role?: string
    company?: string
  }
  liveUrl?: string
  githubUrl?: string
  behanceUrl?: string
  dribbbleUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  [key: string]: any
}

// Type yang fleksibel untuk project dari library
export interface FlexibleProject {
  slug: string
  meta?: ExtendedProjectMeta | any
  tags?: string[]
  year?: number
  organizationWork?: boolean
  competitionWork?: boolean
  eventWork?: boolean // ← ADD THIS
  [key: string]: any
}

/**
 * Helper function untuk mengakses property dengan aman
 */
function getProjectProperty(project: any, property: string, fallback: any = undefined): any {
  // Cek di level utama project
  if (project[property] !== undefined) {
    return project[property]
  }
  // Cek di dalam meta
  if (project.meta && project.meta[property] !== undefined) {
    return project.meta[property]
  }
  return fallback
}

/**
 * Helper function untuk mengakses array properties dengan aman
 */
function getProjectArrayProperty(project: any, property: string): any[] {
  const value = getProjectProperty(project, property, [])
  return Array.isArray(value) ? value : []
}

/**
 * Helper function untuk mengakses socialMediaSections dengan aman
 */
function getProjectSocialMediaSections(project: any): SocialMediaSection[] {
  const sections = getProjectProperty(project, 'socialMediaSections', [])
  if (!Array.isArray(sections)) return []
  
  return sections.map((section: any) => ({
    title: typeof section.title === 'string' ? section.title : '',
    description: typeof section.description === 'string' ? section.description : '',
    images: Array.isArray(section.images) ? section.images : [],
    captions: Array.isArray(section.captions) ? section.captions : []
  }))
}

/**
 * Check if a project is organization work
 */
function isOrganizationWork(project: any): boolean {
  return getProjectProperty(project, 'organizationWork', false)
}

/**
 * Check if a project is competition work
 */
function isCompetitionWork(project: any): boolean {
  return getProjectProperty(project, 'competitionWork', false)
}

/**
 * Check if a project is event work ← ADD THIS
 */
function isEventWork(project: any): boolean {
  return getProjectProperty(project, 'eventWork', false)
}

/**
 * Get related projects based on category, tags, and work type
 */
export async function getRelatedProjects(
  currentSlug: string, 
  options: { 
    category?: string
    tags?: string[]
    organizationWork?: boolean
    competitionWork?: boolean
    eventWork?: boolean // ← ADD THIS
    competitionName?: string
    eventName?: string // ← ADD THIS
    eventType?: string // ← ADD THIS
    organizationType?: string
    limit?: number 
  } = {}
): Promise<any[]> {
  const { 
    category, 
    tags = [], 
    organizationWork = false, 
    competitionWork = false,
    eventWork = false, // ← ADD THIS
    competitionName,
    eventName, // ← ADD THIS
    eventType, // ← ADD THIS
    organizationType, 
    limit = 3 
  } = options

  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    
    const otherProjects = allProjects.filter((p: any) => p.slug !== currentSlug)
    
    const scoredProjects = otherProjects.map((project: any) => {
      let score = 0
      
      // Same work type gets high priority
      const projectIsOrgWork = isOrganizationWork(project)
      const projectIsCompWork = isCompetitionWork(project)
      const projectIsEventWork = isEventWork(project) // ← ADD THIS
      
      if (eventWork && projectIsEventWork) {
        score += 15 // Event work match ← ADD THIS
      } else if (competitionWork && projectIsCompWork) {
        score += 15 // Competition work match
      } else if (organizationWork && projectIsOrgWork) {
        score += 15 // Organization work match
      } else if (!eventWork && !competitionWork && !organizationWork && !projectIsOrgWork && !projectIsCompWork && !projectIsEventWork) {
        score += 15 // Regular project match
      }
      
      // Same category gets high score
      const projectCategory = getProjectProperty(project, 'category')
      if (category && projectCategory === category) {
        score += 10
      }
      
      // Shared tags get points
      const projectTags = getProjectArrayProperty(project, 'tags')
      const sharedTags = tags.filter((tag: string) => projectTags.includes(tag))
      score += sharedTags.length * 3
      
      // Same competition name (for competition work)
      if (competitionWork && projectIsCompWork && competitionName) {
        const projectCompName = getProjectProperty(project, 'competitionName')
        if (projectCompName === competitionName) {
          score += 8
        }
      }
      
      // Same event name (for event work) ← ADD THIS
      if (eventWork && projectIsEventWork && eventName) {
        const projectEventName = getProjectProperty(project, 'eventName')
        if (projectEventName === eventName) {
          score += 8
        }
      }
      
      // Same event type (for event work) ← ADD THIS
      if (eventWork && projectIsEventWork && eventType) {
        const projectEventType = getProjectProperty(project, 'eventType')
        if (projectEventType === eventType) {
          score += 5
        }
      }
      
      // Same organization type (for organization work)
      if (organizationWork && projectIsOrgWork && organizationType) {
        const projectOrgType = getProjectProperty(project, 'organizationType')
        if (projectOrgType === organizationType) {
          score += 5
        }
      }
      
      // Same year gets small bonus
      const projectYear = getProjectProperty(project, 'year')
      const currentYear = new Date().getFullYear()
      if (projectYear) {
        const yearDiff = Math.abs(currentYear - projectYear)
        if (yearDiff <= 1) {
          score += 2
        }
      }
      
      return { project, score }
    })
    
    return scoredProjects
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.project)
      
  } catch (error) {
    console.warn('Error getting related projects:', error)
    return []
  }
}

/**
 * Enhanced getAllProjects dengan filtering yang mendukung organization work, competition, dan event
 */
export async function getFilteredProjects(filters: {
  tag?: string
  category?: string
  skill?: string
  year?: number
  organizationWork?: boolean | 'all'
  competitionWork?: boolean | 'all'
  eventWork?: boolean | 'all' // ← ADD THIS
  organizationType?: string
  competitionName?: string
  competitionCategory?: string
  eventName?: string // ← ADD THIS
  eventType?: string // ← ADD THIS
  eventLocation?: string // ← ADD THIS
  client?: string
  organization?: string
  featuredFirst?: boolean
} = {}): Promise<any[]> {
  const { 
    tag, 
    category, 
    skill, 
    year, 
    organizationWork = 'all',
    competitionWork = 'all',
    eventWork = 'all', // ← ADD THIS
    organizationType,
    competitionName,
    competitionCategory,
    eventName, // ← ADD THIS
    eventType, // ← ADD THIS
    eventLocation, // ← ADD THIS
    client,
    organization,
    featuredFirst = false 
  } = filters
  
  try {
    const allProjects = await getAllProjects({ featuredFirst })
    
    return allProjects.filter((project: any) => {
      // Filter by organization work type
      if (organizationWork !== 'all') {
        const projectIsOrgWork = isOrganizationWork(project)
        if (projectIsOrgWork !== organizationWork) {
          return false
        }
      }
      
      // Filter by competition work type
      if (competitionWork !== 'all') {
        const projectIsCompWork = isCompetitionWork(project)
        if (projectIsCompWork !== competitionWork) {
          return false
        }
      }
      
      // Filter by event work type ← ADD THIS
      if (eventWork !== 'all') {
        const projectIsEventWork = isEventWork(project)
        if (projectIsEventWork !== eventWork) {
          return false
        }
      }
      
      // Filter by event name ← ADD THIS
      if (eventName) {
        const projectEventName = getProjectProperty(project, 'eventName', '')
        if (!projectEventName.toLowerCase().includes(eventName.toLowerCase())) {
          return false
        }
      }
      
      // Filter by event type ← ADD THIS
      if (eventType) {
        const projectEventType = getProjectProperty(project, 'eventType')
        if (projectEventType !== eventType) {
          return false
        }
      }
      
      // Filter by event location ← ADD THIS
      if (eventLocation) {
        const projectEventLocation = getProjectProperty(project, 'eventLocation', '')
        if (!projectEventLocation.toLowerCase().includes(eventLocation.toLowerCase())) {
          return false
        }
      }
      
      // Filter by competition name
      if (competitionName) {
        const projectCompName = getProjectProperty(project, 'competitionName', '')
        if (!projectCompName.toLowerCase().includes(competitionName.toLowerCase())) {
          return false
        }
      }
      
      // Filter by competition category
      if (competitionCategory) {
        const projectCompCategory = getProjectProperty(project, 'competitionCategory')
        if (projectCompCategory !== competitionCategory) {
          return false
        }
      }
      
      // Filter by tag
      if (tag) {
        const projectTags = getProjectArrayProperty(project, 'tags')
        if (!projectTags.includes(tag)) {
          return false
        }
      }
      
      // Filter by category
      if (category) {
        const projectCategory = getProjectProperty(project, 'category')
        if (projectCategory !== category) {
          return false
        }
      }
      
      // Filter by skill
      if (skill) {
        const projectSkills = getProjectArrayProperty(project, 'skills')
        if (!projectSkills.includes(skill)) {
          return false
        }
      }
      
      // Filter by year
      if (year) {
        const projectYear = getProjectProperty(project, 'year')
        if (projectYear !== year) {
          return false
        }
      }
      
      // Filter by organization type (for organization work)
      if (organizationType) {
        const projectOrgType = getProjectProperty(project, 'organizationType')
        if (projectOrgType !== organizationType) {
          return false
        }
      }
      
      // Filter by client
      if (client) {
        const projectClient = getProjectProperty(project, 'client', '')
        if (!projectClient.toLowerCase().includes(client.toLowerCase())) {
          return false
        }
      }
      
      // Filter by organization
      if (organization) {
        const projectOrg = getProjectProperty(project, 'organization', '')
        if (!projectOrg.toLowerCase().includes(organization.toLowerCase())) {
          return false
        }
      }
      
      return true
    })
    
  } catch (error) {
    console.warn('Error filtering projects:', error)
    return []
  }
}

/**
 * Get unique filter values from all projects with organization, competition, and event support
 */
export async function getProjectFilterOptions(): Promise<{
  categories: string[]
  skills: string[]
  tags: string[]
  years: number[]
  organizationTypes: string[]
  competitionNames: string[]
  competitionCategories: string[]
  eventNames: string[] // ← ADD THIS
  eventTypes: string[] // ← ADD THIS
  eventLocations: string[] // ← ADD THIS
  clients: string[]
  organizations: string[]
  workTypes: Array<{ label: string; value: boolean | 'all' | 'competition' | 'event' }> // ← UPDATE THIS
}> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    
    const categories = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'category'))
        .filter(Boolean)
    )] as string[]
    
    const skills = [...new Set(
      allProjects
        .flatMap((p: any) => getProjectArrayProperty(p, 'skills'))
    )] as string[]
    
    const tags = [...new Set(
      allProjects
        .flatMap((p: any) => getProjectArrayProperty(p, 'tags'))
    )] as string[]
    
    const years = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'year'))
        .filter(Boolean)
    )] as number[]
    
    const organizationTypes = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'organizationType'))
        .filter(Boolean)
    )] as string[]
    
    const clients = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'client'))
        .filter(Boolean)
    )] as string[]
    
    const organizations = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'organization'))
        .filter(Boolean)
    )] as string[]

    const competitionNames = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'competitionName'))
        .filter(Boolean)
    )] as string[]
    
    const competitionCategories = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'competitionCategory'))
        .filter(Boolean)
    )] as string[]
    
    // ← ADD EVENT-SPECIFIC FILTERS
    const eventNames = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'eventName'))
        .filter(Boolean)
    )] as string[]
    
    const eventTypes = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'eventType'))
        .filter(Boolean)
    )] as string[]
    
    const eventLocations = [...new Set(
      allProjects
        .map((p: any) => getProjectProperty(p, 'eventLocation'))
        .filter(Boolean)
    )] as string[]
    
    const workTypes = [
      { label: 'All Work', value: 'all' as const },
      { label: 'Projects', value: false },
      { label: 'Organization Work', value: true },
      { label: 'Competition Work', value: 'competition' as const },
      { label: 'Event Work', value: 'event' as const } // ← ADD THIS
    ]
    
    return {
      categories: categories.sort(),
      skills: skills.sort(),
      tags: tags.sort(),
      years: years.sort((a, b) => b - a),
      organizationTypes: organizationTypes.sort(),
      competitionNames: competitionNames.sort(),
      competitionCategories: competitionCategories.sort(),
      eventNames: eventNames.sort(), // ← ADD THIS
      eventTypes: eventTypes.sort(), // ← ADD THIS
      eventLocations: eventLocations.sort(), // ← ADD THIS
      clients: clients.sort(),
      organizations: organizations.sort(),
      workTypes
    }
    
  } catch (error) {
    console.warn('Error getting filter options:', error)
    return {
      categories: [],
      skills: [],
      tags: [],
      years: [],
      organizationTypes: [],
      competitionNames: [],
      competitionCategories: [],
      eventNames: [], // ← ADD THIS
      eventTypes: [], // ← ADD THIS
      eventLocations: [], // ← ADD THIS
      clients: [],
      organizations: [],
      workTypes: [
        { label: 'All Work', value: 'all' as const },
        { label: 'Projects', value: false },
        { label: 'Organization Work', value: true },
        { label: 'Competition Work', value: 'competition' as const },
        { label: 'Event Work', value: 'event' as const } // ← ADD THIS
      ]
    }
  }
}

/**
 * Get projects separated by type
 */
export async function getProjectsByType(): Promise<{
  projects: any[]
  organizationWork: any[]
  competitionWork: any[]
  eventWork: any[] // ← ADD THIS
  all: any[]
}> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    
    const projects = allProjects.filter((p: any) => !isOrganizationWork(p) && !isCompetitionWork(p) && !isEventWork(p))
    const organizationWork = allProjects.filter((p: any) => isOrganizationWork(p))
    const competitionWork = allProjects.filter((p: any) => isCompetitionWork(p))
    const eventWork = allProjects.filter((p: any) => isEventWork(p)) // ← ADD THIS
    
    return {
      projects,
      organizationWork,
      competitionWork,
      eventWork, // ← ADD THIS
      all: allProjects
    }
    
  } catch (error) {
    console.warn('Error getting projects by type:', error)
    return {
      projects: [],
      organizationWork: [],
      competitionWork: [],
      eventWork: [], // ← ADD THIS
      all: []
    }
  }
}

/**
 * Get project statistics with competition and event support
 */
export async function getProjectStats(): Promise<{
  total: number
  projects: number
  organizationWork: number
  competitionWork: number
  eventWork: number // ← ADD THIS
  categories: number
  skills: number
  years: number[]
  socialMediaSections: number
}> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    const filterOptions = await getProjectFilterOptions()
    
    const projects = allProjects.filter((p: any) => !isOrganizationWork(p) && !isCompetitionWork(p) && !isEventWork(p))
    const organizationWork = allProjects.filter((p: any) => isOrganizationWork(p))
    const competitionWork = allProjects.filter((p: any) => isCompetitionWork(p))
    const eventWork = allProjects.filter((p: any) => isEventWork(p)) // ← ADD THIS
    
    // Count total social media sections across all projects
    const totalSocialMediaSections = allProjects.reduce((count: number, project: any) => {
      const sections = getProjectSocialMediaSections(project)
      return count + sections.length
    }, 0)
    
    return {
      total: allProjects.length,
      projects: projects.length,
      organizationWork: organizationWork.length,
      competitionWork: competitionWork.length,
      eventWork: eventWork.length, // ← ADD THIS
      categories: filterOptions.categories.length,
      skills: filterOptions.skills.length,
      years: filterOptions.years,
      socialMediaSections: totalSocialMediaSections
    }
    
  } catch (error) {
    console.warn('Error getting project stats:', error)
    return {
      total: 0,
      projects: 0,
      organizationWork: 0,
      competitionWork: 0,
      eventWork: 0, // ← ADD THIS
      categories: 0,
      skills: 0,
      years: [],
      socialMediaSections: 0
    }
  }
}

/**
 * Search projects by term with competition, event support and socialMediaSections
 */
export async function searchProjects(
  searchTerm: string, 
  options: { 
    organizationWork?: boolean | 'all'
    competitionWork?: boolean | 'all'
    eventWork?: boolean | 'all' // ← ADD THIS
    limit?: number 
  } = {}
): Promise<any[]> {
  const { 
    organizationWork = 'all', 
    competitionWork = 'all', 
    eventWork = 'all', // ← ADD THIS
    limit = 10 
  } = options
  
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    const term = searchTerm.toLowerCase().trim()
    
    if (!term) return []
    
    const searchResults = allProjects
      .filter((project: any) => {
        // Filter by organization work type first
        if (organizationWork !== 'all') {
          const projectIsOrgWork = isOrganizationWork(project)
          if (projectIsOrgWork !== organizationWork) {
            return false
          }
        }
        
        // Filter by competition work type
        if (competitionWork !== 'all') {
          const projectIsCompWork = isCompetitionWork(project)
          if (projectIsCompWork !== competitionWork) {
            return false
          }
        }
        
        // Filter by event work type ← ADD THIS
        if (eventWork !== 'all') {
          const projectIsEventWork = isEventWork(project)
          if (projectIsEventWork !== eventWork) {
            return false
          }
        }
        
        // Search in various fields including social media sections and event fields
        const socialMediaSections = getProjectSocialMediaSections(project)
        const socialMediaText = socialMediaSections.flatMap(section => [
          section.title || '',
          section.description || '',
          ...(section.captions || [])
        ])
        
        const searchFields = [
          getProjectProperty(project, 'title', ''),
          getProjectProperty(project, 'summary', ''),
          getProjectProperty(project, 'category', ''),
          getProjectProperty(project, 'client', ''),
          getProjectProperty(project, 'organization', ''),
          getProjectProperty(project, 'competitionName', ''),
          getProjectProperty(project, 'competitionCategory', ''),
          getProjectProperty(project, 'eventName', ''), // ← ADD THIS
          getProjectProperty(project, 'eventType', ''), // ← ADD THIS
          getProjectProperty(project, 'eventLocation', ''), // ← ADD THIS
          ...getProjectArrayProperty(project, 'tags'),
          ...getProjectArrayProperty(project, 'skills'),
          ...getProjectArrayProperty(project, 'tools'),
          ...socialMediaText
        ].map(field => String(field).toLowerCase())
        
        return searchFields.some(field => field.includes(term))
      })
      .slice(0, limit)
    
    return searchResults
    
  } catch (error) {
    console.warn('Error searching projects:', error)
    return []
  }
}

/**
 * Get competition-specific projects
 */
export async function getCompetitionProjects(): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => isCompetitionWork(p))
  } catch (error) {
    console.warn('Error getting competition projects:', error)
    return []
  }
}

/**
 * Get projects by specific competition name
 */
export async function getProjectsByCompetition(competitionName: string): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => 
      isCompetitionWork(p) && 
      getProjectProperty(p, 'competitionName', '').toLowerCase().includes(competitionName.toLowerCase())
    )
  } catch (error) {
    console.warn('Error getting projects by competition:', error)
    return []
  }
}

/**
 * Get projects by competition category
 */
export async function getProjectsByCompetitionCategory(competitionCategory: string): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => 
      isCompetitionWork(p) && 
      getProjectProperty(p, 'competitionCategory', '').toLowerCase() === competitionCategory.toLowerCase()
    )
  } catch (error) {
    console.warn('Error getting projects by competition category:', error)
    return []
  }
}

// ← ADD EVENT-SPECIFIC FUNCTIONS
/**
 * Get event-specific projects
 */
export async function getEventProjects(): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => isEventWork(p))
  } catch (error) {
    console.warn('Error getting event projects:', error)
    return []
  }
}

/**
 * Get projects by specific event name
 */
export async function getProjectsByEvent(eventName: string): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => 
      isEventWork(p) && 
      getProjectProperty(p, 'eventName', '').toLowerCase().includes(eventName.toLowerCase())
    )
  } catch (error) {
    console.warn('Error getting projects by event:', error)
    return []
  }
}

/**
 * Get projects by event type
 */
export async function getProjectsByEventType(eventType: string): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => 
      isEventWork(p) && 
      getProjectProperty(p, 'eventType', '').toLowerCase() === eventType.toLowerCase()
    )
  } catch (error) {
    console.warn('Error getting projects by event type:', error)
    return []
  }
}

/**
 * Get projects by event location
 */
export async function getProjectsByEventLocation(eventLocation: string): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => 
      isEventWork(p) && 
      getProjectProperty(p, 'eventLocation', '').toLowerCase().includes(eventLocation.toLowerCase())
    )
  } catch (error) {
    console.warn('Error getting projects by event location:', error)
    return []
  }
}

/**
 * Get projects that have social media sections
 */
export async function getProjectsWithSocialMedia(): Promise<any[]> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    return allProjects.filter((p: any) => {
      const sections = getProjectSocialMediaSections(p)
      return sections.length > 0
    })
  } catch (error) {
    console.warn('Error getting projects with social media:', error)
    return []
  }
}

/**
 * Get all social media content from projects (for analytics/search)
 */
export async function getAllSocialMediaContent(): Promise<{
  totalSections: number
  totalImages: number
  totalCaptions: number
  sectionsByProject: { [slug: string]: SocialMediaSection[] }
}> {
  try {
    const allProjects = await getAllProjects({ featuredFirst: false })
    
    let totalSections = 0
    let totalImages = 0
    let totalCaptions = 0
    const sectionsByProject: { [slug: string]: SocialMediaSection[] } = {}
    
    allProjects.forEach((project: any) => {
      const sections = getProjectSocialMediaSections(project)
      if (sections.length > 0) {
        sectionsByProject[project.slug] = sections
        totalSections += sections.length
        
        sections.forEach(section => {
          totalImages += section.images?.length || 0
          totalCaptions += section.captions?.length || 0
        })
      }
    })
    
    return {
      totalSections,
      totalImages,
      totalCaptions,
      sectionsByProject
    }
    
  } catch (error) {
    console.warn('Error getting social media content:', error)
    return {
      totalSections: 0,
      totalImages: 0,
      totalCaptions: 0,
      sectionsByProject: {}
    }
  }
}