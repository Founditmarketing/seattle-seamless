import { Phone, Mail, MapPin, Clock, Shield, Award, Users } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import Stamp from "../components/atoms/Stamp";
import PageHero from "../components/PageHero";
import SchemaJsonLd from "../components/SchemaJsonLd";
import WAVeteranSeal from "../components/atoms/WAVeteranSeal";
import TradeStampRow from "../components/TradeStampRow";
import PageSEO from "../components/PageSEO";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import { SITE } from "../data/site";

export default function AboutPage() {
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ]),
  ];

  return (
    <>
      <PageSEO
        title={`About — Veteran-Owned Gutter Company in Tacoma, WA | ${SITE.name}`}
        description={`Seamless Gutters 4 Less is a Washington Certified Veteran-Owned gutter company based in Tacoma, serving the Puget Sound since ${SITE.founded}. Own crew, never subcontractors. WA Lic #${SITE.license}.`}
        path="/about/"
      />
      <SchemaJsonLd data={schemas} id="about" />
      <PageHero
        eyebrow="About Us"
        title={`Veteran owned. Since ${SITE.founded}.`}
        accent={`Since ${SITE.founded}.`}
        lead="Founded on honesty, integrity, and the principle that a job is only finished when it would pass a Pacific Northwest winter. Thousands of gutter systems installed across the Puget Sound — every one by our own crew, never a subcontractor."
        image="process-real"
        imageAlt="Seamless Gutters 4 Less installer working on a fresh gutter run."
        chips={[
          `Veteran-Owned`,
          `Tacoma · WA`,
          `${SITE.yearsDisplay()} years`,
          `${SITE.countiesServed.length} counties`,
          `${SITE.rating.value.toFixed(1)} ★ Google`,
        ]}
      />

      <p className="text-center text-[var(--color-copper)] font-semibold tracking-wide text-sm md:text-base py-8 px-[var(--space-page-x)]">
        {SITE.tagline}
      </p>

      {/* ── OUR STORY ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-[var(--radius-tile)] overflow-hidden">
              {/* Real owner-supplied photo. The yellow Craftsman with the
               * American flag is the most "established home, established
               * company" shot in the set, which is exactly the tone of the
               * "Our Story" block beside it. */}
              <ResponsiveImg
                base="jobs/job-17-yellow-craftsman-flag"
                alt="Established yellow Craftsman home in the Puget Sound with a wraparound porch, American flag flying, and freshly installed white seamless gutters by Seamless Gutters 4 Less."
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              Built on the<br />
              <span className="text-[var(--color-copper)]">Ladder.</span>
            </h2>
            <div className="space-y-4 text-[var(--color-slate)]/75 leading-relaxed">
              <p>
                We've been in business for over {SITE.yearsDisplay()} years, and our team has decades of combined experience in the gutter industry. We offer a wide range of services — installation, replacement, guards, soffit & fascia repair, and cleaning — using only the highest quality materials and state-of-the-art equipment.
              </p>
              <p>
                We believe that our customers are our top priority. We take the time to understand each homeowner's needs and work closely with them to develop customized solutions. We carry a commitment to attention to detail and excellence into every job we undertake.
              </p>
              <p>
                We stand behind our work and offer a satisfaction guarantee on all the services we provide. Thank you for choosing Seamless Gutters 4 Less for your gutter needs.
              </p>
            </div>

            {/* WA Certified Veteran-Owned seal — state-issued credential.
                Lives here, in the "Our Story" block, because that's where
                visitors are evaluating who we are. */}
            <div className="mt-8 flex items-center gap-5 p-5 rounded-[var(--radius-card)] bg-[var(--color-paper)] border border-[var(--color-line)]">
              <WAVeteranSeal size="md" className="flex-shrink-0" />
              <div className="leading-tight">
                <div className="text-[var(--color-copper)] text-[10px] tracking-[0.28em] uppercase font-bold mb-1.5">
                  Washington Certified
                </div>
                <div className="font-display-bold text-[var(--color-royal)] text-lg sm:text-xl uppercase tracking-tight">
                  Veteran-Owned Business
                </div>
                <div className="text-[var(--color-slate)]/65 text-[13px] mt-1">
                  State-verified. Honored to serve fellow service members
                  with a 10% discount on every job.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow color="white">Our Values</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-12">
            What We <span className="text-[var(--color-copper)]">Stand For.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Honesty", text: "All quotes are in writing. Fair direct pricing from the start. No hidden fees, no pressure tactics." },
              { icon: Award, title: "Craftsmanship", text: "We don't subcontract. Every gutter is formed on-site and installed by our own trained crew." },
              { icon: Users, title: "Veteran-Led Service", text: "Owner-veteran. We treat your home like a fellow service member's. Senior and military discounts on every job." },
            ].map((v, i) => (
              <div key={i} className="bg-white/[0.06] border border-white/10 rounded-[var(--radius-card)] p-7">
                <v.icon className="w-7 h-7 text-[var(--color-copper)] mb-5" />
                <h3 className="font-display text-xl text-white mb-3">{v.title}</h3>
                <p className="text-white/65 leading-relaxed text-[15px]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS LOCKUP ──
          Real third-party / state-issued seals. Sits between the Values
          band and the stats grid so the visual order reads:
            who we believe  →  who's verified us  →  what we've shipped. */}
      <section className="pt-section-mobile lg:pt-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="text-center mb-10">
          <Eyebrow>Recognized &amp; Certified</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-3">
            Credentials, not <span className="text-[var(--color-copper)]">claims.</span>
          </h2>
        </div>
        <TradeStampRow
          stamps={[
            { name: "veteran-owned-business", label: "Veteran-Owned Business" },
            { name: "google-5-star-rating",   label: `${SITE.rating.value.toFixed(1)} ★ on Google` },
          ]}
          size="lg"
          caption="Third-party trust signals. The Washington Certified Veteran-Owned designation above is state-issued; the Google rating is aggregated from verified customer reviews."
        />
      </section>

      {/* ── TYPOGRAPHIC STAMPS + STATS ── */}
      <section className="py-section-mobile lg:py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center">
          {[
            { value: SITE.yearsDisplay(), label: "Years in business" },
            { value: SITE.countiesServed.length, label: "Counties served" },
            { value: `${SITE.rating.count}+`, label: "Google reviews" },
            { value: "0", label: "Subcontractors" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display-black text-[44px] sm:text-5xl lg:text-6xl text-[var(--color-royal)] leading-[0.85]">
                {s.value}
              </div>
              <div className="text-[var(--color-slate)]/60 text-[11px] sm:text-sm uppercase tracking-[0.15em] font-semibold mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Stamp primary="Veteran" secondary="Owned & Operated" divider rotate={-3} />
          <Stamp primary="Licensed" secondary="WA Bonded · Insured" divider variant="outline" rotate={2} />
          <Stamp primary="5★" secondary={`${SITE.rating.count}+ Google`} divider variant="solid" rotate={-2} />
        </div>
      </section>

      {/* ── SUPPLIERS ── */}
      <section className="py-[var(--space-section-sm)] bg-[var(--color-paper)] border-t border-[var(--color-line)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow>Our Partners</Eyebrow>
          <h2 className="font-display text-xl text-[var(--color-royal)] mt-3 mb-6">Gutter & Material Suppliers</h2>
          <div className="flex flex-wrap gap-6 text-[var(--color-slate)]/70 text-sm">
            <a href="https://lansingbp.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-copper)]">Lansing Building Products</a>
            <a href="https://senox.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-copper)]">Senox</a>
            <a href="https://www.spectraguttersystems.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-copper)]">Spectra Gutter Systems</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              Get in <span className="text-[var(--color-copper)]">Touch.</span>
            </h2>
            <div className="space-y-4">
              <a href={SITE.phone.tel} className="flex items-center gap-3 text-lg font-display text-[var(--color-royal)] hover:text-[var(--color-copper)]">
                <Phone className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.phone.display}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-[var(--color-slate)]/80 hover:text-[var(--color-copper)]">
                <Mail className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.email}
              </a>
              <div className="flex items-center gap-3 text-[var(--color-slate)]/80">
                <MapPin className="w-5 h-5 text-[var(--color-copper)]" /> {SITE.address.locality}, {SITE.address.regionFull}
              </div>
              <div className="flex items-center gap-3 text-[var(--color-slate)]/80">
                <Clock className="w-5 h-5 text-[var(--color-copper)]" /> Mon–Fri 7am–6pm · Sat 8am–4pm
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-[var(--color-royal)] mb-4">Counties We Serve</h3>
            <div className="grid grid-cols-2 gap-3">
              {SITE.countiesServed.map((county) => (
                <div key={county} className="flex items-center gap-2 text-[var(--color-slate)]/75">
                  <MapPin className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
                  <span className="text-sm">{county}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
