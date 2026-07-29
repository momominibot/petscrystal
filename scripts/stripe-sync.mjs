/**
 * Create or update the Stripe catalogue so every design sells at USD 89.
 *
 * Idempotent: products are matched by the `petscrystals_id` metadata key, not
 * by name, so re-running never creates duplicates. An existing price is reused
 * when it is already 8900 USD; otherwise a new price is created and the old one
 * is deactivated (Stripe prices are immutable, they cannot be edited in place).
 *
 * Run it yourself so the secret key never leaves your machine:
 *
 *   STRIPE_SECRET_KEY=sk_live_xxx node scripts/stripe-sync.mjs
 *
 * Add --dry to see what it would do without writing anything.
 */
import Stripe from "stripe";
import { readFileSync, writeFileSync } from "node:fs";

const AMOUNT = 8900; // USD 89.00, in cents
const CURRENCY = "usd";
const DRY = process.argv.includes("--dry");

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set. See the header of this file.");
  process.exit(1);
}
console.log(`mode: ${key.startsWith("sk_live") ? "LIVE" : "TEST"}${DRY ? "  (dry run)" : ""}`);

const stripe = new Stripe(key);

// Read the catalogue straight out of the site so the two cannot drift.
const src = readFileSync(new URL("../src/lib/products.ts", import.meta.url), "utf8");
const catalogue = [...src.matchAll(/id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?tagline:\s*"([^"]+)"[\s\S]*?crystal:\s*"([^"]+)"/g)]
  .map(([, id, name, tagline, crystal]) => ({ id, name, tagline, crystal }));

if (catalogue.length === 0) {
  console.error("Could not parse any products from src/lib/products.ts");
  process.exit(1);
}
console.log(`${catalogue.length} designs in the catalogue\n`);

async function findProduct(id) {
  const found = await stripe.products.search({
    query: `metadata['petscrystals_id']:'${id}'`,
    limit: 1,
  });
  return found.data[0] ?? null;
}

async function livePriceAt(productId) {
  const prices = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  return prices.data.find(
    (p) => p.unit_amount === AMOUNT && p.currency === CURRENCY && !p.recurring
  ) ?? null;
}

const results = [];

for (const item of catalogue) {
  let product = await findProduct(item.id);
  let action = "reused";

  if (!product) {
    action = "created";
    if (!DRY) {
      product = await stripe.products.create({
        name: `${item.name} — Matching Pet Crystal Set`,
        description: `${item.tagline}. A ${item.crystal} bracelet for you and a matching collar charm for them.`,
        metadata: { petscrystals_id: item.id },
        url: `https://petscrystals.com/products/${item.id}`,
        shippable: true,
      });
    }
  }

  let price = product && !DRY ? await livePriceAt(product.id) : null;
  let priceAction = price ? "reused" : "created";

  if (!price && !DRY && product) {
    // Retire any active price that is not USD 89 so checkout cannot pick it up.
    const stale = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
    for (const p of stale.data) {
      if (p.unit_amount !== AMOUNT || p.currency !== CURRENCY) {
        await stripe.prices.update(p.id, { active: false });
        console.log(`   retired stale price ${p.id} (${p.unit_amount} ${p.currency})`);
      }
    }
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: AMOUNT,
      currency: CURRENCY,
    });
  }

  results.push({ id: item.id, priceId: price?.id ?? "(dry run)" });
  console.log(`${item.id.padEnd(20)} product ${action.padEnd(8)} price ${priceAction.padEnd(8)} ${price?.id ?? ""}`);
}

if (DRY) {
  console.log("\nDry run — nothing was written to Stripe.");
  process.exit(0);
}

// Write the price IDs back into products.ts so the site and Stripe agree.
let updated = src;
for (const { id, priceId } of results) {
  const block = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?stripePriceId:\\s*")[^"]+(")`);
  updated = updated.replace(block, `$1${priceId}$2`);
}
writeFileSync(new URL("../src/lib/products.ts", import.meta.url), updated);
console.log("\nsrc/lib/products.ts updated with the live price IDs.");
