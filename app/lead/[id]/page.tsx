import { prisma } from '@/lib/db'
import LeadForm from '@/components/LeadForm'
export default async function LeadPage({ params }:{ params:{ id:string } }){
  const listing=await prisma.listing.findUnique({ where:{ id:params.id }, include:{ agent:true } })
  if(!listing) return <div className='card'>Listing not found.</div>
  return(<div className='grid gap-6'><div className='card'><h1 className='text-2xl font-semibold mb-1'>Contact Agent</h1><p className='text-gray-600 mb-4'>{listing.title} — {listing.city ?? ''} {listing.state_province ?? ''}</p><LeadForm listingId={listing.id} agentId={listing.agent_id} /></div></div>)
}
