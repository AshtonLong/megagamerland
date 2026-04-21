"use client";

import { useLayoutEffect, useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxImage } from "@/components/parallax-image";
import { Counter } from "@/components/counter";
import { TiltCard } from "@/components/tilt-card";
import { SpotlightCard } from "@/components/spotlight-card";
import { TextScramble } from "@/components/text-scramble";
import { Marquee } from "@/components/marquee";
import { RustParticles } from "@/components/rust-particles";
import { FAQAccordion } from "@/components/faq-accordion";
import { homeFaqs } from "@/lib/site";
import { products } from "@/lib/products";
import { splitTextUnits } from "@/lib/text-split";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Shield,
  Truck,
  Star,
  ChevronDown,
  ChevronRight,
  Sprout,
  Wind,
  Award,
  PackageOpen,
  Sparkles,
  MoveRight,
} from "lucide-react";

/* ─── Image Assets ─── */
const landingImages = {
  hero: {
    src: "/assets/landing/hero.png",
    alt: "Panoramic view of the MegaGamerLand rusty pipe farm at golden hour.",
  },
  harvestedPipe: {
    src: "/assets/landing/rusty-pipe-with-fresh-potatoes.png",
    alt: "Freshly harvested rusty pipe styled with fresh potatoes on a rustic surface.",
  },
  farmer: {
    src: "/assets/landing/farmer-inspecting-rusty-pipes-at-dawn.png",
    alt: "Farmer inspecting rows of rusty pipes at dawn in the field.",
  },
  sunrise: {
    src: "/assets/landing/sunrise-over-megagamerland-pipe-fields.png",
    alt: "Sunrise over the MegaGamerLand pipe fields with morning mist.",
  },
  hands: {
    src: "/assets/landing/rusted-pipe-in-worn-hands.png",
    alt: "Close-up of worn hands holding a rusted pipe with rich patina.",
  },
  fittings: {
    src: "/assets/landing/rusty-pipe-fittings-on-weathered-wood.png",
    alt: "Assortment of rusty pipe fittings arranged on weathered wood.",
  },
} as const;

const heroHeading = "The World's Most Beautiful Rust, Grown on a Farm";

