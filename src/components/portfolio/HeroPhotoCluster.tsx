"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { SITE } from "@/lib/site";

const PORTRAIT_FALLBACKS = [SITE.photo, "/images/profile.svg"];

interface HeroPhotoClusterProps {
  src?: string;
  alt: string;
  variant: "portrait" | "landscape";
  priority?: boolean;
  wireframeOnly?: boolean;
}

export function HeroPhotoCluster({
  src,
  alt,
  variant,
  priority,
  wireframeOnly = false,
}: HeroPhotoClusterProps) {
  const isPortrait = variant === "portrait";
  const candidates = [src, ...PORTRAIT_FALLBACKS].filter(
    (item, index, arr): item is string => Boolean(item) && arr.indexOf(item) === index
  );
  const [index, setIndex] = useState(0);
  const activeSrc = candidates[index];
  const showImage = Boolean(activeSrc) && !wireframeOnly;

  const handleError = () => {
    if (index < candidates.length - 1) setIndex((i) => i + 1);
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "absolute border border-white/30 pointer-events-none",
          isPortrait
            ? "right-1 top-4 w-full h-[104%] translate-x-2 md:translate-x-3"
            : "left-0 -top-14 md:-top-20 w-[50%] h-[135%]"
        )}
        aria-hidden
      />
      <div
        className={cn(
          "absolute border border-white/20 pointer-events-none",
          isPortrait
            ? "right-6 top-0 w-[94%] h-full"
            : "left-6 md:left-10 bottom-0 w-[90%] h-[95%]"
        )}
        aria-hidden
      />
      {!isPortrait && (
        <div
          className="absolute -right-1 top-8 w-[40%] h-[52%] border border-white/15 pointer-events-none"
          aria-hidden
        />
      )}

      <div
        className={cn(
          "relative swiss-photo-frame overflow-hidden z-10",
          isPortrait ? "aspect-[3/4] bg-neutral-950" : "aspect-[16/10] bg-transparent",
          wireframeOnly && "aspect-[16/10] border border-white/20 bg-transparent"
        )}
      >
        {showImage ? (
          <Image
            key={activeSrc}
            src={activeSrc!}
            alt={alt}
            fill
            className="object-cover object-top"
            priority={priority}
            sizes={isPortrait ? "(max-width: 768px) 42vw, 400px" : "(max-width: 768px) 72vw, 560px"}
            unoptimized
            onError={handleError}
          />
        ) : wireframeOnly ? (
          <div className="absolute inset-0" aria-hidden />
        ) : null}
      </div>
    </div>
  );
}
