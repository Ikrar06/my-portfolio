// lib/mdx.ts
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

/** ====== TYPES ====== */
// Define the type for social media sections
export type SocialMediaSection = {
  title?: string
  description?: string
  images?: string[]
  captions?: string[]
}

export type ProjectFrontmatter = {
  title: string
  slug?: string
  year: number
  role?: string
  tools?: string[]
  skills?: string[]
  tags?: string[]
  category?: string
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
  summary: string
  cover?: string
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
  featured?: boolean
}

export type ShotFrontmatter = {
  title: string
  year: number
  tags: string[]
  images: string[]
  caption?: string
}

// Extended type that guarantees non-undefined values for processed projects
export type ProjectMeta = {
  title: string
  slug: string
  file: string
  year: number
  role: string
  tools: string[]
  skills: string[]
  tags: string[]
  category: string
  duration: string
  team: string
  client: string
  organization: string
  organizationType: string
  organizationWork: boolean
  competitionWork: boolean
  competitionName: string
  competitionCategory: string
  // ← ADD EVENT FIELDS
  eventWork: boolean
  eventName: string
  eventType: string
  eventRole: string
  eventDuration: string
  eventLocation: string
  summary: string
  cover: string
  final: string[]
  applications: string[]
  explorations: string[]
  socialPosts: string[]
  socialMediaSections: SocialMediaSection[]
  campaigns: string[]
  brandMaterials: string[]
  // ← ADD EVENT-SPECIFIC ARRAYS
  eventMaterials: string[]
  eventDocumentation: string[]
  eventPromotion: string[]
  metrics: string[]
  credits: string[]
  challenges: string
  solutions: string
  impact: string
  testimonial?: {
    quote: string
    author: string
    role?: string
    company?: string
  }
  liveUrl: string
  githubUrl: string
  behanceUrl: string
  dribbbleUrl: string
  instagramUrl: string
  linkedinUrl: string
  featured: boolean
}

export type ShotMeta = ShotFrontmatter & { file: string }

type Compiled<T> = {
  meta: T
  content: React.ReactElement
}

/** ====== PATHS ====== */
const ROOT = process.cwd()
const PROJECTS_DIR = path.join(ROOT, 'content', 'projects')
const SHOTS_DIR = path.join(ROOT, 'content', 'shots')

/** Utils */
async function listMdx(dir: string) {
  try {
    const files = await fs.readdir(dir)
    return files.filter((f) => f.toLowerCase().endsWith('.mdx'))
  } catch (error) {
    console.warn(`Directory ${dir} tidak ditemukan:`, error)
    return []
  }
}

async function read(filePath: string) {
  return fs.readFile(filePath, 'utf8')
}

/** Helper function to safely access array properties */
function ensureArray<T>(value: T[] | undefined): T[] {
  return Array.isArray(value) ? value : []
}

/** Helper function to safely access string properties */
function ensureString(value: string | undefined): string {
  return typeof value === 'string' ? value : ''
}

/** Helper function to safely access socialMediaSections */
function ensureSocialMediaSections(value: SocialMediaSection[] | undefined): SocialMediaSection[] {
  if (!Array.isArray(value)) return []
  
  return value.map(section => ({
    title: ensureString(section.title),
    description: ensureString(section.description),
    images: ensureArray(section.images),
    captions: ensureArray(section.captions)
  }))
}

