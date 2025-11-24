'use client'
import { useState } from 'react'
export default function NewListingPage(){
  const [form,setForm]=useState<any>({title:'',price:'',currency:'USD',property_type:'house',beds:'',baths:'',status:'for_sale',listing_url:'',address_line1:'',address_line2:'',city:'',state_province:'',postal_zip:'',country:'US',description:'',published:false})
  const [saving,setSaving]=useState(false); const [message,setMessage]=useState<string|null>(null)
  function update(k:string,v:any){ setForm((f:any)=>({...f,[k]:v})) }
  async function submit(){ setSaving(true); setMessage(null); const res=await fetch('/api/listings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}); const data=await res.json(); setSaving(false); if(!res.ok){setMessage(data.error||'Error creating listing'); return} setMessage('Listing created 👍') }
  return(<div className='grid gap-6'><div className='card'><h1 className='text-2xl font-semibold mb-4'>Create Listing</h1><div className='grid md:grid-cols-2 gap-4'>
    <div><label className='label'>Title</label><input className='input' value={form.title} onChange={e=>update('title',e.target.value)} /></div>
    <div><label className='label'>Listing URL</label><input className='input' value={form.listing_url} onChange={e=>update('listing_url',e.target.value)} placeholder='https://...' /></div>
    <div><label className='label'>Price</label><input className='input' value={form.price} onChange={e=>update('price',e.target.value)} /></div>
    <div><label className='label'>Currency</label><select className='input' value={form.currency} onChange={e=>update('currency',e.target.value)}><option>USD</option><option>CAD</option></select></div>
    <div><label className='label'>Property Type</label><select className='input' value={form.property_type} onChange={e=>update('property_type',e.target.value)}><option>house</option><option>condo</option><option>townhouse</option><option>multi_family</option><option>land</option><option>farm</option><option>commercial</option><option>other</option></select></div>
    <div><label className='label'>Status</label><select className='input' value={form.status} onChange={e=>update('status',e.target.value)}><option>for_sale</option><option>pending</option><option>sold</option><option>off_market</option></select></div>
    <div><label className='label'>Beds</label><input className='input' value={form.beds} onChange={e=>update('beds',e.target.value)} /></div>
    <div><label className='label'>Baths</label><input className='input' value={form.baths} onChange={e=>update('baths',e.target.value)} /></div>
    <div className='md:col-span-2'><label className='label'>Description</label><textarea className='input' rows={4} value={form.description} onChange={e=>update('description',e.target.value)} /></div>
    <div className='md:col-span-2'><div className='label'>Address</div></div>
    <div><label className='label'>Line 1</label><input className='input' value={form.address_line1} onChange={e=>update('address_line1',e.target.value)} /></div>
    <div><label className='label'>Line 2</label><input className='input' value={form.address_line2} onChange={e=>update('address_line2',e.target.value)} /></div>
    <div><label className='label'>City</label><input className='input' value={form.city} onChange={e=>update('city',e.target.value)} /></div>
    <div><label className='label'>State/Province</label><input className='input' value={form.state_province} onChange={e=>update('state_province',e.target.value)} /></div>
    <div><label className='label'>Postal/ZIP</label><input className='input' value={form.postal_zip} onChange={e=>update('postal_zip',e.target.value)} /></div>
    <div><label className='label'>Country</label><select className='input' value={form.country} onChange={e=>update('country',e.target.value)}><option>US</option><option>CA</option></select></div>
    <div className='md:col-span-2'><label className='inline-flex items-center gap-2'><input type='checkbox' checked={form.published} onChange={e=>update('published',e.target.checked)} /><span>Publish now</span></label></div>
    <div className='md:col-span-2 flex gap-3'><button className='btn-primary' onClick={submit} disabled={saving}>{saving?'Saving...':'Create Listing'}</button>{message&&<div className='text-sm text-gray-700'>{message}</div>}</div>
  </div></div></div>)
}
