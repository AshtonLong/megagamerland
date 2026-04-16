"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasTriggered = useRef(false);

  useLayoutEffect(() => {
    if (!ref.current || hasTriggered.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const node = ref.current;
    const proxy = { value: 0 };
    let tween: gsap.core.Tween | undefined;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 85%",
      onEnter: () => {
        if (hasTriggered.current) return;
        hasTriggered.current = true;

        tween = gsap.to(proxy, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setDisplay(
              `${prefix}${Math.round(proxy.value).toLocaleString()}${suffix}`,
            );
          },
        });
      },
    });

    return () => {
      tween?.kill();
      trigger.kill();
    };
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
