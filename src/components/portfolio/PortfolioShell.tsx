"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CustomCursor } from "./CustomCursor";
import { Loader } from "./Loader";
import { PortfolioThemeProvider } from "./PortfolioThemeProvider";
import { SmoothScroll } from "./SmoothScroll";

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isAdmin) return;
    const loaded = sessionStorage.getItem("portfolio-loaded");
    if (loaded) {
      setReady(true);
    } else {
      setShowLoader(true);
    }
  }, [isAdmin]);

  if (isAdmin) return <>{children}</>;

  return (
    <PortfolioThemeProvider>
      <CustomCursor />
      {showLoader && !ready && <Loader onComplete={() => { setShowLoader(false); setReady(true); }} />}
      <SmoothScroll>
        <div
          className="transition-opacity duration-1000"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {ready && children}
        </div>
      </SmoothScroll>
    </PortfolioThemeProvider>
  );
}
