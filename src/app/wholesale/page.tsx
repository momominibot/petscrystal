import { cookies } from "next/headers";
import { wholesaleTiers } from "@/lib/products";
import WholesaleClient from "./WholesaleClient";

export default async function WholesalePage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("wholesale_access")?.value === "granted";

  if (!hasAccess) {
    return <WholesaleClient tiers={wholesaleTiers} />;
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
          Wholesale Portal
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink">
          Pets Crystal
        </h1>
        <p className="mt-3 text-ink-light max-w-lg">
          Wholesale distributor of matching human-pet crystal jewelry. Tiered
          pricing for retailers, boutiques, and distributors.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wholesaleTiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl border border-ink/5 bg-cream-dark/50 p-6"
            >
              <h3 className="font-serif text-lg text-ink">{tier.name}</h3>
              <p className="mt-2 font-serif text-3xl text-ink">
                {tier.discount}
              </p>
              <div className="mt-4 space-y-1 text-sm text-ink-light">
                <p>
                  <span className="font-medium text-ink">From:</span> {tier.price}
                </p>
                <p>
                  <span className="font-medium text-ink">Min order:</span>{" "}
                  {tier.minOrder}
                </p>
                <p>
                  <span className="font-medium text-ink">Margin:</span>{" "}
                  {tier.margin}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-ink/5 bg-cream-dark/30 p-8 text-center">
          <p className="font-serif text-2xl text-ink">✦</p>
          <p className="mt-4 text-ink-light">
            To place a wholesale order or inquire about distribution, contact us
            directly.
          </p>
          <p className="mt-2 font-serif text-lg text-ink">
            wholesale@petscrystal.co
          </p>
        </div>
      </div>
    </div>
  );
}
