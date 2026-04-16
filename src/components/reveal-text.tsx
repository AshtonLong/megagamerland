"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextUnits } from "@/lib/text-split";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars";
  triggerStart?: string;
}

export function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0,
  stagger = 0.04,
  splitBy = "words",
  triggerStart = "top 85%",
}: RevealTextProps) {
  const elRef = useRef<HTMLElement | null>(null);
  const setRef = (node: HTMLElement | null) => {
    elRef.current = node;
  };

  useLayoutEffect(() => {
    if (!elRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = elRef.current;
    const ctx = gsap.context(() => {
      const revealUnits = el.querySelectorAll<HTMLElement>(".reveal-unit");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          toggleActions: "play none none none",
        },
      });

      tl.to(revealUnits, {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        stagger,
        delay,
        ease: "power3.out",
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [children, delay, stagger, splitBy, triggerStart]);

  const content = (
    <>
      {splitTextUnits(children, splitBy).map((unit, index) =>
        /^\s+$/.test(unit) ? (
          <span key={`space-${index}`}>{unit}</span>
        ) : (
          <span
            key={`${unit}-${index}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <span
              className="reveal-unit"
              style={{
                display: "inline-block",
                transform: "translateY(110%)",
                opacity: 0,
              }}
            >
              {unit}
            </span>
          </span>
        ),
      )}
    </>
  );

  if (Tag === "h1")
    return (
      <h1 ref={setRef} className={className}>
        {content}
      </h1>
    );
  if (Tag === "h2")
    return (
      <h2 ref={setRef} className={className}>
        {content}
      </h2>
    );
  if (Tag === "h3")
    return (
      <h3 ref={setRef} className={className}>
        {content}
      </h3>
    );
  if (Tag === "span")
    return (
      <span ref={setRef} className={className}>
        {content}
      </span>
    );
  return (
    <p ref={setRef} className={className}>
      {content}
    </p>
  );
}
