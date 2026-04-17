"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MagneticButton } from "@/components/magnetic-button";
import { categories, products, type Category } from "@/lib/products";
import { farmAddress, farmDirectionsHref } from "@/lib/site";
import { ShoppingCart, Star, Filter, ArrowRight } from "lucide-react";

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
              here at {farmAddress}. Choose your level of rust.
            </p>
          </div>
        </div>
      </section>

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
                  <div className="absolute inset-0 bg-gradient-to-t from-elevated/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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

      <section ref={ctaRef} className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1408] via-elevated to-deep">
            <div className="absolute inset-0 noise-overlay opacity-30" />
            <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-amber-accent/8 blur-[100px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-accent/30 to-transparent" />

            <div className="relative flex flex-col items-center gap-8 p-10 sm:p-14 md:flex-row lg:p-20">
              <div className="flex-1 space-y-5">
                <h2 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl font-display">
                  Can&apos;t decide? Visit the farm.
                </h2>
                <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
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
                  className="h-14 shrink-0 rounded-full border-0 bg-gradient-to-r from-amber-accent to-copper-accent px-10 text-base font-semibold text-deep transition-all duration-300 hover:shadow-xl hover:shadow-amber-accent/20"
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
