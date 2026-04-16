"use client";

import Link from "next/link";
import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MagneticButton } from "@/components/magnetic-button";
import { Menu, Wrench } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        );
      }
      if (linksRef.current) {
        const links = linksRef.current.children;
        tl.fromTo(
          links,
          { opacity: 0, y: -15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }
    }, navRef);

    // Navbar bg on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "glass border-b border-amber-accent/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className="flex items-center gap-3 group opacity-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-accent to-copper-accent text-deep transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-accent/20 group-hover:scale-105">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground font-display">
            Mega<span className="text-amber-accent">Gamer</span>Land
          </span>
        </Link>

        {/* Desktop Nav */}
        <div ref={linksRef} className="hidden md:flex items-center gap-1">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
          >
            Home
          </Button>
          <Button
            render={<Link href="/store" />}
            nativeButton={false}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
          >
            Store
          </Button>
          <MagneticButton className="ml-3">
            <Button
              render={<Link href="/store" />}
              nativeButton={false}
              className="bg-gradient-to-r from-amber-accent to-copper-accent text-deep font-semibold hover:shadow-lg hover:shadow-amber-accent/20 transition-all duration-300 border-0"
            >
              Shop Now
            </Button>
          </MagneticButton>
        </div>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-white/5"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            }
          />
          <SheetContent
            side="right"
            className="w-72 bg-elevated border-l border-border"
          >
            <nav className="flex flex-col gap-4 mt-8">
              <Button
                render={<Link href="/" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-white/5"
              >
                Home
              </Button>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                variant="ghost"
                className="w-full justify-start text-lg text-foreground hover:bg-white/5"
              >
                Store
              </Button>
              <Button
                render={<Link href="/store" />}
                nativeButton={false}
                onClick={() => setOpen(false)}
                className="w-full bg-gradient-to-r from-amber-accent to-copper-accent text-deep font-semibold"
              >
                Shop Now
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