/** ====== PROJECTS (LIST / META) ====== */
export async function getAllProjects(options: { featuredFirst?: boolean } = {}): Promise<ProjectMeta[]> {
  const { featuredFirst = false } = options
  const files = await listMdx(PROJECTS_DIR)
  const items: ProjectMeta[] = []

  for (const file of files) {
    try {
      const full = path.join(PROJECTS_DIR, file)
      const raw = await read(full)
      const { data } = matter(raw)
      const fm = data as Partial<ProjectFrontmatter>

      if (!fm?.title || !fm?.summary) {
        console.warn(`Project ${file} tidak memiliki title atau summary, dilewati`)
        continue
      }

      const slug = ensureString(fm.slug) || file.replace(/\.mdx$/i, '')

      const projectMeta: ProjectMeta = {
        title: fm.title,
        slug,
        file,
        year: fm.year || new Date().getFullYear(),
        role: ensureString(fm.role),
        tools: ensureArray(fm.tools),
        skills: ensureArray(fm.skills),
        tags: ensureArray(fm.tags),
        category: ensureString(fm.category) || 'Uncategorized',
        duration: ensureString(fm.duration),
        team: ensureString(fm.team),
        client: ensureString(fm.client),
        organization: ensureString(fm.organization),
        organizationType: ensureString(fm.organizationType),
        organizationWork: fm.organizationWork || false,
        competitionWork: fm.competitionWork || false,
        competitionName: ensureString(fm.competitionName),
        competitionCategory: ensureString(fm.competitionCategory),
        // ← ADD EVENT FIELDS
        eventWork: fm.eventWork || false,
        eventName: ensureString(fm.eventName),
        eventType: ensureString(fm.eventType),
        eventRole: ensureString(fm.eventRole),
        eventDuration: ensureString(fm.eventDuration),
        eventLocation: ensureString(fm.eventLocation),
        summary: fm.summary,
        cover: ensureString(fm.cover),
        final: ensureArray(fm.final),
        applications: ensureArray(fm.applications),
        explorations: ensureArray(fm.explorations),
        socialPosts: ensureArray(fm.socialPosts),
        socialMediaSections: ensureSocialMediaSections(fm.socialMediaSections),
        campaigns: ensureArray(fm.campaigns),
        brandMaterials: ensureArray(fm.brandMaterials),
        // ← ADD EVENT-SPECIFIC ARRAYS
        eventMaterials: ensureArray(fm.eventMaterials),
        eventDocumentation: ensureArray(fm.eventDocumentation),
        eventPromotion: ensureArray(fm.eventPromotion),
        metrics: ensureArray(fm.metrics),
        credits: ensureArray(fm.credits),
        challenges: ensureString(fm.challenges),
        solutions: ensureString(fm.solutions),
        impact: ensureString(fm.impact),
        testimonial: fm.testimonial,
        liveUrl: ensureString(fm.liveUrl),
        githubUrl: ensureString(fm.githubUrl),
        behanceUrl: ensureString(fm.behanceUrl),
        dribbbleUrl: ensureString(fm.dribbbleUrl),
        instagramUrl: ensureString(fm.instagramUrl),
        linkedinUrl: ensureString(fm.linkedinUrl),
        featured: fm.featured || false
      }

      items.push(projectMeta)
    } catch (error) {
      console.error(`Error processing project file ${file}:`, error)
      continue
    }
  }

  if (featuredFirst) {
    items.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return b.year - a.year
    })
  } else {
    items.sort((a, b) => b.year - a.year)
  }

  return items
}

export async function getProjectSlugs(): Promise<string[]> {
  const items = await getAllProjects()
  return items.map((p) => p.slug)
}

/** ====== PROJECT FILTERING HELPERS ====== */
export async function getProjectsByType(): Promise<{
  projects: ProjectMeta[]
  organizationWork: ProjectMeta[]
  competitionWork: ProjectMeta[]
  eventWork: ProjectMeta[] // ← ADD THIS
  all: ProjectMeta[]
}> {
  const allProjects = await getAllProjects()
  
  const projects = allProjects.filter(p => !p.organizationWork && !p.competitionWork && !p.eventWork)
  const organizationWork = allProjects.filter(p => p.organizationWork)
  const competitionWork = allProjects.filter(p => p.competitionWork)
  const eventWork = allProjects.filter(p => p.eventWork) // ← ADD THIS
  
  return {
    projects,
    organizationWork,
    competitionWork,
    eventWork, // ← ADD THIS
    all: allProjects
  }
}

// ← ADD EVENT-SPECIFIC FUNCTIONS
export async function getEventProjects(): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => p.eventWork)
}

export async function getProjectsByEvent(eventName: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => 
    p.eventWork && 
    p.eventName.toLowerCase().includes(eventName.toLowerCase())
  )
}

export async function getProjectsByEventType(eventType: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => 
    p.eventWork && 
    p.eventType.toLowerCase() === eventType.toLowerCase()
  )
}

export async function getCompetitionProjects(): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => p.competitionWork)
}

export async function getProjectsByCompetition(competitionName: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => 
    p.competitionWork && 
    p.competitionName.toLowerCase().includes(competitionName.toLowerCase())
  )
}

export async function getProjectsByCompetitionCategory(competitionCategory: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => 
    p.competitionWork && 
    p.competitionCategory.toLowerCase() === competitionCategory.toLowerCase()
  )
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => p.featured)
}

export async function getProjectsByCategory(category: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => p.category === category)
}

export async function getProjectsByTag(tag: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => p.tags.includes(tag))
}

export async function getProjectsByYear(year: number): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => p.year === year)
}

export async function getProjectsByOrganization(organization: string): Promise<ProjectMeta[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(p => 
    p.organizationWork && 
    p.organization.toLowerCase().includes(organization.toLowerCase())
  )
}

