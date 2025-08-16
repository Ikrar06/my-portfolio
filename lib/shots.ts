// lib/shots.ts
import type { ShotMeta } from './mdx'
import { getAllShots as _getAllShotsRaw } from './mdx'

export type { ShotMeta } from './mdx'

export type ShotListOptions = {
  tag?: string
  year?: number
  fromYear?: number
  toYear?: number
  limit?: number
}

/**
 * Ambil semua shots, default sort: terbaru dulu (year desc).
 * Tersedia filter tag/tahun/range dan limit.
 */
export async function getAllShots(options: ShotListOptions = {}): Promise<ShotMeta[]> {
  let items = await _getAllShotsRaw()

  // Filter by tag
  if (options.tag) {
    const target = options.tag.toLowerCase()
    items = items.filter(
      (s) => Array.isArray(s.tags) && s.tags.some((t) => t.toLowerCase() === target)
    )
  }

  // Filter by tahun/range
  if (typeof options.year === 'number') {
    items = items.filter((s) => s.year === options.year)
  }
  if (typeof options.fromYear === 'number') {
    items = items.filter((s) => s.year >= (options.fromYear as number))
  }
  if (typeof options.toYear === 'number') {
    items = items.filter((s) => s.year <= (options.toYear as number))
  }

  // Pastikan urut terbaru dulu
  items.sort((a, b) => b.year - a.year)

  // Limit
  if (options.limit && options.limit > 0) {
    items = items.slice(0, options.limit)
  }

  return items
}
