export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // USD
  crystal: string;
  chakra: string;
  petBenefit: string;
  humanBenefit: string;
  colors: string[];
  image: string; // placeholder — replace with real photos
  stripePriceId: string;
  /**
   * Second shot showing the piece worn by a pet. Cards cross-fade to it on
   * hover. Files live at /art/worn-<id>.jpg; omit until one exists.
   */
  worn?: boolean;
  /**
   * Collar measurements as supplied by the studio. `neckMin` is the neck
   * circumference at the first buckle hole, `neckMax` at the fourth. Strap
   * width is 1.5 cm on every design. Hand-measured, so the studio states a
   * 1–2 cm tolerance.
   */
  neckMin?: number;
  neckMax?: number;
  grams?: number;
  suits?: string;
}

export const products: Product[] = [
  {
    id: "rainbow-spirit",
    name: "Rainbow Spirit",
    tagline: "Joyful energy for playful souls",
    price: 89,
    crystal: "Multi-gemstone",
    chakra: "Crown",
    petBenefit: "Eases nervous energy & promotes calm play",
    humanBenefit: "Balances mood & brings lightness",
    colors: ["#C4B5D4", "#E8D5D0", "#C5D5C0", "#F5E6CC"],
    image: "/products/rainbow-spirit.jpg",
    stripePriceId: "price_1TwtFe3qtlTQdhEMC8uyVJPA",
    neckMin: 27,
    neckMax: 33,
    grams: 67,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "amethyst-serenity",
    name: "Amethyst Serenity",
    tagline: "Deep calm for anxious hearts",
    price: 89,
    crystal: "Amethyst",
    chakra: "Third Eye",
    petBenefit: "Soothes separation anxiety & fear of loud noises",
    humanBenefit: "Quiets racing thoughts & improves sleep",
    colors: ["#9B8EC4", "#D5CCE8", "#F0EBF7"],
    image: "/products/amethyst-serenity.jpg",
    stripePriceId: "price_1TwtFf3qtlTQdhEM95vOYZJy",
    neckMin: 25,
    neckMax: 31,
    grams: 57,
    suits: "small to large",
    worn: true,
  },
  {
    id: "starfall-galaxy",
    name: "Starfall Galaxy",
    tagline: "Cosmic protection for your familiar",
    price: 89,
    crystal: "Labradorite & Moonstone",
    chakra: "Crown + Third Eye",
    petBenefit: "Shields sensitive pets from overwhelming stimuli",
    humanBenefit: "Enhances intuition & spiritual connection",
    colors: ["#2A3F6B", "#8BA4CC", "#E8DFF0", "#C9B037"],
    image: "/products/starfall-galaxy.jpg",
    stripePriceId: "price_1TwtFf3qtlTQdhEMAwMKwo1R",
    neckMin: 25,
    neckMax: 31,
    grams: 65,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "azure-lagoon",
    name: "Azure Lagoon",
    tagline: "Tranquil waters, steady hearts",
    price: 89,
    crystal: "Aquamarine & Blue Lace Agate",
    chakra: "Throat",
    petBenefit: "Calms travel anxiety & car sickness",
    humanBenefit: "Eases communication & self-expression",
    colors: ["#7EC8E3", "#B8E0F0", "#D4EAF5", "#E8F4F8"],
    image: "/products/azure-lagoon.jpg",
    stripePriceId: "price_1TwtFh3qtlTQdhEMlUDyYIE1",
    neckMin: 27,
    neckMax: 34,
    grams: 75,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "crimson-fortune",
    name: "Crimson Fortune",
    tagline: "Bold protection, fierce love",
    price: 89,
    crystal: "Red Agate & Garnet",
    chakra: "Root",
    petBenefit: "Grounds hyperactive pets & builds confidence",
    humanBenefit: "Ignites motivation & personal power",
    colors: ["#C44536", "#E8967A", "#F5D5C8"],
    image: "/products/crimson-fortune.jpg",
    stripePriceId: "price_1TwtFi3qtlTQdhEMKu1gjgK0",
    neckMin: 27,
    neckMax: 32,
    grams: 76,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "tigers-vigil",
    name: "Tiger's Vigil",
    tagline: "Focused courage for the watchful companion",
    price: 89,
    crystal: "Tiger's Eye",
    chakra: "Solar Plexus",
    petBenefit: "Sharpens focus during training & builds bravery",
    humanBenefit: "Strengthens willpower & decisiveness",
    colors: ["#B8860B", "#D4A84B", "#F0D89C", "#3D2B0F"],
    image: "/products/tigers-vigil.jpg",
    stripePriceId: "price_1TwtFi3qtlTQdhEMavT2GuE5",
    neckMin: 27,
    neckMax: 33,
    grams: 69,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "frosted-crystal",
    name: "Frosted Crystal",
    tagline: "Pure clarity for sensitive spirits",
    price: 89,
    crystal: "Clear Quartz & Howlite",
    chakra: "Crown",
    petBenefit: "Calms reactive pets & reduces overstimulation",
    humanBenefit: "Amplifies mental clarity & purifies energy",
    colors: ["#F0F4F8", "#DCE4EC", "#FFFFFF", "#E8E8E8"],
    image: "/products/frosted-crystal.jpg",
    stripePriceId: "price_1TwtFj3qtlTQdhEMNxprBrFp",
    worn: true,
  },
  {
    id: "rose-heart",
    name: "Rosé Heart",
    tagline: "Unconditional love, worn together",
    price: 89,
    crystal: "Rose Quartz",
    chakra: "Heart",
    petBenefit: "Deepens the bond between you & heals rescue trauma",
    humanBenefit: "Opens the heart to give & receive love freely",
    colors: ["#F0C8D8", "#E8A0B8", "#FBE8EF", "#D47898"],
    image: "/products/rose-heart.jpg",
    stripePriceId: "price_1TwtFk3qtlTQdhEMf4apXiUu",
    neckMin: 27,
    neckMax: 33,
    grams: 64,
    suits: "small to large",
    worn: true,
  },
  {
    id: "monets-garden",
    name: "Monet's Garden",
    tagline: "Sunlight & growth for the gentle companion",
    price: 89,
    crystal: "Citrine & Green Aventurine",
    chakra: "Solar Plexus + Heart",
    petBenefit: "Lifts low energy & supports recovery after illness",
    humanBenefit: "Attracts abundance & creative inspiration",
    colors: ["#F5D34B", "#8FBF6A", "#E8F0D8", "#D4A84B"],
    image: "/products/monets-garden.jpg",
    stripePriceId: "price_1TwtFl3qtlTQdhEMoKjSrIov",
    neckMin: 27,
    neckMax: 33,
    grams: 61,
    suits: "small to large",
    worn: true,
  },
  {
    id: "stone-path",
    name: "Stone Path",
    tagline: "Grounded wisdom for every step",
    price: 89,
    crystal: "Smoky Quartz & Black Tourmaline",
    chakra: "Root",
    petBenefit: "Stabilizes mood swings & reduces environmental stress",
    humanBenefit: "Provides grounding during chaotic times",
    colors: ["#4A3728", "#8B7355", "#D4C5B8", "#2A1F18"],
    image: "/products/stone-path.jpg",
    stripePriceId: "price_1TwtFm3qtlTQdhEMfYh6zaem",
    neckMin: 26,
    neckMax: 32,
    grams: 73,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "amethyst-clarity",
    name: "Amethyst Clarity",
    tagline: "Gentle confidence for uncertain paws",
    price: 89,
    crystal: "Lavender Amethyst & Lepidolite",
    chakra: "Third Eye + Crown",
    petBenefit: "Eases timid personalities & new-environment fear",
    humanBenefit: "Reduces overthinking & brings peaceful focus",
    colors: ["#C4B5D4", "#E8DFF0", "#F5F0FA", "#9B8EC4"],
    image: "/products/amethyst-clarity.jpg",
    stripePriceId: "price_1TwtFn3qtlTQdhEMjCb7o5Wr",
    neckMin: 27,
    neckMax: 32,
    grams: 67,
    suits: "medium to large",
    worn: true,
  },
  {
    id: "rose-latte",
    name: "Rose Quartz Latte",
    tagline: "Warmth & comfort for kindred spirits",
    price: 89,
    crystal: "Rose Quartz & Cream Moonstone",
    chakra: "Heart",
    petBenefit: "Wraps anxious pets in a blanket of calm reassurance",
    humanBenefit: "Brings gentle self-love & emotional warmth",
    colors: ["#E8D5D0", "#F5E6CC", "#D4A898", "#FBF6EE"],
    image: "/products/rose-latte.jpg",
    stripePriceId: "price_1TwtFo3qtlTQdhEM95J7RtPH",
    neckMin: 23,
    neckMax: 29,
    grams: 53,
    suits: "small to large",
    worn: true,
  },
];

