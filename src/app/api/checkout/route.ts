export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

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

export async function POST(req: NextRequest) {
  let priceId: unknown;
  try {
    ({ priceId } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Only allow price IDs from our own catalog — never trust the client.
  const product = products.find((p) => p.stripePriceId === priceId);
  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
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
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.id}`,
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
