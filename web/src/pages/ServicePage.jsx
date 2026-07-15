import { useParams, Navigate } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle, MapPin } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, serviceSchema, breadcrumbSchema } from "../lib/schema";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { SERVICES } from "../data/services";
import { SITE } from "../data/site";

/*
 * Extended copy per service — sourced from original site content.
 * Each entry matches the slug from services.js.
 */
const SERVICE_CONTENT = {
  "seamless-gutter-installation": {
    metaTitle: "Seamless Gutter Installation — Seamless Gutters 4 Less",
    metaDesc: "Custom-formed continuous aluminum gutters installed in one day. Serving Seattle, Tacoma & the Puget Sound for over two decades.",
    hero: "Custom-Built Gutters, Installed in a Day.",
    intro: "Seamless gutters are custom-made to fit your home precisely, reducing the risk of leaks and minimizing maintenance compared to sectional gutters. They offer a sleek, continuous look and are more durable over time — an excellent investment for homeowners in the rainy Pacific Northwest.",
    benefits: [
      { title: "Lower Maintenance", text: "With fewer joints, there's less debris buildup and fewer clogs. Less frequent cleaning and fewer chances of water damage." },
      { title: "Increased Durability", text: "The seamless design minimizes leaks and structural issues. Less likely to develop cracks or separations over time." },
      { title: "Perfect Fit", text: "Customized to your home's specifications for optimal performance. Each gutter system is tailored to the exact dimensions." },
      { title: "Better Aesthetics", text: "Sleek, continuous lines enhance your home's curb appeal. Seamless gutters blend with your home's architecture." },
      { title: "Higher Property Value", text: "Professional installation can increase your home's value. Buyers appreciate the added protection and low maintenance." },
    ],
    process: [
      { step: "Site Evaluation", text: "Our team inspects your roofline and existing drainage, then develops a tailored gutter system plan." },
      { step: "Material Selection", text: "Choose from aluminum, copper, or stainless steel. We recommend gutter guards and downspout extensions for enhanced performance." },
      { step: "Precision Fabrication", text: "Gutters are custom-cut on-site to exact lengths. No joints, no seams — continuous runs formed on your driveway." },
      { step: "Professional Install", text: "Securely mounted to fascia boards using high-quality brackets. All joints sealed watertight." },
      { step: "Final Inspection", text: "The entire system undergoes thorough inspection and water testing to ensure proper flow and operation." },
    ],
    materials: [
      { name: "Aluminum", desc: "Lightweight, rust-resistant, and cost-effective. Available in many colors, ideal for the Pacific Northwest's moist climate." },
      { name: "Copper", desc: "Durable and visually appealing, developing a natural patina over time. Adds elegance and sophistication." },
      { name: "Stainless Steel", desc: "Extremely strong and rust-resistant. Minimal maintenance, reliable solution for harsh weather conditions." },
    ],
  },
  "gutter-replacement": {
    metaTitle: "Gutter Replacement — Seamless Gutters 4 Less",
    metaDesc: "We replace gutters the right way — built to last, priced to win. Same-day pull and replace with full cleanup. Free quotes.",
    hero: "Out With the Old. Built to Last.",
    intro: "Old gutters failing? We pull, dispose, and replace in a single day with full cleanup included. No gimmicks — just expert craftsmanship at a fair price. Your new seamless gutters are formed on-site to your exact measurements.",
    benefits: [
      { title: "Same-Day Service", text: "We pull your old gutters and install brand-new seamless runs in a single visit. No waiting between demo and install." },
      { title: "Full Disposal", text: "We handle every piece of the old system — gutters, hangers, downspouts. Your property is left cleaner than we found it." },
      { title: "Written Estimate", text: "Every quote is in writing and good for one full year. No pressure, no hidden fees." },
      { title: "Fascia Inspection", text: "Before hanging new gutters, we inspect and repair fascia boards to ensure a solid mount point." },
    ],
    process: [
      { step: "Free Inspection", text: "We assess your existing gutters, fascia condition, and drainage pattern. Written quote on the spot." },
      { step: "Remove & Dispose", text: "Old gutters, hangers, and damaged components are carefully removed and hauled away." },
      { step: "Fascia Repair", text: "Any rotted or damaged fascia boards are replaced with primed cedar or composite." },
      { step: "Install New System", text: "Continuous seamless gutters formed on your driveway and hung with hidden hanger brackets." },
      { step: "Test & Clean Up", text: "Full water test, downspout flush, and jobsite cleanup. We leave it spotless." },
    ],
  },
  "gutter-guards": {
    metaTitle: "Gutter Guards — Seamless Gutters 4 Less",
    metaDesc: "Protect your home with top-quality gutter guards. Prevent clogs, reduce maintenance, and extend your gutter life.",
    hero: "Stop Cleaning. Start Protecting.",
    intro: "At Seamless Gutters 4 Less we like to educate customers, give them a fair price, and let them make an informed decision. Our gutter guards prevent pine needles, leaves, and PNW moss from clogging your system — extending gutter life and reducing maintenance to near-zero.",
    benefits: [
      { title: "No More Climbing Ladders", text: "Gutter guards eliminate the need for dangerous seasonal cleanouts. Your gutters stay clear year-round." },
      { title: "Prevent Water Damage", text: "Clogged gutters overflow and damage fascia, siding, and foundations. Guards keep water flowing where it should." },
      { title: "Extend Gutter Life", text: "Debris buildup causes corrosion and sagging. Guards protect your investment for decades." },
      { title: "Lifetime Options", text: "We offer multiple guard systems including micro-mesh for the finest debris protection." },
    ],
    process: [
      { step: "Assessment", text: "We evaluate your existing gutter system, roofline pitch, and surrounding tree canopy." },
      { step: "Guard Selection", text: "Your project manager walks you through all options — micro-mesh, screen, reverse-curve — and recommends the best fit." },
      { step: "Professional Install", text: "Guards are precision-fit and secured to your existing or new gutters without voiding any roof warranty." },
      { step: "Performance Test", text: "We flush the system to confirm water passes through freely while debris is rejected." },
    ],
  },
  "soffit-and-fascia-repair": {
    metaTitle: "Soffit & Fascia Repair — Seamless Gutters 4 Less",
    metaDesc: "Rotted wood behind your gutters? We rebuild fascia and soffit with primed cedar or composite, then re-hang your gutters clean.",
    hero: "The Foundation Behind Every Gutter.",
    intro: "Fascia and soffit are the structural backbone that your gutters hang on. When wood rots behind the gutter line, water damage accelerates and pests find easy entry. We rebuild it right with primed cedar or composite, then re-hang your gutters clean.",
    benefits: [
      { title: "Stop Hidden Rot", text: "Damaged fascia behind gutters is invisible until it's too late. We catch and fix it during gutter work." },
      { title: "Pest Prevention", text: "Rotted soffit and fascia are prime entry points for wasps, birds, and rodents. Solid material keeps them out." },
      { title: "Structural Integrity", text: "Your gutters are only as strong as what they hang on. Sound fascia means gutters that don't sag or pull away." },
      { title: "Ventilation", text: "Properly vented soffit prevents attic moisture buildup and ice damming in Pacific Northwest winters." },
    ],
    process: [
      { step: "Inspection", text: "We probe fascia and soffit boards for rot, water damage, and structural compromise." },
      { step: "Gutter Removal", text: "Existing gutters are carefully detached to expose the full fascia board for replacement." },
      { step: "Wood Replacement", text: "Rotted sections are cut out and replaced with primed cedar or composite boards." },
      { step: "Gutter Re-hang", text: "Your gutters are re-mounted on the fresh material with new hidden hangers." },
    ],
  },
  "gutter-cleaning": {
    metaTitle: "Gutter Cleaning — Seamless Gutters 4 Less",
    metaDesc: "Annual cleanouts before fall and after spring needle drop. Hand-clear, flush, and inspect downspouts on every visit.",
    hero: "Clear Gutters. Clear Mind.",
    intro: "Pacific Northwest homes face constant needle drop, moss, and leaf buildup. We hand-clear every inch, flush all downspouts, and inspect for early signs of damage — twice a year keeps your system performing at its best.",
    benefits: [
      { title: "Prevent Overflow", text: "Clogged gutters overflow onto siding, fascia, and foundations. Regular cleaning prevents expensive water damage." },
      { title: "Catch Problems Early", text: "During every cleanout, we inspect for loose hangers, sagging sections, and early rot. Small fixes save big bills." },
      { title: "Downspout Flush", text: "We don't just clear the troughs — every downspout is flushed to ensure full drainage to grade." },
      { title: "Seasonal Scheduling", text: "We recommend cleanings in late spring (after needle drop) and late fall (after leaf drop) for optimal protection." },
    ],
    process: [
      { step: "Hand Clearing", text: "All debris is manually removed from gutters by hand — no blowers pushing debris onto your roof or yard." },
      { step: "Downspout Flush", text: "Every downspout is flushed with water to clear blockages and confirm full flow." },
      { step: "System Inspection", text: "Hangers, seals, slope, and fascia condition are checked. We flag anything that needs attention." },
      { step: "Cleanup", text: "All debris is bagged and removed. Your property is left cleaner than we found it." },
    ],
  },
};

