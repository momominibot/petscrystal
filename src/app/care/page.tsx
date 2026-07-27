import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Care Promise — Free Annual Crystal Refresh | Pets Crystal",
  description:
    "Every Pets Crystal set includes one free annual refresh. We cleanse, recharge, and inspect your matching crystal jewelry. Aftercare and hardware replacement included.",
};

export default function CarePage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
          The Care Promise
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">
          We keep your bond shining
        </h1>
        <p className="mt-4 text-lg text-ink-light leading-relaxed">
          Crystal jewelry worn daily — by you and by your animal — deserves care.
          Every Pets Crystal set includes one free annual refresh. We clean. We
          recharge. We make sure your piece stays as intentional as the day you
          first wore it together.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink/5 bg-cream-dark/50 p-6">
            <p className="font-serif text-2xl text-gold">✦</p>
            <h3 className="mt-3 font-serif text-lg text-ink">
              Deep Cleanse & Recharge
            </h3>
            <p className="mt-2 text-sm text-ink-light leading-relaxed">
              We clear accumulated energy, cleanse with intention, and recharge
              your crystals so they work at full strength — for both of you.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/5 bg-cream-dark/50 p-6">
            <p className="font-serif text-2xl text-gold">✦</p>
            <h3 className="mt-3 font-serif text-lg text-ink">
              Hardware Refresh
            </h3>
            <p className="mt-2 text-sm text-ink-light leading-relaxed">
              Clasps, findings, and connectors inspected and replaced at no
              charge. If something feels loose, we fix it before it breaks.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/5 bg-cream-dark/50 p-6">
            <p className="font-serif text-2xl text-gold">✦</p>
            <h3 className="mt-3 font-serif text-lg text-ink">
              Polish & Inspection
            </h3>
            <p className="mt-2 text-sm text-ink-light leading-relaxed">
              Your piece comes back conditioned, polished, and inspected. We
              check every stone, every link, every detail before it returns to
              you.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-ink/5 bg-cream-dark/30 p-8">
          <h2 className="font-serif text-xl text-ink">What&apos;s included</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-light">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Crystal energy cleansing and recharging
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Hardware inspection and replacement (clasps, findings, connectors)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Surface polish and conditioning
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Full inspection report
            </li>
          </ul>

          <h2 className="mt-8 font-serif text-xl text-ink">
            What&apos;s not covered
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-light">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-ink/20">—</span>
              Wear and tear, scratches, natural crystal patina
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-ink/20">—</span>
              Lost or damaged beyond repair pieces
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-ink/20">—</span>
              Damage from misuse or accidents
            </li>
          </ul>

          <h2 className="mt-8 font-serif text-xl text-ink">
            Paid upgrades (optional)
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-ink-light">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Strap or band replacement — $19
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Custom engraving — $15
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-gold">✦</span>
              Upgrade to any new collection — 20% off
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-lavender/30 bg-lavender/10 p-8 text-center">
          <p className="font-serif text-xl text-ink">
            How it works
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-ink-light">
            <div>
              <p className="font-serif text-lg text-gold">1</p>
              <p className="mt-1">
                Email us at{" "}
                <a
                  href="mailto:aftercare@petscrystals.com"
                  className="text-ink underline underline-offset-2"
                >
                  aftercare@petscrystals.com
                </a>
              </p>
            </div>
            <div>
              <p className="font-serif text-lg text-gold">2</p>
              <p className="mt-1">
                Ship your set to our Singapore headquarters — all hardware
                changes and crystal cleansing are done in-house (shipping not
                included)
              </p>
            </div>
            <div>
              <p className="font-serif text-lg text-gold">3</p>
              <p className="mt-1">
                We return it refreshed within 7 business days
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-all hover:border-ink/30"
          >
            ← Back to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
