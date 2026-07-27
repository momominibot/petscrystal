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
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pt-20">
          <div className="hero-text max-w-2xl">
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              01 — Pets Crystal · Wholesale distributor
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-ink sm:text-7xl lg:text-8xl">
              Crystal jewelry
              <br />
              for you &amp;
              <br />
              <span className="text-indigo-soft">your companion</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-light">
              Twelve healing stones. A bracelet for you, a charm for their
              collar — cut from the same crystal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-light">
              <span className="rounded-full border border-ink/10 bg-cream/60 px-4 py-1.5 backdrop-blur-sm">
                Natural crystals
              </span>
              <span className="rounded-full border border-ink/10 bg-cream/60 px-4 py-1.5 backdrop-blur-sm">
                Pet-safe design
              </span>
              <span className="rounded-full border border-ink/10 bg-cream/60 px-4 py-1.5 backdrop-blur-sm">
                Aftercare HQ · Singapore
              </span>
            </div>
          </div>
        </div>

        {/* Peach-style scroll chip */}
        <div className="absolute right-6 bottom-8 hidden sm:block">
          <div className="rounded-3xl bg-indigo/90 px-8 py-6 text-cream shadow-[0_24px_60px_-24px_rgba(46,42,71,0.6)] backdrop-blur-sm">
            <p className="font-serif text-2xl leading-snug">
              Scroll down
              <br />
              &amp; begin the ritual
            </p>
            <p className="mt-2 animate-bounce text-lg text-periwinkle">✦</p>
          </div>
        </div>
      </section>

      {/* Act II — the ring of twelve */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-6xl justify-end px-6">
          <Reveal className="hero-text max-w-xl text-right">
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              02 — The stones
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-ink sm:text-6xl">
              Twelve healing stones,
              <br />
              <span className="text-indigo-soft">twelve quiet magics</span>
            </h2>
            <p className="mt-6 ml-auto max-w-md text-lg leading-relaxed text-ink-light">
              Amethyst for anxious hearts. Aquamarine for restless travelers.
              Garnet for the fearless. Each stone in the circle carries its own
              energy — chosen to match the spirit your companion already has.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Act III — the bond */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="hero-text max-w-xl">
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              03 — The bond
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-ink sm:text-6xl">
              Two pieces,
              <br />
              <span className="text-indigo-soft">one unbreakable bond</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-light">
              Cut from the same stone: a bracelet for your wrist, a charm for
              their collar. Wherever the day takes you both, the energy you
              share stays whole.
            </p>
            <Link
              href="#collection"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-indigo px-8 py-4 text-sm text-cream transition-colors hover:bg-ink"
            >
              Explore the collection <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collection sheet — deep indigo, slides over the 3D scene */}
      <div className="collection-sheet relative z-10">
        <section id="collection" className="pt-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-medium tracking-[0.3em] text-periwinkle/70 uppercase">
              The collection
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-4xl text-cream sm:text-5xl">
                {products.length} matching crystal sets
              </h2>
              <span className="pb-2 text-sm text-periwinkle/70">
                Filter by crystal · chakra · benefit (soon)
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <footer className="border-t border-cream/10 py-14 text-center text-sm text-periwinkle/80">
          <p className="font-serif text-lg text-cream">Pets Crystal</p>
          <p className="mt-1">Wholesale Distributor</p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs">
            <Link href="/care" className="transition-colors hover:text-cream">
              Care Promise
            </Link>
            <Link href="/wholesale" className="transition-colors hover:text-cream">
              Wholesale
            </Link>
          </div>
          <p className="mt-4 text-xs text-periwinkle/60">
            Aftercare headquarters in Singapore — hardware changes &amp; crystal
            cleansing for our customers. Shipping not included.
          </p>
          <p className="mt-2 text-xs text-periwinkle/50">
            ✦ Crystal energy is complementary — not a substitute for veterinary
            care ✦
          </p>
          <p className="mt-2 text-xs text-periwinkle/40">
            Designed by Bella&amp;Lisa
          </p>
        </footer>
      </div>
    </div>
  );
}
