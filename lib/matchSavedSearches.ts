import { prisma } from '@/lib/db'
export async function findMatchingSavedSearchIds(newListingId:string){
  const rows = await prisma.$queryRawUnsafe<any[]>(`
    SELECT ss.id, ss.buyer_email, ss.buyer_push_json, ss.notification_pref
    FROM saved_searches ss
    JOIN listings l ON l.id = $1
    WHERE ss.notification_pref <> 'off'
      AND ST_DWithin(l.location, ss.center, (ss.radius_km * 1000.0))
  `, newListingId)
  return rows
}
