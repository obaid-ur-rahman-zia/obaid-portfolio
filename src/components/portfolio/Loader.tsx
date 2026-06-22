"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = gridRef.current?.querySelectorAll(".loader-line");
    if (lines?.length) {
      gsap.fromTo(
        lines,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power3.out" }
      );
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 3.5,
      ease: "power3.inOut",
      onUpdate: () => setProgress(Math.round(obj.val)),
      onComplete: () => setTimeout(() => setExiting(true), 600),
    });
  }, []);

  if (done) return null;

  if (exiting) {
    return (
      <div className="fixed inset-0 z-[10000] flex w-full">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="flex-1 bg-black"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: i % 2 === 0 ? "top" : "bottom" }}
            onAnimationComplete={() => {
              if (i === 4) {
                sessionStorage.setItem("portfolio-loaded", "1");
                setDone(true);
                onComplete();
              }
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-black text-white">
      <div className="flex flex-1 flex-col p-6 md:p-10 relative">
        <div className="flex justify-between swiss-mono text-[10px] text-neutral-500 relative z-10">
          <span>{SITE.name} Portfolio © 2026</span>
          <span className="text-green-400">SYSTEM_CHECK OPTIMAL</span>
        </div>

        <div ref={gridRef} className="absolute inset-0 pointer-events-none flex">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="loader-line flex-1 border-r border-white/[0.06] origin-top" />
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <span className="swiss-display text-[18vw] md:text-[10rem] tabular-nums leading-none">{progress}%</span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 justify-between swiss-mono text-[10px] text-neutral-500 relative z-10">
          <span>Status: Loading Resources</span>
          <span>Location: Pakistan</span>
          <span>Mode: Dark</span>
        </div>

        <div className="mt-4 h-px bg-white/10 relative z-10 overflow-hidden">
          <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
