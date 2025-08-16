// lib/projects.ts
import type { ProjectMeta } from './mdx'
import {
  getAllProjects as _getAllProjectsRaw,
  getProjectBySlug as _getProjectBySlugRaw,
  getProjectSlugs as _getProjectSlugsRaw,
} from './mdx'

export type { ProjectMeta } from './mdx'

/**
 * Opsi list/sort/filter projects.
 * - featuredFirst: jika true, project "featured" muncul dulu (deteksi:
 *   frontmatter.featured === true ATAU tags menyertakan "featured", case-insensitive)
 */
export type ProjectListOptions = {
  tag?: string
  year?: number
  fromYear?: number
  toYear?: number
  featuredFirst?: boolean
  limit?: number
}

/** Deteksi apakah sebuah project dianggap "featured". */
export function isFeatured(p: ProjectMeta): boolean {
  // dukung opsional frontmatter.featured (walau tidak didefinisikan di tipe mdx.ts)
  const fmFlag = (p as any)?.featured === true
  const tagFlag =
    Array.isArray(p.tags) &&
    p.tags.some((t) => t.toLowerCase() === 'featured')

  return fmFlag || tagFlag
}

/**
 * Ambil semua project dengan opsi sort/filter.
 * Default: sort by year desc.
 * Jika featuredFirst=true, urutkan "featured" di depan, lalu year desc.
 */
export async function getAllProjects(options: ProjectListOptions = {}): Promise<ProjectMeta[]> {
  let items = await _getAllProjectsRaw()

  // Filter by tag
  if (options.tag) {
    const target = options.tag.toLowerCase()
    items = items.filter(
      (p) => Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase() === target)
    )
  }

  // Filter by tahun (exact) / range
  if (typeof options.year === 'number') {
    items = items.filter((p) => p.year === options.year)
  }
  if (typeof options.fromYear === 'number') {
    items = items.filter((p) => p.year >= (options.fromYear as number))
  }
  if (typeof options.toYear === 'number') {
    items = items.filter((p) => p.year <= (options.toYear as number))
  }

  // Sort
  items.sort((a, b) => {
    if (options.featuredFirst) {
      const fa = isFeatured(a) ? 1 : 0
      const fb = isFeatured(b) ? 1 : 0
      if (fa !== fb) return fb - fa // featured dulu
    }
    return b.year - a.year // default terbaru dulu
  })

  // Limit
  if (options.limit && options.limit > 0) {
    items = items.slice(0, options.limit)
  }

  return items
}

/** Re-export helper detail & daftar slug dari mdx.ts */
export const getProjectBySlug = _getProjectBySlugRaw
export const getProjectSlugs = _getProjectSlugsRaw
