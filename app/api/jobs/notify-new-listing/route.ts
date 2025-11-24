// app/api/jobs/notify-new-listing/route.ts
import { NextResponse } from "next/server";
import { sendNewListingEmail } from "@/lib/mailer";
import { sendNewListingPush } from "@/lib/push";

/**
 * TEMPORARY IMPLEMENTATION
 * -------------------------
 * This endpoint receives a payload about a new listing
 * and calls stubbed email + push helpers.
 */

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Fire-and-forget style – but these are stubs right now.
    await sendNewListingEmail(payload);
    await sendNewListingPush(payload);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("notify-new-listing error:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to process new listing notification.",
      },
      { status: 500 }
    );
  }
}
