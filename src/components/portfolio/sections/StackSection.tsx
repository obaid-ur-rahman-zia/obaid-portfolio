"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Profile } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: "01",
    title: "FRONTEND ENGINEERING",
    skills: [
      ["Next.js / React", 95],
      ["TypeScript", 92],
      ["UI / UX Implementation", 90],
      ["Performance & SSR", 88],
    ],
  },
  {
    id: "02",
    title: "BACKEND & DATA",
    skills: [
      ["Node.js / APIs", 92],
      ["PostgreSQL / MongoDB", 90],
      ["System Design", 88],
      ["Auth & Security", 86],
    ],
  },
  {
    id: "03",
    title: "AI & CLOUD",
    skills: [
      ["LLM Integration", 88],
      ["AWS / DevOps", 90],
      ["Docker / CI/CD", 85],
      ["Automation (n8n)", 84],
    ],
  },
  {
    id: "04",
    title: "ARCHITECTURE",
    skills: [
      ["SaaS / Multi-Tenant", 88],
      ["Product Ownership", 92],
      ["Web3 / 3D Systems", 82],
      ["Git / Leadership", 86],
    ],
  },
];

export function StackSection({ profile }: { profile: Profile }) {
  const sectionRef = useRef<HTMLElement>(null);
  const marquee = profile.skills?.length
    ? profile.skills
    : ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "AI", "Docker", "Prisma"];

  useEffect(() => {
    const bars = sectionRef.current?.querySelectorAll(".skill-bar-fill");
    bars?.forEach((bar) => {
      const w = bar.getAttribute("data-width") || "0";
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 90%", once: true },
        }
      );
      (bar as HTMLElement).style.width = `${w}%`;
    });
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="swiss-border-t py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <p className="swiss-mono text-neutral-500 mb-4">
          // SYSTEM_INVENTORY_V2.2 — OPTIMIZED FOR PRODUCTION SOFTWARE
        </p>
        <h2 className="swiss-display text-5xl md:text-8xl leading-none">
          <span className="swiss-outline-text">TECHNICAL</span>
        </h2>
        <p className="swiss-display text-4xl md:text-6xl text-white mt-1">STACK_</p>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {nodes.map((node) => (
            <div key={node.id} className="swiss-bracket-card p-8 md:p-10 bg-black/60">
              <p className="swiss-mono text-[#ff4d00] text-[10px] mb-3">[{node.id}] STACK_NODE</p>
              <h3 className="swiss-mono text-sm font-semibold mb-8 tracking-wider">{node.title}</h3>
              <ul className="space-y-5">
                {node.skills.map(([name, pct]) => (
                  <li key={name}>
                    <div className="flex justify-between swiss-mono text-[10px] mb-2">
                      <span className="text-neutral-300">{name}</span>
                      <span className="text-neutral-500">{pct}%</span>
                    </div>
                    <div className="h-px bg-white/10 overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-white origin-left"
                        style={{ width: `${pct}%`, transform: "scaleX(0)" }}
                        data-width={pct}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 overflow-hidden swiss-border-t border-b py-8">
        <div className="swiss-marquee-track flex whitespace-nowrap w-max">
          {[...marquee, ...marquee, ...marquee].map((t, i) => (
            <span key={`${t}-${i}`} className="swiss-mono text-3xl md:text-5xl mx-10 text-white/15">
              {t.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
