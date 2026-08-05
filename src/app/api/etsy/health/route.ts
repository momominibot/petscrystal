import { NextResponse } from "next/server";
import { etsyRequest } from "@/lib/etsy";

export const dynamic = "force-dynamic";

/**
 * A deliberately minimal connection check. It confirms the server can use the
 * stored Etsy authorization without returning tokens, shop IDs, or listings.
 */
export async function GET() {
  try {
    const response = await etsyRequest("/users/__SELF__");
    if (!response.ok) {
      console.error("Etsy health request was rejected", { status: response.status });
      return NextResponse.json({ connected: false }, { status: 502 });
    }
    await response.json();
    return NextResponse.json({
      connected: true,
    });
  } catch (error) {
    console.error("Etsy health request could not run", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ connected: false }, { status: 503 });
  }
}
