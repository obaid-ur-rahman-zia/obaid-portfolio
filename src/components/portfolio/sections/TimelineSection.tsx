"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const milestones = [
  {
    year: "2021",
    title: "FREELANCING",
    desc: "Started delivering full-stack software projects globally — web apps, APIs, and SaaS for international clients.",
    tags: ["Freelance", "Remote"],
  },
  {
    year: "2023",
    title: "HISKYTECH",
    desc: "Intern to full-stack developer — MERN stack in production and client-facing delivery.",
    tags: ["MERN", "Web Apps"],
  },
  {
    year: "2025",
    title: "PLIVIX",
    desc: "Founded Plivix Technologies — boutique studio for full-stack, AI, ML, and 3D development.",
    tags: ["Founder", "Agency"],
  },
  {
    year: "2025",
    title: "VISIONTILLION",
    desc: "Product Lead at vstore.sa — solo ownership of AI 3D print platform, AWS pipeline, and frontend.",
    tags: ["Product Lead", "AI / 3D"],
  },
  {
    year: "2025",
    title: "SWITCH2ITECH",
    desc: "Built and deployed 30+ systems — VPS DevOps, Dokploy, and full technical management.",
    tags: ["DevOps", "SaaS"],
  },
  {
    year: "2026",
    title: "SCALE",
    desc: "60+ client projects delivered — Web3, AI agents, multi-tenant SaaS, and solo product ownership.",
    tags: ["AI", "Web3", "SaaS"],
  },
];

export function TimelineSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="swiss-border-t swiss-grid-bg py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="swiss-mono text-neutral-500 mb-4">// SYSTEM_LOGS_V3.0 — COMMITS & MILESTONES</p>
        <h2 className="leading-none mb-4">
          <span className="swiss-outline-text swiss-display text-5xl md:text-8xl block">DIGITAL</span>
          <span className="swiss-display text-5xl md:text-8xl text-white">EVOLUTION_</span>
        </h2>

        <ul className="mt-16 divide-y divide-white/10">
          {milestones.map((m, i) => (
            <li
              key={`${m.year}-${m.title}`}
              className="py-6 md:py-8 cursor-pointer group"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              data-cursor="pointer"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 md:col-span-2 flex items-center gap-3">
                  {active === i && (
                    <span className="h-2 w-2 rounded-full border border-white/50 hidden md:block" aria-hidden />
                  )}
                  <p
                    className={`swiss-mono text-sm md:text-base transition-colors ${
                      active === i ? "text-[#cb0404]" : "text-neutral-500"
                    }`}
                  >
                    {m.year}
                  </p>
                </div>
                <div className="col-span-8 md:col-span-9">
                  <h3
                    className={`swiss-display text-2xl md:text-4xl transition-colors ${
                      active === i ? "text-white" : "text-white/50"
                    }`}
                  >
                    {m.title}
                  </h3>
                  <p
                    className={`text-sm text-neutral-500 mt-2 max-w-xl transition-opacity ${
                      active === i ? "opacity-100" : "opacity-0 md:opacity-0 h-0 md:h-auto overflow-hidden"
                    }`}
                  >
                    {m.desc}
                  </p>
                </div>
                <div className="col-span-2 flex justify-end">
                  <ArrowUpRight
                    className={`h-5 w-5 transition-all ${
                      active === i ? "text-[#cb0404] translate-x-0" : "text-neutral-600 -translate-x-1 opacity-40"
                    }`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
