// app/api/listings/import/route.ts
import { NextResponse } from "next/server";

/**
 * TEMPORARY STUB
 * ----------------
 * CSV import is disabled in this deployment so we don't need `csv-parse/sync`.
 */

export async function POST(req: Request) {
  return NextResponse.json(
    {
      ok: false,
      message:
        "CSV import is not enabled on this deployment yet. Please contact support if you need this feature.",
    },
    { status: 501 }
  );
}
