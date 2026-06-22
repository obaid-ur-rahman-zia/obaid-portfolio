"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: "h2" | "h3" | "p";
}

export function ScrollRevealText({ children, className = "", as: Tag = "p" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map((c) => `<span class="inline-block">${c === " " ? "&nbsp;" : c}</span>`)
      .join("");

    const chars = el.querySelectorAll("span");
    gsap.fromTo(
      chars,
      { opacity: 0, filter: "blur(6px)", y: 12 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.5,
        stagger: 0.015,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === el) t.kill();
      });
    };
  }, [children]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
