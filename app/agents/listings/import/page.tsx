'use client'
import { useState } from 'react'
export default function ImportListingsPage(){
  const [created,setCreated]=useState<number|null>(null)
  async function onSubmit(e:any){ e.preventDefault(); const fd=new FormData(e.target as HTMLFormElement); const res=await fetch('/api/listings/import',{method:'POST',body:fd}); const data=await res.json(); setCreated(data.created||0) }
  return(<div className='card'><h1 className='text-2xl font-semibold mb-3'>Import Listings (CSV)</h1><p className='text-sm text-gray-600 mb-4'>Columns: title, description, price, currency, property_type, beds, baths, building_size_sqft, lot_size_sqft, status, listing_url, address_line1, address_line2, city, state_province, postal_zip, country (US|CA), lat, lng, published</p><form onSubmit={onSubmit} className='grid gap-3'><input className='input' name='file' type='file' accept='.csv,text/csv' required /><button className='btn-primary'>Upload</button></form>{created!==null&&<p className='text-sm mt-3'>Imported {created} listings.</p>}</div>)
}