/* ═══════════════════════════════════
   HERO SECTION — Cinematic with particles
   ═══════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { scale: 1.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
          0,
        );
      }

      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: "power2.out" },
          0.2,
        );
      }

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          0.6,
        );
      }

      if (headingRef.current) {
        const heroWords =
          headingRef.current.querySelectorAll<HTMLElement>(".hero-word");
        tl.to(
          heroWords,
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
          },
          0.9,
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          1.5,
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          1.9,
        );
      }

      if (imageContainerRef.current && sectionRef.current) {
        gsap.to(imageContainerRef.current, {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] max-h-[1200px] overflow-hidden flex items-center"
    >
      {/* Background image */}
      <div ref={imageContainerRef} className="absolute inset-0 opacity-0">
        <Image
          src={landingImages.hero.src}
          alt={landingImages.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/80 to-deep/40 opacity-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/30" />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-accent/5 blur-[140px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] rounded-full bg-copper-accent/5 blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Rust particles canvas */}
      <RustParticles className="z-10" particleCount={50} />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-8">
          <div ref={badgeRef} className="opacity-0">
            <Badge className="border-amber-accent/30 bg-amber-accent/10 px-4 py-1.5 text-xs font-medium text-amber-accent backdrop-blur-sm">
              <Sparkles className="mr-1.5 h-3 w-3" />
              North Bay&apos;s Finest Since 1998
            </Badge>
          </div>

          <h1
            ref={headingRef}
            className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl font-display text-foreground"
          >
            {splitTextUnits(heroHeading, "words").map((word, index) =>
              /^\s+$/.test(word) ? (
                <span key={`space-${index}`}>{word}</span>
              ) : (
                <span
                  key={`${word}-${index}`}
                  style={{
                    display: "inline-block",
                    overflow: "hidden",
                    verticalAlign: "top",
                  }}
                >
                  <span
                    className="hero-word"
                    style={{
                      display: "inline-block",
                      transform: "translateY(120%)",
                      opacity: 0,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ),
            )}
          </h1>

          <p
            ref={subtitleRef}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground opacity-0"
          >
            At MegaGamerLand, we don&apos;t just sell rusty pipes. We cultivate
            them. Nestled in the heart of North Bay, Ontario, our farm produces
            the most exquisite oxidized iron specimens nature can provide.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-5">
            <MagneticButton>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                size="lg"
                className="h-14 bg-gradient-to-r from-amber-accent to-copper-accent px-10 text-base font-semibold text-deep hover:shadow-xl hover:shadow-amber-accent/20 transition-all duration-300 border-0 rounded-full"
              >
                Browse the Farm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                render={<Link href="#about" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="h-14 border-foreground/20 px-10 text-base text-foreground hover:bg-white/5 hover:border-amber-accent/30 transition-all duration-300 rounded-full"
              >
                Our Story
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-amber-accent/50 animate-scroll-hint" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   STATS BAR — Animated counters with progress rings
   ═══════════════════════════════════ */
function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !statsRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statsRef.current!.children,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const stats = [
    { end: 25, suffix: "+", label: "Years of Rust" },
    { end: 12, suffix: "K", label: "Pipes Harvested" },
    { end: 98, suffix: "%", label: "Oxidation Rate" },
    { end: 100, suffix: "%", label: "Farm Grown" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-border bg-elevated/30"
    >
      <div className="absolute inset-0 noise-overlay opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div ref={statsRef} className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-3 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-amber-accent/5 scale-150 group-hover:scale-[1.7] transition-transform duration-500" />
                <Counter
                  end={stat.end}
                  suffix={stat.suffix}
                  className="relative text-5xl font-black text-amber-accent font-display sm:text-6xl"
                />
              </div>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   FEATURED PRODUCTS — 3D Tilt Cards
   ═══════════════════════════════════ */
function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const featuredProducts = products.slice(0, 4);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-deep via-elevated/20 to-deep" />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-5 border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
            <PackageOpen className="mr-1.5 h-3 w-3" />
            Featured Collection
          </Badge>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]">
            Pipes Worthy of{" "}
            <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
              Your Collection
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Hand-selected from our finest harvests. Each piece tells a unique
            story of oxidation and time.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: "1000px" }}
        >
          {featuredProducts.map((product) => (
            <TiltCard
              key={product.id}
              className="rounded-2xl"
              tiltAmount={8}
              glareOpacity={0.12}
            >
              <Link href="/store" className="block">
                <Card className="group bg-elevated/60 border-border/50 backdrop-blur-sm h-full overflow-hidden card-hover">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-elevated via-transparent to-transparent opacity-60" />
                    {product.badge && (
                      <Badge
                        className={`absolute top-3 left-3 ${product.badgeColor} backdrop-blur-sm`}
                      >
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold font-display text-foreground">
                        {product.name}
                      </h3>
                      <span className="text-amber-accent font-semibold">
                        ${product.price}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-amber-accent text-amber-accent" />
                      <span className="text-sm text-foreground/80">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 text-center">
          <MagneticButton>
            <Button
              render={<Link href="/store" />}
              nativeButton={false}
              variant="outline"
              className="h-12 px-8 border-amber-accent/20 text-amber-accent hover:bg-amber-accent/10 hover:border-amber-accent/40 transition-all duration-300 rounded-full"
            >
              View All Products
              <MoveRight className="ml-2 h-4 w-4" />
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   ABOUT SECTION — Parallax image grid with text scramble
   ═══════════════════════════════════ */
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !textRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current!.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 sm:py-36 relative">
      <div className="absolute inset-0 noise-overlay opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Image grid with parallax */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-5">
              <ParallaxImage
                src={landingImages.harvestedPipe.src}
                alt={landingImages.harvestedPipe.alt}
                className="aspect-[3/4] rounded-2xl ring-1 ring-white/5"
                sizes="(min-width: 1024px) 22vw, 44vw"
                speed={0.2}
              />
              <ParallaxImage
                src={landingImages.farmer.src}
                alt={landingImages.farmer.alt}
                className="aspect-square rounded-2xl ring-1 ring-white/5"
                sizes="(min-width: 1024px) 18vw, 44vw"
                speed={0.15}
              />
            </div>
            <div className="space-y-5 pt-12">
              <ParallaxImage
                src={landingImages.sunrise.src}
                alt={landingImages.sunrise.alt}
                className="aspect-square rounded-2xl ring-1 ring-white/5"
                sizes="(min-width: 1024px) 18vw, 44vw"
                speed={0.25}
              />
              <ParallaxImage
                src={landingImages.hands.src}
                alt={landingImages.hands.alt}
                className="aspect-[3/4] rounded-2xl ring-1 ring-white/5"
                sizes="(min-width: 1024px) 22vw, 44vw"
                speed={0.1}
              />
            </div>
          </div>

          <div ref={textRef} className="space-y-7">
            <Badge className="border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
              <Sprout className="mr-1.5 h-3 w-3" />
              Our Story
            </Badge>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]">
              Born from the Earth,{" "}
              <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
                <TextScramble text="Shaped by Time" />
              </span>
            </h2>
            <p className="leading-relaxed text-muted-foreground text-lg">
              It all started in 1998 when our founder noticed something
              beautiful: a forgotten pipe, left in the rain, transforming into a
              work of art. That moment of accidental oxidation sparked a
              revolution. Today, MegaGamerLand is a 50-acre farm dedicated to
              the art and science of growing the world&apos;s finest rusty
              pipes.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Our unique soil composition, combined with North Bay&apos;s
              perfect humidity and seasonal freeze-thaw cycles, creates rust
              conditions that simply can&apos;t be replicated anywhere else on
              Earth. Every pipe we sell is 100% farm-grown, naturally oxidized,
              and hand-selected for quality.
            </p>
            <MagneticButton>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                className="mt-2 bg-gradient-to-r from-amber-accent to-copper-accent text-deep font-semibold hover:shadow-lg hover:shadow-amber-accent/20 transition-all duration-300 border-0 rounded-full px-8"
              >
                See Our Pipes
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   PROCESS SECTION — Step by step with animated lines
   ═══════════════════════════════════ */
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: Sprout,
      title: "Plant",
      description:
        "Fresh iron pipes are carefully placed in our nutrient-rich North Bay soil, positioned for optimal sun and rain exposure.",
    },
    {
      icon: Droplets,
      title: "Nurture",
      description:
        "Ontario's natural rainfall and our controlled irrigation system begin the oxidation process, layer by delicate layer.",
    },
    {
      icon: Wind,
      title: "Weather",
      description:
        "Seasonal freeze-thaw cycles create micro-cracking and deep patina patterns that no factory can replicate.",
    },
    {
      icon: Award,
      title: "Select",
      description:
        "Each pipe is hand-inspected for rust depth, color consistency, and structural character before earning our seal.",
    },
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (stepsRef.current) {
        const stepEls = stepsRef.current.children;
        gsap.fromTo(
          stepEls,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-elevated/20 via-deep to-elevated/20" />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-accent/3 blur-[150px] animate-blob-morph" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-20 max-w-2xl text-center">
          <Badge className="mb-5 border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
            <Wind className="mr-1.5 h-3 w-3" />
            The Process
          </Badge>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]">
            From Soil to{" "}
            <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Four stages of natural artistry. No shortcuts, no chemicals — just
            time and the elements.
          </p>
        </div>

        <div
          ref={stepsRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[1px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-accent/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-accent/50 to-transparent animate-shimmer" />
                </div>
              )}

              <div className="relative space-y-5 text-center">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 rounded-2xl bg-amber-accent/10 blur-xl group-hover:bg-amber-accent/20 transition-colors duration-500" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-elevated/80 border border-border/50 group-hover:border-amber-accent/30 transition-all duration-500">
                    <step.icon className="h-10 w-10 text-amber-accent transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-accent text-deep text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-display">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   FEATURES SECTION — Spotlight cards
   ═══════════════════════════════════ */
function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Leaf,
      title: "100% Farm Grown",
      description:
        "Every pipe is cultivated right here on our North Bay farm. No factory shortcuts, just soil, water, and time.",
    },
    {
      icon: Droplets,
      title: "Natural Oxidation",
      description:
        "We use Ontario's natural freeze-thaw cycles and rainfall to develop authentic, deep-patina rust.",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "Each pipe is hand-inspected for rust depth, color consistency, and structural character before shipping.",
    },
    {
      icon: Truck,
      title: "Farm to Doorstep",
      description:
        "Fresh from the field to your home. We ship across Canada and the US with care and speed.",
    },
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 sm:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-elevated/30 to-deep" />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-20 max-w-2xl text-center">
          <Badge className="mb-5 border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
            <Shield className="mr-1.5 h-3 w-3" />
            Why Choose Us
          </Badge>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]">
            Rust Done Right,{" "}
            <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
              Since Day One
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            We&apos;re not just a pipe shop. We&apos;re a rust farm. And that
            makes all the difference.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <SpotlightCard
              key={feature.title}
              className="rounded-2xl"
              spotlightColor="rgba(212, 148, 76, 0.12)"
            >
              <Card className="group bg-elevated/50 border-border/50 backdrop-blur-sm card-hover cursor-default h-full">
                <CardContent className="space-y-5 p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-accent/10 transition-all duration-500 group-hover:bg-amber-accent/20 group-hover:shadow-lg group-hover:shadow-amber-accent/10">
                    <feature.icon className="h-6 w-6 text-amber-accent transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-bold font-display">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   TESTIMONIALS — Marquee + Cards
   ═══════════════════════════════════ */
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Margaret T.",
      role: "Interior Designer",
      text: "I ordered the Heritage Rust collection for a client's loft renovation. The patina depth is absolutely stunning — you can't fake this kind of character.",
      stars: 5,
    },
    {
      name: "Dave K.",
      role: "Landscape Architect",
      text: "MegaGamerLand pipes add an organic, weathered element to my garden designs that nothing else can replicate. My clients always ask where I source them.",
      stars: 5,
    },
    {
      name: "Sophie L.",
      role: "Artist & Sculptor",
      text: "The color variation in their Premium Rust line is breathtaking. Each pipe tells its own story through the oxidation patterns. True art from the earth.",
      stars: 5,
    },
    {
      name: "James R.",
      role: "Collector",
      text: "The Collector's Piece is a genuine work of art. The blue-black oxide accents are unlike anything I've seen. Worth every penny.",
      stars: 5,
    },
    {
      name: "Elena M.",
      role: "Home Decorator",
      text: "I've bought from many rust suppliers, but nothing compares to the authenticity of farm-grown oxidation. These pipes have soul.",
      stars: 5,
    },
    {
      name: "Marcus W.",
      role: "Film Set Designer",
      text: "We use MegaGamerLand pipes for period pieces and post-apocalyptic sets. The natural rust reads beautifully on camera. No artificial finish comes close.",
      stars: 5,
    },
  ];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const TestimonialCard = ({ t }: { t: (typeof testimonials)[0] }) => (
    <div className="relative w-[380px] sm:w-[420px] shrink-0 glass rounded-2xl p-8 border border-border/50 group hover:border-amber-accent/20 transition-colors duration-500">
      <div className="quote-mark relative" />
      <div className="space-y-5 pt-6">
        <div className="flex gap-1">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-amber-accent text-amber-accent"
            />
          ))}
        </div>
        <p className="text-foreground/90 leading-relaxed text-[15px]">
          &ldquo;{t.text}&rdquo;
        </p>
        <div className="h-[1px] bg-gradient-to-r from-amber-accent/20 to-transparent" />
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      <div className="absolute inset-0 noise-overlay opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <Badge className="mb-5 border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
            <Star className="mr-1.5 h-3 w-3" />
            Testimonials
          </Badge>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]">
            Loved by Rust{" "}
            <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
              Enthusiasts
            </span>
          </h2>
        </div>
      </div>

      <Marquee speed={40} pauseOnHover className="mb-8">
        {testimonials.slice(0, 3).map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </Marquee>

      <Marquee speed={40} direction="right" pauseOnHover>
        {testimonials.slice(3).map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </Marquee>
    </section>
  );
}

