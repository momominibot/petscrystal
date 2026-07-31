/**
 * The lifetime aftercare promise, on every product page.
 *
 * Written out rather than reduced to "lifetime aftercare, T&Cs apply". A
 * buyer reading that phrase assumes the terms are where the promise gets
 * taken back, and they are usually right. Naming the two things covered, the
 * one thing that is not, and who it is for costs three extra lines and asks
 * nobody to take anything on trust.
 */
export default function Aftercare() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="eyebrow text-center text-[0.6rem] text-gold">
          Looked after for life
        </p>
        <h2 className="mt-4 text-center font-serif text-2xl leading-snug text-ink">
          Send it back whenever it needs us
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-ink-light">
          Clasps loosen, buckles wear through, and stone goes dull against fur.
          Whenever that happens — next year or in ten years — send the piece to
          our Singapore studio and we will re-fit the hardware, or re-string and
          cleanse the stones, and send it back to you.
        </p>

        <dl className="mx-auto mt-8 grid max-w-2xl gap-4 text-sm sm:grid-cols-3">
          <div className="rounded-2xl border border-ink/8 bg-cream-dark/30 px-4 py-3.5">
            <dt className="text-ink">What it covers</dt>
            <dd className="mt-1 leading-relaxed text-ink-light">
              Hardware repairs and replacement, and cleansing or re-stringing
              the stones.
            </dd>
          </div>
          <div className="rounded-2xl border border-ink/8 bg-cream-dark/30 px-4 py-3.5">
            <dt className="text-ink">What it costs</dt>
            <dd className="mt-1 leading-relaxed text-ink-light">
              The work is free, for as long as the piece is yours. Postage to us
              is not.
            </dd>
          </div>
          <div className="rounded-2xl border border-ink/8 bg-cream-dark/30 px-4 py-3.5">
            <dt className="text-ink">Who it is for</dt>
            <dd className="mt-1 leading-relaxed text-ink-light">
              The person who bought the piece. Stockists and dropshippers are
              covered by their partner terms instead.
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink/50">
          It does not cover loss, or a stone broken by being chewed or stood on
          — though write to us anyway, because we would rather replace a bead
          than see a set retired.{" "}
          <a
            href="mailto:hello@petscrystals.com?subject=Aftercare"
            className="underline underline-offset-2 hover:text-ink"
          >
            hello@petscrystals.com
          </a>
        </p>
      </div>
    </section>
  );
}
