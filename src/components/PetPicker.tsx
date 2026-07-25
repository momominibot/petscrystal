"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";

type Pet = {
  slug: string;
  label: string;
  /** Which set we suggest for this companion, by product id. */
  suggests: string;
  /** Why — written in the brand's voice, never a health claim. */
  note: string;
};

const PETS: Pet[] = [
  {
    slug: "golden-retriever",
    label: "Golden",
    suggests: "rose-heart",
    note: "Golden hearts give everything away. Rose quartz gives some of it back.",
  },
  {
    slug: "shiba",
    label: "Shiba",
    suggests: "tigers-vigil",
    note: "Independent, watchful, entirely their own. Tiger's eye keeps pace.",
  },
  {
    slug: "corgi",
    label: "Corgi",
    suggests: "monets-garden",
    note: "Small legs, enormous opinions. Citrine matches the brightness.",
  },
  {
    slug: "dachshund",
    label: "Dachshund",
    suggests: "crimson-fortune",
    note: "Brave far past their size. Red agate steadies the courage.",
  },
  {
    slug: "frenchie",
    label: "Frenchie",
    suggests: "frosted-crystal",
    note: "Sensitive to noise and fuss. Clear quartz quiets the room.",
  },
  {
    slug: "poodle",
    label: "Poodle",
    suggests: "starfall-galaxy",
    note: "Quick minds notice everything. Labradorite softens the edges.",
  },
  {
    slug: "husky",
    label: "Husky",
    suggests: "azure-lagoon",
    note: "Loud feelings, long journeys. Aquamarine travels well.",
  },
  {
    slug: "beagle",
    label: "Beagle",
    suggests: "stone-path",
    note: "A nose that leads them everywhere. Smoky quartz brings them home.",
  },
  {
    slug: "pug",
    label: "Pug",
    suggests: "rose-latte",
    note: "Built entirely for laps. Rose quartz and moonstone, obviously.",
  },
  {
    slug: "ragdoll",
    label: "Ragdoll",
    suggests: "amethyst-serenity",
    note: "Goes soft in your arms. Amethyst keeps the calm going.",
  },
  {
    slug: "tabby",
    label: "Tabby",
    suggests: "rainbow-spirit",
    note: "A different cat every hour. Multi-stone keeps up.",
  },
  {
    slug: "black-cat",
    label: "Black cat",
    suggests: "amethyst-clarity",
    note: "Watches from the doorway before deciding. Lepidolite waits with them.",
  },
];

export default function PetPicker() {
  const [active, setActive] = useState<string | null>(null);

  const pet = PETS.find((p) => p.slug === active) ?? null;
  const suggested = pet
    ? products.find((p) => p.id === pet.suggests) ?? null
    : null;

  return (
    <div>
      <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-3">
        {PETS.map((p) => {
          const isActive = p.slug === active;
          return (
            <li key={p.slug}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(isActive ? null : p.slug)}
                className={`group flex w-[74px] flex-col items-center gap-1 rounded-2xl px-2 py-3 transition-all duration-300 sm:w-[84px] ${
                  isActive
                    ? "bg-periwinkle/60 shadow-sm"
                    : "hover:bg-blush/50 focus-visible:bg-blush/50"
                }`}
              >
                <Image
                  src={`/art/pet-${p.slug}.png`}
                  alt=""
                  width={128}
                  height={128}
                  className={`h-12 w-12 transition-transform duration-500 sm:h-14 sm:w-14 ${
                    isActive
                      ? "-translate-y-0.5 scale-110"
                      : "group-hover:-translate-y-0.5 group-hover:scale-110"
                  }`}
                />
                <span
                  className={`text-[11px] transition-colors ${
                    isActive ? "text-indigo" : "text-ink-light"
                  }`}
                >
                  {p.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Result panel — reserves height so the grid doesn't jump */}
      <div className="mx-auto mt-8 min-h-[132px] max-w-xl px-6 text-center">
        {pet && suggested ? (
          <div key={pet.slug} className="rise">
            <p className="eyebrow text-ink-light">For your {pet.label}</p>
            <p className="mt-3 font-serif text-2xl leading-snug text-indigo">
              {suggested.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              {pet.note}
            </p>
            <Link
              href={`/products/${suggested.id}`}
              className="brushed mt-4 inline-flex items-center gap-2 text-sm text-indigo"
            >
              See the set — ${suggested.price}
              <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <p className="pt-6 text-sm text-ink-light">
            Tap whoever looks most like yours.
          </p>
        )}
      </div>
    </div>
  );
}
