import { Users, Award } from "lucide-react";

const DISCOUNTS = [
  {
    tag: "Senior Discount",
    body:
      "10% off for homeowners 65+. We grew up in this region — we take care of the people who built it.",
    icon: Users,
  },
  {
    tag: "Veteran & Active Duty",
    body:
      "Thank you for your service. 10% off every job, every time. Just mention it on your estimate.",
    icon: Award,
  },
];

export default function DiscountBand() {
  return (
    <section
      className="bg-[var(--color-royal)] py-[var(--space-section-md)] relative overflow-hidden"
      aria-label="Discounts"
    >
      <div className="absolute inset-0 grain opacity-10" />
      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] grid md:grid-cols-2 gap-10 lg:gap-20">
        {DISCOUNTS.map(({ tag, body, icon: Ic }) => (
          <div key={tag} className="flex items-start gap-6 text-white">
            <div className="w-14 h-14 border border-[var(--color-copper)] text-[var(--color-copper)] flex items-center justify-center flex-shrink-0 rounded-[14px]">
              <Ic className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[var(--color-copper)] text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                {tag}
              </div>
              <p className="font-display-bold uppercase text-xl md:text-[26px] leading-[1.1] tracking-tight">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
