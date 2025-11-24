import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { mapPriceIdToTier, mapStripeStatus } from '@/lib/priceMap'
export const dynamic='force-dynamic'
export async function POST(req:Request){ const sig=headers().get('stripe-signature'); const secret=process.env.STRIPE_WEBHOOK_SECRET; if(!sig||!secret) return NextResponse.json({error:'missing_signature'},{status:400}); const payload=await req.text(); let event:any; try{ event=stripe.webhooks.constructEvent(payload, sig, secret) }catch(err:any){ return NextResponse.json({error:`Invalid payload: ${err.message}`},{status:400}) }
  try{ switch(event.type){ case 'customer.subscription.created': case 'customer.subscription.updated': case 'customer.subscription.deleted': { const sub=event.data.object as any; const customerId:string=sub.customer; const status:string=sub.status; const item=sub.items?.data?.[0]; const priceId:string|undefined=item?.price?.id; const agent=await prisma.agent.findFirst({ where:{ stripe_customer_id: customerId } }); if(!agent) break; const mapped=mapStripeStatus(status); const updates:any={ subscription_status: mapped, stripe_subscription_id: sub.id }; if(!agent.first_active_price_tier && (mapped==='active')){ if(priceId){ const tier=mapPriceIdToTier(priceId); updates.first_active_price_tier=tier as any } updates.first_active_at=new Date() } await prisma.agent.update({ where:{ id:agent.id }, data: updates }); break } default: break } }catch(e:any){ console.error('Webhook error', e); return NextResponse.json({error:'handler_error',detail:e.message},{status:500}) }
  return NextResponse.json({ received:true })
}
