import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Image from "next/image";
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

      {/* Hero — watercolor washes, painted jewelry */}
      <section className="watercolor-bg relative overflow-hidden">
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-2">
          <div className="rise">
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              Pets Crystal · Wholesale distributor
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
              Crystal jewelry
              <br />
              for you &amp;
              <br />
              <span className="text-lavender-dark">your companion</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-light">
              Healing stones, hand-strung in pairs — a bracelet for you, a charm
              for their collar. Cut from the same crystal. One unbreakable bond.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-ink-light">
              <span className="rounded-full border border-ink/10 bg-cream/70 px-4 py-1.5">
                Natural crystals
              </span>
              <span className="rounded-full border border-ink/10 bg-cream/70 px-4 py-1.5">
                Pet-safe design
              </span>
              <span className="rounded-full border border-ink/10 bg-cream/70 px-4 py-1.5">
                Aftercare HQ · Singapore
              </span>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#collection"
                className="inline-flex items-center gap-3 rounded-full bg-indigo px-8 py-4 text-sm text-cream transition-colors hover:bg-ink"
              >
                Explore the collection <span aria-hidden>→</span>
              </Link>
              <Link href="/wholesale" className="brushed text-sm text-ink-light">
                Become a partner
              </Link>
            </div>
          </div>

          {/* Hero painting — composed with its own negative space */}
          <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_70px_-40px_rgba(46,42,71,0.4)]">
            <Image
              src="/art/hero.png"
              alt="Watercolour illustration of a woman embracing her golden retriever"
              width={1376}
              height={768}
              priority
              className="h-full w-full object-cover object-right"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>

      {/* The bond — brand illustration band */}
      <section className="relative overflow-hidden border-y border-ink/5 bg-cream-dark/30">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-20 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.3em] text-ink-light uppercase">
              The bond
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-snug text-ink sm:text-5xl">
              Two pieces,
              <br />
              <span className="text-lavender-dark">one unbreakable bond</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-light">
              Each stone is chosen to match the spirit your companion already
              has — amethyst for anxious hearts, aquamarine for restless
              travelers, garnet for the fearless.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-sm">
              {/* soft pigment bloom grounds the painting */}
              <span
                aria-hidden
                className="absolute inset-0 block"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 48%, rgba(196,181,212,0.45) 0%, transparent 70%)",
                }}
              />
              <Image
                src="/art/product-amethyst-serenity.png"
                alt="Watercolour illustration of a matching amethyst crystal set — a beaded bracelet and a pet collar charm"
                width={880}
                height={1100}
                className="float-soft relative w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Collection sheet — deep indigo */}
      <div className="collection-sheet relative">
        <section id="collection" className="pt-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-medium tracking-[0.3em] text-periwinkle/70 uppercase">
              The collection
            </p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-4xl text-cream sm:text-5xl">
                Matching crystal sets
              </h2>
              <span className="pb-2 text-sm text-periwinkle/70">
                {products.length} sets · filter by crystal · chakra · benefit (soon)
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
          <div className="mx-auto mt-10 max-w-6xl px-6 text-left">
            <p className="text-[10px] leading-relaxed text-periwinkle/40">
              Website powered by{" "}
              <a
                href="https://ranklore.ai"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 transition-colors hover:text-cream"
              >
                ranklore.ai
              </a>
              <br />
              Ranklore Pte Ltd
              <br />
              UEN: 202629679H
              <br />
              7 Temasek Blvd, #12-07 Suntec Tower One, Singapore 038987
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
