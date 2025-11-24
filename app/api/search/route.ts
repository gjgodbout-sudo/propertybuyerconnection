import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function GET(req:Request){
  const { searchParams }=new URL(req.url); const city=searchParams.get('city'); const postal=searchParams.get('postal'); const lat=searchParams.get('lat'); const lng=searchParams.get('lng'); const radius_km=Number(searchParams.get('radius_km')||'25'); const limit=Math.min(Number(searchParams.get('limit')||'50'),100); const offset=Number(searchParams.get('offset')||'0')
  try{
    if(lat&&lng){
      const items=await prisma.$queryRawUnsafe<any[]>(`SELECT l.*, ST_Distance(l.location, ST_SetSRID(ST_MakePoint($1,$2),4326)::geography) AS distance_m FROM listings l WHERE l.published = true AND ST_DWithin(l.location, ST_SetSRID(ST_MakePoint($1,$2),4326)::geography, ($3 * 1000.0)) ORDER BY distance_m ASC, l.created_at DESC LIMIT $4 OFFSET $5`, Number(lng), Number(lat), radius_km, limit, offset); return NextResponse.json({items})
    } else {
      const items=await prisma.listing.findMany({ where:{ published:true, ...(city?{city:{contains:city,mode:'insensitive'}}:{}), ...(postal?{postal_zip:{contains:postal,mode:'insensitive'}}:{}) }, orderBy:[{created_at:'desc'},{price:'asc'}], take:limit, skip:offset })
      return NextResponse.json({items})
    }
  }catch(e:any){ console.error(e); return NextResponse.json({error:'server_error',detail:e.message},{status:500}) }
}
