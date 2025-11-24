import { NextResponse } from 'next/server'
export async function GET(req:Request){ const res=NextResponse.redirect(new URL('/admin/agents', req.url)); res.cookies.set('admin_key','',{httpOnly:true,sameSite:'lax',path:'/',maxAge:0}); return res }
