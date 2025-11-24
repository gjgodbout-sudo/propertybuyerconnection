import { NextResponse } from 'next/server'
export async function GET(){ const pub=process.env.VAPID_PUBLIC_KEY; if(!pub) return NextResponse.json({error:'missing_public_key'},{status:500}); return NextResponse.json({ publicKey: pub }) }
