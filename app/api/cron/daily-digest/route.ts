import { NextResponse } from 'next/server';

// Temporary stub: cron job disabled for now
export async function GET() {
  return NextResponse.json({ ok: true, message: 'daily digest disabled' });
}

export async function POST() {
  return NextResponse.json({ ok: true, message: 'daily digest disabled' });
}
