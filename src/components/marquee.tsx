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

  return (
    <div
      className={`flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex shrink-0 gap-8 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${animationDirection}`,
        }}
      >
        {children}
        {children}
      </div>
      <div
        className={`flex shrink-0 gap-8 ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee-scroll ${speed}s linear infinite ${animationDirection}`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
