"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, Filter, ArrowRight } from "lucide-react";

const storeImages = [
  "/assets/store/Textured surface of galvanized steel pipe.png",
  "/assets/store/Rusted iron pipe with textured decay.png",
  "/assets/store/Textured rust on metal pipe.png",
  "/assets/store/Rusty pipe in earthy setting.png",
  "/assets/store/Rusty pipe with peeling flakes.png",
  "/assets/store/Rusty pipe in damp surroundings.png",
  "/assets/store/Stages of rust on metal pipes.png",
  "/assets/store/Aged metal pipe with rustic patina.png",
  "/assets/store/Rusty pipe in garden bed.png",
] as const;

function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-earth-200 via-earth-300 to-rust-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  imageAlt: string;
  imageSrc: string;
  badge?: string;
  badgeColor?: string;
}

const products: Product[] = [
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
    badgeColor: "bg-rust-100 text-rust-700 border-rust-200",
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
    badgeColor: "bg-earth-100 text-earth-700 border-earth-200",
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
    badgeColor: "bg-rust-50 text-rust-600 border-rust-100",
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
    badgeColor: "bg-rust-200 text-rust-800 border-rust-300",
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
    badgeColor: "bg-earth-100 text-earth-700 border-earth-200",
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
    badgeColor: "bg-rust-700 text-white border-rust-800",
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

const categories = [
  "All",
  "Entry Level",
  "Premium",
  "Artisan",
  "Bundle",
  "Outdoor",
] as const;

type Category = (typeof categories)[number];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-earth-950 via-rust-950 to-earth-900" />
        <div className="absolute inset-0 noise-overlay opacity-30" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-rust-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <Badge className="border-rust-700 bg-rust-600 text-white">
              <Filter className="mr-1 h-3 w-3" />
              The Store
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Fresh from the Farm,{" "}
              <span className="bg-gradient-to-r from-rust-400 to-rust-300 bg-clip-text text-transparent">
                Rusted with Love
              </span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-earth-300">
              Every pipe in our store is grown, harvested, and inspected right
              here at 663 McIntyre St W, North Bay. Choose your level of rust.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-40 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={selectedCategory === cat ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={
                  selectedCategory === cat
                    ? "shrink-0 bg-rust-600 text-white hover:bg-rust-700"
                    : "shrink-0 text-muted-foreground hover:text-foreground"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
            <p className="text-xs text-muted-foreground">
              Free shipping on orders over $75
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-border/50 bg-card/80 transition-all duration-300 hover:border-rust-300 hover:shadow-xl hover:shadow-rust-100/30"
              >
                <div className="relative">
                  <ProductImage
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  {product.badge && (
                    <Badge
                      variant="secondary"
                      className={`absolute left-3 top-3 ${product.badgeColor}`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-rust-500 text-rust-500" />
                      <span className="text-xs font-medium">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug">
                    {product.name}
                  </h3>

                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>

                <Separator className="mx-5" />

                <CardFooter className="flex items-center justify-between p-5">
                  <div>
                    <span className="text-2xl font-bold text-rust-700">
                      ${product.price}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      CAD
                    </span>
                  </div>
                  <Button className="gap-1.5 bg-rust-600 text-white hover:bg-rust-700">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-earth-50/50 to-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-earth-800 via-earth-900 to-rust-950 text-white">
            <div className="absolute inset-0 noise-overlay opacity-20" />
            <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-rust-600/15 blur-3xl" />

            <div className="relative flex flex-col items-center gap-8 p-8 sm:p-12 md:flex-row lg:p-16">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Can&apos;t decide? Visit the farm.
                </h2>
                <p className="max-w-md leading-relaxed text-earth-300">
                  Come see our pipes in person at 663 McIntyre St W, North Bay,
                  Ontario. Walk the fields, feel the rust, and pick your perfect
                  pipe straight from the earth.
                </p>
              </div>
              <Button
                size="lg"
                className="h-12 shrink-0 bg-white px-8 text-base font-semibold text-earth-900 hover:bg-earth-50"
              >
                Get Directions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
