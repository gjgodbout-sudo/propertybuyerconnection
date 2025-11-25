import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const db = prisma as any

    const rec = await db.savedSearch.create({
      data: {
        buyer_email: body.buyer_email || null,
        buyer_device_sub_id: body.buyer_device_sub_id || null,
        buyer_push_json: body.buyer_push_json || null,
        filters_json: body.filters_json || {},
        lat: body.lat ? (String(body.lat) as any) : null,
        lng: body.lng ? (String(body.lng) as any) : null,
        radius_km: body.radius_km ? Number(body.radius_km) : 10,
        notification_pref: body.notification_pref || 'instant',
      },
    })

    return NextResponse.json({ id: rec.id })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json(
      { error: 'server_error', detail: e.message },
      { status: 500 }
    )
  }
}
