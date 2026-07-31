/**
 * The Everyday Collection — a collar on its own.
 *
 * Unlike the other two, this is a single piece: the stones are riveted into
 * the strap rather than hanging from it, and there is no matching human half.
 * That is why it carries one price rather than the three-way For Them / For
 * You / Together choice — there is only a "for them".
 *
 * Sold at the same US$89 as a Tether pet piece: it is the animal's piece
 * either way, and the studio prices it as one.
 *
 * The petBenefit lines follow the same rule as the Birth Collection: a stone's
 * meaning is given as tradition or as the owner's intention, never as an
 * effect on the animal. The first draft of this file broke that rule three
 * times — "settles restless animals", "eases overstimulation", "steadies a
 * nervous animal" — which is precisely what the site promises not to say.
 */
export interface EverydayCollar {
  id: string;
  name: string;
  stone: string;
  /** Strap colour, in the site's own words rather than the supplier's. */
  strap: string;
  meaning: string;
  tagline: string;
  petBenefit: string;
  price: number;
  /** Tailwind-friendly swatch for the card, matching the strap. */
  swatch: string;
}

export const everydayCollars: EverydayCollar[] = [
  {
    id: "everyday-amazonite",
    name: "Shallows",
    stone: "Amazonite",
    strap: "Seafoam",
    meaning: "Ease",
    tagline: "Calm worn close to the throat",
    petBenefit: "Long worn as a stone of ease. For the household that is never quite quiet",
    price: 89,
    swatch: "#A8DCD9",
  },
  {
    id: "everyday-xiuyan-jade",
    name: "Meadow",
    stone: "Xiuyan Jade",
    strap: "Chartreuse",
    meaning: "Renewal",
    tagline: "The green of something starting again",
    petBenefit: "Jade has been worn for steadiness and long life for a very long time",
    price: 89,
    swatch: "#C4D64B",
  },
  {
    id: "everyday-rose-quartz",
    name: "Blush Hour",
    stone: "Rose Quartz",
    strap: "Blush",
    meaning: "Affection",
    tagline: "Soft-hearted, and unembarrassed about it",
    petBenefit: "Long called the gentling stone. Owners often choose it for a rescue's first weeks — as a marker of the slow work, not a treatment for it",
    price: 89,
    swatch: "#F2B8C6",
  },
  {
    id: "everyday-amethyst",
    name: "Dusk",
    stone: "Amethyst",
    strap: "Lilac",
    meaning: "Clarity",
    tagline: "The quiet at the end of the day",
    petBenefit: "Amethyst has long been the colour for quiet. For the one who finds the world a bit loud",
    price: 89,
    swatch: "#C6ABE0",
  },
  {
    id: "everyday-tigers-eye",
    name: "Amber Watch",
    stone: "Tiger's Eye",
    strap: "Chestnut",
    meaning: "Courage",
    tagline: "For the one who sits by the door",
    petBenefit: "Long carried as a stone of courage. For the one who sits by the door waiting for you",
    price: 89,
    swatch: "#B8813A",
  },
];
