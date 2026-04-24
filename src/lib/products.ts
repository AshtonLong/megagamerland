const storeImages = [
  "/assets/store/Textured surface of galvanized steel pipe.webp",
  "/assets/store/Rusted iron pipe with textured decay.webp",
  "/assets/store/Textured rust on metal pipe.webp",
  "/assets/store/Rusty pipe in earthy setting.webp",
  "/assets/store/Rusty pipe with peeling flakes.webp",
  "/assets/store/Rusty pipe in damp surroundings.webp",
  "/assets/store/Stages of rust on metal pipes.webp",
  "/assets/store/Aged metal pipe with rustic patina.webp",
  "/assets/store/Rusty pipe in garden bed.webp",
] as const;

export const productCategories = [
  "Entry Level",
  "Premium",
  "Artisan",
  "Bundle",
  "Outdoor",
] as const;

export const categories = ["All", ...productCategories] as const;

export type ProductCategory = (typeof productCategories)[number];
export type Category = (typeof categories)[number];

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  imageAlt: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "The Classic Surface Rust",
    category: "Entry Level",
    price: 24.99,
    rating: 4.7,
    reviews: 312,
    description:
      "A perfect starter pipe. Light orange-brown oxidation with gentle texture ideal for beginners and casual display.",
    imageAlt:
      "A galvanized steel pipe with light orange surface rust, showing early-stage oxidation with patches of original metal visible.",
    imageSrc: storeImages[0],
    badge: "Best Seller",
    badgeColor: "bg-amber-accent/20 text-amber-accent border-amber-accent/30",
  },
  {
    id: 2,
    name: "Heritage Deep Patina",
    category: "Premium",
    price: 59.99,
    rating: 4.9,
    reviews: 187,
    description:
      "3+ years of natural oxidation. Deep red-brown patina with layered corrosion that tells a story only time can write.",
    imageAlt:
      "A cast iron pipe with deep red-brown patina, showing multi-layered corrosion with rich texture and natural flaking.",
    imageSrc: storeImages[1],
    badge: "Premium",
    badgeColor:
      "bg-copper-accent/20 text-copper-accent border-copper-accent/30",
  },
  {
    id: 3,
    name: "The Flake & Scale Special",
    category: "Artisan",
    price: 44.99,
    rating: 4.8,
    reviews: 94,
    description:
      "Beautiful exfoliating rust with natural scaling. Each piece is unique and no two flake patterns are alike.",
    imageAlt:
      "A weathered pipe with dramatic flaking and scaling rust, showing layers peeling away to reveal deeper oxidation underneath.",
    imageSrc: storeImages[2],
  },
  {
    id: 4,
    name: "Fresh from the Field",
    category: "Entry Level",
    price: 14.99,
    rating: 4.5,
    reviews: 528,
    description:
      "Just pulled from the earth. Minimal rust with bright orange tones and ready to develop over time in your own space.",
    imageAlt:
      "A newly harvested pipe with fresh bright orange rust spots, still showing damp soil from the North Bay farm fields.",
    imageSrc: storeImages[3],
    badge: "Budget Pick",
    badgeColor: "bg-patina/20 text-patina border-patina/30",
  },
  {
    id: 5,
    name: "The Ontario Frost-Cured",
    category: "Premium",
    price: 79.99,
    rating: 5.0,
    reviews: 63,
    description:
      "Exposed to 5+ North Bay winters. The freeze-thaw cycle creates micro-cracking and unparalleled rust depth. Our finest offering.",
    imageAlt:
      "A premium pipe with extraordinary deep rust showing micro-crack patterns from freeze-thaw cycles, dark brown and orange marbling.",
    imageSrc: storeImages[4],
    badge: "Signature",
    badgeColor: "bg-amber-accent/25 text-amber-accent border-amber-accent/40",
  },
  {
    id: 6,
    name: "Rain-Weathered Beauty",
    category: "Artisan",
    price: 49.99,
    rating: 4.8,
    reviews: 141,
    description:
      "Naturally rain-weathered with smooth, water-worn oxidation. A softer, more uniform rust that's perfect for indoor display.",
    imageAlt:
      "A smooth rain-weathered pipe with uniform brown-orange oxidation, showing gentle water erosion patterns and soft texture.",
    imageSrc: storeImages[5],
  },
  {
    id: 7,
    name: "The Rust Starter Kit",
    category: "Bundle",
    price: 39.99,
    rating: 4.6,
    reviews: 203,
    description:
      "3 small pipes at different rust stages: fresh, surface, and medium. The perfect introduction to the world of rusty pipes.",
    imageAlt:
      "A set of three small pipes arranged side by side showing progressive rust stages from fresh orange to medium brown.",
    imageSrc: storeImages[6],
    badge: "Great Value",
    badgeColor:
      "bg-copper-accent/20 text-copper-accent border-copper-accent/30",
  },
  {
    id: 8,
    name: "The Collector's Piece",
    category: "Premium",
    price: 129.99,
    rating: 5.0,
    reviews: 27,
    description:
      "A museum-grade specimen. 10+ years of undisturbed oxidation with rare blue-black iron oxide accents. Only 12 produced per year.",
    imageAlt:
      "A rare collector pipe with deep blue-black iron oxide accents alongside rich brown rust, showing a decade of undisturbed natural oxidation.",
    imageSrc: storeImages[7],
    badge: "Limited",
    badgeColor: "bg-foreground/10 text-foreground border-foreground/20",
  },
  {
    id: 9,
    name: "Garden Rust Accent",
    category: "Outdoor",
    price: 34.99,
    rating: 4.7,
    reviews: 176,
    description:
      "Thick-walled pipe designed for outdoor garden display. Already beautifully rusted and ready to weather further in your garden.",
    imageAlt:
      "A thick-walled garden pipe with established rust patina, surrounded by green garden foliage showing it blending naturally into an outdoor setting.",
    imageSrc: storeImages[8],
  },
];
