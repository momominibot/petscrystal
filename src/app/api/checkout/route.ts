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

interface Line {
  productId: string;
  variant: VariantKey;
  quantity: number;
}

/** Validate the bag the client sent, rejecting anything we do not sell. */
function parseItems(raw: unknown): { lines: Line[] } | { error: string } {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { error: "Your bag is empty" };
  }
  if (raw.length > 20) return { error: "Too many items" };

  const lines: Line[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return { error: "Invalid request" };
    const { productId, variant, quantity } = item as Record<string, unknown>;
    if (typeof productId !== "string" || !locate(productId)) {
      return { error: "Unknown product" };
    }
    if (typeof variant !== "string" || !VARIANTS.some((v) => v.key === variant)) {
      return { error: "Unknown option" };
    }
    const qty = typeof quantity === "number" ? Math.floor(quantity) : 1;
    if (qty < 1 || qty > 10) return { error: "Invalid quantity" };

    // Merge duplicates rather than sending Stripe two lines for one price.
    const existing = lines.find(
      (l) => l.productId === productId && l.variant === variant
    );
    if (existing) existing.quantity = Math.min(existing.quantity + qty, 10);
    else lines.push({ productId, variant: variant as VariantKey, quantity: qty });
  }
  return { lines };
}

export async function POST(req: NextRequest) {
  let body: { items?: unknown; productId?: unknown; variant?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Accept a bag, or a single {productId, variant} for a straight buy.
  const raw = Array.isArray(body.items)
    ? body.items
    : [{ productId: body.productId, variant: body.variant, quantity: 1 }];

  const parsed = parseItems(raw);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  // Prices come from our own map, never from the request — otherwise a crafted
  // body could buy the pair at the single-piece price.
  const line_items = [];
  for (const l of parsed.lines) {
    const price = priceIdFor(l.productId, l.variant);
    if (!price) {
      return NextResponse.json(
        { error: "That option is not available yet" },
        { status: 409 }
      );
    }
    line_items.push({ price, quantity: l.quantity });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Checkout is not configured" },
      { status: 500 }
    );
  }

  const origin = resolveOrigin(req);
  const back = parsed.lines.length === 1 ? locate(parsed.lines[0].productId)!.path : "/";

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${back}`,
      metadata: {
        bag: parsed.lines
          .map((l) => `${l.productId}:${l.variant}x${l.quantity}`)
          .join(","),
      },
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
