import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET /api/leads  → return latest 50 leads
export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ ok: true, leads });
}

// POST /api/leads  → create a new lead
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() || null;
    const message = body.message?.trim() || null;
    const source = body.source?.trim() || "unknown";

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: { name, email, phone, message, source },
    });

    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
