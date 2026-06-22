"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

const SOURCES = [SITE.photo, "/images/profile.svg"];

interface HeroPortraitProps {
  src?: string;
  alt: string;
  grayscale?: boolean;
  /** Keep decorative frames inside the column (no overlap into center) */
  contained?: boolean;
}

export function HeroPortrait({ src, alt, grayscale = false, contained = false }: HeroPortraitProps) {
  const list = [...(src ? [src] : []), ...SOURCES.filter((item) => item !== src)];
  const [idx, setIdx] = useState(0);
  const active = list[idx];

  return (
    <div className={cn("relative w-full", contained && "hero-portrait-contained")}>
      {!contained && (
        <>
          <div
            className="pointer-events-none absolute right-0 top-6 h-[106%] w-full translate-x-3 border border-white/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-6 top-0 h-full w-[92%] border border-white/15"
            aria-hidden
          />
        </>
      )}

      <div
        className={cn(
          "hero-portrait-frame relative z-10 aspect-[3/4] overflow-hidden border border-white/15 bg-black",
          contained && "hero-portrait-frame--contained",
          grayscale && "hero-portrait-gray"
        )}
      >
        {active && (
          <Image
            key={active}
            src={active}
            alt={alt}
            fill
            priority
            className="object-cover object-[center_15%]"
            sizes="(max-width: 768px) 85vw, (max-width: 1280px) 38vw, 440px"
            onError={() => setIdx((i) => (i < list.length - 1 ? i + 1 : i))}
          />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black via-black/60 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