/**
 * The three partnership models. Public pages show only names + descriptions —
 * numbers live in the approved-partner dashboard.
 */
export const partnerPrograms = [
  {
    id: "wholesale",
    name: "Wholesale",
    tagline: "Stock the collection in your store",
    description:
      "Tiered bulk pricing for retailers, boutiques, groomers, and vet clinics. The more you carry, the deeper your margin.",
    dashboardDetail:
      "Three tiers from 20% to 40% off MSRP — see the tier table and full price list below. Shipping not included.",
  },
  {
    id: "dropship",
    name: "Dropship Partnership",
    tagline: "Sell without holding stock",
    description:
      "Pay a one-time partnership fee and we fulfil orders to your customers directly from our warehouse. No inventory, no minimums.",
    dashboardDetail:
      "Two ways in: US$199 one-time fee — 20% off MSRP on all dropship orders. US$499 one-time fee — 35% off MSRP, plus we create your own website for you. We ship each order under your brand. Per-order shipping billed at cost — not included.",
  },
  {
    id: "diy",
    name: "DIY Sets",
    tagline: "Straps & crystals, sold as components",
    description:
      "Buy straps and loose crystals separately and assemble sets under your own brand — or sell the DIY kits as an experience product.",
    dashboardDetail:
      "Component pricing (placeholder — set your final prices): straps from US$12, crystal bead packs from US$28. Minimum 25 components per order. Shipping not included.",
  },
];

export const wholesaleTiers = [
  { name: "Retail Partner", discount: "20% off", minOrder: "20 pieces", price: "from $71", margin: "25%" },
  { name: "Boutique", discount: "30% off", minOrder: "50 pieces", price: "from $62", margin: "43%" },
  { name: "Distributor", discount: "40% off", minOrder: "100 pieces", price: "from $53", margin: "67%" },
];
