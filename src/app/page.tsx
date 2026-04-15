import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Droplets,
  Leaf,
  Shield,
  Truck,
  Star,
  ChevronRight,
} from "lucide-react";

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

function LandingImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-earth-200 via-earth-300 to-rust-100 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-earth-50 via-rust-50 to-earth-100" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-rust-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/2 rounded-full bg-earth-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 animate-fade-in-up">
            <Badge
              variant="secondary"
              className="border-rust-200 bg-rust-100 px-3 py-1 text-xs font-medium text-rust-700"
            >
              North Bay&apos;s Finest Since 1998
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              The World&apos;s Most{" "}
              <span className="bg-gradient-to-r from-rust-600 to-rust-800 bg-clip-text text-transparent">
                Beautiful Rust
              </span>
              , Grown on a Farm
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              At MegaGamerLand, we don&apos;t just sell rusty pipes. We
              cultivate them. Nestled in the heart of North Bay, Ontario, our
              farm produces the most exquisite oxidized iron specimens nature,
              and a little neglect, can provide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                size="lg"
                className="h-12 bg-rust-600 px-8 text-base text-white hover:bg-rust-700"
              >
                Browse the Farm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                render={<Link href="#about" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="h-12 border-earth-300 px-8 text-base hover:bg-earth-50"
              >
                Our Story
              </Button>
            </div>
          </div>

          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-rust-200/50 ring-1 ring-earth-200">
              <LandingImage
                src={landingImages.hero.src}
                alt={landingImages.hero.alt}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl bg-white p-3 shadow-lg ring-1 ring-earth-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rust-100">
                <Star className="h-5 w-5 fill-rust-600 text-rust-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">4.9 / 5</p>
                <p className="text-xs text-muted-foreground">2,400+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "25+", label: "Years of Rust" },
    { value: "12K", label: "Pipes Harvested" },
    { value: "98%", label: "Oxidation Rate" },
    { value: "100%", label: "Farm Grown" },
  ];

  return (
    <section className="relative border-y border-border/40 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-rust-700 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <LandingImage
                src={landingImages.harvestedPipe.src}
                alt={landingImages.harvestedPipe.alt}
                className="aspect-[3/4] rounded-xl"
                sizes="(min-width: 1024px) 22vw, 44vw"
              />
              <LandingImage
                src={landingImages.farmer.src}
                alt={landingImages.farmer.alt}
                className="aspect-square rounded-xl"
                sizes="(min-width: 1024px) 18vw, 44vw"
              />
            </div>
            <div className="space-y-4 pt-8">
              <LandingImage
                src={landingImages.sunrise.src}
                alt={landingImages.sunrise.alt}
                className="aspect-square rounded-xl"
                sizes="(min-width: 1024px) 18vw, 44vw"
              />
              <LandingImage
                src={landingImages.hands.src}
                alt={landingImages.hands.alt}
                className="aspect-[3/4] rounded-xl"
                sizes="(min-width: 1024px) 22vw, 44vw"
              />
            </div>
          </div>

          <div className="space-y-6">
            <Badge
              variant="secondary"
              className="border-earth-200 bg-earth-100 text-earth-700"
            >
              Our Story
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Born from the Earth,{" "}
              <span className="text-rust-600">Shaped by Time</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              It all started in 1998 when our founder noticed something
              beautiful: a forgotten pipe, left in the rain, transforming into
              a work of art. That moment of accidental oxidation sparked a
              revolution. Today, MegaGamerLand is a 50-acre farm dedicated to
              the art and science of growing the world&apos;s finest rusty pipes.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Our unique soil composition, combined with North Bay&apos;s
              perfect humidity and seasonal freeze-thaw cycles, creates rust
              conditions that simply can&apos;t be replicated anywhere else on
              Earth. Every pipe we sell is 100% farm-grown, naturally oxidized,
              and hand-selected for quality.
            </p>
            <Button
              render={<Link href="/store" />}
              nativeButton={false}
              className="mt-2 bg-rust-600 text-white hover:bg-rust-700"
            >
              See Our Pipes
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
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
    <section className="bg-gradient-to-b from-earth-50/50 to-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-rust-200 bg-rust-100 text-rust-700"
          >
            Why Choose Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Rust Done Right,{" "}
            <span className="text-rust-600">Since Day One</span>
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We&apos;re not just a pipe shop. We&apos;re a rust farm. And that
            makes all the difference.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-rust-300 hover:shadow-lg hover:shadow-rust-100/50"
            >
              <CardContent className="space-y-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rust-100 transition-colors group-hover:bg-rust-200">
                  <feature.icon className="h-6 w-6 text-rust-600" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
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

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Margaret T.",
      role: "Interior Designer",
      text: "I ordered the Heritage Rust collection for a client's loft renovation. The patina depth is absolutely stunning, you can't fake this kind of character.",
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
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-earth-200 bg-earth-100 text-earth-700"
          >
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Rust <span className="text-rust-600">Enthusiasts</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="space-y-4 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-rust-500 text-rust-500"
                    />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <Separator />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rust-700 via-rust-800 to-earth-900 text-white">
          <div className="absolute inset-0 noise-overlay opacity-20" />
          <div className="absolute top-0 right-0 h-80 w-80 translate-x-1/3 -translate-y-1/2 rounded-full bg-rust-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-60 w-60 -translate-x-1/3 translate-y-1/2 rounded-full bg-earth-600/20 blur-3xl" />

          <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Bring Home the Rust?
              </h2>
              <p className="max-w-md leading-relaxed text-rust-200">
                Visit our store and discover pipes in every stage of oxidation,
                from fresh surface rust to deep heritage patina. Your perfect
                pipe is waiting.
              </p>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                size="lg"
                className="h-12 bg-white px-8 text-base font-semibold text-rust-800 hover:bg-rust-50"
              >
                Visit the Store
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="hidden lg:block">
              <LandingImage
                src={landingImages.fittings.src}
                alt={landingImages.fittings.alt}
                className="aspect-[4/3] rounded-2xl ring-1 ring-white/10"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
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
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
