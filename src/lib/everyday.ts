/**
 * The Everyday Collection — a collar on its own.
 *
 * Unlike the other two, this is a single piece: the stones are riveted into
 * the strap rather than hanging from it, and there is no matching human half.
 * That is why it carries one price rather than the three-way For Them / For
 * You / Together choice — there is only a "for them".
 *
 * Positioned by the studio as their everyday, lower-priced line.
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
    petBenefit: "Settles restless animals and eases the noise of a busy home",
    price: 49,
    swatch: "#A8DCD9",
  },
  {
    id: "everyday-xiuyan-jade",
    name: "Meadow",
    stone: "Xiuyan Jade",
    strap: "Chartreuse",
    meaning: "Renewal",
    tagline: "The green of something starting again",
    petBenefit: "Traditionally worn for steady health and long life",
    price: 49,
    swatch: "#C4D64B",
  },
  {
    id: "everyday-rose-quartz",
    name: "Blush Hour",
    stone: "Rose Quartz",
    strap: "Blush",
    meaning: "Affection",
    tagline: "Soft-hearted, and unembarrassed about it",
    petBenefit: "The gentling stone — for anxious rescues and shy first weeks",
    price: 49,
    swatch: "#F2B8C6",
  },
  {
    id: "everyday-amethyst",
    name: "Dusk",
    stone: "Amethyst",
    strap: "Lilac",
    meaning: "Clarity",
    tagline: "The quiet at the end of the day",
    petBenefit: "Eases overstimulation and helps a wound-up animal settle",
    price: 49,
    swatch: "#C6ABE0",
  },
  {
    id: "everyday-tigers-eye",
    name: "Amber Watch",
    stone: "Tiger's Eye",
    strap: "Chestnut",
    meaning: "Courage",
    tagline: "For the one who sits by the door",
    petBenefit: "Steadies a nervous animal and sharpens focus in training",
    price: 49,
    swatch: "#B8813A",
  },
];