/** ====== PROJECT DETAIL (COMPILE MDX) ====== */
export async function getProjectBySlug(
  slug: string
): Promise<Compiled<ProjectMeta>> {
  const guess = path.join(PROJECTS_DIR, `${slug}.mdx`)
  let full = guess

  try {
    await fs.access(guess)
  } catch {
    // Jika file tidak bernama "slug.mdx", cari berdasarkan frontmatter.slug
    const files = await listMdx(PROJECTS_DIR)
    let found = false
    
    for (const f of files) {
      const raw = await read(path.join(PROJECTS_DIR, f))
      const { data } = matter(raw)
      if ((data as any)?.slug === slug) {
        full = path.join(PROJECTS_DIR, f)
        found = true
        break
      }
    }
    
    if (!found) {
      throw new Error(`Project dengan slug "${slug}" tidak ditemukan`)
    }
  }

  const source = await read(full)

  // compileMDX: parseFrontmatter=true agar frontmatter diambil langsung
  const { frontmatter, content } = await compileMDX<ProjectFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })

  // Merge dengan default values dengan type safety
  const meta: ProjectMeta = {
    title: frontmatter.title || 'Untitled Project',
    slug,
    file: path.basename(full),
    year: frontmatter.year || new Date().getFullYear(),
    role: ensureString(frontmatter.role),
    tools: ensureArray(frontmatter.tools),
    skills: ensureArray(frontmatter.skills),
    tags: ensureArray(frontmatter.tags),
    category: ensureString(frontmatter.category) || 'Uncategorized',
    duration: ensureString(frontmatter.duration),
    team: ensureString(frontmatter.team),
    client: ensureString(frontmatter.client),
    organization: ensureString(frontmatter.organization),
    organizationType: ensureString(frontmatter.organizationType),
    organizationWork: frontmatter.organizationWork || false,
    competitionWork: frontmatter.competitionWork || false,
    competitionName: ensureString(frontmatter.competitionName),
    competitionCategory: ensureString(frontmatter.competitionCategory),
    // ← ADD EVENT FIELDS
    eventWork: frontmatter.eventWork || false,
    eventName: ensureString(frontmatter.eventName),
    eventType: ensureString(frontmatter.eventType),
    eventRole: ensureString(frontmatter.eventRole),
    eventDuration: ensureString(frontmatter.eventDuration),
    eventLocation: ensureString(frontmatter.eventLocation),
    summary: frontmatter.summary || '',
    cover: ensureString(frontmatter.cover),
    final: ensureArray(frontmatter.final),
    applications: ensureArray(frontmatter.applications),
    explorations: ensureArray(frontmatter.explorations),
    socialPosts: ensureArray(frontmatter.socialPosts),
    socialMediaSections: ensureSocialMediaSections(frontmatter.socialMediaSections),
    campaigns: ensureArray(frontmatter.campaigns),
    brandMaterials: ensureArray(frontmatter.brandMaterials),
    // ← ADD EVENT-SPECIFIC ARRAYS
    eventMaterials: ensureArray(frontmatter.eventMaterials),
    eventDocumentation: ensureArray(frontmatter.eventDocumentation),
    eventPromotion: ensureArray(frontmatter.eventPromotion),
    metrics: ensureArray(frontmatter.metrics),
    credits: ensureArray(frontmatter.credits),
    challenges: ensureString(frontmatter.challenges),
    solutions: ensureString(frontmatter.solutions),
    impact: ensureString(frontmatter.impact),
    testimonial: frontmatter.testimonial,
    liveUrl: ensureString(frontmatter.liveUrl),
    githubUrl: ensureString(frontmatter.githubUrl),
    behanceUrl: ensureString(frontmatter.behanceUrl),
    dribbbleUrl: ensureString(frontmatter.dribbbleUrl),
    instagramUrl: ensureString(frontmatter.instagramUrl),
    linkedinUrl: ensureString(frontmatter.linkedinUrl),
    featured: frontmatter.featured || false
  }

  return { meta, content }
}

/** ====== METADATA EXTRACTION HELPERS ====== */
export async function getUniqueCategories(): Promise<string[]> {
  const projects = await getAllProjects()
  const categories = [...new Set(
    projects
      .map(p => p.category)
      .filter(cat => cat !== '')
  )]
  return categories.sort()
}

export async function getUniqueTags(): Promise<string[]> {
  const projects = await getAllProjects()
  const tags = [...new Set(projects.flatMap(p => p.tags))]
  return tags.sort()
}

export async function getUniqueSkills(): Promise<string[]> {
  const projects = await getAllProjects()
  const skills = [...new Set(projects.flatMap(p => p.skills))]
  return skills.sort()
}

export async function getUniqueTools(): Promise<string[]> {
  const projects = await getAllProjects()
  const tools = [...new Set(projects.flatMap(p => p.tools))]
  return tools.sort()
}

export async function getUniqueYears(): Promise<number[]> {
  const projects = await getAllProjects()
  const years = [...new Set(projects.map(p => p.year))]
  return years.sort((a, b) => b - a)
}

