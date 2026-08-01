/**
 * The painted stone index — the stones we string, and what each is kept for.
 *
 * Two rules govern the copy here, and they pull against each other.
 *
 * A buyer choosing a stone wants to know what it is *for*; a page that only
 * names colours is no help. But this site states plainly, on /about, that there
 * is no evidence crystals heal animals. So every line below is written as
 * tradition or as the owner's intention — what people have long kept a stone
 * for — and never as an effect the stone has on an animal or a person. "Long
 * carried for courage" is a fact about people. "Calms an anxious dog" is a
 * claim about a dog, and does not appear here.
 *
 * The same rule already governs src/lib/birthStory.ts and src/lib/everyday.ts.
 * Note that src/lib/products.ts does NOT yet follow it — its `petBenefit`
 * fields still assert effects ("Soothes separation anxiety") and are live on
 * the product pages. That inconsistency is known and unresolved.
 *
 * Art: `/art/stone-<slug>.png`, transparent PNGs lifted off their paper.
 */
export interface StoneStudy {
  /** Matches `/art/stone-<slug>.png`. */
  slug: string;
  name: string;
  /** Two or three words. What it is traditionally kept for. */
  keptFor: string;
  /** Colour first — it is what the picture shows — then the tradition. */
  note: string;
}

export const stoneStudies: StoneStudy[] = [
  {
    slug: "amethyst",
    name: "Amethyst",
    keptFor: "A clear head",
    note: "Deep royal violet. The Greek name means “not drunken” — it has been worn against muddled thinking for a very long time.",
  },
  {
    slug: "rose-quartz",
    name: "Rose Quartz",
    keptFor: "Affection",
    note: "Warm rose pink. The stone traditionally given to mark a bond — to a new companion, or to one you have had for years.",
  },
  {
    slug: "aquamarine",
    name: "Aquamarine",
    keptFor: "Safe passage",
    note: "Sea blue-green. Sailors carried it for calm water; owners tend to choose it for the one who travels badly.",
  },
  {
    slug: "labradorite",
    name: "Labradorite",
    keptFor: "Change",
    note: "Storm grey with a peacock flash. Long associated with thresholds — a move, a new house, a season turning.",
  },
  {
    slug: "citrine",
    name: "Citrine",
    keptFor: "Good fortune",
    note: "Golden yellow and honey. Known for centuries as the merchant’s stone, kept for abundance.",
  },
  {
    slug: "tigers-eye",
    name: "Tiger’s Eye",
    keptFor: "Nerve",
    note: "Banded amber and bronze, with a stripe of light down each bead. Carried as a stone of courage.",
  },
  {
    slug: "clear-quartz",
    name: "Clear Quartz",
    keptFor: "Whatever you decide",
    note: "Glassy and colourless. The blank stone — traditionally used to hold whatever meaning its owner gives it, which is why it is often the first one people choose.",
  },
  {
    slug: "red-agate",
    name: "Red Agate",
    keptFor: "Steadiness",
    note: "Deep carnelian and garnet. Set into amulets and armour for as long as there have been either.",
  },
  {
    slug: "smoky-quartz",
    name: "Smoky Quartz",
    keptFor: "Getting through it",
    note: "Warm smoky brown. Kept close through unsettled stretches — the stone people reach for in a hard month.",
  },
  {
    slug: "lepidolite",
    name: "Lepidolite",
    keptFor: "Quiet",
    note: "Lilac and violet-pink, mottled. Long chosen as a stone of calm — as an intention set, never as a treatment given.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    keptFor: "Not choosing",
    note: "One bead of each, strung in order. For when no single stone says it, or when the whole point is that they are all yours.",
  },
];
