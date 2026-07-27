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

      {/* Fixed 3D descent behind the four hero acts */}
      <MysticHero />

      {/* Act I — the galaxy */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pt-20">
          <div className="hero-text-dark max-w-2xl">
            <p className="text-xs font-medium tracking-[0.3em] text-periwinkle/80 uppercase">
              01 — Pets Crystal · Wholesale distributor
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] text-cream sm:text-7xl lg:text-8xl">
              Every stone
              <br />
              begins as
              <br />
              <span className="text-periwinkle-deep">starlight</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-periwinkle">
              Twelve healing crystals, each holding a small spirit of light —
              waiting for the companion they belong to.
            </p>
          </div>
        </div>

        {/* Peach-style scroll chip */}
        <div className="absolute right-6 bottom-8 hidden sm:block">
          <div className="rounded-3xl bg-cream/90 px-8 py-6 text-indigo shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <p className="font-serif text-2xl leading-snug">
              Scroll down
              <br />
              &amp; follow them home
            </p>
            <p className="mt-2 animate-bounce text-lg text-lavender-dark">✦</p>
          </div>
        </div>
      </section>

      {/* Act II — the sky */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-6xl justify-end px-6">
          <Reveal className="hero-text max-w-xl text-right">
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              02 — The descent
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-ink sm:text-6xl">
              They fall
              <br />
              <span className="text-indigo-soft">to find you</span>
            </h2>
            <p className="mt-6 ml-auto max-w-md text-lg leading-relaxed text-ink-light">
              Through the morning sky the spirit stones descend — amethyst for
              anxious hearts, aquamarine for restless travelers, garnet for the
              fearless.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Act III — the meadow */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="hero-text max-w-xl">
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              03 — The green world
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-ink sm:text-6xl">
              Down to the land
              <br />
              <span className="text-indigo-soft">where they wait</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-light">
              Each stone is chosen to match the spirit your companion already
              has — twelve energies, twelve quiet magics, grounded at last.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Act IV — the bond made real */}
      <section className="relative z-10 flex min-h-screen items-end pb-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="hero-text-dark max-w-xl">
            <p className="text-xs font-medium tracking-[0.3em] text-cream/80 uppercase">
              04 — The bond
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.02] text-cream sm:text-6xl">
              Worn by the ones
              <br />
              <span className="text-gold-light">we love</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/90">
              The spirit stones become a necklace for their collar — and a
              matching bracelet for you. Cut from the same crystal. One
              unbreakable bond.
            </p>
            <Link
              href="#collection"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm text-indigo transition-colors hover:bg-gold-light"
            >
              Explore the collection <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collection sheet — deep indigo, slides over the scene */}
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
