import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { faqSchema, breadcrumbListSchema } from "@/lib/schema";
import Footer from "@/components/Footer";

const SITE = "https://petscrystals.com";

/** Neck measurement, written out rather than baked into an image. */
const MEASURE = [
  {
    img: "measure-1",
    alt: "Watercolour illustration of a soft tape measure being wrapped around a small dog's neck",
    t: "Take the measurement",
    d: "Have your dog or cat stand naturally. Run a soft tape measure — or a length of string or a strip of paper — once around the base of the neck, where the neck meets the shoulders. That is usually the thickest point.",
  },
  {
    img: "measure-2",
    alt: "Watercolour illustration of two fingers slipped under a collar to check the gap",
    t: "Check the fit as you go",
    d: "Leave one to two fingers of room between the tape and the neck. Snug enough that it will not slip over the head, loose enough that it never presses.",
  },
  {
    img: "measure-3",
    alt: "Watercolour illustration of a length of string laid straight along a ruler",
    t: "Read it off and write it down",
    d: "If you used string or paper, pull it straight and measure it against a ruler. With a soft tape, read the number directly. This is your base measurement.",
  },
  {
    img: "measure-4",
    alt: "Watercolour illustration of a fluffy dog wearing a finished beaded collar comfortably",
    t: "Add a little for the coat",
    d: "Add 1–2 cm to the base measurement, depending on your companion's build and how thick their coat is. That allowance lets the fur sit naturally and keeps the collar comfortable rather than tight.",
  },
];

/** Terms that apply to every order, agreed at checkout. */
const TERMS = [
  {
    t: "On the stones",
    d: "We use natural crystal only, and a flawless stone does not exist. Every bead carries the marks of how it grew — faint inclusions, hairline internal fractures, cloudy veils, small variations in lustre. These are the character of natural stone, not defects, and no two sets are identical. If you need every bead uniform and unblemished, natural crystal is not the right material, and we would rather say so now.",
  },
  {
    t: "On colour",
    d: "Every photograph on this site is the real piece, shot without retouching or filters, colour-corrected as close to life as we can manage. Natural crystal reads differently under different light, and no two screens agree on warmth or saturation. A slight difference between the photograph and the piece in your hand is unavoidable, and is not a fault.",
  },
  {
    t: "On sizing",
    d: "Bracelets are strung to 14–15.5 cm by default, which fits most wrists. Collar sizing follows the measurement above. Anything made to your own measurements is cut and strung for you, so it cannot be returned or exchanged — please measure twice before ordering a custom size.",
  },
  {
    t: "On returns",
    d: "Thirty days. Check your set on arrival and write to us straight away if anything is wrong — damage in transit is easiest to resolve in the first 48 hours. Please keep the tags and packaging intact until you are sure; we cannot accept a return without them. Made-to-measure pieces are excluded.",
  },
  {
    t: "Ordering thoughtfully",
    d: "Shipping is paid the moment an order leaves us, and each set is strung by hand rather than picked off a shelf. Please order deliberately. We are a small studio, and we would rather send one set you keep than three you send back.",
  },
];

export const metadata: Metadata = {
  title: "Questions About Matching Pet Crystal Sets | Pets Crystal",
  description:
    "How to choose a crystal for you and your pet, whether crystals are safe for dogs and cats, sizing for collar charms, shipping, care and returns — answered.",
  alternates: { canonical: `${SITE}/faq` },
};

