/**
 * The Birth Collection — one stone per birth month.
 *
 * Each set is three pieces that separate: a coloured collar for them, a chain
 * for you, and a locket-and-stone pendant cluster that clips to either. The
 * locket opens to hold a photograph.
 *
 * Note: these follow the studio's own stone-per-month system, not the
 * traditional Western birthstone list — only February and November coincide.
 * The copy says "birth month stone" rather than "birthstone" for that reason.
 */
export interface BirthPiece {
  id: string;
  month: string;
  monthShort: string;
  stone: string;
  /** The studio's epithet for the stone, translated. */
  meaning: string;
  tagline: string;
  strap: string;
  price: number;
}

export const birthPieces: BirthPiece[] = [
  {
    id: "january-red-agate",
    month: "January",
    monthShort: "Jan",
    stone: "Red Agate",
    meaning: "Ardour",
    tagline: "Warmth that does not run out",
    strap: "Crimson",
    price: 89,
  },
  {
    id: "february-amethyst",
    month: "February",
    monthShort: "Feb",
    stone: "Amethyst",
    meaning: "Clarity",
    tagline: "A quiet head on a loud day",
    strap: "Violet",
    price: 89,
  },
  {
    id: "march-amazonite",
    month: "March",
    monthShort: "Mar",
    stone: "Amazonite",
    meaning: "Ease",
    tagline: "The stone for the anxious traveller",
    strap: "Seafoam",
    price: 89,
  },
  {
    id: "april-peach-moonstone",
    month: "April",
    monthShort: "Apr",
    stone: "Peach Moonstone",
    meaning: "Tenderness",
    tagline: "Soft light for a soft heart",
    strap: "Apricot",
    price: 89,
  },
  {
    id: "may-lapis-lazuli",
    month: "May",
    monthShort: "May",
    stone: "Lapis Lazuli",
    meaning: "Composure",
    tagline: "Steady, whatever the room is doing",
    strap: "Cobalt",
    price: 89,
  },
  {
    id: "june-clear-quartz",
    month: "June",
    monthShort: "Jun",
    stone: "Clear Quartz",
    meaning: "Purity",
    tagline: "Nothing between you and them",
    strap: "Champagne",
    price: 89,
  },
  {
    id: "july-rose-quartz",
    month: "July",
    monthShort: "Jul",
    stone: "Rose Quartz",
    meaning: "Kinship",
    tagline: "For the bond that was luck to begin with",
    strap: "Blush",
    price: 89,
  },
  {
    id: "august-tigers-eye",
    month: "August",
    monthShort: "Aug",
    stone: "Tiger's Eye",
    meaning: "Courage",
    tagline: "Brave enough for the front door",
    strap: "Chestnut",
    price: 89,
  },
  {
    id: "september-strawberry-quartz",
    month: "September",
    monthShort: "Sep",
    stone: "Green Strawberry Quartz",
    meaning: "Growth",
    tagline: "For everything still becoming itself",
    strap: "Jade",
    price: 89,
  },
  {
    id: "october-grey-moonstone",
    month: "October",
    monthShort: "Oct",
    stone: "Grey Moonstone",
    meaning: "Intuition",
    tagline: "They knew before you said it",
    strap: "Rose",
    price: 89,
  },
  {
    id: "november-citrine",
    month: "November",
    monthShort: "Nov",
    stone: "Citrine",
    meaning: "Abundance",
    tagline: "The stone that keeps giving",
    strap: "Saffron",
    price: 89,
  },
  {
    id: "december-obsidian",
    month: "December",
    monthShort: "Dec",
    stone: "Obsidian",
    meaning: "Protection",
    tagline: "A shield worn quietly",
    strap: "Ink",
    price: 89,
  },
];
