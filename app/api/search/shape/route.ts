import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function POST(req:Request){
  try{ const body=await req.json(); const geojson=body.geojson; const limit=Math.min(Number(body.limit||200),500); const offset=Number(body.offset||0); if(!geojson) return NextResponse.json({error:'missing_geojson'},{status:400}); const items=await prisma.$queryRawUnsafe<any[]>(`SELECT l.* FROM listings l WHERE l.published = true AND ST_Intersects(l.location, ST_SetSRID(ST_GeomFromGeoJSON($1),4326)::geography) ORDER BY l.created_at DESC LIMIT $2 OFFSET $3`, JSON.stringify(geojson), limit, offset); return NextResponse.json({items}) }catch(e:any){ console.error(e); return NextResponse.json({error:'server_error',detail:e.message},{status:500}) }
}
