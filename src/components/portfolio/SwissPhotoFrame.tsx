"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SwissPhotoFrameProps {
  src?: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  priority?: boolean;
  placeholderLabel?: string;
}

export function SwissPhotoFrame({
  src,
  alt,
  aspectClass = "aspect-[3/4]",
  className,
  priority,
  placeholderLabel = "Photo coming soon",
}: SwissPhotoFrameProps) {
  const hasImage = Boolean(src && !src.includes("profile.svg"));

  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute -inset-1 md:-inset-2 border border-white/25 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 pointer-events-none"
        aria-hidden
      />
      <div className={cn("relative swiss-photo-frame overflow-hidden bg-neutral-950", aspectClass)}>
        {hasImage ? (
          <Image
            src={src!}
            alt={alt}
            fill
            className="object-cover object-center"
            priority={priority}
            sizes="(max-width: 768px) 90vw, 420px"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-900/80">
            <span className="swiss-mono text-[9px] text-neutral-500 tracking-widest text-center px-4">
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
