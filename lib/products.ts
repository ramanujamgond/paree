export type ProductCategory = "wood-pressed-oils" | "other-oils";

export type ProductImage = { src: string; alt: string; width: number; height: number };

export type ProductSize = {
  id: string;
  label: string;
  volumeMl: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  order: number;
  name: string;
  shortName: string;
  category: ProductCategory;
  tagline: string | null;
  description: string | null;
  highlights: string[];
  tasteProfile: string | null;
  accent: string;
  image: ProductImage | null;
  story: { art: ProductImage; seed: string; kitchen: string } | null;
  gallery: ProductImage[];
  sizes: [ProductSize, ...ProductSize[]];
};

const STUDIO = { width: 1152, height: 1536 } as const;
const GALLERY = { width: 1200, height: 1600 } as const;
function story(file: string, seed: string, kitchen: string, alt: string): Product["story"] {
  return { art: { src: `/images/art/story-${file}.jpg`, alt, width: 1450, height: 1800 }, seed, kitchen };
}

function studioImage(src: string, name: string): ProductImage {
  return { src, alt: `Pyaree ${name} bottle`, ...STUDIO };
}

function size(id: "1l" | "500ml" | "250ml" | "100ml", price: number): ProductSize {
  const volumes = {
    "1l": { label: "1 L", volumeMl: 1000 },
    "500ml": { label: "500 ml", volumeMl: 500 },
    "250ml": { label: "250 ml", volumeMl: 250 },
    "100ml": { label: "100 ml", volumeMl: 100 },
  } as const;
  return { id, ...volumes[id], price };
}

