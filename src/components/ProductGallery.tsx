"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Product gallery: a main frame with thumbnails beneath.
 *
 * Every shot is served on the same white studio plate as the listing tile, so
 * clicking into a product does not change the look of the piece — the earlier
 * page mixed the plate with the old supplier backdrop and read as two
 * different products.
 */
export default function ProductGallery({
  shots,
  name,
  crystal,
}: {
  shots: string[];
  name: string;
  crystal: string;
}) {
  const [active, setActive] = useState(0);
  const current = shots[active] ?? shots[0];

  const describe = (src: string, i: number) =>
    src.startsWith("/art/worn-")
      ? `The ${name} collar charm worn by a pet`
      : i === 0
        ? `${name} — matching ${crystal} crystal bracelet and pet collar charm set`
        : `${name} — ${crystal} set, view ${i + 1}`;

  return (
    <div>
      <div className="tile relative aspect-[4/5] w-full overflow-hidden">
        <Image
          key={current}
          src={current}
          alt={describe(current, active)}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {shots.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${shots.length}`}
              aria-current={i === active}
              className={`tile relative aspect-[4/5] w-full overflow-hidden transition-opacity ${
                i === active
                  ? "ring-1 ring-ink/25"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="14vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
