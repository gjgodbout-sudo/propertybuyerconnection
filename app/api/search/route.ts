import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const city = searchParams.get('city') || undefined
    const postal = searchParams.get('postal') || undefined
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius_km = Number(searchParams.get('radius_km') || '25')
    const limit = Number(searchParams.get('limit') || '20')
    const offset = Number(searchParams.get('offset') || '0')

    // Use a relaxed Prisma type so TS stops whining about `.listing`
    const db = prisma as any

    if (lat && lng) {
      const items = (await db.$queryRawUnsafe(
        `SELECT l.*, ST_Distance(l.location, ST_SetSRID(ST_MakePoint($1,$2),4326)::geography) AS distance_m
         FROM listings l
         WHERE l.published = true
           AND ST_DWithin(
             l.location,
             ST_SetSRID(ST_MakePoint($1,$2),4326)::geography,
             ($3 * 1000.0)
           )
         ORDER BY distance_m ASC, l.created_at DESC
         LIMIT $4 OFFSET $5`,
        Number(lng),
        Number(lat),
        radius_km,
        limit,
        offset
      )) as any[]

      return NextResponse.json({ items })
    } else {
      const items = await db.listing.findMany({
        where: {
          published: true,
          ...(city
            ? { city: { contains: city, mode: 'insensitive' as const } }
            : {}),
          ...(postal
            ? {
                postal_zip: {
                  contains: postal,
                  mode: 'insensitive' as const,
                },
              }
            : {}),
        },
        orderBy: [{ created_at: 'desc' }, { price: 'asc' }],
        take: limit,
        skip: offset,
      })

      return NextResponse.json({ items })
    }
  } catch (e: any) {
    console.error(e)
    return NextResponse.json(
      { error: 'server_error', detail: e.message },
      { status: 500 }
    )
  }
}
