import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(products)),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 text-center">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, var(--color-lavender) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
            Pets Crystal
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Matching pet crystal jewelry
            <br />
            <span className="text-lavender-dark">for you & your companion</span>
          </h1>
          <p className="mt-1 text-sm text-ink/40">Wholesale distributor — partner pricing available</p>
          <p className="mx-auto mt-6 max-w-lg text-ink-light leading-relaxed">
            Twelve healing stones. Two matching pieces — a bracelet for you, a
            charm for their collar. One unbreakable bond. Handcrafted crystal
            jewelry designed to be worn together.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-ink-light">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage"></span>
              Natural crystals
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-dark"></span>
              Pet-safe design
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
              Free shipping over $150
            </span>
          </div>
          <p className="mt-6 font-serif text-2xl text-ink/20">✦</p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-y border-ink/5 bg-cream-dark/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm text-ink-light">
          <span>{products.length} matching crystal sets</span>
          <span>Filter by crystal · chakra · benefit (soon)</span>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/5 py-12 text-center text-sm text-ink-light">
        <p className="font-serif text-lg text-ink">Pets Crystal</p>
        <p className="mt-1">Wholesale Distributor</p>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs">
          <Link href="/care" className="hover:text-ink transition-colors">Care Promise</Link>
          <Link href="/wholesale" className="hover:text-ink transition-colors">Wholesale</Link>
        </div>
        <p className="mt-4 text-xs text-ink/30">
          ✦ Crystal energy is complementary — not a substitute for veterinary
          care ✦
        </p>
        <p className="mt-2 text-xs text-ink/20">
          Designed by Bella&amp;Lisa
        </p>
      </footer>
    </div>
  );
}
