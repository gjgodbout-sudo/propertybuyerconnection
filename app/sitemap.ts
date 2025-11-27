import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'
import { listingQualityScore } from '@/lib/quality'

// Simple local slugify helper so we don't depend on an external module
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-') // non-alphanum → hyphen
    .replace(/^-+|-+$/g, '') // trim hyphens
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/agents/dashboard`, lastModified: new Date() },
    { url: `${baseUrl}/founder`, lastModified: new Date() },
  ]

  const db = prisma as any

  const listings = await db.listing.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      city: true,
      state_province: true,
      updated_at: true,
    },
    take: 10000,
  })

  const urls: MetadataRoute.Sitemap = listings
    .filter(l =>
      listingQualityScore({
        published: true,
        title: l.title,
        city: l.city,
        state_province: l.state_province,
        updated_at: l.updated_at,
      }).indexable
    )
    .map(l => {
      const slug = slugify(
        `${l.title || ''}-${l.city || ''}-${l.state_province || ''}`
      )

      return {
        url: `${baseUrl}/listing/${slug}-${l.id}`,
        lastModified: l.updated_at || new Date(),
      }
    })

  return [...staticPages, ...urls]
}
