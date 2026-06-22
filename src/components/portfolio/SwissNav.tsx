"use client";

import { Download, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResumeDownload } from "@/hooks/use-resume-download";
import { usePortfolioThemeStore } from "@/lib/portfolio-theme-store";
import { SITE } from "@/lib/site";

const links = [
  { href: "/", label: "HOME", hash: "" },
  { href: "/#about", label: "ABOUT", hash: "about" },
  { href: "/#stack", label: "STACK", hash: "stack" },
  { href: "/apps", label: "WORK", hash: null },
  { href: "/contact", label: "CONTACT", hash: null },
];

export function SwissNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = usePortfolioThemeStore();
  const { handleDownload, isDownloading } = useResumeDownload();
  const isLight = theme === "light";

  if (pathname.startsWith("/admin")) return null;

  const isHome = pathname === "/";

  return (
    <header className="portfolio-nav fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
      <nav className="flex items-center justify-between px-6 py-4 md:px-10 max-w-[1600px] mx-auto">
        <Link href="/" className="font-semibold tracking-tight text-sm md:text-base" data-cursor="pointer">
          <span className="text-[#cb0404]">{SITE.firstName}</span>{" "}
          <span className="portfolio-nav-name text-white">{SITE.lastName}.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((l) => {
            const isActiveLink =
              l.href === "/" ? pathname === "/" : pathname === l.href || (l.href.startsWith("/#") && isHome);

            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`swiss-mono text-[10px] flex items-center gap-2 transition-colors ${
                    isActiveLink ? "portfolio-nav-link-active text-white" : "text-white/50 hover:text-white"
                  }`}
                  data-cursor="pointer"
                >
                  {isActiveLink && <span className="h-1.5 w-1.5 rounded-full bg-[#cb0404]" aria-hidden />}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => void handleDownload()}
            disabled={isDownloading}
            aria-busy={isDownloading}
            className="hidden sm:inline-flex swiss-mono text-[10px] items-center gap-2 border border-white/25 px-4 py-2 hover:border-[#cb0404] hover:text-[#dc2525] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            data-cursor="pointer"
          >
            <Download className="h-3.5 w-3.5" />
            {isDownloading ? "DOWNLOADING…" : "RESUME"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden md:flex h-9 w-9 items-center justify-center border border-white/15 text-white/50 hover:text-white transition-colors"
            aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
          >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => void handleDownload()}
            disabled={isDownloading}
            aria-busy={isDownloading}
            className="lg:hidden swiss-mono text-[10px] border border-white/25 px-3 py-2 disabled:opacity-50 disabled:pointer-events-none"
            data-cursor="pointer"
          >
            {isDownloading ? "…" : "RESUME_"}
          </button>
        </div>
      </nav>
    </header>
  );
}
