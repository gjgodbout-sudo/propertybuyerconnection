import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'
import { listingQualityScore } from '@/lib/quality'
function slugify(s:string){return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
  const baseUrl=process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000'
  const staticPages: MetadataRoute.Sitemap = [{ url:`${baseUrl}/`, lastModified:new Date() },{ url:`${baseUrl}/agents/dashboard`, lastModified:new Date() },{ url:`${baseUrl}/founder`, lastModified:new Date() }]
  const listings = await prisma.listing.findMany({ where:{ published:true }, select:{ id:true,title:true,city:true,state_province:true,updated_at:true } , take:10000 })
  const urls = listings.filter(l=>listingQualityScore({ published:true, title:l.title, city:l.city, state_province:l.state_province, updated_at:l.updated_at }).indexable).map(l=>({ url:`${baseUrl}/listing/${slugify(`${l.title||''}-${l.city||''}-${l.state_province||''}`)}-${l.id}`, lastModified: l.updated_at || new Date() }))
  return [...staticPages, ...urls]
}
