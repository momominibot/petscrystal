import { NextResponse } from "next/server";
import { etsyRequest } from "@/lib/etsy";

export const dynamic = "force-dynamic";

/**
 * A deliberately minimal connection check. It confirms the server can use the
 * stored Etsy authorization without returning tokens, shop IDs, or listings.
 */
export async function GET() {
  try {
    const shopLookup = await etsyRequest("/shops?shop_name=petscrystals&limit=1");
    if (!shopLookup.ok) {
      console.error("Etsy health request was rejected", {
        status: shopLookup.status,
        detail: (await shopLookup.text()).slice(0, 500),
      });
      return NextResponse.json({ connected: false }, { status: 502 });
    }

    const lookup = (await shopLookup.json()) as {
      results?: Array<{ shop_id?: number }>;
    };
    const shopId = lookup.results?.[0]?.shop_id;
    if (!shopId) return NextResponse.json({ connected: false }, { status: 502 });

    const listings = await etsyRequest(`/shops/${shopId}/listings/active?limit=1`);
    if (!listings.ok) {
      console.error("Etsy listing access was rejected", {
        status: listings.status,
        detail: (await listings.text()).slice(0, 500),
      });
      return NextResponse.json({ connected: false }, { status: 502 });
    }

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
