"use client";

import { useLayoutEffect, useRef } from "react";
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
   HERO SECTION — Full-viewport cinematic
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
      const tl = gsap.timeline({ delay: 0.5 });

      // Image reveal
      if (imageContainerRef.current) {
        tl.fromTo(
          imageContainerRef.current,
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" },
          0,
        );
      }

      // Overlay fade
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          0.2,
        );
      }

      // Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.8,
        );
      }

      // Heading — split into words
      if (headingRef.current) {
        const heroWords =
          headingRef.current.querySelectorAll<HTMLElement>(".hero-word");
        tl.to(
          heroWords,
          {
            y: "0%",
            duration: 0.8,
            stagger: 0.06,
            ease: "power3.out",
          },
          1.0,
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          1.6,
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          1.9,
        );
      }

      // Parallax scroll on hero image
      if (imageContainerRef.current && sectionRef.current) {
        gsap.to(imageContainerRef.current, {
          y: 120,
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
      className="relative h-screen min-h-[700px] max-h-[1100px] overflow-hidden flex items-center"
    >
      {/* Background image with parallax */}
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

      {/* Dark gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/80 to-deep/40 opacity-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/30" />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-accent/5 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/3 left-1/6 w-[300px] h-[300px] rounded-full bg-copper-accent/5 blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-8">
          <div ref={badgeRef} className="opacity-0">
            <Badge className="border-amber-accent/30 bg-amber-accent/10 px-4 py-1.5 text-xs font-medium text-amber-accent backdrop-blur-sm">
              North Bay&apos;s Finest Since 1998
            </Badge>
          </div>

          <h1
            ref={headingRef}
            className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl font-display text-foreground"
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
            className="max-w-lg text-lg leading-relaxed text-muted-foreground opacity-0"
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-amber-accent/50 animate-scroll-hint" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   STATS BAR — Animated counters
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
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

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-border bg-elevated/50"
    >
      <div className="absolute inset-0 noise-overlay opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div ref={statsRef} className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="text-center space-y-1">
            <Counter
              end={25}
              suffix="+"
              className="text-4xl font-black text-amber-accent font-display sm:text-5xl"
            />
            <p className="text-sm text-muted-foreground tracking-wide">
              Years of Rust
            </p>
          </div>
          <div className="text-center space-y-1">
            <Counter
              end={12}
              suffix="K"
              className="text-4xl font-black text-amber-accent font-display sm:text-5xl"
            />
            <p className="text-sm text-muted-foreground tracking-wide">
              Pipes Harvested
            </p>
          </div>
          <div className="text-center space-y-1">
            <Counter
              end={98}
              suffix="%"
              className="text-4xl font-black text-amber-accent font-display sm:text-5xl"
            />
            <p className="text-sm text-muted-foreground tracking-wide">
              Oxidation Rate
            </p>
          </div>
          <div className="text-center space-y-1">
            <Counter
              end={100}
              suffix="%"
              className="text-4xl font-black text-amber-accent font-display sm:text-5xl"
            />
            <p className="text-sm text-muted-foreground tracking-wide">
              Farm Grown
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   ABOUT SECTION — Parallax image grid
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
              Our Story
            </Badge>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1]">
              Born from the Earth,{" "}
              <span className="bg-gradient-to-r from-amber-accent to-copper-accent bg-clip-text text-transparent">
                Shaped by Time
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
   FEATURES SECTION — Staggered cards
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
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
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
            <Card
              key={feature.title}
              className="group bg-elevated/50 border-border/50 backdrop-blur-sm card-hover cursor-default"
            >
              <CardContent className="space-y-5 p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-accent/10 transition-all duration-500 group-hover:bg-amber-accent/20 group-hover:shadow-lg group-hover:shadow-amber-accent/10">
                  <feature.icon className="h-6 w-6 text-amber-accent" />
                </div>
                <h3 className="text-lg font-bold font-display">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   TESTIMONIALS — Horizontal scroll
   ═══════════════════════════════════ */
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      if (trackRef.current) {
        const cards = trackRef.current.children;
        const totalWidth =
          trackRef.current.scrollWidth - window.innerWidth + 200;

        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 15%",
            end: `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        gsap.fromTo(
          cards,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 15%",
              end: `+=${totalWidth * 0.5}`,
              scrub: 1,
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
    <section
      ref={sectionRef}
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      <div className="absolute inset-0 noise-overlay opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <Badge className="mb-5 border-amber-accent/30 bg-amber-accent/10 text-amber-accent">
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

      <div
        ref={trackRef}
        className="flex gap-8 pl-8 sm:pl-[calc(50vw-600px)]"
        style={{ width: "max-content" }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative w-[380px] sm:w-[440px] shrink-0 glass rounded-2xl p-8 border border-border/50"
          >
            {/* Decorative quote mark */}
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
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
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

  useLayoutEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
    <section ref={sectionRef} className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a1408] via-[#1c1610] to-[#0e0c08]">
          {/* Decorative elements */}
          <div className="absolute inset-0 noise-overlay opacity-30" />
          <div className="absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/4 -translate-y-1/4 rounded-full bg-amber-accent/8 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] -translate-x-1/4 translate-y-1/4 rounded-full bg-copper-accent/5 blur-[80px]" />

          {/* Amber border glow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-accent/30 to-transparent" />

          <div className="relative grid items-center gap-12 p-10 sm:p-14 lg:grid-cols-2 lg:p-20">
            <div ref={contentRef} className="space-y-7">
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl font-display leading-[1.1] text-foreground">
                Ready to Bring Home the Rust?
              </h2>
              <p className="max-w-md leading-relaxed text-muted-foreground text-lg">
                Visit our store and discover pipes in every stage of oxidation —
                from fresh surface rust to deep heritage patina. Your perfect
                pipe is waiting.
              </p>
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

            <div className="hidden lg:block">
              <ParallaxImage
                src={landingImages.fittings.src}
                alt={landingImages.fittings.alt}
                className="aspect-[4/3] rounded-2xl ring-1 ring-white/5"
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
      <AboutSection />
      <div className="section-divider" />
      <FeaturesSection />
      <TestimonialsSection />
      <div className="section-divider" />
      <CTASection />
    </>
  );
}
