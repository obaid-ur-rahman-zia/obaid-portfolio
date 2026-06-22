import Link from "next/link";

interface SwissPageLayoutProps {
  tag: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function SwissPageLayout({ tag, title, subtitle, children }: SwissPageLayoutProps) {
  return (
    <div className="pt-28 pb-20 px-6 md:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="swiss-mono text-[10px] text-neutral-500 hover:text-[#dc2525] mb-8 inline-block" data-cursor="pointer">
          ← BACK_
        </Link>
        <p className="swiss-section-tag mb-4">{tag}</p>
        <h1 className="swiss-display text-5xl md:text-7xl mb-4">{title}</h1>
        {subtitle && <p className="text-neutral-500 max-w-2xl mb-12">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
