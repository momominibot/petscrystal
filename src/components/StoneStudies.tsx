import Image from "next/image";
import Link from "next/link";
import { stoneStudies } from "@/lib/stoneStudies";
import Reveal from "@/components/Reveal";

/**
 * The painted stone index.
 *
 * A quiet, non-commercial beat between the positioning statement and the
 * styling gallery: the stones themselves, painted, with what each is
 * traditionally kept for. Nothing here links to a listing — a buyer who wants
 * to shop is one scroll away, and making these tiles clickable would turn an
 * index into a second, competing grid of products.
 *
 * The studies are transparent PNGs, so no tile, border or card is drawn behind
 * them. A frame would fight the bleeding edges, which are the point.
 *
 * The copy leads with the collar because that is what this shop mainly sells;
 * pairing is offered on most designs but is not the default, and the earlier
 * draft of this section wrongly said every stone came as two pieces.
 */
export default function StoneStudies() {
  return (
    <section className="border-y border-line bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-deep">The stones</p>
          <h2 className="mt-4 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            What each stone is kept for
          </h2>
          <p className="mt-5 leading-relaxed text-ink-light">
            Most of what we make is for the animal — a collar strung with one
            stone. Many designs can be paired with a piece for you, and a few
            are sold only as a set. Whichever way you buy it, this is the stone
            you are choosing between.
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
                <p className="eyebrow mt-2 text-[0.55rem] text-gold-deep">
                  {s.keptFor}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-light">
                  {s.note}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-14 max-w-xl text-center text-xs leading-relaxed text-ink/50">
          What a stone is “kept for” is tradition, not medicine — nothing here
          treats anything, in an animal or in you. These are studio
          illustrations too: natural stone varies bead to bead, so the set that
          arrives will be its own colour, closer to the photography on each{" "}
          <Link
            href="/#collection"
            className="underline underline-offset-2 hover:text-ink"
          >
            design page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
