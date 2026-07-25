import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PetPicker from "@/components/PetPicker";

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(products)),
        }}
      />

      {/* ============ Hero ============ */}
      <section className="paper relative overflow-hidden pt-28 pb-16 sm:pt-32">
        <div
          aria-hidden
          className="wash drift absolute -left-24 top-10 h-80 w-80 bg-periwinkle"
        />
        <div
          aria-hidden
          className="wash drift absolute -right-16 top-40 h-72 w-72 bg-blush"
          style={{ animationDelay: "-8s" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-6">
          <div className="rise order-2 text-center md:order-1 md:text-left">
            <p className="eyebrow text-ink-light">Love · Companion · Healing</p>
            <h1 className="display rule rule-center mt-6 font-serif text-[2.6rem] text-indigo sm:text-6xl md:text-left">
              One stone,
              <br />
              cut in two.
            </h1>
            <p className="mx-auto mt-8 max-w-md leading-relaxed text-ink-light md:mx-0">
              A bracelet for you. A charm for their collar. Both halves come
              from the same stone — so what you wear and what they wear began in
              one place.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5 md:justify-start">
              <Link
                href="#collection"
                className="inline-flex items-center gap-2 rounded-full bg-indigo px-7 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-indigo-soft"
              >
                Find your stone
                <span aria-hidden className="text-lg leading-none">
                  →
                </span>
              </Link>
              <Link href="/about" className="brushed text-sm text-indigo">
                Why we make these
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <Image
              src="/art/hero.png"
              alt="Watercolour illustration of a woman sitting with her golden retriever leaning against her"
              width={1376}
              height={768}
              priority
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ============ 01 — The idea ============ */}
      <section className="border-y border-ink/5 bg-mist">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="text-center">
              <p className="font-serif text-5xl text-periwinkle-deep">01</p>
              <h2 className="rule rule-center mt-4 font-serif text-3xl text-indigo sm:text-4xl">
                Worn together
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              {
                icon: "gem",
                t: "One stone",
                d: "Each set is cut from a single piece, then split — never two stones that merely match.",
              },
              {
                icon: "paw",
                t: "Two wearers",
                d: "A bracelet sized for your wrist, a charm that clips to any collar up to an inch.",
              },
              {
                icon: "heart",
                t: "One habit",
                d: "Something shared is a reminder to sit down and pay attention to them.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 110}>
                <div className="text-center">
                  <Image
                    src={`/art/pet-${item.icon}.png`}
                    alt=""
                    width={128}
                    height={128}
                    className="mx-auto h-16 w-16"
                  />
                  <h3 className="mt-5 font-serif text-xl text-indigo">
                    {item.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-light">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 02 — Pet picker ============ */}
      <section className="paper relative overflow-hidden">
        <div
          aria-hidden
          className="wash drift absolute right-0 top-20 h-72 w-72 bg-periwinkle"
          style={{ animationDelay: "-14s" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="text-center">
              <p className="font-serif text-5xl text-periwinkle-deep">02</p>
              <h2 className="rule rule-center mt-4 font-serif text-3xl text-indigo sm:text-4xl">
                Who is waiting at home?
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-light">
                Not a science — just a place to start.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <PetPicker />
          </Reveal>
        </div>
      </section>

      {/* ============ 03 — Collection ============ */}
      <section
        id="collection"
        className="scroll-mt-20 border-t border-ink/5 bg-mist"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <div className="text-center">
              <p className="font-serif text-5xl text-periwinkle-deep">03</p>
              <h2 className="rule rule-center mt-4 font-serif text-3xl text-indigo sm:text-4xl">
                Twelve stones
              </h2>
              <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-light">
                {products.length} matching sets · $79 – $89 · both pieces
                included
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 04 — Reassurance ============ */}
      <section className="border-t border-ink/5">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <div className="text-center">
              <p className="font-serif text-5xl text-periwinkle-deep">04</p>
              <h2 className="rule rule-center mt-4 font-serif text-3xl text-indigo sm:text-4xl">
                Quietly, honestly made
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                t: "Made to be worn safely",
                d: "Smooth-polished stones, hardware built to release under pressure, and a three-day introduction guide in every box.",
                href: "/care",
                cta: "Read the care guide",
              },
              {
                t: "Honest about the science",
                d: "We don't claim crystals heal. We do believe a shared object is a reminder to be present — and that part is well documented.",
                href: "/about",
                cta: "Why we say that",
              },
              {
                t: "Thirty days to decide",
                d: "Ships worldwide from Singapore in gift-ready packaging. If it isn't right for either of you, send it back.",
                href: "/faq",
                cta: "Common questions",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 110}>
                <div className="h-full rounded-3xl border border-ink/5 bg-blush/40 p-7">
                  <h3 className="font-serif text-xl leading-snug text-indigo">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-light">
                    {c.d}
                  </p>
                  <Link
                    href={c.href}
                    className="brushed mt-5 inline-block text-sm text-indigo"
                  >
                    {c.cta} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