export default function ServicePage() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  const content = service ? SERVICE_CONTENT[slug] || {} : {};

  /* Hooks must run before any early return. Set per-service title,
   * description, and canonical so each service page can rank for its own
   * terms instead of inheriting the homepage's <head>. */
  useDocumentMeta({
    title: content.metaTitle || (service ? `${service.title} — ${SITE.name}` : SITE.name),
    description: content.metaDesc || (service ? service.short : undefined),
    path: service ? `/services/${service.slug}/` : undefined,
  });

  if (!service) return <Navigate to="/" replace />;

  const Icon = service.icon;

  const schemas = [
    localBusinessSchema(),
    serviceSchema(service),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: `/services/${service.slug}/` },
      { name: service.title, path: `/services/${service.slug}/` },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id={`service-${service.slug}`} />
      {/* ── HERO BANNER ── photo-led, with the Service icon as a chip */}
      <section
        className="relative bg-[var(--color-royal-deep)] overflow-hidden"
        style={{ paddingTop: "calc(var(--safe-top) + 6.25rem)" }}
      >
        <div className="absolute inset-0">
          <ResponsiveImg
            base={service.image}
            alt={service.photoAlt}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-royal-deep)]/40 via-[var(--color-royal-deep)]/80 to-[var(--color-royal-deep)]" />
          <div className="absolute inset-0 grain opacity-[0.08] pointer-events-none" />
        </div>
        <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] pb-12 lg:pb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex w-9 h-9 rounded-[10px] bg-[var(--color-copper)] text-white items-center justify-center">
              <Icon className="w-4 h-4" />
            </span>
            <Eyebrow color="white">{service.title}</Eyebrow>
          </div>
          <h1 className="font-display-black uppercase text-display-lg text-white max-w-3xl leading-[0.92] tracking-[-0.015em]">
            {content.hero || service.title}
          </h1>
          <p className="text-white/75 text-[16px] lg:text-lg leading-relaxed mt-5 max-w-2xl">
            {content.intro || service.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-6 py-3.5 font-display-bold uppercase tracking-tight rounded-full transition-all shadow-[0_18px_36px_-10px_oklch(0.62_0.10_42_/_0.55)]"
            >
              <Phone className="w-4 h-4" /> Call {SITE.phone.display}
            </a>
            <a
              href="/contact/#estimate"
              className="haptic inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white px-6 py-3.5 font-display-bold uppercase tracking-tight rounded-full transition-all"
            >
              Free written estimate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── INTRO + PHOTO ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[var(--radius-tile)] overflow-hidden">
              <ResponsiveImg
                base={service.image}
                alt={service.photoAlt}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Why Choose Us</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              {SITE.yearsDisplay()} Years of<br />
              <span className="text-[var(--color-copper)]">Expert Work.</span>
            </h2>
            <p className="text-[var(--color-slate)]/75 leading-relaxed mb-6">
              {content.intro || service.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-sm font-medium rounded-full">
                Veteran-Owned Since {SITE.founded}
              </span>
              <span className="px-3 py-1.5 bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-sm font-medium rounded-full">
                WA Licensed & Insured
              </span>
              <span className="px-3 py-1.5 bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-sm font-medium rounded-full">
                {SITE.rating.value}★ Google ({SITE.rating.count}+ reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      {content.benefits && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow color="white">Benefits</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-12">
              Why <span className="text-[var(--color-copper)]">{service.title}?</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.benefits.map((b, i) => (
                <div
                  key={i}
                  className="bg-white/[0.06] border border-white/10 rounded-[var(--radius-card)] p-6 hover:bg-white/[0.1] transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-[var(--color-copper)] mb-4" />
                  <h3 className="font-display text-lg text-white mb-2">{b.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OUR PROCESS ── */}
      {content.process && (
        <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow>Our Process</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-12">
            How it <span className="text-[var(--color-copper)]">works.</span>
          </h2>
          <div className="grid gap-8 lg:gap-6">
            {content.process.map((p, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-start pb-8 border-b border-[var(--color-line)] last:border-0"
              >
                <div className="lg:col-span-1">
                  <span className="font-display-black text-5xl text-[var(--color-royal)]/15">
                    0{i + 1}
                  </span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="font-display text-xl text-[var(--color-royal)]">{p.step}</h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-[var(--color-slate)]/75 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MATERIALS (installation only) ── */}
      {content.materials && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-paper)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow>Materials</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
              Premium <span className="text-[var(--color-copper)]">Options.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.materials.map((m, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-bone)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6"
                >
                  <h3 className="font-display text-xl text-[var(--color-royal)] mb-3">{m.name}</h3>
                  <p className="text-[var(--color-slate)]/70 text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SERVICE AREAS ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>Service Areas</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-8">
          Serving <span className="text-[var(--color-copper)]">6 Counties.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SITE.countiesServed.map((county) => (
            <div
              key={county}
              className="flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card-sm)] px-4 py-3"
            >
              <MapPin className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
              <span className="text-sm font-medium text-[var(--color-royal)]">{county}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-[var(--color-copper)] py-16">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Free estimates, fair pricing, and same-week scheduling. Call now or request your quote online.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-2 bg-white text-[var(--color-royal)] px-7 py-3.5 font-semibold rounded-full transition-all hover:shadow-xl"
            >
              <Phone className="w-4 h-4" /> {SITE.phone.display}
            </a>
            <a
              href="/#estimator"
              className="haptic inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white px-7 py-3.5 font-semibold rounded-full transition-all"
            >
              Free Estimate <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