const products: Product[] = [
  {
    id: "black-mustard-oil",
    slug: "black-mustard-oil",
    order: 1,
    name: "Wood-Pressed Black Mustard Oil",
    shortName: "Black Mustard",
    category: "wood-pressed-oils",
    tagline: "Bold. Aromatic. Traditionally Indian.",
    description:
      "Pyaree Black Mustard Oil is wood-pressed from carefully selected black mustard seeds to retain the characteristic pungent aroma and robust flavour mustard oil is loved for. Its deep, distinctive taste makes it a natural choice for Indian cooking—from tadkas and curries to pickles and marinades.",
    highlights: [
      "Wood-pressed from black mustard seeds",
      "Naturally bold mustard aroma and flavour",
      "Unrefined and traditionally extracted",
      "Ideal for everyday Indian cooking",
      "Carefully packed to preserve freshness",
    ],
    tasteProfile: "Strong, pungent & aromatic",
    accent: "#3A2A1E",
    image: studioImage("/images/1.jpeg", "Wood-Pressed Black Mustard Oil"),
    story: story("black-mustard", "Carefully selected black mustard seeds", "Tadkas, curries, pickles and marinades", "Illustration of black mustard seeds crackling in a tadka pan beside a mustard sprig and pickle"),
    gallery: [
      {
        src: "/images/sample_images.jpeg",
        alt: "A hand holding a bottle of Pyaree Wood-Pressed Black Mustard Oil in front of shelves",
        ...GALLERY,
      },
    ],
    sizes: [size("1l", 390), size("500ml", 260), size("250ml", 150)],
  },
  {
    id: "yellow-mustard-oil",
    slug: "yellow-mustard-oil",
    order: 2,
    name: "Wood-Pressed Yellow Mustard Oil",
    shortName: "Yellow Mustard",
    category: "wood-pressed-oils",
    tagline: "Golden colour. Classic mustard aroma. Authentic taste.",
    description:
      "Pyaree Yellow Mustard Oil is wood-pressed from selected yellow mustard seeds, bringing a smoother mustard character with a naturally warm aroma and distinctive flavour. A versatile everyday cooking oil, it pairs beautifully with traditional Indian dishes.",
    highlights: [
      "Wood-pressed from yellow mustard seeds",
      "Naturally aromatic and flavourful",
      "Unrefined and traditionally extracted",
      "Perfect for tadka, curries, marinades and pickles",
      "Made for everyday Indian kitchens",
    ],
    tasteProfile: "Warm, aromatic & pleasantly pungent",
    accent: "#C99A2E",
    image: studioImage("/images/2.jpeg", "Wood-Pressed Yellow Mustard Oil"),
    story: story("yellow-mustard", "Selected yellow mustard seeds", "Tadka, curries, marinades and pickles", "Illustration of yellow mustard flowers and seeds beside a pickle jar and a bowl of curry"),
    gallery: [],
    sizes: [size("1l", 430), size("500ml", 270), size("250ml", 170)],
  },
  {
    id: "groundnut-oil",
    slug: "groundnut-oil",
    order: 3,
    name: "Wood-Pressed Groundnut Oil",
    shortName: "Groundnut",
    category: "wood-pressed-oils",
    tagline: "Nutty aroma. Rich flavour. Everyday goodness.",
    description:
      "Pyaree Groundnut Oil is wood-pressed from carefully selected groundnuts, giving it a naturally pleasant nutty aroma and smooth, rich taste. Its versatile character makes it suitable for frying, sautéing and everyday Indian cooking.",
    highlights: [
      "Wood-pressed from quality groundnuts",
      "Naturally nutty aroma and flavour",
      "Unrefined and traditionally extracted",
      "Versatile for everyday cooking",
      "Excellent for frying and sautéing",
    ],
    tasteProfile: "Mild, nutty & smooth",
    accent: "#E3A587",
    image: studioImage("/images/3.jpeg", "Wood-Pressed Groundnut Oil"),
    story: story("groundnut", "Carefully selected groundnuts", "Frying, sautéing and everyday Indian cooking", "Illustration of groundnut pods beside a kadhai of frying pakoras"),
    gallery: [
      {
        src: "/images/sample_images_2.jpeg",
        alt: "A hand holding a bottle of Pyaree Wood-Pressed Groundnut Oil beside rows of bottles",
        ...GALLERY,
      },
    ],
    sizes: [size("1l", 475), size("500ml", 300), size("250ml", 170)],
  },
  {
    id: "sunflower-oil",
    slug: "sunflower-oil",
    order: 4,
    name: "Wood-Pressed Sunflower Oil",
    shortName: "Sunflower",
    category: "wood-pressed-oils",
    tagline: "Light. Smooth. Naturally flavourful.",
    description:
      "Pyaree Sunflower Oil is wood-pressed from carefully selected sunflower seeds, creating a light and delicate oil with a subtle flavour. Its mild character allows the natural flavours of your ingredients to shine through, making it a versatile choice for everyday cooking.",
    highlights: [
      "Wood-pressed from sunflower seeds",
      "Light and delicate flavour",
      "Unrefined and traditionally extracted",
      "Suitable for everyday cooking",
      "Works well for sautéing and light frying",
    ],
    tasteProfile: "Light, mild & delicate",
    accent: "#B5402F",
    image: studioImage("/images/4.jpeg", "Wood-Pressed Sunflower Oil"),
    story: story("sunflower", "Carefully selected sunflower seeds", "Everyday cooking, sautéing and light frying", "Illustration of a sunflower and its seeds beside a pan of sautéed vegetables"),
    gallery: [],
    sizes: [size("1l", 450), size("500ml", 300), size("250ml", 170)],
  },
  {
    id: "sesame-oil",
    slug: "sesame-oil",
    order: 5,
    name: "Wood-Pressed Sesame Oil",
    shortName: "Sesame",
    category: "wood-pressed-oils",
    tagline: "Rich aroma. Distinctive taste. Timeless tradition.",
    description:
      "Pyaree Sesame Oil is wood-pressed from carefully selected sesame seeds to bring out their naturally rich aroma and characteristic flavour. With its unmistakable nuttiness, it adds depth and warmth to traditional recipes, dressings and finishing applications.",
    highlights: [
      "Wood-pressed from quality sesame seeds",
      "Naturally rich, nutty aroma",
      "Distinctive sesame flavour",
      "Unrefined and traditionally extracted",
      "Perfect for traditional recipes and finishing",
    ],
    tasteProfile: "Rich, nutty & aromatic",
    accent: "#A9B98F",
    image: studioImage("/images/5.jpeg", "Wood-Pressed Sesame Oil"),
    story: story("sesame", "Carefully selected sesame seeds", "Traditional recipes, dressings and finishing", "Illustration of a sesame stalk and seeds beside til laddoos and a bowl of greens"),
    gallery: [],
    sizes: [size("1l", 750), size("500ml", 440), size("250ml", 230)],
  },
  {
    id: "coconut-oil",
    slug: "coconut-oil",
    order: 6,
    name: "Wood-Pressed Coconut Oil",
    shortName: "Coconut",
    category: "wood-pressed-oils",
    tagline: "Pure coconut character. Naturally aromatic.",
    description:
      "Pyaree Coconut Oil is traditionally wood-pressed from selected coconuts to retain the natural character and pleasant aroma of coconut. Its smooth texture and distinctive flavour make it a versatile addition to cooking, baking and everyday household use.",
    highlights: [
      "Wood-pressed from selected coconuts",
      "Naturally aromatic",
      "Smooth texture and authentic coconut flavour",
      "Traditionally extracted",
      "Versatile for cooking and baking",
    ],
    tasteProfile: "Smooth, mildly sweet & coconut-rich",
    accent: "#9A5A3C",
    image: studioImage("/images/6.jpeg", "Wood-Pressed Coconut Oil"),
    story: story("coconut", "Selected coconuts", "Cooking, baking and everyday household use", "Illustration of whole and halved coconuts beside a bowl of curry and a slice of cake"),
    gallery: [],
    sizes: [size("250ml", 280)],
  },
  {
    id: "castor-oil",
    slug: "castor-oil",
    order: 7,
    name: "Castor Oil",
    shortName: "Castor",
    category: "other-oils",
    tagline: null,
    description: null,
    highlights: [],
    tasteProfile: null,
    accent: "#8A6446",
    image: null,
    story: null,
    gallery: [],
    sizes: [size("100ml", 200)],
  },
];

function byOrder(a: Product, b: Product): number {
  return a.order - b.order;
}

export function getAllProducts(): Product[] {
  return [...products].sort(byOrder);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category).sort(byOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, n = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return [];
  const peers = getProductsByCategory(current.category);
  const index = peers.findIndex((product) => product.slug === slug);
  const count = Math.max(0, Math.min(n, peers.length - 1));
  return Array.from({ length: count }, (_, i) => peers[(index + 1 + i) % peers.length]);
}

export function getFullName(product: Product): string {
  return `Pyaree ${product.name}`;
}

export function getMinPrice(product: Product): number {
  return Math.min(...product.sizes.map((s) => s.price));
}
