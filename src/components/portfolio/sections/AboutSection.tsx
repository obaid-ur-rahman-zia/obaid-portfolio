"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollRevealText } from "../ScrollRevealText";
import type { Profile } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection({ profile }: { profile: Profile }) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = statsRef.current?.querySelectorAll(".stat-value");
    if (!cards) return;
    cards.forEach((el) => {
      if (el.getAttribute("data-skip-count") === "true") return;
      const target = parseInt(el.getAttribute("data-value") || "0", 10);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.v)}${el.getAttribute("data-suffix") || ""}`;
        },
      });
    });
  }, []);

  const stats = [
    { key: "EXP_YRS", label: "Years Experience", value: profile.years_experience, suffix: "+" },
    { key: "PRJ_CMP", label: "Projects Delivered", value: profile.apps_in_production, suffix: "+" },
    { key: "SYSTEMS", label: "Systems Deployed", value: profile.clients_served, suffix: "+" },
    { key: "AVAIL", label: "Open for Work", value: 1, suffix: "", display: "OPEN", isAvail: true },
  ];

  return (
    <section id="about" className="swiss-border-t swiss-grid-bg py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#cb0404] text-lg" aria-hidden>
            →
          </span>
          <p className="swiss-section-tag text-[#cb0404]">Identity</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-0 border-b border-white/10 pb-16">
          <div className="lg:col-span-5 py-4 lg:py-8 lg:pr-12">
            <h2 className="leading-none">
              <span className="swiss-outline-text swiss-display text-6xl md:text-8xl lg:text-9xl block">
                WHO
              </span>
              <span className="swiss-display text-6xl md:text-8xl lg:text-9xl text-white">_</span>
            </h2>
          </div>
          <div className="lg:col-span-7 py-4 lg:py-8 lg:pl-12 border-t lg:border-t-0 lg:border-l-2 border-[#cb0404]">
            <ScrollRevealText className="text-neutral-400 text-base md:text-lg leading-relaxed" as="p">
              {profile.bio}
            </ScrollRevealText>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
              <strong className="text-white font-medium">Next.js</strong>,{" "}
              <strong className="text-white font-medium">Node.js</strong>, and{" "}
              <strong className="text-white font-medium">AI</strong> — owning products from
              architecture and AWS DevOps to shipped production systems.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mt-0">
          {stats.map((s) => (
            <div key={s.key} className="bg-black p-6 md:p-10 relative swiss-stat-cell">
              {s.isAvail && (
                <span
                  className="absolute top-4 right-4 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                  aria-label="Available"
                />
              )}
              <p className="swiss-mono text-[10px] text-neutral-500 mb-4">{s.key}</p>
              <p
                className="stat-value swiss-display text-3xl md:text-5xl"
                data-value={s.isAvail ? 0 : s.value}
                data-suffix={s.suffix}
                data-skip-count={s.isAvail ? "true" : "false"}
              >
                {s.display || `0${s.suffix}`}
              </p>
              <p className="text-xs md:text-sm text-neutral-500 mt-2 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
