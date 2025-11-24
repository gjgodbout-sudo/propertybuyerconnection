export type ListingLike={published?:boolean,title?:string|null,description?:string|null,price?:any,beds?:any,baths?:any,listing_url?:string|null,city?:string|null,state_province?:string|null,property_type?:string|null,lat?:any,lng?:any,created_at?:any,updated_at?:any}
export function listingQualityScore(l: ListingLike, now: Date = new Date()){
  let score=0; const reasons:string[]=[]
  if(l.published) {score+=15;reasons.push('published')}
  if(l.title && l.title.trim().length>=8){score+=10;reasons.push('title')}
  if(l.description && l.description.trim().length>=120){score+=10;reasons.push('description≥120')}
  if(l.price){score+=10;reasons.push('price')}
  if(l.beds){score+=8;reasons.push('beds')}
  if(l.baths){score+=8;reasons.push('baths')}
  if(l.listing_url && /^https?:\/\//i.test(l.listing_url)){score+=8;reasons.push('listing_url')}
  if(l.city && l.state_province){score+=8;reasons.push('city+region')}
  if(l.property_type){score+=6;reasons.push('type')}
  if(l.lat && l.lng){score+=10;reasons.push('geo')}
  const updated=(l.updated_at?new Date(l.updated_at): (l.created_at?new Date(l.created_at):null))
  if(updated){ const days=(now.getTime()-updated.getTime())/86400000; if(days<=30){score+=7;reasons.push('fresh<=30d')} else if(days<=90){score+=3;reasons.push('fresh<=90d')}}
  score=Math.max(0,Math.min(100,score)); const min=Number(process.env.QUALITY_MIN_SCORE||60)
  const indexable=score>=min && !!l.published
  return {score,indexable,reasons}
}
