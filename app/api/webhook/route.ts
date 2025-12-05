import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { mapPriceIdToTier, mapStripeStatus } from '@/lib/priceMap'
export const dynamic='force-dynamic'
export async function POST(req: Request) {
  const sig = headers().get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: 'missing_signature' }, { status: 400 });
  }

  const payload = await req.text();
  let event: any;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Invalid payload: ${err.message}` },
      { status: 400 }
    );
  }

  // ... event handling logic continues here
}


