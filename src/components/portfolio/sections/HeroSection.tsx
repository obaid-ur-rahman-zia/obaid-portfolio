"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { getDisplayNameParts } from "@/lib/display-name";
import { useResumeDownload } from "@/hooks/use-resume-download";
import { useImageExists } from "@/hooks/use-image-exists";
import { HeroPortrait } from "../HeroPortrait";
import { HeroPhotoCluster } from "../HeroPhotoCluster";
import { SITE } from "@/lib/site";
import type { Profile } from "@/types";

const LANDSCAPE = "/images/hassaan-landscape.jpg";

const META_ITEMS = [
  { label: "AVAILABLE FOR", value: "FULL-TIME · PRODUCT LEAD · FREELANCE" },
  { label: "BASED IN", value: "PAKISTAN · REMOTE · GLOBAL" },
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLElement>(null);
  const { handleDownload, isDownloading } = useResumeDownload();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 0.5], [0, reducedMotion ? 0 : 24]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, reducedMotion ? 0 : 10]);

  const portrait = profile.photo || SITE.photo;
  const landscapeExists = useImageExists(LANDSCAPE);
  const { full } = getDisplayNameParts(profile.name || SITE.name);
  const roleLine = (profile.title || SITE.title).toUpperCase().replace(/\./g, "");
  const tagline =
    profile.tagline ||
    "I architect and ship scalable software systems — web, AI, and production platforms from design to deployment.";

  return (
    <section ref={ref} className="hero-kumar bg-black text-white" aria-label="Introduction">
      <motion.div className="hero-viewport relative flex min-h-svh w-full flex-col overflow-hidden">
        <p
          className="swiss-outline-text swiss-display pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none overflow-hidden px-6 text-[clamp(3.5rem,16vw,12rem)] leading-[0.82] opacity-[0.07] md:px-12"
          aria-hidden
        >
          {roleLine}
        </p>

        <div className="relative z-10 mx-auto flex w-full max-w-[1720px] flex-1 flex-col justify-center px-6 pb-20 pt-24 md:px-12 md:pb-24 md:pt-28">
          <div className="hero-main-row grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_min(34vw,440px)] lg:gap-x-14 xl:grid-cols-[1.05fr_min(36vw,480px)] xl:gap-x-20">
            <motion.div
              style={{ y: textY }}
              className="flex min-w-0 flex-col gap-5 md:gap-6 lg:max-w-[680px] xl:max-w-[720px]"
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
            >
              <motion.p
                custom={0}
                variants={fadeUp}
                className="swiss-meta flex items-center gap-2.5 text-[0.65rem] tracking-[0.22em] text-white/75 md:text-xs"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#cb0404]" aria-hidden />
                {full}
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="swiss-display text-[clamp(2.25rem,7.5vw,5.75rem)] leading-[0.88] tracking-[-0.02em] xl:text-[clamp(2.75rem,5.25vw,6.25rem)]"
              >
                {roleLine}.
              </motion.h1>

              <motion.div custom={2} variants={fadeUp} className="hero-meta-block flex flex-col gap-2">
                {META_ITEMS.map((item) => (
                  <p
                    key={item.label}
                    className="hero-meta-line swiss-meta text-[0.6rem] leading-relaxed text-neutral-400 md:text-[0.65rem]"
                  >
                    <span className="text-white/45">{item.label}</span>
                    <span className="mx-2 text-white/20 select-none" aria-hidden>
                      ·
                    </span>
                    <span className="text-white/85">{item.value}</span>
                  </p>
                ))}
              </motion.div>

              <motion.p
                custom={3}
                variants={fadeUp}
                className="max-w-xl text-base font-light leading-relaxed text-neutral-400 md:text-lg md:leading-relaxed lg:max-w-lg"
              >
                {tagline}
              </motion.p>

              <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-3 pt-1 md:gap-4 md:pt-2">
                <Link
                  href="/apps"
                  className="hero-cta swiss-mono min-h-11 border border-white/30 px-6 py-3.5 text-xs transition-colors duration-200 hover:border-[#cb0404] hover:bg-[#cb0404] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-8"
                  data-cursor="pointer"
                >
                  VIEW WORK_
                </Link>
                <button
                  type="button"
                  onClick={() => void handleDownload()}
                  disabled={isDownloading}
                  aria-busy={isDownloading}
                  className="hero-cta hero-cta-resume swiss-mono min-h-11 bg-white px-6 py-3.5 text-xs text-black transition-colors duration-200 hover:bg-[#dc2525] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60 disabled:pointer-events-none md:px-8"
                  data-cursor="pointer"
                >
                  {isDownloading ? "DOWNLOADING…" : "RESUME_"}
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: photoY }}
              className="hero-portrait-slot relative w-full max-w-[440px] justify-self-center lg:max-w-none lg:justify-self-end"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <HeroPortrait src={portrait} alt={profile.name || SITE.name} contained />
            </motion.div>
          </div>

          {landscapeExists && (
            <motion.div
              style={{ y: photoY }}
              className="pointer-events-none absolute bottom-[14%] right-[32%] z-[5] hidden w-[min(26vw,340px)] xl:block"
            >
              <HeroPhotoCluster src={LANDSCAPE} alt="Workspace" variant="landscape" />
            </motion.div>
          )}
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 bg-black"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
