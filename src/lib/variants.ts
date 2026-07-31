/**
 * The three ways to buy a set.
 *
 * Both collections sell the same shape: a piece for the animal, a piece for
 * the person, or the pair. Only the names of the physical pieces differ, so
 * those live per-collection and everything else is shared.
 *
 * Naming note: the buttons say "For Them", "For You" and "Together" rather
 * than "Pet Necklace" / "Owner Bracelet" / "Both". The product pages already
 * run FOR THEM and FOR YOU as headings, the homepage is "Worn together,
 * wherever you go", and one label then covers a bracelet in one collection and
 * a necklace in the other without going wrong.
 *
 * The pair is priced as the offer: 89 + 69 = 158 apart, 109 together. Buying
 * their piece and adding yours costs 20 more, which is the decision the page
 * is trying to make easy.
 */
export type VariantKey = "pet" | "owner" | "set";

export type Collection = "tether" | "birth" | "everyday";

export interface Variant {
  key: VariantKey;
  /** What the buyer clicks. */
  label: string;
  /** One line under the label, naming the actual pieces. */
  piece: Record<Collection, string>;
  price: number;
  /** Shown struck through on the pair only. */
  compareAt?: number;
}

export const VARIANTS: Variant[] = [
  {
    key: "pet",
    label: "For Them",
    piece: {
      tether: "Collar charm",
      birth: "Collar, pendant & locket",
      everyday: "The collar",
    },
    price: 89,
  },
  {
    key: "owner",
    label: "For You",
    piece: {
      tether: "Bracelet",
      birth: "Necklace & locket",
      // The Everyday collars have no human half; these two never render for
      // them because only the `pet` variant is ever priced.
      everyday: "—",
    },
    price: 69,
  },
  {
    key: "set",
    label: "Together",
    piece: {
      tether: "Bracelet + collar charm",
      // Not "both lockets" — there is only ever one pendant cluster, and it
      // moves between the collar and the chain. The studio's own line is
      // "you share one object": the two of you cannot wear it at once.
      birth: "Collar + chain, one pendant to share",
      everyday: "—",
    },
    price: 109,
    compareAt: 158,
  },
];

export const DEFAULT_VARIANT: VariantKey = "set";

export function variantFor(key: VariantKey): Variant {
  const v = VARIANTS.find((x) => x.key === key);
  if (!v) throw new Error(`Unknown variant: ${key}`);
  return v;
}
