"use client";

import { useRef, useCallback, useState } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
}

export function TextScramble({
  text,
  className = "",
  duration = 800,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);
  const isScrambling = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling.current) return;
    isScrambling.current = true;

    const startTime = Date.now();
    const length = text.length;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < revealedCount) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplay(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        isScrambling.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [text, duration]);

  const handleMouseEnter = useCallback(() => {
    scramble();
  }, [scramble]);

  return (
    <span className={className} onMouseEnter={handleMouseEnter}>
      {display}
    </span>
  );
}
