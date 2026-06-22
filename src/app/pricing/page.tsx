import Link from "next/link";
import { SwissPageLayout } from "@/components/portfolio/SwissPageLayout";
import { fetchPlans } from "@/lib/fetchers";

export const metadata = {
  title: "Pricing",
  description: "Project plans for full-stack software engineering and product delivery.",
};

export default async function PricingPage() {
  const plans = await fetchPlans();
  const order = ["basic", "standard", "premium"];
  const sorted = [...plans].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  return (
    <SwissPageLayout
      tag="Plans"
      title="PRICING_"
      subtitle="Transparent tiers — or request a custom scope for enterprise work."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {sorted.map((plan) => (
          <article
            key={plan.id}
            className={`swiss-border p-8 flex flex-col ${plan.highlighted ? "border-[#cb0404] ring-1 ring-[#cb0404]/40" : ""}`}
          >
            {plan.highlighted && (
              <span className="swiss-mono text-[9px] text-[#cb0404] mb-4">MOST POPULAR</span>
            )}
            <h2 className="swiss-display text-3xl">{plan.name}</h2>
            <p className="text-4xl font-bold mt-4">{plan.price}</p>
            <p className="swiss-mono text-[10px] text-neutral-500 mt-1">{plan.billing_cycle}</p>
            <ul className="mt-8 space-y-3 flex-1 text-sm text-neutral-400">
              {plan.features.map((f) => (
                <li key={f} className="border-l border-white/20 pl-3">
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`mt-8 swiss-mono text-[10px] text-center py-4 border transition-colors ${
                plan.highlighted
                  ? "bg-[#cb0404] border-[#cb0404] text-white"
                  : "border-white/30 hover:border-[#cb0404]"
              }`}
              data-cursor="pointer"
            >
              {plan.cta_text}_
            </Link>
          </article>
        ))}
      </div>
    </SwissPageLayout>
  );
}
