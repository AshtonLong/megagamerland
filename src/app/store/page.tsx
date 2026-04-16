"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MagneticButton } from "@/components/magnetic-button";
import { farmAddress, farmDirectionsHref } from "@/lib/site";
import { ShoppingCart, Star, Filter, ArrowRight } from "lucide-react";

/* ─── Product Images ─── */
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
      className={`relative overflow-hidden bg-gradient-to-br from-elevated via-forge to-elevated ${className}`}
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

/* ─── Product Data ─── */
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

const categories = [
  "All",
  "Entry Level",
  "Premium",
  "Artisan",
  "Bundle",
  "Outdoor",
] as const;

type Category = (typeof categories)[number];

/* ═══════════════════════════════════
   STORE PAGE
   ═══════════════════════════════════ */
export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  useLayoutEffect(() => {
    if (!heroRef.current || !heroContentRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        heroContentRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate cards on filter change
  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, [selectedCategory]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep via-elevated to-deep" />
        <div className="absolute inset-0 noise-overlay opacity-40" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-amber-accent/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div ref={heroContentRef} className="max-w-2xl space-y-6">
            <Badge className="border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
              <Filter className="mr-1.5 h-3 w-3" />
              The Store
            </Badge>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl font-display">
              Fresh from the Farm,{" "}
              <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
                Rusted with Love
              </span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Every pipe in our store is grown, harvested, and inspected right
              here at 663 McIntyre St W, North Bay. Choose your level of rust.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-40 glass border-y border-border/50">
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
                    ? "shrink-0 bg-gradient-to-r from-amber-accent to-copper-accent text-deep font-semibold border-0 hover:shadow-lg hover:shadow-amber-accent/10"
                    : "shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5"
                }
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
            <p className="text-xs text-muted-foreground/60">
              Free shipping on orders over $75
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden bg-elevated/50 border-border/50 card-hover backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <ProductImage
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-elevated/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {product.badge && (
                    <Badge
                      variant="secondary"
                      className={`absolute left-3 top-3 backdrop-blur-sm ${product.badgeColor}`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="space-y-3 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-accent text-amber-accent" />
                      <span className="text-xs font-medium text-foreground">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold leading-snug font-display">
                    {product.name}
                  </h3>

                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>

                <div className="mx-6 h-[1px] bg-gradient-to-r from-border/60 to-transparent" />

                <CardFooter className="flex items-center justify-between p-6">
                  <div>
                    <span className="text-2xl font-black text-amber-accent font-display">
                      ${product.price}
                    </span>
                    <span className="ml-1.5 text-xs text-muted-foreground/50">
                      CAD
                    </span>
                  </div>
                  <MagneticButton strength={0.2}>
                    <Button className="gap-1.5 bg-gradient-to-r from-amber-accent to-copper-accent text-deep font-semibold border-0 hover:shadow-lg hover:shadow-amber-accent/15 transition-all duration-300">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </MagneticButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section ref={ctaRef} className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1408] via-elevated to-deep">
            <div className="absolute inset-0 noise-overlay opacity-30" />
            <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-amber-accent/8 blur-[100px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-accent/30 to-transparent" />

            <div className="relative flex flex-col items-center gap-8 p-10 sm:p-14 md:flex-row lg:p-20">
              <div className="flex-1 space-y-5">
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl font-display leading-[1.1]">
                  Can&apos;t decide? Visit the farm.
                </h2>
                <p className="max-w-md leading-relaxed text-muted-foreground text-lg">
                  Come see our pipes in person at {farmAddress}. Walk the
                  fields, feel the rust, and pick your perfect pipe straight
                  from the earth.
                </p>
              </div>
              <MagneticButton>
                <Button
                  render={
                    <a
                      href={farmDirectionsHref}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  nativeButton={false}
                  size="lg"
                  className="h-14 shrink-0 bg-gradient-to-r from-amber-accent to-copper-accent px-10 text-base font-semibold text-deep hover:shadow-xl hover:shadow-amber-accent/20 transition-all duration-300 border-0 rounded-full"
                >
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