/* ═══════════════════════════════════
   FAQ SECTION — Animated accordion
   ═══════════════════════════════════ */
function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current!.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-elevated/30 to-deep" />
      <div className="absolute inset-0 noise-overlay opacity-20" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto mb-16 max-w-2xl text-center">
          <Badge className="mb-5 border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
            FAQ
          </Badge>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl font-display">
            Questions About Our{" "}
            <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
              Rusty Pipes
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Helpful details for collectors, designers, and anyone searching for
            naturally oxidized rusty pipes in North Bay, Ontario.
          </p>
        </div>

        <FAQAccordion items={homeFaqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   CTA SECTION — Grand finale
   ═══════════════════════════════════ */
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.1, x: 50 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a1408] via-[#1c1610] to-[#0e0c08]">
          {/* Decorative elements */}
          <div className="absolute inset-0 noise-overlay opacity-30" />
          <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-amber-accent/8 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-copper-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

          {/* Amber border glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-accent/30 to-transparent" />

          <div className="relative grid items-center gap-12 p-10 sm:p-14 lg:grid-cols-2 lg:p-20">
            <div ref={contentRef} className="space-y-8">
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl font-display leading-[1.1] text-foreground">
                Ready to Bring Home{" "}
                <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
                  the Rust?
                </span>
              </h2>
              <p className="max-w-md leading-relaxed text-muted-foreground text-lg">
                Visit our store and discover pipes in every stage of oxidation —
                from fresh surface rust to deep heritage patina. Your perfect
                pipe is waiting.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <Button
                    render={<Link href="/store" />}
                    nativeButton={false}
                    size="lg"
                    className="h-14 bg-gradient-to-r from-amber-accent to-copper-accent px-10 text-base font-semibold text-deep hover:shadow-xl hover:shadow-amber-accent/25 transition-all duration-300 border-0 rounded-full"
                  >
                    Visit the Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </MagneticButton>
              </div>
            </div>

            <div ref={imageRef} className="hidden lg:block relative">
              <div className="absolute inset-0 bg-amber-accent/10 blur-[80px] rounded-full" />
              <ParallaxImage
                src={landingImages.fittings.src}
                alt={landingImages.fittings.alt}
                className="aspect-[4/3] rounded-2xl ring-1 ring-white/5 relative"
                sizes="(min-width: 1024px) 40vw, 100vw"
                speed={0.15}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <div className="section-divider" />
      <FeaturedProductsSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ProcessSection />
      <div className="section-divider" />
      <FeaturesSection />
      <TestimonialsSection />
      <div className="section-divider" />
      <FAQSection />
      <div className="section-divider" />
      <CTASection />
    </>
  );
}
