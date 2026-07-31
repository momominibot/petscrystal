/**
 * Create or update the Stripe catalogue for both collections, three prices each.
 *
 *   For Them  (pet piece)              USD  89
 *   For You   (owner piece)            USD  69
 *   Together  (both, the pair price)   USD 109
 *
 * One Stripe *product* per design, three *prices* on it. Idempotent: products
 * are matched on the `petscrystals_id` metadata key and prices on a
 * `petscrystals_variant` key, so re-running never creates duplicates. Stripe
 * prices are immutable — if an amount has changed, the old price is deactivated
 * and a new one created.
 *
 * Run it yourself so the secret key never leaves your machine:
 *
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/stripe-sync.mjs
 *
 * Add --dry to see what it would do without writing anything.
 */
import Stripe from "stripe";
import { readFileSync, writeFileSync } from "node:fs";

const CURRENCY = "usd";
const DRY = process.argv.includes("--dry");

// Keep in step with src/lib/variants.ts.
const VARIANTS = [
  { key: "pet", label: "For Them", amount: 8900 },
  { key: "owner", label: "For You", amount: 6900 },
  { key: "set", label: "Together", amount: 10900 },
];

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set. See the header of this file.");
  process.exit(1);
}
console.log(
  `mode: ${key.startsWith("sk_live") ? "LIVE" : "TEST"}${DRY ? "  (dry run)" : ""}`
);

const stripe = new Stripe(key);
const url = (p) => new URL(p, import.meta.url);

// Read both catalogues straight out of the site so they cannot drift.
const tetherSrc = readFileSync(url("../src/lib/products.ts"), "utf8");
const tether = [
  ...tetherSrc.matchAll(
    /id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?tagline:\s*"([^"]+)"[\s\S]*?crystal:\s*"([^"]+)"/g
  ),
].map(([, id, name, tagline, crystal]) => ({
  id,
  name,
  description: `${tagline} — ${crystal}.`,
  collection: "The Tether Collection",
}));

const birthSrc = readFileSync(url("../src/lib/birth.ts"), "utf8");
const birth = [
  ...birthSrc.matchAll(
    /id:\s*"([^"]+)"[\s\S]*?month:\s*"([^"]+)"[\s\S]*?stone:\s*"([^"]+)"[\s\S]*?meaning:\s*"([^"]+)"[\s\S]*?tagline:\s*"([^"]+)"/g
  ),
].map(([, id, month, stone, meaning, tagline]) => ({
  id,
  name: `${month} — ${stone}`,
  description: `${tagline} — ${stone} for ${meaning.toLowerCase()}.`,
  collection: "The Birth Collection",
}));

const catalogue = [...tether, ...birth];
if (catalogue.length === 0) {
  console.error("Could not parse any designs. Check the two lib files.");
  process.exit(1);
}
console.log(
  `${tether.length} Tether + ${birth.length} Birth = ${catalogue.length} designs`
);
console.log(`${catalogue.length * VARIANTS.length} prices total\n`);

async function findProduct(id) {
  const found = await stripe.products.search({
    query: `metadata['petscrystals_id']:'${id}'`,
    limit: 1,
  });
  return found.data[0] ?? null;
}

const priceMap = {};

for (const item of catalogue) {
  let product = await findProduct(item.id);
  let action = product ? "reused" : "created";

  if (!product) {
    if (DRY) {
      console.log(`${item.id.padEnd(28)} would CREATE product`);
    } else {
      product = await stripe.products.create({
        name: `${item.name} — ${item.collection}`,
        description: item.description,
        metadata: { petscrystals_id: item.id, collection: item.collection },
      });
    }
  } else if (!DRY) {
    await stripe.products.update(product.id, {
      name: `${item.name} — ${item.collection}`,
      description: item.description,
    });
  }

  priceMap[item.id] = {};

  for (const v of VARIANTS) {
    if (DRY) {
      console.log(
        `  ${item.id.padEnd(26)} ${v.key.padEnd(6)} would ensure ${v.amount / 100} ${CURRENCY}`
      );
      priceMap[item.id][v.key] = "";
      continue;
    }

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
      // Retire any stale price for this variant before creating the new one.
      for (const p of existing.data) {
        if (p.metadata?.petscrystals_variant === v.key) {
          await stripe.prices.update(p.id, { active: false });
          console.log(`   retired ${p.id} (${p.unit_amount} ${p.currency})`);
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
    console.log(
      `  ${item.id.padEnd(26)} ${v.key.padEnd(6)} ${String(v.amount / 100).padStart(3)} ${CURRENCY}  ${priceAction.padEnd(7)} ${price.id}`
    );
  }

  console.log(`${item.id.padEnd(28)} product ${action}\n`);
}

if (DRY) {
  console.log("\nDry run — nothing was written to Stripe.");
  process.exit(0);
}

// Write the price IDs into src/lib/prices.ts so the site and Stripe agree.
const body = `/**
 * Stripe price IDs, one per design per variant.
 *
 * GENERATED by scripts/stripe-sync.mjs — do not edit by hand. Re-run the
 * script after any price change. An empty string means that variant has not
 * been created in Stripe yet; the checkout route treats it as unavailable
 * rather than sending a broken session to Stripe.
 */
import type { VariantKey } from "./variants";

export type PriceMap = Record<string, Partial<Record<VariantKey, string>>>;

export const stripePrices: PriceMap = ${JSON.stringify(priceMap, null, 2)};

export function priceIdFor(productId: string, variant: VariantKey): string | null {
  return stripePrices[productId]?.[variant] || null;
}

/** The variants that currently have a Stripe price for this design. */
export function availableVariants(productId: string): VariantKey[] {
  const row = stripePrices[productId] ?? {};
  return (Object.keys(row) as VariantKey[]).filter((k) => !!row[k]);
}
`;
writeFileSync(url("../src/lib/prices.ts"), body);
console.log(
  `\nsrc/lib/prices.ts written — ${Object.keys(priceMap).length} designs, ${Object.keys(priceMap).length * VARIANTS.length} prices.`
);
console.log("Commit it, then deploy.");
