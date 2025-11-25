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

  let agent_id: string | null = null
  let status: string | null = null

  const ct = req.headers.get('content-type') || ''

  if (ct.includes('application/json')) {
    const b = await req.json()
    agent_id = b.agent_id
    status = b.status
  } else {
    const fd = await req.formData()
    agent_id = String(fd.get('agent_id') || '')
    status = String(fd.get('status') || '')
  }

  if (!agent_id || !['pending', 'approved', 'rejected'].includes(String(status))) {
    return NextResponse.json({ error: 'invalid_params' }, { status: 400 })
  }

  // 👇 Tell TypeScript to chill about the agent model
  const db = prisma as any

  await db.agent.update({
    where: { id: agent_id },
    data: { verification: status as any },
  })

  return NextResponse.json({ ok: true })
}
