"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ScreenshotCarousel({ screenshots }: { screenshots: string[] }) {
  const [index, setIndex] = useState(0);
  const items = screenshots.length > 0 ? screenshots : ["/images/apps/screenshots/placeholder.svg"];

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <div className="relative">
      <div className="mx-auto max-w-xs">
        <div className="relative rounded-[2.5rem] border-[10px] border-[#1a1a24] bg-[#1a1a24] shadow-2xl shadow-black/50 overflow-hidden aspect-[9/19]">
          <Image
            src={items[index]}
            alt={`Screenshot ${index + 1}`}
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
      </div>
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full glass-card"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full glass-card"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[var(--accent-cyan)]" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
