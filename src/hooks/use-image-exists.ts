"use client";

import { useEffect, useState } from "react";

export function useImageExists(src: string | undefined) {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!src) {
      setExists(false);
      return;
    }
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setExists(true);
    };
    img.onerror = () => {
      if (!cancelled) setExists(false);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return exists;
}
