import { MapPin } from "lucide-react";
import { CITIES } from "../data/cities";

export default function CityMarquee() {
  const names = CITIES.map((c) => c.name);
  return (
    <section
      className="bg-[var(--color-royal-deep)] py-6 border-y border-[var(--color-copper)]/20 overflow-hidden"
      aria-label="Cities served"
    >
      <div className="flex items-center gap-3 px-[var(--space-page-x)] mb-2 max-w-[var(--max-content)] mx-auto">
        <MapPin className="w-3.5 h-3.5 text-[var(--color-copper)]" />
        <span className="text-[var(--color-copper)] text-[10px] tracking-[0.3em] uppercase font-semibold">
          Serving
        </span>
      </div>
      <div className="flex marquee-track whitespace-nowrap">
        {[...names, ...names].map((c, i) => (
          <span
            key={i}
            className="font-display-bold uppercase text-white/55 hover:text-[var(--color-copper)] text-[40px] md:text-4xl tracking-tight px-8 transition-colors"
          >
            {c} <span className="text-[var(--color-copper)] mx-1">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
