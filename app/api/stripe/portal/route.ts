import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentAgentId } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const agentId = getCurrentAgentId()

  // Relax Prisma types for this route
  const db = prisma as any

  const agent = await db.agent.findUnique({ where: { id: agentId } })

  if (!agent || !agent.stripe_customer_id) {
    return NextResponse.json({ error: 'no_stripe_customer' }, { status: 400 })
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: agent.stripe_customer_id,
    return_url: `${appUrl}/agents/dashboard`,
  })

  return NextResponse.redirect(portal.url, { status: 303 })
}
