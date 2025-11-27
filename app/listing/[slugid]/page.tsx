import { prisma } from '@/lib/db'
import { slugify } from '@/lib/slugify'
import ListingCard from '@/components/ListingCard'
import type { Metadata } from 'next'

function parseId(slugid: string): string {
  // slugid looks like "nice-title-abc123" → id is the part after the last "-"
  const parts = slugid.split('-')
  return parts[parts.length - 1]
}

export async function generateMetadata({
  params,
}: {
  params: { slugid: string }
}): Promise<Metadata> {
  const id = parseId(params.slugid)
  const db = prisma as any

  const listing = await db.listing.findUnique({
    where: { id },
    include: { agent: true },
  })

  if (!listing) {
    return { title: 'Listing not found' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const slug = slugify(
    `${listing.title || ''}-${listing.city || ''}-${listing.state_province || ''}`
  )

  return {
    title: listing.title || 'Property listing',
    openGraph: {
      title: listing.title || 'Property listing',
      url: `${baseUrl}/listing/${slug}-${listing.id}`,
    },
  }
}

export default async function ListingPage({
  params,
}: {
  params: { slugid: string }
}) {
  const id = parseId(params.slugid)
  const db = prisma as any

  const listing = await db.listing.findUnique({
    where: { id },
    include: { agent: true },
  })

  if (!listing) {
    return <div className="card">Listing not found.</div>
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <ListingCard listing={listing} />
      </div>
    </div>
  )
}
