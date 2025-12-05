import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCurrentAgentId } from '@/lib/auth'
import { currentFounderTier, tierToPriceId } from '@/lib/priceLadder'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const agentId = getCurrentAgentId()

  // Relax Prisma types for this route
  const db = prisma as any

  const agent = await db.agent.findUnique({ where: { id: agentId } })

  if (!agent) {
    return NextResponse.json({ error: 'agent_not_found' }, { status: 404 })
  }

  const had = !!agent.first_active_at
  const active = agent.subscription_status === 'active'

  const allowedTier: '50' | '100' | '150' | '200' =
    had && !active ? '200' : currentFounderTier()

  const allowedPriceId = tierToPriceId(allowedTier)

  let body: any = {}
  try {
    body = await req.json()
  } catch {
    // ignore invalid JSON and use defaults
  }

  const requestedPriceId = body?.priceId
  if (requestedPriceId && requestedPriceId !== allowedPriceId) {
    return NextResponse.json(
      { error: 'forbidden_price', allowedTier, allowedPriceId },
      { status: 403 }
    )
  }

  let customerId = (agent.stripe_customer_id || null) as string | null

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: agent.email,
      name: agent.full_name,
      metadata: { agent_id: agent.id },
    })
    customerId = customer.id

    await db.agent.update({
      where: { id: agent.id },
      data: { stripe_customer_id: customerId },
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: allowedPriceId, quantity: 1 }],
    success_url: `${appUrl}/agents/dashboard?checkout=success`,
    cancel_url: `${appUrl}/agents/dashboard?checkout=cancel`,
    allow_promotion_codes: true,
    metadata: {
      agent_id: agent.id,
      chosen_tier: allowedTier,
    },
  })

  return NextResponse.json({ url: session.url })
}
