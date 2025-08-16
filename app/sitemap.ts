// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getProjectSlugs } from '@/lib/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/shots`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const slugs = await getProjectSlugs()
  const projectRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...projectRoutes]
}
