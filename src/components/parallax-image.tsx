"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  sizes?: string;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  sizes = "100vw",
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !imageRef.current) return;
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const image = imageRef.current;
    const ctx = gsap.context(() => {
      const offset = speed * 100;

      gsap.fromTo(
        image,
        { y: -offset },
        {
          y: offset,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ top: "-15%", bottom: "-15%", height: "130%" }}
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
    </div>
  );
}
