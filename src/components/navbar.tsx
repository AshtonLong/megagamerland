"use client";

import Link from "next/link";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { Menu, Wrench, X } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;

    if (prefersReducedMotion()) {
      logoRef.current?.style.setProperty("opacity", "1");
      Array.from(linksRef.current?.children ?? []).forEach((link) => {
        (link as HTMLElement).style.opacity = "1";
      });
    } else {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
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
    }

    // Navbar bg on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      ctx?.revert();
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
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/10 supports-backdrop-filter:backdrop-blur-xs"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav"
            className="absolute inset-y-0 right-0 flex h-full w-72 flex-col gap-4 border-l border-border bg-elevated bg-clip-padding text-sm text-popover-foreground shadow-lg"
          >
            <Button
              type="button"
              variant="ghost"
              className="absolute right-3 top-3"
              size="icon-sm"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <nav className="mt-8 flex flex-col gap-4">
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
          </div>
        </div>
      ) : null}
    </header>
  );
}
