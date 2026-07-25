export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password === process.env.WHOLESALE_PASSWORD) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("wholesale_access", "granted", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
}
