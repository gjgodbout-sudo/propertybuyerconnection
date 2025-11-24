import { prisma } from '@/lib/db'
import LeadForm from '@/components/LeadForm'
import type { Metadata } from 'next'
import { listingQualityScore } from '@/lib/quality'

export const revalidate = 3600

function parseId(slugid:string){ const idx=slugid.lastIndexOf('-'); if(idx===-1) return slugid; const maybe=slugid.slice(idx+1); if(maybe.length>=16) return maybe; return slugid }
function slugify(s:string){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') }

export async function generateMetadata({ params }:{ params:{ slugid:string } }): Promise<Metadata>{
  const id=parseId(params.slugid); const listing=await prisma.listing.findUnique({ where:{ id }, include:{ agent:true } })
  if(!listing) return { title:'Listing not found' }
  const baseUrl=process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'
  const slug=slugify(`${listing.title||''}-${listing.city||''}-${listing.state_province||''}`)
  const canonical=`${baseUrl}/listing/${slug}-${listing.id}`
  const { indexable } = listingQualityScore(listing as any)
  const robots = indexable ? { index:true, follow:true } : { index:false, follow:true }
  const title=listing.title||'Listing'
  const description=`${listing.city ?? ''} ${listing.state_province ?? ''} • ${listing.property_type} • ${listing.beds ?? '-'} beds • ${listing.baths ?? '-'} baths`
  return { title, description, alternates:{ canonical }, robots, openGraph:{ title, description, url:canonical, type:'website' } }
}

export default async function ListingPage({ params }:{ params:{ slugid:string } }){
  const id=parseId(params.slugid); const listing=await prisma.listing.findUnique({ where:{ id }, include:{ agent:true } })
  if(!listing) return <div className='card'>Listing not found.</div>
  const slug=slugify(`${listing.title||''}-${listing.city||''}-${listing.state_province||''}`); const canonical=`/listing/${slug}-${listing.id}`
  const mapToken=process.env.NEXT_PUBLIC_MAPBOX_TOKEN; const hasGeo=listing.lat&&listing.lng
  const mapUrl = hasGeo&&mapToken ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+000(${Number(listing.lng)},${Number(listing.lat)})/${Number(listing.lng)},${Number(listing.lat)},14/800x400@2x?access_token=${mapToken}` : null
  const jsonLd={ "@context":"https://schema.org","@type":"RealEstateListing","name":listing.title,"url":canonical,"description":listing.description||undefined,"address":{"@type":"PostalAddress","streetAddress":listing.address_line1||undefined,"addressLocality":listing.city||undefined,"addressRegion":listing.state_province||undefined,"postalCode":listing.postal_zip||undefined,"addressCountry":listing.country},"geo": (hasGeo?{"@type":"GeoCoordinates","latitude":Number(listing.lat),"longitude":Number(listing.lng)}:undefined),"seller": listing.agent?{"@type":"RealEstateAgent","name":listing.agent.full_name}:undefined,"offers":{"@type":"Offer","price": listing.price?Number(listing.price):undefined,"priceCurrency":listing.currency||undefined,"availability": listing.status==='for_sale'?'https://schema.org/InStock': listing.status==='pending'?'https://schema.org/PreOrder': listing.status==='sold'?'https://schema.org/SoldOut':'https://schema.org/Discontinued' } }
  return(<div className='grid gap-6'>
    <link rel='canonical' href={canonical} />
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className='card'>
      <div className='flex items-start justify-between gap-4'>
        <div><h1 className='text-2xl font-semibold'>{listing.title}</h1><p className='text-gray-600'>{listing.city ?? ''}{listing.city?', ':''}{listing.state_province ?? ''}</p><p className='text-sm text-gray-600 mt-1'>{listing.property_type} • Beds {listing.beds ?? '—'} • Baths {listing.baths ?? '—'} • {listing.price?`$${Number(listing.price).toLocaleString()} ${listing.currency||''}`:'Price on request'}</p></div>
        <a className='btn' href={listing.listing_url} target='_blank' rel='noopener noreferrer'>View Full Listing</a>
      </div>
      {mapUrl && (<div className='mt-4'><a href={`https://www.google.com/maps?q=${Number(listing.lat)},${Number(listing.lng)}`} target='_blank' rel='noopener noreferrer'><img src={mapUrl} alt='Map' className='w-full rounded-2xl border' /></a></div>)}
      {listing.description && (<div className='mt-4 prose max-w-none'><p>{listing.description}</p></div>)}
    </div>
    <div className='card'><h2 className='text-lg font-semibold mb-2'>Contact Agent</h2><LeadForm listingId={listing.id} agentId={listing.agent_id} /></div>
  </div>)
}
