import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
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
          <p className="mx-auto mt-6 max-w-lg text-ink-light leading-relaxed">
            Twelve stones. Two matching pieces — a bracelet for you, a charm for
            their collar. One stone, cut in two, so that what you wear and what
            they wear come from the same place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-light">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sage"></span>
              Natural gemstone
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-dark"></span>
              Breakaway-safe design
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
              Ships worldwide
            </span>
          </div>
          <div className="mt-9">
            <Link
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85"
            >
              Find your stone
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>
          <p className="mt-8 font-serif text-2xl text-ink/20">✦</p>
        </div>
      </section>

      {/* Collection meta */}
      <section className="border-y border-ink/5 bg-cream-dark/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm text-ink-light">
          <span>{products.length} matching crystal sets</span>
          <span>$79 – $89 · both pieces included</span>
        </div>
      </section>

      {/* Product grid */}
      <section id="collection" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-ink">
            Twelve stones. One bond.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-light">
            Each set is a single stone cut into two pieces — a bracelet for you,
            a charm for their collar.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Reassurance */}
      <section className="border-t border-ink/5 bg-cream-dark/30">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-3 text-center">
          <div>
            <p className="font-serif text-xl text-ink">Made to be worn safely</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              Smooth-polished stones, breakaway-safe hardware, and a three-day
              introduction guide in every box.
            </p>
          </div>
          <div>
            <p className="font-serif text-xl text-ink">Honest about the science</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              We don&apos;t claim crystals heal. We do believe a shared object is a
              reminder to be present.{" "}
              <Link href="/about" className="text-ink underline underline-offset-4">
                Why
              </Link>
            </p>
          </div>
          <div>
            <p className="font-serif text-xl text-ink">Thirty days to decide</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              Ships worldwide from Singapore. If it isn&apos;t right for either of
              you, send it back.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
