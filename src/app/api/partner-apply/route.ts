export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

/**
 * Receives partnership applications. Each application is logged and appended
 * to data/partner-applications.jsonl for the founder to review — approval is
 * manual: review the application, then send the approved partner the
 * dashboard password (WHOLESALE_PASSWORD).
 *
 * NOTE: on serverless hosts the file write is best-effort (ephemeral disk) —
 * the console log always fires, and hooking up an email notification or DB is
 * the production upgrade path.
 */
export async function POST(req: NextRequest) {
  const { business, name, email, country, program, message } = await req.json();

  if (!business || !name || !email || !country) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const application = {
    business: String(business).slice(0, 200),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    country: String(country).slice(0, 100),
    program: String(program ?? "").slice(0, 50),
    message: String(message ?? "").slice(0, 2000),
    receivedAt: new Date().toISOString(),
  };

  console.log("[partner-apply]", JSON.stringify(application));

  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "partner-applications.jsonl"),
      JSON.stringify(application) + "\n"
    );
  } catch {
    // Ephemeral filesystem (serverless) — the log line above still captured it.
  }

  return NextResponse.json({ ok: true });
}
