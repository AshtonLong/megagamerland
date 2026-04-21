"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    onToggle();
    if (!contentRef.current || !innerRef.current || !iconRef.current) return;

    if (!isOpen) {
      gsap.set(contentRef.current, { height: "auto" });
      const height = contentRef.current.offsetHeight;
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.to(iconRef.current, { rotation: 180, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [isOpen, onToggle]);

  return (
    <div className="border border-border/50 bg-elevated/40 backdrop-blur-sm rounded-xl overflow-hidden transition-colors duration-300 hover:border-amber-accent/20">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-6 text-left gap-4"
      >
        <span className="text-lg font-semibold font-display text-foreground">
          {item.question}
        </span>
        <div
          ref={iconRef}
          className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-amber-accent/10 text-amber-accent"
        >
          <Plus className="h-4 w-4" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={innerRef} className="px-6 pb-6">
          <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
