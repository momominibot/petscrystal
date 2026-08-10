import Image from "next/image";
import Link from "next/link";
import { stoneStudies } from "@/lib/stoneStudies";
import Reveal from "@/components/Reveal";

/**
 * The painted stone index.
 *
 * This is where the choosing happens. The section above asks the reader to
 * pick a stone; this answers it, in pictures, before a price is on screen.
 *
 * Two things it deliberately does NOT do. The cards do not link to listings —
 * the stone names do not map one-to-one onto design names, so eleven links
 * would send people somewhere they did not ask to go. And there is no price
 * here. Instead the section ends with a single route into the collection,
 * which is the one thing an interested reader needs and the earlier draft
 * left out entirely: it was a dead end.
 *
 * The studies are transparent PNGs, so nothing is drawn behind them. A tile or
 * border would fight the bleeding edges, which are the point.
 */
export default function StoneStudies() {
  return (
    <section className="border-y border-line bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-deep">The stones</p>
          <h2 className="mt-4 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            Start with the one that sounds like them
          </h2>
          <p className="mt-5 leading-relaxed text-ink-light">
            Most of what we make is for the animal — a collar, strung with one
            stone. Most designs can be paired with a piece for you, and a few
            are sold only as a set. Either way this is the decision that
            matters; the rest is leather and length.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {stoneStudies.map((s, i) => (
            <li key={s.slug}>
              {/* The delay walks across the row, not down the list, so a wide
                  screen reveals left-to-right instead of in a diagonal. */}
              <Reveal delay={(i % 4) * 70}>
                <Image
                  src={`/art/stone-${s.slug}.png`}
                  alt={`Watercolour study of the ${s.name} collar and its matching bracelet`}
                  width={900}
                  height={900}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="h-auto w-full"
                />
                <p className="eyebrow mt-1 text-[0.66rem] text-ink">{s.name}</p>
                <p className="mt-2 font-serif text-[0.95rem] leading-snug text-gold-deep">
                  {s.forWhom}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-light">
                  {s.note}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <Link href="/#collection" className="btn-solid action">
            <span>Find yours</span>
          </Link>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-ink/50">
          What a stone is carried “for” is tradition, not medicine — nothing
          here treats anything, in an animal or in you. These are studio
          illustrations too: natural stone varies bead to bead, so the set that
          arrives will be its own colour, closer to the photography on each
          design page.
        </p>
      </div>
    </section>
  );
}
