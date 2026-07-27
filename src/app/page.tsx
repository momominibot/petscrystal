import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import MysticHero from "@/components/three/MysticHero";
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

      {/* Fixed 3D watercolor scene behind the three hero acts */}
      <MysticHero />

      {/* Act I — meet the crystal */}
      <section className="relative z-10 flex min-h-screen items-center justify-center pt-20 text-center">
        <div className="copy-veil mx-auto max-w-3xl px-6 py-10">
          <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
            Pets Crystal
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Matching pet crystal jewelry
            <br />
            <span className="text-lavender-dark">for you &amp; your companion</span>
          </h1>
          <p className="mt-1 text-sm text-ink/40">
            Wholesale distributor — partner pricing available
          </p>
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
              Aftercare HQ in Singapore
            </span>
          </div>
          <p className="mt-10 animate-bounce text-xs tracking-[0.25em] text-ink/35 uppercase">
            Scroll to begin ✦
          </p>
        </div>
      </section>

      {/* Act II — the ring of twelve */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="copy-veil max-w-md px-8 py-10">
            <p className="font-serif text-2xl text-gold">✦</p>
            <h2 className="mt-3 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              Twelve healing stones,
              <br />
              <span className="text-lavender-dark">twelve quiet magics</span>
            </h2>
            <p className="mt-5 text-ink-light leading-relaxed">
              Amethyst for anxious hearts. Aquamarine for restless travelers.
              Garnet for the fearless. Each stone in the circle carries its own
              energy — chosen to match the spirit your companion already has.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Act III — the bond */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-6xl justify-end px-6">
          <Reveal className="copy-veil max-w-md px-8 py-10 text-right">
            <p className="font-serif text-2xl text-rose-dark">✦</p>
            <h2 className="mt-3 font-serif text-3xl leading-snug text-ink sm:text-4xl">
              Two pieces,
              <br />
              <span className="text-lavender-dark">one unbreakable bond</span>
            </h2>
            <p className="mt-5 text-ink-light leading-relaxed">
              Cut from the same stone: a bracelet for your wrist, a charm for
              their collar. Wherever the day takes you both, the energy you
              share stays whole.
            </p>
            <Link
              href="#collection"
              className="mt-7 inline-block rounded-full bg-ink px-7 py-3 text-sm text-cream transition-colors hover:bg-indigo"
            >
              Explore the collection
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collection sheet — slides over the 3D scene */}
      <div className="collection-sheet relative z-10">
        <section id="collection" className="border-b border-ink/5">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-14 pb-3 text-sm text-ink-light">
            <span>{products.length} matching crystal sets</span>
            <span>Filter by crystal · chakra · benefit (soon)</span>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <footer className="border-t border-ink/5 py-12 text-center text-sm text-ink-light">
          <p className="font-serif text-lg text-ink">Pets Crystal</p>
          <p className="mt-1">Wholesale Distributor</p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs">
            <Link href="/care" className="hover:text-ink transition-colors">
              Care Promise
            </Link>
            <Link href="/wholesale" className="hover:text-ink transition-colors">
              Wholesale
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink/40">
            Aftercare headquarters in Singapore — hardware changes &amp; crystal
            cleansing. Shipping not included.
          </p>
          <p className="mt-2 text-xs text-ink/30">
            ✦ Crystal energy is complementary — not a substitute for veterinary
            care ✦
          </p>
          <p className="mt-2 text-xs text-ink/20">Designed by Bella&amp;Lisa</p>
        </footer>
      </div>
    </div>
  );
}
