"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, ExternalLink, Play } from "lucide-react";

import { SITE } from "@/lib/site";

const footerLinks = [
  { href: "/apps", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="container-main section-padding !py-12 flex flex-col md:flex-row gap-10 justify-between">
        <div className="max-w-sm">
          <p className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-3">
            {SITE.firstName}<span className="text-[var(--accent-cyan)]">.</span>
          </p>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Senior Full Stack Developer & Product Lead — software systems, AI, and production platforms.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://github.com/obaid-ur-rahman-zia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/5 hover:border-[var(--accent-cyan)]/40 transition-colors"
              aria-label="GitHub"
            >
              <Code2 className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/obaid-ur-rahman-zia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/5 hover:border-[var(--accent-cyan)]/40 transition-colors"
              aria-label="LinkedIn"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href="https://plivix-tech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/5 hover:border-[var(--accent-cyan)]/40 transition-colors"
              aria-label="Plivix Technologies"
            >
              <Play className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-4">Navigate</p>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-4">Stack</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Next.js · Node.js · AI
              <br />
              TypeScript · AWS · Web3
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-secondary)]">
        © {new Date().getFullYear()} {SITE.name}. Crafted with precision.
      </div>
    </footer>
  );
}
