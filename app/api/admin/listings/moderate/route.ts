import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

function isAdmin() {
  const jar = cookies()
  const key = jar.get('admin_key')?.value
  const secret = process.env.ADMIN_SECRET
  return !!secret && key === secret
}

export async function POST(req: Request) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const action = searchParams.get('action')

  if (!id || !action) {
    return NextResponse.json({ error: 'invalid_params' }, { status: 400 })
  }

  // 👇 Prisma cast so TypeScript stops complaining about `listing`
  const db = prisma as any

  if (action === 'publish') {
    await db.listing.update({
      where: { id },
      data: { published: true, published_at: new Date() },
    })
  } else if (action === 'unpublish') {
    await db.listing.update({
      where: { id },
      data: { published: false, published_at: null },
    })
  } else {
    return NextResponse.json({ error: 'invalid_action' }, { status: 400 })
  }

  return NextResponse.redirect(new URL('/admin/listings', req.url))
}