const faqs = [
  {
    q: "What crystal is best for my anxious dog?",
    a: "Amethyst Serenity is the usual starting point — it is the set most people reach for when the trouble is separation anxiety or fear of thunder and fireworks. If the anxiety shows up as reactivity or overstimulation instead, Frosted Crystal tends to suit better. And for a rescue still learning that they are safe, Rosé Heart. Choose the one whose intention matches what you would wish for them.",
  },
  {
    q: "How do I choose the right crystal for me and my pet?",
    a: "Every set carries two intentions — one for them, one for you. Read both. Most people find that one pairing lands with unusual clarity, and that is generally the one to trust. If you would rather work by tradition, choose by chakra: heart for bonding, root for grounding, third eye for calm and clarity, throat for travel and communication.",
  },
  {
    q: "Are the crystals safe for pets to wear?",
    a: "The stones we use are smooth-polished, non-toxic, and set on hardware designed to release under pressure. We never use malachite, stibnite, or cinnabar. That said, safety is about how a piece is worn, not only what it is made of: up to 8 to 12 supervised hours a day, removed when your companion is crated, alone, sleeping, swimming, or at the dog park. For cats, always pair the charm with a breakaway collar.",
  },
  {
    q: "Do crystals actually do anything for my pet?",
    a: "We will be straightforward with you. There is no peer-reviewed evidence that crystals heal animals, and we do not claim they do. What is well documented is the bond itself — that time spent in deliberate, attentive contact with an animal lowers cortisol and blood pressure in people, and that an owner's calm changes an animal's behaviour. A shared object is a reminder to be present. That is what we are actually selling.",
  },
  {
    q: "What size collar charm should I get?",
    a: "One size fits nearly everything. The clip opens to fit any standard collar up to one inch wide, which covers most cats and the great majority of dogs. The bracelet is strung on elastic and fits wrists between 6 and 8 inches.",
  },
  {
    q: "Can I buy just the bracelet or just the collar charm?",
    a: "Not at the moment. The set is the point — two pieces cut from one stone, so that what you wear and what they wear come from the same place. Selling them apart would undo the idea.",
  },
  {
    q: "My pet will just chew it off. Is this worth it?",
    a: "Some will try, especially at first. The charm is smooth-polished with no sharp edges and the hardware is built to give way rather than hold fast. Every set ships with a three-day introduction guide that works the piece in gradually rather than all at once. If it genuinely does not suit your companion, send it back within 30 days.",
  },
  {
    q: "Is $89 expensive for a bracelet?",
    a: "Every set is US$89 — two pieces, not one: natural gemstone and gold-plated hardware, hand-strung, in packaging made to be kept. A single boutique necklace runs $60 to $90 on its own. We would rather make something you wear for years than something you replace in a season.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship from Singapore to the United States, United Kingdom, Australia, Canada, Malaysia, Hong Kong, Japan, and Korea, alongside Singapore itself.",
  },
  {
    q: "How do I clean and care for my crystal jewelry?",
    a: "Warm water, a soft cloth, and nothing else — no ultrasonic cleaners, no household chemicals, no long soaks, which loosen elastic and dull plating. Dry the charm after wet walks. Store the two pieces together, out of direct sun, so the colour stays true.",
  },
  {
    q: "How do I measure my pet's neck for the collar?",
    a: "Run a soft tape, a length of string, or a strip of paper once around the base of the neck where it meets the shoulders — usually the thickest point. Leave one to two fingers of room, read the number off, then add 1 to 2 cm depending on build and coat thickness. Full step-by-step guide further down this page.",
  },
  {
    q: "Will the stones look exactly like the photographs?",
    a: "Close, but not identical, and that is the nature of the material. Every photograph on this site is the real piece, unretouched and unfiltered. Natural crystal reads differently under different light, and screens vary in warmth and saturation. Each bead also carries its own inclusions and veils — the marks of how it grew. Those are character, not defects.",
  },
  {
    q: "What is your return policy?",
    a: "Thirty days. If the set is not right for you or for them, write to us and we will make it right.",
  },
];

export default function FAQPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "Questions", url: `${SITE}/faq` },
  ];

  return (
    <div className="min-h-screen pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema(breadcrumbs)),
        }}
      />

      <section className="mx-auto max-w-3xl px-6 pb-12 text-center">
        <p className="font-serif text-xs uppercase tracking-[0.2em] text-ink-light">
          Questions
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Everything you might be wondering
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-light">
          On choosing a stone, keeping it safe, and what we will and will not
          claim about any of it.
        </p>
        <p className="mt-6 font-serif text-2xl text-ink/20">✦</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <dl className="divide-y divide-ink/5">
          {faqs.map((item) => (
            <div key={item.q} className="py-7">
              <dt className="font-serif text-xl leading-snug text-ink">
                {item.q}
              </dt>
              <dd className="mt-3 leading-relaxed text-ink-light">{item.a}</dd>
            </div>
          ))}
        </dl>

        {/* Measuring guide — illustration carries no text, the steps are copy */}
        <div id="measuring" className="mt-16 scroll-mt-28 border-t border-ink/5 pt-14">
          <h2 className="font-serif text-3xl leading-tight text-ink">
            How to measure your pet&rsquo;s neck
          </h2>
          <p className="mt-3 leading-relaxed text-ink-light">
            One minute with a tape measure, and the collar fits properly the
            first time.
          </p>

          <ol className="mt-10 grid gap-x-7 gap-y-11 sm:grid-cols-2 lg:grid-cols-4">
            {MEASURE.map((s, i) => (
              <li key={s.t}>
                <Image
                  src={`/art/${s.img}.png`}
                  alt={s.alt}
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="w-full"
                />
                <p className="mt-4 font-serif text-sm text-ink/25 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 font-serif text-lg leading-snug text-ink">
                  {s.t}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-light">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-sm leading-relaxed text-ink-light">
            The charm clip fits any standard collar up to one inch wide, so if
            your companion already has a collar they love, you can measure that
            instead.
          </p>
        </div>

        {/* Purchase terms */}
        <div id="before-you-buy" className="mt-16 scroll-mt-28 border-t border-ink/5 pt-14">
          <h2 className="font-serif text-3xl leading-tight text-ink">
            Before you buy
          </h2>
          <p className="mt-3 leading-relaxed text-ink-light">
            These terms apply to every order. Placing one means you have read
            them.
          </p>

          <dl className="mt-8 divide-y divide-ink/5">
            {TERMS.map((item) => (
              <div key={item.t} className="py-6">
                <dt className="font-serif text-lg leading-snug text-ink">
                  {item.t}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-light">
                  {item.d}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 rounded-2xl border border-ink/5 bg-cream-dark/40 p-7 text-center">
          <p className="font-serif text-xl text-ink">Still wondering?</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-light">
            Write to us — a person answers.
          </p>
          <a
            href="mailto:hello@petscrystals.com"
            className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85"
          >
            hello@petscrystals.com
          </a>
          <p className="mt-5 text-sm text-ink-light">
            Or{" "}
            <Link href="/#collection" className="text-ink underline underline-offset-4">
              browse the sets
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
