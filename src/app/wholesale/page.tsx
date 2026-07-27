import { cookies } from "next/headers";
import { partnerPrograms, products, wholesaleTiers } from "@/lib/products";
import WholesaleClient from "./WholesaleClient";

export default async function WholesalePage() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("wholesale_access")?.value === "granted";

  if (!hasAccess) {
    return <WholesaleClient programs={partnerPrograms} />;
  }

  const discounts: Record<string, number> = {
    Dropship: 0.1,
    "Retail Partner": 0.2,
    Boutique: 0.3,
    Distributor: 0.4,
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
          Distributor Dashboard
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Welcome, partner ✦</h1>
        <p className="mt-3 max-w-lg text-ink-light">
          Everything below is confidential partner information — please
          don&apos;t share pricing publicly.
        </p>

        {/* The three programs, with real terms */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {partnerPrograms.map((p) => (
            <div key={p.id} className="rounded-2xl border border-ink/5 bg-cream-dark/50 p-6">
              <h3 className="font-serif text-lg text-ink">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-lavender-dark">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-light">
                {p.dashboardDetail}
              </p>
            </div>
          ))}
        </div>

        {/* Wholesale tiers */}
        <h2 className="mt-14 font-serif text-2xl text-ink">Wholesale tiers</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wholesaleTiers.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-ink/5 bg-cream-dark/50 p-6">
              <h3 className="font-serif text-lg text-ink">{tier.name}</h3>
              <p className="mt-2 font-serif text-3xl text-ink">{tier.discount}</p>
              <div className="mt-4 space-y-1 text-sm text-ink-light">
                <p><span className="font-medium text-ink">From:</span> {tier.price}</p>
                <p><span className="font-medium text-ink">Min order:</span> {tier.minOrder}</p>
                <p><span className="font-medium text-ink">Margin:</span> {tier.margin}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Full price list */}
        <h2 className="mt-14 font-serif text-2xl text-ink">Price list — all 12 sets</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-ink/5">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-cream-dark/60 text-ink">
              <tr>
                <th className="px-5 py-3 font-medium">Set</th>
                <th className="px-5 py-3 font-medium">MSRP</th>
                {wholesaleTiers.map((t) => (
                  <th key={t.name} className="px-5 py-3 font-medium">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-ink-light">
              {products.map((p, i) => (
                <tr key={p.id} className={i % 2 ? "bg-cream-dark/25" : ""}>
                  <td className="px-5 py-3 text-ink">{p.name}</td>
                  <td className="px-5 py-3">${p.price}</td>
                  {wholesaleTiers.map((t) => (
                    <td key={t.name} className="px-5 py-3">
                      ${(p.price * (1 - discounts[t.name])).toFixed(0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aftercare & logistics */}
        <div className="mt-14 rounded-2xl border border-lavender/30 bg-lavender/10 p-8">
          <h2 className="font-serif text-2xl text-ink">Aftercare &amp; logistics</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-light">
            <li className="flex gap-2">
              <span className="text-gold">✦</span>
              Aftercare headquarters: <span className="text-ink">Singapore</span> —
              all hardware changes and crystal cleansing are handled in-house.
            </li>
            <li className="flex gap-2">
              <span className="text-gold">✦</span>
              Shipping is not included in any program — freight to and from
              Singapore is billed at cost.
            </li>
            <li className="flex gap-2">
              <span className="text-gold">✦</span>
              Turnaround for aftercare service: 7 business days from receipt.
            </li>
          </ul>
        </div>

        <div className="mt-12 rounded-2xl border border-ink/5 bg-cream-dark/30 p-8 text-center">
          <p className="font-serif text-2xl text-ink">✦</p>
          <p className="mt-4 text-ink-light">
            To place an order or discuss your program, contact us directly.
          </p>
          <p className="mt-2 font-serif text-lg text-ink">wholesale@petscrystal.co</p>
        </div>
      </div>
    </div>
  );
}
