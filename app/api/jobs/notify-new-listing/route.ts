import { NextResponse } from 'next/server';

// Temporary stub: background job disabled for now
export async function POST() {
  return NextResponse.json({
    ok: true,
    message: 'notify-new-listing job disabled in production build',
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'notify-new-listing job disabled in production build',
  });
}
