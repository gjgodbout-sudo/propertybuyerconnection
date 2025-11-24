// app/api/listings/import/route.ts
import { NextResponse } from "next/server";

/**
 * TEMPORARY STUB
 * ----------------
 * This endpoint used to import listings from a CSV using `csv-parse/sync`.
 * For the first deployment, we disable it so the build doesn't need that package.
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
