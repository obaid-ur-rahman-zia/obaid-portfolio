"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("portfolio-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const onEnterLink = () => {
      gsap.to(dot, { scale: 5.8, duration: 0.25 });
      gsap.to(ring, { scale: 1.5, borderColor: "#8a0000", duration: 0.25 });
      gsap.to(dot, { backgroundColor: "#cb0404", duration: 0.25 });
    };

    const onLeaveLink = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "#ffffff", duration: 0.25 });
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.5)", duration: 0.25 });
    };

    const onEnterHeading = () => {
      gsap.to(dot, { scale: 19, duration: 0.3 });
      gsap.to(ring, { scale: 5, duration: 0.3 });
    };

    const onLeaveHeading = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(ring, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", move);

    const links = document.querySelectorAll("a, button, [data-cursor='pointer']");
    const headings = document.querySelectorAll("h1, h2, h3");

    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });
    headings.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHeading);
      el.addEventListener("mouseleave", onLeaveHeading);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("portfolio-cursor-active");
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      headings.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHeading);
        el.removeEventListener("mouseleave", onLeaveHeading);
      });
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        aria-hidden
      />
    </>
  );
}
