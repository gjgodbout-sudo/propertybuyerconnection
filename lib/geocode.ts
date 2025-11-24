export async function geocodeAddress(addr:{address_line1?:string|null;city?:string|null;state_province?:string|null;postal_zip?:string|null;country?:'CA'|'US'}){
  const t = process.env.MAPBOX_TOKEN
  if (!t) return { lat:null as number|null, lng:null as number|null }
  const parts=[addr.address_line1,addr.city,addr.state_province,addr.postal_zip,addr.country].filter(Boolean).join(', ')
  const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(parts)}.json?limit=1&access_token=${t}`
  const res=await fetch(url,{cache:'no-store'})
  if(!res.ok) return {lat:null,lng:null}
  const data=await res.json()
  const feat=data.features?.[0]
  if(!feat) return {lat:null,lng:null}
  const [lng,lat]=feat.center
  return {lat,lng}
}
