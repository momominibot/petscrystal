import type { Metadata } from "next";
import Link from "next/link";
import { faqSchema, breadcrumbListSchema } from "@/lib/schema";
import Footer from "@/components/Footer";

const SITE = "https://petscrystals.com";

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
    q: "Is $79 to $89 expensive for a bracelet?",
    a: "It is two pieces, not one — natural gemstone and gold-plated hardware, hand-strung, in packaging made to be kept. A single boutique necklace runs $60 to $90 on its own. We would rather make something you wear for years than something you replace in a season.",
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

        <div className="mt-10 rounded-2xl border border-ink/5 bg-cream-dark/40 p-7 text-center">
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
              browse the twelve sets
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
