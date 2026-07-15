import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import EstimatorWidget from "../components/EstimatorWidget";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { SITE } from "../data/site";
import { SERVICES } from "../data/services";

export default function ContactPage() {
  useDocumentMeta({
    title: `Contact — Free Gutter Estimates in Tacoma & Puget Sound | ${SITE.name}`,
    description: `Call or text ${SITE.phone.display} for a free, same-week seamless gutter estimate in Tacoma and across the Puget Sound. Veteran-owned, licensed, and insured. Open Mon–Sat.`,
    path: "/contact/",
  });

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact/" },
    ]),
  ];

  /* Quick-tap action cards above the fold. Mobile-first: every customer's
     real first move is one of these four, so they're large, finger-sized,
     and labeled with the action word, not a generic eyebrow. */
  const ACTIONS = [
    {
      icon: Phone,
      label: "Call",
      sub: SITE.phone.display,
      href: SITE.phone.tel,
      tone: "copper",
    },
    {
      icon: MessageSquare,
      label: "Text",
      sub: "We answer in minutes",
      href: SITE.phone.sms,
      tone: "royal",
    },
    {
      icon: Mail,
      label: "Email",
      sub: SITE.email,
      href: `mailto:${SITE.email}`,
      tone: "royal",
    },
    {
      icon: ArrowRight,
      label: "Estimate",
      sub: "Free written quote",
      href: "#estimate",
      tone: "royal",
    },
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="contact" />
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        accent="touch."
        lead="Free written estimates, fair pricing, same-week scheduling across six counties."
        chips={[
          `${SITE.phone.display}`,
          `Mon–Sat 7am–6pm`,
          `Same-day callback`,
        ]}
      />

      {/* QUICK-TAP ACTION CARDS — replaces the previous "REACH US / GET IN
          TOUCH" duplicate heading. Mobile users hit one of these immediately. */}
      <section className="-mt-8 relative z-10 px-[var(--space-page-x)] pb-2">
        <div className="max-w-[var(--max-content)] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-4">
          {ACTIONS.map((a) => {
            const Ic = a.icon;
            const tone = a.tone === "copper"
              ? "bg-[var(--color-copper)] text-white"
              : "bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-royal)]";
            return (
              <a
                key={a.label}
                href={a.href}
                className={`haptic mob-card-tilt rounded-[var(--radius-card)] p-4 lg:p-6 flex flex-col gap-2 ${tone}`}
              >
                <Ic className={`w-5 h-5 ${a.tone === "copper" ? "text-white" : "text-[var(--color-copper)]"}`} />
                <div className="font-display-bold uppercase tracking-tight text-lg leading-none mt-1">
                  {a.label}
                </div>
                <div className={`text-[12px] leading-snug ${a.tone === "copper" ? "text-white/85" : "text-[var(--color-slate)]/65"}`}>
                  {a.sub}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* CONTACT DETAILS + ESTIMATOR */}
      <section
        id="estimate"
        className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: NAP + service quick links */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Eyebrow>Office</Eyebrow>
            <div className="mt-4 grid grid-cols-1 gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[var(--color-royal-tint)] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[var(--color-royal)]" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-[var(--color-slate)]/50 uppercase font-semibold">Location</div>
                  <div className="text-[var(--color-slate)]/85 text-[14.5px]">
                    {SITE.address.locality}, {SITE.address.regionFull}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[var(--color-royal-tint)] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[var(--color-royal)]" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] text-[var(--color-slate)]/50 uppercase font-semibold">Hours</div>
                  <div className="text-[var(--color-slate)]/85 text-[14.5px] leading-snug">
                    Mon–Fri 7am–6pm · Sat 8am–4pm · Sun closed
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--color-line)] mt-8 pt-6 max-w-md">
              <div className="text-[10px] tracking-[0.25em] text-[var(--color-copper)] uppercase font-bold mb-4">
                Our Services
              </div>
              <div className="space-y-2.5">
                {SERVICES.map((s) => (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}/`}
                    className="flex items-center justify-between gap-2 text-[var(--color-royal)] hover:text-[var(--color-copper)] text-[14.5px] transition-colors"
                  >
                    <span>{s.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: estimate form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="bg-[var(--color-royal-deep)] rounded-[var(--radius-tile)] p-5 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-10 pointer-events-none" aria-hidden />
              <div className="relative">
                <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-2">
                  Online Estimator
                </div>
                <h2 className="font-display-black uppercase text-2xl lg:text-3xl text-white mb-2 leading-tight">
                  Free written estimate
                </h2>
                <p className="text-white/65 text-[13.5px] lg:text-sm mb-6">
                  Four questions, no email required. Final price always in writing, good for 12 months.
                </p>
                <EstimatorWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS MAP ── */}
      <section className="py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow color="white">Service Areas</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-4">
            Anchored in Tacoma. <span className="text-[var(--color-copper)]">Across the Puget Sound.</span>
          </h2>
          <p className="text-white/65 mb-10 max-w-xl">
            Most of our work runs in Pierce County — Tacoma, Gig Harbor, Puyallup, and the surrounding cities. We also serve homeowners across the wider Puget Sound, from Bellevue and Edmonds to Bremerton and Olympia.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SITE.countiesServed.map((county) => (
              <div
                key={county}
                className="bg-white/[0.06] border border-white/10 rounded-[var(--radius-card-sm)] px-4 py-4 text-center"
              >
                <MapPin className="w-5 h-5 text-[var(--color-copper)] mx-auto mb-2" />
                <div className="text-white text-sm font-medium">{county}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
