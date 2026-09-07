import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/lib/products";
import { birthPieces } from "@/lib/birth";
import { everydayCollars } from "@/lib/everyday";

export const dynamic = "force-dynamic";

const CURRENCY = "usd";
const VARIANTS = [
  { key: "pet" as const, label: "For Them", amount: 8900 },
  { key: "owner" as const, label: "For You", amount: 6900 },
  { key: "set" as const, label: "Together", amount: 10900 },
];

interface CatalogueItem {
  id: string;
  name: string;
  description: string;
  collection: string;
  variants?: { key: "pet"; label: string; amount: number }[];
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-token");
  if (auth !== process.env.ADMIN_SYNC_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // Build catalogue from the site's own data files
  const tether = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: `${p.tagline} — ${p.crystal}.`,
    collection: "The Tether Collection",
  }));

  const birth = birthPieces.map((b) => ({
    id: b.id,
    name: `${b.month} — ${b.stone}`,
    description: `${b.tagline} — ${b.stone} for ${b.meaning.toLowerCase()}.`,
    collection: "The Birth Collection",
  }));

  const everyday = everydayCollars.map((e) => ({
    id: e.id,
    name: `${e.name} — ${e.stone}`,
    description: `${e.tagline} — ${e.strap.toLowerCase()} leather with ${e.stone.toLowerCase()}.`,
    collection: "The Everyday Collection",
    variants: [{ key: "pet" as const, label: "The collar", amount: e.price * 100 }],
  }));

  const catalogue: CatalogueItem[] = [...tether, ...birth, ...everyday];
  const priceMap: Record<string, Record<string, string>> = {};
  const log: string[] = [];

  for (const item of catalogue) {
    // Find or create product
    const found = await stripe.products.search({
      query: `metadata['petscrystals_id']:'${item.id}'`,
      limit: 1,
    });
    let product = found.data[0];
    let action = product ? "reused" : "created";

    if (!product) {
      product = await stripe.products.create({
        name: `${item.name} — ${item.collection}`,
        description: item.description,
        metadata: { petscrystals_id: item.id, collection: item.collection },
      });
    } else {
      await stripe.products.update(product.id, {
        name: `${item.name} — ${item.collection}`,
        description: item.description,
      });
    }

    priceMap[item.id] = {};
    const itemVariants = item.variants ?? VARIANTS;

    for (const v of itemVariants) {
      const existing = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 100,
      });
      const match = existing.data.find(
        (p) =>
          p.metadata?.petscrystals_variant === v.key &&
          p.unit_amount === v.amount &&
          p.currency === CURRENCY
      );

      let price = match;
      let priceAction = "reused";
      if (!price) {
        for (const p of existing.data) {
          if (p.metadata?.petscrystals_variant === v.key) {
            await stripe.prices.update(p.id, { active: false });
          }
        }
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: v.amount,
          currency: CURRENCY,
          nickname: `${item.name} — ${v.label}`,
          metadata: { petscrystals_variant: v.key, petscrystals_id: item.id },
        });
        priceAction = "created";
      }

      priceMap[item.id][v.key] = price.id;
      log.push(`${item.id} ${v.key} $${v.amount / 100} ${priceAction} ${price.id}`);
    }
    log.push(`${item.id} product ${action}`);
  }

  return NextResponse.json({
    ok: true,
    designs: catalogue.length,
    priceMap,
    log,
  });
}
