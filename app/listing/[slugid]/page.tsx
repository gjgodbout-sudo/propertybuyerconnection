import { prisma } from '@/lib/db'
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

  const title =
    listing.title ||
    `Listing in ${listing.city ?? ''} ${listing.state_province ?? ''}`.trim()

  return {
    title,
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
        <h1 className="text-2xl font-semibold mb-2">
          {listing.title || 'Property listing'}
        </h1>
        <p className="text-gray-600 mb-4">
          {listing.city ?? ''} {listing.state_province ?? ''}{' '}
          {listing.postal_zip ?? ''}
        </p>
        <p className="text-gray-700 mb-4">
          {listing.description || 'No description provided.'}
        </p>

        <div className="space-y-1 text-sm text-gray-700">
          <div>
            <strong>Price:</strong>{' '}
            {listing.price ? `${listing.price} ${listing.currency ?? ''}` : '—'}
          </div>
          <div>
            <strong>Type:</strong> {listing.property_type || '—'}
          </div>
          <div>
            <strong>Beds:</strong> {listing.beds ?? '—'}
          </div>
          <div>
            <strong>Baths:</strong> {listing.baths ?? '—'}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {listing.agent && (
            <p>
              <strong>Agent:</strong> {listing.agent.full_name} (
              {listing.agent.email})
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
