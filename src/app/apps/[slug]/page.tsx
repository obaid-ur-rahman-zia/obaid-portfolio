import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, ExternalLink } from "lucide-react";
import { ScreenshotCarousel } from "@/components/apps/ScreenshotCarousel";
import { fetchApp } from "@/lib/fetchers";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const app = await fetchApp(slug);
    return { title: app.name, description: app.short_description };
  } catch {
    return { title: "App" };
  }
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let app;
  try {
    app = await fetchApp(slug);
  } catch {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 px-6 md:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link href="/apps" className="swiss-mono text-[10px] text-neutral-500 hover:text-[#dc2525] mb-8 inline-block" data-cursor="pointer">
          ← ALL WORK_
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-start gap-6">
              <div className="relative h-24 w-24 swiss-photo-frame overflow-hidden shrink-0">
                <Image src={app.icon || "/images/apps/default.svg"} alt="" fill className="object-cover" />
              </div>
              <div>
                <p className="swiss-mono text-[10px] text-[#ff4d00]">{app.category}</p>
                <h1 className="swiss-display text-4xl md:text-5xl mt-2">{app.name}</h1>
                <p className="text-neutral-500 mt-3">{app.short_description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {app.download_link && (
                <a
                  href={app.download_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-mono text-[10px] flex items-center gap-2 bg-[#cb0404] text-white px-6 py-3"
                  data-cursor="pointer"
                >
                  <Download className="h-4 w-4" /> GET APP_
                </a>
              )}
              {app.play_store_link && (
                <a
                  href={app.play_store_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-mono text-[10px] flex items-center gap-2 border border-white/30 px-6 py-3 hover:border-[#cb0404]"
                  data-cursor="pointer"
                >
                  <ExternalLink className="h-4 w-4" /> LIVE SITE_
                </a>
              )}
            </div>

            <div className="swiss-border p-6 mt-10">
              <h2 className="swiss-mono text-[10px] text-neutral-500 mb-3">ABOUT_</h2>
              <p className="text-neutral-400 leading-relaxed whitespace-pre-line">{app.full_description}</p>
            </div>

            <div className="mt-8">
              <h2 className="swiss-mono text-[10px] text-neutral-500 mb-3">STACK_</h2>
              <div className="flex flex-wrap gap-2">
                {app.tech_stack.map((t) => (
                  <span key={t} className="swiss-mono text-[9px] border border-white/20 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-8 space-y-2 text-sm text-neutral-400">
              {app.features.map((f) => (
                <li key={f} className="border-l border-[#cb0404] pl-3">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <ScreenshotCarousel screenshots={app.screenshots} />
        </div>
      </div>
    </div>
  );
}
