"use client";

import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className = "",
  speed = 30,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  const animationDirection = direction === "left" ? "normal" : "reverse";
  const animationStateClass = pauseOnHover
    ? "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
    : "";

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`marquee-track flex w-max ${animationStateClass}`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${animationDirection}`,
        }}
      >
        <div className="flex shrink-0 gap-8 pr-8">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 gap-8 pr-8">
          {children}
        </div>
        <div aria-hidden="true" className="flex shrink-0 gap-8 pr-8">
          {children}
        </div>
      </div>
    </div>
  );
}