export async function getUniqueOrganizations(): Promise<string[]> {
  const projects = await getAllProjects()
  const organizations = [...new Set(
    projects
      .filter(p => p.organizationWork && p.organization !== '')
      .map(p => p.organization)
  )]
  return organizations.sort()
}

export async function getUniqueOrganizationTypes(): Promise<string[]> {
  const projects = await getAllProjects()
  const types = [...new Set(
    projects
      .filter(p => p.organizationWork && p.organizationType !== '')
      .map(p => p.organizationType)
  )]
  return types.sort()
}

export async function getUniqueClients(): Promise<string[]> {
  const projects = await getAllProjects()
  const clients = [...new Set(
    projects
      .filter(p => !p.organizationWork && !p.eventWork && p.client !== '')
      .map(p => p.client)
  )]
  return clients.sort()
}

export async function getUniqueCompetitions(): Promise<string[]> {
  const projects = await getAllProjects()
  const competitions = [...new Set(
    projects
      .filter(p => p.competitionWork && p.competitionName !== '')
      .map(p => p.competitionName)
  )]
  return competitions.sort()
}

export async function getUniqueCompetitionCategories(): Promise<string[]> {
  const projects = await getAllProjects()
  const categories = [...new Set(
    projects
      .filter(p => p.competitionWork && p.competitionCategory !== '')
      .map(p => p.competitionCategory)
  )]
  return categories.sort()
}

// ← ADD EVENT-SPECIFIC METADATA FUNCTIONS
export async function getUniqueEvents(): Promise<string[]> {
  const projects = await getAllProjects()
  const events = [...new Set(
    projects
      .filter(p => p.eventWork && p.eventName !== '')
      .map(p => p.eventName)
  )]
  return events.sort()
}

export async function getUniqueEventTypes(): Promise<string[]> {
  const projects = await getAllProjects()
  const eventTypes = [...new Set(
    projects
      .filter(p => p.eventWork && p.eventType !== '')
      .map(p => p.eventType)
  )]
  return eventTypes.sort()
}

export async function getUniqueEventLocations(): Promise<string[]> {
  const projects = await getAllProjects()
  const locations = [...new Set(
    projects
      .filter(p => p.eventWork && p.eventLocation !== '')
      .map(p => p.eventLocation)
  )]
  return locations.sort()
}

/** ====== STATISTICS ====== */
export async function getProjectStats(): Promise<{
  total: number
  projects: number
  organizationWork: number
  competitionWork: number
  eventWork: number // ← ADD THIS
  featured: number
  categories: number
  uniqueTags: number
  uniqueSkills: number
  yearRange: { earliest: number; latest: number }
}> {
  const allProjects = await getAllProjects()
  const projects = allProjects.filter(p => !p.organizationWork && !p.competitionWork && !p.eventWork)
  const organizationWork = allProjects.filter(p => p.organizationWork)
  const competitionWork = allProjects.filter(p => p.competitionWork)
  const eventWork = allProjects.filter(p => p.eventWork) // ← ADD THIS
  const featured = allProjects.filter(p => p.featured)
  
  const categories = await getUniqueCategories()
  const tags = await getUniqueTags()
  const skills = await getUniqueSkills()
  const years = await getUniqueYears()

  return {
    total: allProjects.length,
    projects: projects.length,
    organizationWork: organizationWork.length,
    competitionWork: competitionWork.length,
    eventWork: eventWork.length, // ← ADD THIS
    featured: featured.length,
    categories: categories.length,
    uniqueTags: tags.length,
    uniqueSkills: skills.length,
    yearRange: {
      earliest: Math.min(...years),
      latest: Math.max(...years)
    }
  }
}

/** ====== SHOTS (LIST / META) ====== */
export async function getAllShots(): Promise<ShotMeta[]> {
  const files = await listMdx(SHOTS_DIR)
  const items: ShotMeta[] = []

  for (const file of files) {
    try {
      const full = path.join(SHOTS_DIR, file)
      const raw = await read(full)
      const { data } = matter(raw)
      const fm = data as Partial<ShotFrontmatter>

      if (!fm?.title || typeof fm.year !== 'number' || !Array.isArray(fm.tags) || !Array.isArray(fm.images)) {
        continue
      }

      items.push({ ...(fm as ShotFrontmatter), file })
    } catch (error) {
      console.error(`Error processing shot file ${file}:`, error)
      continue
    }
  }

  // Terbaru dulu
  items.sort((a, b) => b.year - a.year)
  return items
}

/** (Opsional) Compile satu file shots jika butuh render konten MDX di halaman khusus */
export async function compileShotFile(file: string): Promise<Compiled<ShotFrontmatter>> {
  const full = path.join(SHOTS_DIR, file)
  const source = await read(full)
  const { frontmatter, content } = await compileMDX<ShotFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  })
  return { meta: frontmatter, content }
}