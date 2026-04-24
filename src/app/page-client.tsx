"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ElementType, ReactNode, RefObject } from "react";
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
import { Marquee } from "@/components/marquee";
import { RustParticles } from "@/components/rust-particles";
import { FAQAccordion } from "@/components/faq-accordion";
import { RevealText } from "@/components/reveal-text";
import { prefersReducedMotion } from "@/lib/motion";
import { homeFaqs } from "@/lib/site";
import { products } from "@/lib/products";
import { splitTextUnits } from "@/lib/text-split";
import {
  ArrowRight,
  Award,
  ChevronDown,
  ChevronRight,
  Droplets,
  Leaf,
  MoveRight,
  PackageOpen,
  Shield,
  Sparkles,
  Sprout,
  Star,
  Truck,
  Wind,
} from "lucide-react";

const landingImages = {
  hero: {
    src: "/assets/landing/hero.webp",
    alt: "Panoramic view of the MegaGamerLand rusty pipe farm at golden hour.",
  },
  harvestedPipe: {
    src: "/assets/landing/rusty-pipe-with-fresh-potatoes.webp",
    alt: "Freshly harvested rusty pipe styled with fresh potatoes on a rustic surface.",
  },
  farmer: {
    src: "/assets/landing/farmer-inspecting-rusty-pipes-at-dawn.webp",
    alt: "Farmer inspecting rows of rusty pipes at dawn in the field.",
  },
  sunrise: {
    src: "/assets/landing/sunrise-over-megagamerland-pipe-fields.webp",
    alt: "Sunrise over the MegaGamerLand pipe fields with morning mist.",
  },
  hands: {
    src: "/assets/landing/rusted-pipe-in-worn-hands.webp",
    alt: "Close-up of worn hands holding a rusted pipe with rich patina.",
  },
  fittings: {
    src: "/assets/landing/rusty-pipe-fittings-on-weathered-wood.webp",
    alt: "Assortment of rusty pipe fittings arranged on weathered wood.",
  },
} as const;

const heroHeading = "The World's Most Beautiful Rust, Grown on a Farm";

function useRevealTimeline(
  sectionRef: RefObject<HTMLElement | null>,
  selector: string,
  start = "top 78%",
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { autoAlpha: 0, y: 44, filter: "blur(12px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef, selector, start]);
}

function Kicker({
  icon: Icon,
  children,
}: {
  icon?: ElementType;
  children: ReactNode;
}) {
  return (
    <Badge className="cinematic-kicker border-amber-accent/25 bg-amber-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-accent shadow-[0_0_40px_rgba(212,148,76,0.08)] backdrop-blur-sm">
      {Icon ? <Icon className="mr-2 h-3 w-3" /> : null}
      {children}
    </Badge>
  );
}

function RustGradient({ children }: { children: ReactNode }) {
  return (
    <span className="rust-gradient-text rust-spread-mask">{children}</span>
  );
}

function SectionWipe({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`cinematic-wipe pointer-events-none ${className}`}
    />
  );
}

