"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/site";
import type { Profile } from "@/types";

export function SwissFooter({ profile }: { profile?: Profile }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="swiss-border-t swiss-grid-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-white/10 pb-16">
          <div>
            <p className="text-2xl font-bold tracking-tight">
              <span className="text-[#cb0404]">{SITE.firstName}</span>{" "}
              <span className="text-white">{SITE.lastName}.</span>
            </p>
            <p className="swiss-mono text-[10px] text-neutral-500 mt-4 leading-relaxed">
              FULL STACK ENGINEER
              <br />
              SOFTWARE ENGINEER
            </p>
            <p className="swiss-mono text-[10px] text-neutral-600 mt-6">BASED IN {SITE.location.toUpperCase()}</p>
          </div>

          <div>
            <p className="swiss-mono text-[10px] text-neutral-600 mb-6">INDEX</p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "HOME" },
                { href: "/#about", label: "ABOUT" },
                { href: "/apps", label: "WORK" },
                { href: "/contact", label: "CONTACT" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="swiss-display text-xl md:text-2xl hover:text-[#dc2525] transition-colors"
                    data-cursor="pointer"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="swiss-mono text-[10px] text-neutral-600 mb-6">CONNECT</p>
            <ul className="space-y-3">
              {profile?.linkedin && (
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="swiss-display text-xl md:text-2xl hover:text-[#dc2525] transition-colors"
                    data-cursor="pointer"
                  >
                    LINKEDIN
                  </a>
                </li>
              )}
              {profile?.github && (
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="swiss-display text-xl md:text-2xl hover:text-[#dc2525] transition-colors"
                    data-cursor="pointer"
                  >
                    GITHUB
                  </a>
                </li>
              )}
              {profile?.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="swiss-display text-xl md:text-2xl hover:text-[#dc2525] transition-colors"
                    data-cursor="pointer"
                  >
                    EMAIL
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="swiss-mono text-[10px] text-neutral-600 mb-4">STATUS</p>
              <p className="flex items-center gap-2 swiss-mono text-xs text-white">
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
                OPEN FOR WORK
              </p>
            </div>
            <button
              type="button"
              onClick={scrollTop}
              className="mt-10 flex flex-col items-start gap-2 group"
              data-cursor="pointer"
            >
              <span className="swiss-mono text-[10px] text-neutral-500 group-hover:text-white transition-colors">
                BACK TO TOP
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 group-hover:border-[#cb0404] transition-colors">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 swiss-mono text-[9px] text-neutral-600">
          <p>© 2026 {SITE.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            SYSTEM STATUS: OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
