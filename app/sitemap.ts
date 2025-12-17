// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getCodingProjects, getDesignProjects } from '@/lib/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/project`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/design`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/shots`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const [codingProjects, designProjects] = await Promise.all([
    getCodingProjects(),
    getDesignProjects()
  ])

  const codingRoutes: MetadataRoute.Sitemap = codingProjects.map((project) => ({
    url: `${base}/project/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const designRoutes: MetadataRoute.Sitemap = designProjects.map((project) => ({
    url: `${base}/design/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...codingRoutes, ...designRoutes]
}
