export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import { birthPieces } from "@/lib/birth";
import { priceIdFor } from "@/lib/prices";
import { VARIANTS, type VariantKey } from "@/lib/variants";

// Stripe requires absolute success/cancel URLs. Prefer the configured site
// URL, but fall back to the request's own origin so checkout still works on
// preview deployments and before the custom domain resolves.
function resolveOrigin(req: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && /^https?:\/\//.test(configured)) {
    return configured.replace(/\/$/, "");
  }
  const host = req.headers.get("host");
  if (host) {
    const protocol = host.startsWith("localhost") ? "http" : "https";
    return `${protocol}://${host}`;
  }
  return "https://petscrystals.com";
}

/** Which collection a product id belongs to, or null if we do not sell it. */
function locate(productId: string): { path: string } | null {
  if (products.some((p) => p.id === productId)) {
    return { path: `/products/${productId}` };
  }
  if (birthPieces.some((p) => p.id === productId)) {
    return { path: `/birth/${productId}` };
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: { productId?: unknown; variant?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { productId, variant } = body;
  if (typeof productId !== "string" || typeof variant !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Never trust the client for either half: the product must be one of ours,
  // and the variant must be one we actually sell.
  const found = locate(productId);
  if (!found) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }
  if (!VARIANTS.some((v) => v.key === variant)) {
    return NextResponse.json({ error: "Unknown option" }, { status: 400 });
  }

  // The price comes from our own map, never from the request body — otherwise
  // a crafted request could buy the pair at the single-piece price.
  const priceId = priceIdFor(productId, variant as VariantKey);
  if (!priceId) {
    return NextResponse.json(
      { error: "That option is not available yet" },
      { status: 409 }
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is not configured" },
      { status: 500 }
    );
  }

  const origin = resolveOrigin(req);

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1, adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 } }],
      allow_promotion_codes: true,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${found.path}`,
      metadata: { petscrystals_id: productId, variant },
      shipping_address_collection: {
        allowed_countries: [
          "SG",
          "US",
          "GB",
          "AU",
          "CA",
          "MY",
          "HK",
          "JP",
          "KR",
        ],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout failed:", err);
    return NextResponse.json(
      { error: "Could not start checkout" },
      { status: 500 }
    );
  }
}
