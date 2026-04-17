"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Wrench, MapPin, Mail, Phone } from "lucide-react";
import {
  contactEmail,
  contactPhone,
  displayPhone,
  farmAddress,
  farmDirectionsHref,
  farmHours,
} from "@/lib/site";
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
      <div className="absolute inset-0 noise-overlay opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div
          ref={columnsRef}
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-accent to-copper-accent text-deep">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground font-display">
                Mega<span className="text-amber-accent">Gamer</span>Land
              </span>
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              North Bay Ontario&apos;s premier rusty pipe farm. Cultivating
              corrosion with care since the dawn of oxidation.
            </p>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-accent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-amber-accent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-amber-accent"
                >
                  Store
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-accent">
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-accent/60" />
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
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-accent/60" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors duration-300 hover:text-amber-accent"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-accent/60" />
                <a
                  href={`tel:${contactPhone}`}
                  className="transition-colors duration-300 hover:text-amber-accent"
                >
                  {displayPhone}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-accent">
              Farm Hours
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {farmHours.map((entry) => (
                <li key={entry.label} className="flex justify-between">
                  <span>{entry.label}</span>
                  <span
                    className={
                      entry.opens && entry.closes
                        ? "text-foreground/70"
                        : "text-foreground/40"
                    }
                  >
                    {entry.hoursLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="my-12 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground/60 sm:flex-row">
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
