"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
  scale?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareOpacity = 0.15,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion()) return;
      if (!cardRef.current || !glareRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -tiltAmount;
      const rotateY = ((x - centerX) / centerX) * tiltAmount;

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        scale,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      gsap.to(glareRef.current, {
        opacity: glareOpacity,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(212,148,76,0.4) 0%, transparent 60%)`,
        duration: 0.3,
      });
    },
    [tiltAmount, glareOpacity, scale]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion()) return;
    if (!cardRef.current || !glareRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(glareRef.current, {
      opacity: 0,
      duration: 0.4,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
}
