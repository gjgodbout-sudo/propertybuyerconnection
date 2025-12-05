import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function GET() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          // Founder plan: $50/month
          price_data: {
            currency: 'usd',
            unit_amount: 5000, // 50.00 USD (amount is in cents)
            recurring: { interval: 'month' },
            product_data: {
              name: 'PropertyBuyerConnection – Founder Plan ($50/mo)',
            },
          },
          quantity: 1,
        },
      ],
      // 👇 After successful payment, go to the Success page
      success_url: `${APP_URL}/success`,
      // 👇 If they cancel, go to the Cancel page
      cancel_url: `${APP_URL}/cancel`,
    })

    if (!session.url) {
      console.error('Stripe session returned without URL', session)
      return new NextResponse('Stripe session error', { status: 500 })
    }

    // Redirect the browser to Stripe Checkout
    return NextResponse.redirect(session.url, { status: 303 })
  } catch (err: any) {
    console.error('Stripe checkout error:', err)
    return new NextResponse('Stripe error', { status: 500 })
  }
}
