import { NextResponse } from "next/server";
import { etsyRequest } from "@/lib/etsy";

export const dynamic = "force-dynamic";

/**
 * A deliberately minimal connection check. It confirms the server can use the
 * stored Etsy authorization without returning tokens, shop IDs, or listings.
 */
export async function GET() {
  try {
    const response = await etsyRequest("/users/__SELF__/shops");
    if (!response.ok) {
      return NextResponse.json({ connected: false }, { status: 502 });
    }
    const payload = (await response.json()) as { count?: number; results?: unknown[] };
    return NextResponse.json({
      connected: true,
      shops: typeof payload.count === "number" ? payload.count : payload.results?.length ?? 0,
    });
  } catch {
    return NextResponse.json({ connected: false }, { status: 503 });
  }
}
