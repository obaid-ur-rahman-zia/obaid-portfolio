"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/apps", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-3 bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-[var(--border)]" : "py-5"
      )}
    >
      <nav className="container-main flex items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2 font-[family-name:var(--font-syne)] text-xl font-bold"
          aria-label={`${SITE.firstName} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] text-[#0a0a0f]">
            <Code2 className="h-5 w-5" aria-hidden />
          </span>
          {SITE.firstName}<span className="text-[var(--accent-cyan)]">.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[var(--accent-cyan)] bg-white/5"
                    : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary text-sm">
            Hire Me
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/5"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[rgba(10,10,15,0.98)] backdrop-blur-xl">
          <ul className="flex flex-col p-4 gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium",
                    pathname === link.href ? "text-[var(--accent-cyan)] bg-white/5" : "text-[var(--text-secondary)]"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full text-center">
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
