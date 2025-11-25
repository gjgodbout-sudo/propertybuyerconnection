import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { geocodeAddress } from '@/lib/geocode'
import { getCurrentAgentId } from '@/lib/auth'

export async function POST(req:Request){
  try{
    const body=await req.json()
    const agent_id=getCurrentAgentId()
    const db = prisma as any
    const agent = await db.agent.findUnique({ where: { id: agent_id } })
    if(!body.title||!body.listing_url){ return NextResponse.json({error:'title and listing_url are required'},{status:400}) }
    if(!/^https?:\/\//i.test(body.listing_url)){ return NextResponse.json({error:'listing_url must be http(s)'},{status:400}) }
    const {lat,lng}=await geocodeAddress({address_line1:body.address_line1,city:body.city,state_province:body.state_province,postal_zip:body.postal_zip,country:body.country})
    // --- Determine founder pricing ---
const founderEnd = process.env.FOUNDER_END_UTC
const founderToken = process.env.FOUNDER_TOKEN
const tokenHeader = req.headers.get('x-founder-token') || ''

let tier: PriceTier = PriceTier.TIER_200 // default
const isWithinWindow = founderEnd ? Date.now() < Date.parse(founderEnd) : false
const isAuthorizedToken = founderToken && tokenHeader === founderToken

if (isWithinWindow || isAuthorizedToken) {
  tier = PriceTier.TIER_50
}
const listing=await prisma.listing.create({ data:{
      agent_id,title:body.title,description:body.description||null,price:body.price?String(body.price):null,currency:body.currency||null,property_type:body.property_type||'house',beds:body.beds?Number(body.beds):null,baths:body.baths?Number(body.baths):null,building_size_sqft:body.building_size_sqft?Number(body.building_size_sqft):null,lot_size_sqft:body.lot_size_sqft?Number(body.lot_size_sqft):null,status:body.status||'for_sale',listing_url:body.listing_url,address_line1:body.address_line1||null,address_line2:body.address_line2||null,city:body.city||null,state_province:body.state_province||null,postal_zip:body.postal_zip||null,country:body.country||'US',lat:lat as any,lng:lng as any,published:(agent?.verification==='approved')?!!body.published:false,published_at: (agent?.verification==='approved'&&body.published)?new Date():null
    } })
    try{ if(listing.published){ fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/jobs/notify-new-listing`,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ listing_id: listing.id }) }).catch(()=>{}) } }catch{}
    return NextResponse.json({ id: listing.id })
  }catch(e:any){ console.error(e); return NextResponse.json({error:'server_error',detail:e.message},{status:500}) }
}
