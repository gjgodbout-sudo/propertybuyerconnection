import { prisma } from '@/lib/db'
import { getCurrentAgentId } from '@/lib/auth'
export default async function Dashboard(){
  const agentId=getCurrentAgentId()
  const agent=await prisma.agent.findUnique({ where:{ id:agentId }, include:{ listings:{ orderBy:{ created_at:'desc' } } } })
  return(<div className='grid gap-6'>
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Agent Dashboard</h1>
          <p className='text-gray-600 text-sm'>Welcome{agent?.full_name?`, ${agent.full_name}`:''}. Subscription: <span className='font-medium'>{agent?.subscription_status}</span> • Verification: <span className='font-medium'>{agent?.verification}</span></p>
          {agent?.verification!=='approved' && (<p className='text-xs text-amber-700 mt-1'>Your account is pending verification. New listings will not be publicly visible until approved.</p>)}
        </div>
        <div className='flex gap-2'>
          <a href='/agents/listings/new' className='btn-primary'>New Listing</a>
          <a href='/agents/listings/import' className='btn'>Import CSV</a>
        </div>
      </div>
      <div className='flex gap-3 mt-4'>
        {agent?.subscription_status!=='active' && (<a href='/api/stripe/checkout' className='btn-primary'>Subscribe</a>)}
        {agent?.subscription_status==='active' && (<a href='/api/stripe/portal' className='btn'>Manage Billing</a>)}
      </div>
    </div>
    <div className='card'><h2 className='text-lg font-semibold mb-3'>Your Listings</h2><div className='overflow-x-auto'><table className='w-full text-sm'><thead><tr className='text-left text-gray-600'><th className='py-2'>Title</th><th>City</th><th>Status</th><th>Views</th><th>CTR</th><th></th></tr></thead><tbody>{agent?.listings?.map(l=>(<tr key={l.id} className='border-t'><td className='py-2'>{l.title}</td><td>{l.city}</td><td>{l.status}</td><td>{l.view_count}</td><td>{l.view_count?((l.click_out_count/l.view_count)*100).toFixed(1)+'%':'—'}</td><td><a className='btn' href={`/agents/listings/new?id=${l.id}`}>Edit</a></td></tr>))}</tbody></table></div></div>
  </div>)
}
