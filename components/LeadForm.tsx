'use client'
import { useEffect, useState } from 'react'
export default function LeadForm({ listingId, agentId }:{ listingId:string, agentId:string }){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [phone,setPhone]=useState(''); const [message,setMessage]=useState(''); const [busy,setBusy]=useState(false); const [status,setStatus]=useState('')
  useEffect(()=>{const s=document.createElement('script'); s.src='https://js.hcaptcha.com/1/api.js'; s.async=true; document.body.appendChild(s); return ()=>{document.body.removeChild(s)}},[])
  async function submit(e:any){e.preventDefault(); setBusy(true); setStatus(''); const token=(document.querySelector('textarea[name="h-captcha-response"]') as any)?.value||''; const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({listing_id:listingId,agent_id:agentId,buyer_name:name,buyer_email:email,buyer_phone:phone,message,hcaptchaToken:token,website:''})}); const data=await res.json(); setBusy(false); if(!res.ok) setStatus(data.error||'Error'); else {setStatus('Thanks — your inquiry has been sent.'); setName(''); setEmail(''); setPhone(''); setMessage('')} }
  const sitekey=process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY||''
  return(<form onSubmit={submit} className='grid md:grid-cols-2 gap-4'>
    <div><label className='label'>Name</label><input className='input' value={name} onChange={e=>setName(e.target.value)} required /></div>
    <div><label className='label'>Email</label><input className='input' type='email' value={email} onChange={e=>setEmail(e.target.value)} required /></div>
    <div><label className='label'>Phone</label><input className='input' value={phone} onChange={e=>setPhone(e.target.value)} /></div>
    <div className='hidden'><label className='label'>Website (leave empty)</label><input className='input' /></div>
    <div className='md:col-span-2'><label className='label'>Message</label><textarea className='input' rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder='Hi, I’m interested in this property...' /></div>
    <div className='md:col-span-2'><div className='h-captcha' data-sitekey={sitekey}></div></div>
    <div className='md:col-span-2 flex gap-3 items-center'><button className='btn-primary' disabled={busy}>{busy?'Sending...':'Send message'}</button>{status&&<span className='text-sm'>{status}</span>}</div>
  </form>)
}
