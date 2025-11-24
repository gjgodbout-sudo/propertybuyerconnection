import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/test-add",
    message: "GET works!",
    time: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name || "Anonymous";

    const record = await prisma.testRecord.create({
      data: { name },
    });

    return NextResponse.json({ ok: true, record });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}
