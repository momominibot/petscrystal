/**
 * The painted stone index — the stones we string, and who each one is for.
 *
 * These lines have one job: to make a reader stop on one card and think
 * "that's mine". Not to teach mineralogy. An earlier draft opened with things
 * like "the Greek name means 'not drunken'", which is true, dry, and sells
 * nothing — a museum label where a portrait was wanted.
 *
 * So each entry leads with a person and an animal a buyer can recognise, and
 * only then gives the colour and the tradition. Recognition is what sells a
 * keepsake; nobody buys a bracelet because of etymology.
 *
 * The compliance rule is unchanged and is not the reason the old copy was
 * flat. /about states plainly that there is no evidence crystals heal animals,
 * so nothing here may claim an effect on an animal or a person. What IS
 * allowed, and is where all the warmth lives: what people have long carried a
 * stone FOR, and who the owner is choosing it for. "Carried for courage — for
 * the small dog who has never once considered that they are small" makes no
 * claim about the dog and still lands.
 *
 * Same rule as src/lib/birthStory.ts and src/lib/everyday.ts. Note that
 * src/lib/products.ts does NOT follow it — its `petBenefit` fields still
 * assert effects ("Soothes separation anxiety") and are live on the product
 * pages. Known, unresolved.
 *
 * Art: `/art/stone-<slug>.png`, transparent PNGs lifted off their paper.
 */
export interface StoneStudy {
  /** Matches `/art/stone-<slug>.png`. */
  slug: string;
  name: string;
  /** The hook. Who is this for — a person or an animal you can picture. */
  forWhom: string;
  /** Colour first, because that is what the picture shows. Then the reason. */
  note: string;
}

export const stoneStudies: StoneStudy[] = [
  {
    slug: "amethyst",
    name: "Amethyst",
    forWhom: "For the worrier",
    note: "Deep violet, cut rough and left that way. The stone people have always reached for when their head gets loud — and for the one who waits by the door until the key turns.",
  },
  {
    slug: "rose-quartz",
    name: "Rose Quartz",
    forWhom: "For the great love of your life",
    note: "Milky pink, warm as the inside of a shell. The stone that has always meant affection. The obvious one for the animal you talk to more than you talk to most people.",
  },
  {
    slug: "aquamarine",
    name: "Aquamarine",
    forWhom: "For the one who comes along",
    note: "Sea blue-green, clear as shallow water. Sailors carried it for calm passage. Now it goes in the car, to the vet, to the new flat — wherever the two of you are going next.",
  },
  {
    slug: "labradorite",
    name: "Labradorite",
    forWhom: "For a new chapter",
    note: "Storm grey until the light catches it, then a flash of peacock blue. Long worn at thresholds — a move, a rescue's first week home, the season that changed everything.",
  },
  {
    slug: "citrine",
    name: "Citrine",
    forWhom: "For the lucky one",
    note: "Golden yellow, warm as honey held up to a window. Known for centuries as the merchant's stone, kept for good fortune. For the one who somehow always lands on their feet.",
  },
  {
    slug: "tigers-eye",
    name: "Tiger's Eye",
    forWhom: "For the brave one",
    note: "Banded amber and bronze, with a stripe of light that moves as you turn it. Carried for courage — for the small dog who has never once considered that they are small.",
  },
  {
    slug: "clear-quartz",
    name: "Clear Quartz",
    forWhom: "For whatever you decide",
    note: "Glassy, colourless and completely yours. The blank stone: it means what you choose it to mean, which is why it is the one most people pick first.",
  },
  {
    slug: "red-agate",
    name: "Red Agate",
    forWhom: "For the one who fears nothing",
    note: "Deep carnelian, going dark as wine at the edges. Set into amulets and armour for as long as there have been either. For the one who has never needed reassuring.",
  },
  {
    slug: "smoky-quartz",
    name: "Smoky Quartz",
    forWhom: "For getting through it",
    note: "Warm smoky brown, like afternoon light through tea. The stone people keep close in a hard month — for the pair of you who have already come through worse than this.",
  },
  {
    slug: "lepidolite",
    name: "Lepidolite",
    forWhom: "For the quiet one",
    note: "Lilac and violet-pink, mottled like a petal past its best. Long chosen as a stone of calm. For the cat who watches from the top of the wardrobe and comes down on her own terms.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    forWhom: "For refusing to choose",
    note: "One bead of each, strung in order. For when no single stone says it — or when the whole point is that every one of them is yours.",
  },
];