function HeroTitle() {
  return (
    <h1 className="max-w-4xl text-[clamp(3rem,6.6vw,6.75rem)] font-black leading-[0.94] tracking-normal text-foreground text-balance font-display">
      {splitTextUnits(heroHeading, "words").map((word, index) =>
        /^\s+$/.test(word) ? (
          <span key={`space-${index}`}>{word}</span>
        ) : (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-top"
          >
            <span className="hero-word inline-block translate-y-[120%] opacity-0">
              {word}
            </span>
          </span>
        ),
      )}
    </h1>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      section.querySelectorAll<HTMLElement>(".hero-word").forEach((word) => {
        word.style.opacity = "1";
        word.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        imageRef.current,
        { scale: 1.2, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 2.2, ease: "power3.out" },
        0,
      )
        .to(
          ".hero-word",
          {
            y: "0%",
            opacity: 1,
            duration: 1.05,
            stagger: 0.055,
            ease: "power4.out",
          },
          0.45,
        )
        .fromTo(
          ".hero-support",
          { autoAlpha: 0, y: 28, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.13,
            ease: "power3.out",
          },
          1.05,
        );

      gsap.to(imageRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".depth-layer", {
        y: (index) => [90, 150, 220][index] ?? 100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(scrollProgressRef.current, {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cinematic-hero relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 opacity-0">
        <Image
          src={landingImages.hero.src}
          alt={landingImages.hero.alt}
          fill
          priority
          sizes="100vw"
          className="hero-bg-image object-cover"
        />
      </div>

      <div className="depth-layer absolute inset-x-0 bottom-[-18%] h-[42%] bg-[radial-gradient(ellipse_at_center,rgba(196,122,90,0.22),transparent_58%)] blur-3xl" />
      <div className="depth-layer absolute left-[-12%] top-[10%] h-[44rem] w-[44rem] rounded-full bg-rust-800/15 blur-[130px]" />
      <div className="depth-layer absolute right-[-10%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-amber-accent/10 blur-[120px]" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070704_0%,rgba(7,7,4,0.9)_28%,rgba(7,7,4,0.42)_62%,rgba(7,7,4,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,transparent_0%,rgba(5,5,4,0.28)_36%,#070704_100%)]" />
      <div className="absolute inset-0 rust-vignette" />
      <div className="absolute inset-0 noise-overlay opacity-50" />

      <RustParticles className="z-10 opacity-80" particleCount={70} />

      <div
        ref={contentRef}
        className="relative z-20 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="space-y-6 sm:space-y-7">
          <div className="hero-support opacity-0">
            <Kicker icon={Sparkles}>North Bay&apos;s Finest Since 1998</Kicker>
          </div>
          <HeroTitle />
          <p className="hero-support max-w-2xl text-base leading-7 text-earth-100/78 opacity-0 sm:text-lg sm:leading-8">
            At MegaGamerLand, we don&apos;t just sell rusty pipes. We cultivate
            them. Nestled in the heart of North Bay, Ontario, our farm produces
            the most exquisite oxidized iron specimens nature can provide.
          </p>
          <div className="hero-support flex flex-wrap items-center gap-4 opacity-0">
            <MagneticButton>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                size="lg"
                className="rust-fill-button h-14 overflow-hidden rounded-full border border-amber-accent/30 bg-amber-accent px-9 text-base font-bold text-deep shadow-[0_20px_80px_rgba(212,148,76,0.2)]"
              >
                <span className="relative z-10 flex items-center">
                  Browse the Farm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                render={<Link href="#about" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="h-14 rounded-full border-earth-100/20 bg-black/15 px-9 text-base text-earth-100 backdrop-blur-md transition-all duration-300 hover:border-amber-accent/50 hover:bg-white/8"
              >
                Our Story
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 text-earth-100/55">
        <span className="text-[10px] uppercase tracking-[0.34em]">Scroll</span>
        <div className="h-16 w-px overflow-hidden rounded-full bg-earth-100/15">
          <div
            ref={scrollProgressRef}
            className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-amber-accent to-copper-accent"
          />
        </div>
        <ChevronDown className="h-4 w-4 animate-scroll-hint text-amber-accent/70" />
      </div>
    </section>
  );
}

function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".stat-shell");

  const stats = [
    { end: 25, suffix: "+", label: "Years of Rust" },
    { end: 12, suffix: "K", label: "Pipes Harvested" },
    { end: 98, suffix: "%", label: "Oxidation Rate" },
    { end: 100, suffix: "%", label: "Farm Grown" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-amber-accent/10 bg-[#0f0d09]">
      <div className="absolute inset-0 oxidized-metal" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-3 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-shell group relative min-h-44 overflow-hidden border border-white/[0.04] bg-black/18 p-6 opacity-100 backdrop-blur-sm"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-accent/40 to-transparent" />
            <Counter
              end={stat.end}
              suffix={stat.suffix}
              className="font-display text-5xl font-black text-amber-accent sm:text-6xl"
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-earth-100/55">
              {stat.label}
            </p>
            <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-copper-accent/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".product-reveal");
  const featuredProducts = products.slice(0, 4);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#090907_0%,#14100b_45%,#090907_100%)]" />
      <div className="absolute inset-0 noise-overlay opacity-30" />
      <SectionWipe />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="product-reveal mx-auto mb-16 max-w-3xl text-center">
          <Kicker icon={PackageOpen}>Featured Collection</Kicker>
          <h2 className="mt-6 text-4xl font-black leading-[1] tracking-normal text-balance font-display sm:text-6xl">
            Pipes Worthy of <RustGradient>Your Collection</RustGradient>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Hand-selected from our finest harvests. Each piece tells a unique
            story of oxidation and time.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "1200px" }}>
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="product-reveal">
              <TiltCard className="rounded-lg" tiltAmount={7} glareOpacity={0.15}>
                <Link href="/store" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-accent">
                  <Card className="relative h-full overflow-hidden rounded-lg border-white/[0.08] bg-[#15120d]/80 shadow-2xl shadow-black/35 backdrop-blur-sm transition-colors duration-500 group-hover:border-amber-accent/30">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 metallic-sheen opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090907] via-[#090907]/10 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-earth-100/75 backdrop-blur-md">
                        0{index + 1}
                      </div>
                      {product.badge && (
                        <Badge className={`absolute right-4 top-4 ${product.badgeColor} backdrop-blur-sm`}>
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-xl font-bold leading-tight text-foreground">
                          {product.name}
                        </h3>
                        <span className="font-display text-xl font-black text-amber-accent">
                          ${product.price}
                        </span>
                      </div>
                      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-amber-accent text-amber-accent" />
                          <span className="text-sm text-foreground/85">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-copper-accent">
                          Patina details
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </TiltCard>
            </div>
          ))}
        </div>

        <div className="product-reveal mt-12 text-center">
          <MagneticButton>
            <Button
              render={<Link href="/store" />}
              nativeButton={false}
              variant="outline"
              className="h-12 rounded-full border-amber-accent/25 bg-black/20 px-8 text-amber-accent backdrop-blur-md transition-all duration-300 hover:border-amber-accent/50 hover:bg-amber-accent/10"
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

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".about-reveal", "top 72%");

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-28 sm:py-40">
      <div className="absolute inset-0 bg-[#090907]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(212,148,76,0.1),transparent_34%),radial-gradient(circle_at_78%_52%,rgba(74,103,65,0.11),transparent_30%)]" />
      <div className="absolute inset-0 noise-overlay opacity-25" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="about-reveal grid grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-4 sm:space-y-5">
            <ParallaxImage
              src={landingImages.harvestedPipe.src}
              alt={landingImages.harvestedPipe.alt}
              className="rust-image-mask aspect-[3/4] rounded-lg ring-1 ring-white/10"
              sizes="(min-width: 1024px) 24vw, 50vw"
              speed={0.22}
            />
            <ParallaxImage
              src={landingImages.farmer.src}
              alt={landingImages.farmer.alt}
              className="aspect-square rounded-lg ring-1 ring-white/10"
              sizes="(min-width: 1024px) 21vw, 50vw"
              speed={0.14}
            />
          </div>
          <div className="space-y-4 pt-12 sm:space-y-5">
            <ParallaxImage
              src={landingImages.sunrise.src}
              alt={landingImages.sunrise.alt}
              className="aspect-square rounded-lg ring-1 ring-white/10"
              sizes="(min-width: 1024px) 21vw, 50vw"
              speed={0.28}
            />
            <ParallaxImage
              src={landingImages.hands.src}
              alt={landingImages.hands.alt}
              className="rust-image-mask aspect-[3/4] rounded-lg ring-1 ring-white/10"
              sizes="(min-width: 1024px) 24vw, 50vw"
              speed={0.12}
            />
          </div>
        </div>

        <div className="space-y-7">
          <div className="about-reveal">
            <Kicker icon={Sprout}>Our Story</Kicker>
          </div>
          <RevealText
            as="h2"
            splitBy="words"
            className="about-reveal text-4xl font-black leading-[1.02] tracking-normal text-balance font-display sm:text-6xl"
          >
            Born from the Earth, Shaped by Time
          </RevealText>
          <p className="about-reveal text-lg leading-8 text-muted-foreground">
            It all started in 1998 when our founder noticed something
            beautiful: a forgotten pipe, left in the rain, transforming into a
            work of art. That moment of accidental oxidation sparked a
            revolution. Today, MegaGamerLand is a 50-acre farm dedicated to the
            art and science of growing the world&apos;s finest rusty pipes.
          </p>
          <p className="about-reveal leading-7 text-muted-foreground">
            Our unique soil composition, combined with North Bay&apos;s perfect
            humidity and seasonal freeze-thaw cycles, creates rust conditions
            that simply can&apos;t be replicated anywhere else on Earth. Every
            pipe we sell is 100% farm-grown, naturally oxidized, and
            hand-selected for quality.
          </p>
          <div className="about-reveal">
            <MagneticButton>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                className="rust-fill-button mt-2 h-12 overflow-hidden rounded-full border-0 bg-amber-accent px-8 font-semibold text-deep"
              >
                <span className="relative z-10 flex items-center">
                  See Our Pipes
                  <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Sprout,
      title: "Plant",
      description:
        "Fresh iron pipes are carefully placed in our nutrient-rich North Bay soil, positioned for optimal sun and rain exposure.",
      image: landingImages.farmer,
    },
    {
      icon: Droplets,
      title: "Nurture",
      description:
        "Ontario's natural rainfall and our controlled irrigation system begin the oxidation process, layer by delicate layer.",
      image: landingImages.sunrise,
    },
    {
      icon: Wind,
      title: "Weather",
      description:
        "Seasonal freeze-thaw cycles create micro-cracking and deep patina patterns that no factory can replicate.",
      image: landingImages.hands,
    },
    {
      icon: Award,
      title: "Select",
      description:
        "Each pipe is hand-inspected for rust depth, color consistency, and structural character before earning our seal.",
      image: landingImages.fittings,
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray<HTMLElement>(".process-step");
      stepEls.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });

      gsap.fromTo(
        ".process-rail-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-visible bg-[#0a0907] py-28 sm:py-36">
      <SectionWipe className="top-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(212,148,76,0.12),transparent_38%)]" />
      <div className="absolute inset-0 noise-overlay opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <Kicker icon={Wind}>The Process</Kicker>
          <h2 className="mt-6 text-4xl font-black leading-[1] tracking-normal text-balance font-display sm:text-6xl">
            From Soil to <RustGradient>Showcase</RustGradient>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Four stages of natural artistry. No shortcuts, no chemicals - just
            time and the elements.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="top-28 h-fit lg:sticky">
            <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-black/25 shadow-2xl shadow-black/40">
              {steps.map((step, index) => (
                <Image
                  key={step.title}
                  src={step.image.src}
                  alt={step.image.alt}
                  width={900}
                  height={1000}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={`aspect-[4/5] w-full object-cover transition-all duration-700 ${
                    activeStep === index
                      ? "relative opacity-100 blur-0"
                      : "absolute inset-0 opacity-0 blur-md"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080705] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-accent/80">
                  Stage 0{activeStep + 1}
                </p>
                <p className="mt-2 font-display text-3xl font-black">
                  {steps[activeStep].title}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 sm:block">
              <div className="process-rail-fill h-full w-full origin-top scale-y-0 bg-gradient-to-b from-amber-accent via-copper-accent to-transparent" />
            </div>
            <div className="space-y-8 sm:pl-20">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className={`process-step relative min-h-[42vh] rounded-lg border p-7 transition-all duration-500 ${
                    activeStep === index
                      ? "border-amber-accent/30 bg-amber-accent/[0.07]"
                      : "border-white/[0.07] bg-white/[0.025]"
                  }`}
                >
                  <div className="absolute -left-[4.65rem] top-8 hidden h-12 w-12 items-center justify-center rounded-full border border-amber-accent/25 bg-[#0a0907] text-amber-accent shadow-[0_0_30px_rgba(212,148,76,0.16)] sm:flex">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-copper-accent">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-black">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".feature-reveal");

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

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0907,#15110c_45%,#090907)]" />
      <div className="absolute inset-0 oxidized-metal opacity-70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="feature-reveal mx-auto mb-16 max-w-3xl text-center">
          <Kicker icon={Shield}>Why Choose Us</Kicker>
          <h2 className="mt-6 text-4xl font-black leading-[1] tracking-normal text-balance font-display sm:text-6xl">
            Rust Done Right, <RustGradient>Since Day One</RustGradient>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            We&apos;re not just a pipe shop. We&apos;re a rust farm. And that
            makes all the difference.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="feature-reveal">
              <SpotlightCard className="h-full rounded-lg" spotlightColor="rgba(212, 148, 76, 0.16)">
                <Card className="h-full rounded-lg border-white/[0.08] bg-black/22 backdrop-blur-sm">
                  <CardContent className="space-y-6 p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-amber-accent/15 bg-amber-accent/10 text-amber-accent">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".testimonial-reveal");

  const testimonials = [
    {
      name: "Margaret T.",
      role: "Interior Designer",
      text: "I ordered the Heritage Rust collection for a client's loft renovation. The patina depth is absolutely stunning - you can't fake this kind of character.",
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

  const TestimonialCard = ({ t }: { t: (typeof testimonials)[0] }) => (
    <article className="relative w-[min(86vw,440px)] shrink-0 rounded-lg border border-white/[0.08] bg-[#14100c]/75 p-8 shadow-2xl shadow-black/35 backdrop-blur-md transition-colors duration-500 hover:border-amber-accent/25">
      <div className="quote-mark relative" />
      <div className="space-y-5 pt-7">
        <div className="flex gap-1">
          {Array.from({ length: t.stars }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-accent text-amber-accent" />
          ))}
        </div>
        <p className="text-[15px] leading-7 text-foreground/88">
          &ldquo;{t.text}&rdquo;
        </p>
        <div className="h-px bg-gradient-to-r from-amber-accent/25 to-transparent" />
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </article>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 bg-[#090907]" />
      <div className="absolute inset-0 noise-overlay opacity-25" />
      <div className="testimonial-reveal relative mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Kicker icon={Star}>Testimonials</Kicker>
          <h2 className="mt-6 text-4xl font-black leading-[1] tracking-normal text-balance font-display sm:text-6xl">
            Loved by Rust <RustGradient>Enthusiasts</RustGradient>
          </h2>
        </div>
      </div>

      <div className="testimonial-reveal">
        <Marquee speed={42} pauseOnHover className="mb-6">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee speed={46} direction="right" pauseOnHover>
          {testimonials.slice(3).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".faq-reveal");

  return (
    <section id="faq" ref={sectionRef} className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#15110c,#090907)]" />
      <div className="absolute inset-0 noise-overlay opacity-25" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="faq-reveal mx-auto mb-14 max-w-2xl text-center">
          <Kicker>FAQ</Kicker>
          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-normal text-balance font-display sm:text-6xl">
            Questions About Our <RustGradient>Rusty Pipes</RustGradient>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Helpful details for collectors, designers, and anyone searching for
            naturally oxidized rusty pipes in North Bay, Ontario.
          </p>
        </div>

        <div className="faq-reveal">
          <FAQAccordion
            items={homeFaqs.map((f) => ({
              question: f.question,
              answer: f.answer,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealTimeline(sectionRef, ".cta-reveal", "top 75%");

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
      <div className="absolute inset-0 bg-[#090907]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(212,148,76,0.2),transparent_34%)]" />
      <div className="absolute inset-0 rust-vignette" />
      <div className="absolute inset-0 noise-overlay opacity-35" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-lg border border-amber-accent/15 bg-black/30 p-7 shadow-2xl shadow-black/45 backdrop-blur-sm sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:p-16">
        <div className="cta-reveal space-y-7">
          <h2 className="text-4xl font-black leading-[1] tracking-normal text-balance font-display sm:text-6xl">
            Ready to Bring Home <RustGradient>the Rust?</RustGradient>
          </h2>
          <p className="max-w-lg text-lg leading-8 text-muted-foreground">
            Visit our store and discover pipes in every stage of oxidation -
            from fresh surface rust to deep heritage patina. Your perfect pipe
            is waiting.
          </p>
          <MagneticButton>
            <Button
              render={<Link href="/store" />}
              nativeButton={false}
              size="lg"
              className="rust-fill-button h-14 overflow-hidden rounded-full border-0 bg-amber-accent px-10 text-base font-bold text-deep"
            >
              <span className="relative z-10 flex items-center">
                Visit the Store
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </MagneticButton>
        </div>

        <div className="cta-reveal relative min-h-[320px] overflow-hidden rounded-lg ring-1 ring-white/10 lg:min-h-[520px]">
          <Image
            src={landingImages.fittings.src}
            alt={landingImages.fittings.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 metallic-sheen" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedProductsSection />
      <AboutSection />
      <ProcessSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
