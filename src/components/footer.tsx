"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Wrench, MapPin, Mail, Phone } from "lucide-react";
import { farmAddress, farmDirectionsHref } from "@/lib/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!footerRef.current || !columnsRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        columnsRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, footerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative border-t border-border bg-deep">
      {/* Grain texture */}
      <div className="absolute inset-0 noise-overlay opacity-50 pointer-events-none" />

      {/* Amber glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-accent to-copper-accent text-deep">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground font-display">
                Mega<span className="text-amber-accent">Gamer</span>Land
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              North Bay Ontario&apos;s premier rusty pipe farm. Cultivating
              corrosion with care since the dawn of oxidation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-amber-accent uppercase tracking-[0.2em]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-amber-accent transition-colors duration-300 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-muted-foreground hover:text-amber-accent transition-colors duration-300 text-sm"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-amber-accent uppercase tracking-[0.2em]">
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-accent/60" />
                <a
                  href={farmDirectionsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 hover:text-amber-accent"
                >
                  {farmAddress}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-amber-accent/60" />
                greg@megagamerland.ca
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-amber-accent/60" />
                705-499-5396
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-5">
            <h3 className="text-xs font-semibold text-amber-accent uppercase tracking-[0.2em]">
              Farm Hours
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span className="text-foreground/70">8am – 6pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-foreground/70">9am – 4pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-foreground/40">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} MegaGamerLand. All rights
            reserved.
          </p>
          <p className="italic">Where rust is a feature, not a bug.</p>
        </div>
      </div>
    </footer>
  );
}
