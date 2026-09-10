import { useParams, Navigate, Link } from "react-router-dom";
import { Phone, ArrowRight, MapPin, AlertTriangle, Star, ChevronRight } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import PageHero from "../components/PageHero";
import PageSEO from "../components/PageSEO";
import SchemaJsonLd from "../components/SchemaJsonLd";
import {
  localBusinessSchema,
  serviceAreaSchema,
  breadcrumbSchema,
  faqSchema,
} from "../lib/schema";
import { findArea, cityFaqs } from "../data/serviceAreas";
import { matrixForCity } from "../data/serviceMatrix";
import { SERVICES } from "../data/services";
import { GALLERY } from "../data/gallery";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../data/site";

/*
 * City landing page — /service-areas/[county]/[city]/.
 *
 * Content comes entirely from data/serviceAreas.js; this file is layout
 * only. The sections map to sg4l-plan.md §7's checklist: localized H1,
 * homes + climate copy, common issues, linked service list, local photos,
 * local reviews, city FAQ with schema, neighbor links, and a CTA.
 *
 * Two sections render conditionally on real data rather than filling space:
 *   - Local photos appear only once gallery entries carry a matching
 *     `city`. Until then the section links to the full gallery instead of
 *     captioning county-wide photos as if they were shot in this city.
 *   - Local reviews appear only where a REAL Google review from that city
 *     exists in data/reviews.js. Four of the ten cities have them today.
 *     We never re-label a review from another city to fill the slot.
 */
export default function ServiceAreaPage() {
  const { county, city } = useParams();
  const area = findArea(city);

  /* Wrong county in the path would serve duplicate content at two URLs. */
  if (!area || area.countySlug !== county) return <Navigate to="/service-areas/" replace />;

  const path = `/service-areas/${area.countySlug}/${area.slug}/`;
  const faqs = cityFaqs(area);
  const localPhotos = GALLERY.filter((g) => g.city === area.photoCity).slice(0, 6);
  const localReviews = REVIEWS.filter((r) => r.city === area.name).slice(0, 3);
  const neighbors = area.nearby.map(findArea).filter(Boolean);

  /* Where a city × service page exists for this city, the service card
   * should point there rather than at the generic service page — that
   * deeper page is the one written for this city's version of the job. */
  const matrixByService = Object.fromEntries(
    matrixForCity(area.slug).map((e) => [e.service, e]),
  );

  const schemas = [
    localBusinessSchema(),
    serviceAreaSchema(area),
    faqSchema(
      faqs.map((f) => ({ q: f.q, a: f.a })),
      `${SITE.website}${path}#faq`,
    ),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas/" },
      { name: `${area.county} County`, path: `/service-areas/${area.countySlug}/` },
      { name: area.name, path },
    ]),
  ];

  return (
    <>
      <PageSEO title={area.metaTitle} description={area.metaDesc} path={path} />
      <SchemaJsonLd data={schemas} id={`service-area-${area.slug}`} />

      <PageHero
        eyebrow={`${area.county} County`}
        title={`Seamless Gutter Installation in ${area.name}, WA`}
        accent={area.name}
        lead={area.lead}
        image="jobs/1000028751"
        imageAlt={`Seamless Gutters 4 Less crew installing new gutters on a ${SITE.address.region} home.`}
        chips={[
          `${SITE.yearsDisplay()} years in business`,
          `${SITE.rating.value}★ Google (${SITE.rating.count} reviews)`,
          "Veteran-owned",
          `WA Lic. ${SITE.license}`,
        ]}
      />

      {/* ── BREADCRUMB ── visible trail, mirrors the schema above ── */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] pt-6"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--color-slate)]/60">
          <li>
            <Link to="/" className="hover:text-[var(--color-copper)]">Home</Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <li>
            <Link to="/service-areas/" className="hover:text-[var(--color-copper)]">
              Service Areas
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <li>
            <Link
              to={`/service-areas/${area.countySlug}/`}
              className="hover:text-[var(--color-copper)]"
            >
              {area.county} County
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <li aria-current="page" className="text-[var(--color-royal)] font-medium">
            {area.name}
          </li>
        </ol>
      </nav>

      {/* ── HOMES + CLIMATE ── the genuinely localized copy ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{area.name} Homes &amp; Gutters</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              What we see on <span className="text-[var(--color-copper)]">{area.name}</span> rooflines.
            </h2>
            <p className="text-[var(--color-slate)]/75 leading-relaxed mb-6">{area.homes}</p>
            <h3 className="font-display text-xl text-[var(--color-royal)] mb-3">
              Weather, trees, and what they do here
            </h3>
            <p className="text-[var(--color-slate)]/75 leading-relaxed">{area.climate}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 lg:p-7">
              <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-5 h-5 text-[var(--color-copper)]" />
                <h3 className="font-display text-lg text-[var(--color-royal)]">
                  Common in {area.name}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {area.issues.map((issue) => (
                  <li key={issue} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-copper)] shrink-0" />
                    <span className="text-[var(--color-slate)]/80">{issue}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-[var(--color-line)]">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-slate)]/50 font-bold mb-3">
                  Areas we cover
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.areas.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-royal-tint)] text-[var(--color-royal)] text-[12px] font-medium"
                    >
                      <MapPin className="w-3 h-3 shrink-0" />
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES, LINKED ── internal linking to the money pages ── */}
      <section className="py-[var(--space-section-md)] bg-[var(--color-royal-deep)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <Eyebrow color="white">Services in {area.name}</Eyebrow>
          <h2 className="font-display-black uppercase text-display-sm text-white mt-4 mb-10">
            Everything we do, <span className="text-[var(--color-copper)]">here.</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const deep = matrixByService[s.slug];
              return (
                <Link
                  key={s.slug}
                  to={deep ? deep.path : `/services/${s.slug}/`}
                  className="haptic group bg-white/[0.06] border border-white/10 rounded-[var(--radius-card)] p-6 hover:bg-white/[0.1] transition-colors"
                >
                  <span className="inline-flex w-9 h-9 rounded-[10px] bg-[var(--color-copper)] text-white items-center justify-center mb-4">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="font-display text-lg text-white mb-2 flex items-center gap-1.5">
                    {s.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{s.short}</p>
                  {deep ? (
                    <span className="inline-block mt-3 text-[12px] font-medium text-[var(--color-copper)]">
                      {s.title} in {area.name} &rarr;
                    </span>
                  ) : (
                    <span className="sr-only">in {area.name}, WA</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LOCAL PHOTOS ── only when a photo is actually tagged to this city ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>Our Work</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-8">
          {localPhotos.length > 0 ? (
            <>
              Recent jobs in <span className="text-[var(--color-copper)]">{area.name}.</span>
            </>
          ) : (
            <>
              Seamless gutters, <span className="text-[var(--color-copper)]">up close.</span>
            </>
          )}
        </h2>

        {localPhotos.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {localPhotos.map((p, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[var(--radius-tile)] bg-[var(--color-royal)] aspect-[4/5]"
              >
                <ResponsiveImg
                  base={p.image}
                  alt={p.alt}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  widths={p.widths || [640, 1024]}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-slate)]/75 leading-relaxed max-w-2xl">
            Every photo in our gallery is a real Seamless Gutters 4 Less job across{" "}
            {area.county} County — no stock photography, no renders of houses we've
            never touched.
          </p>
        )}

        <Link
          to="/gallery/"
          className="haptic inline-flex items-center gap-2 mt-7 text-[var(--color-royal)] font-display-bold uppercase tracking-tight hover:text-[var(--color-copper)] transition-colors"
        >
          See the full project gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ── LOCAL REVIEWS ── real Google reviews from this city, or nothing ── */}
      {localReviews.length > 0 && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-paper)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow>{area.name} Reviews</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
              What <span className="text-[var(--color-copper)]">{area.name}</span> says.
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {localReviews.map((r) => (
                <figure
                  key={r.name}
                  className="bg-[var(--color-bone)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 flex flex-col"
                >
                  <div className="flex gap-0.5 mb-4" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[var(--color-copper)] text-[var(--color-copper)]"
                      />
                    ))}
                  </div>
                  <blockquote className="text-[var(--color-slate)]/80 text-sm leading-relaxed grow">
                    {r.text}
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-[var(--color-line)]">
                    <span className="block font-display text-[var(--color-royal)]">{r.name}</span>
                    <span className="block text-[12px] text-[var(--color-slate)]/55 mt-0.5">
                      {r.city}, {SITE.address.region} · Google review
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link
              to="/reviews/"
              className="haptic inline-flex items-center gap-2 mt-8 text-[var(--color-royal)] font-display-bold uppercase tracking-tight hover:text-[var(--color-copper)] transition-colors"
            >
              Read all {SITE.rating.count} reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ── CITY FAQ ── mirrors the FAQPage schema emitted above ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>{area.name} Questions</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
          Straight <span className="text-[var(--color-copper)]">answers.</span>
        </h2>
        <div className="grid gap-6 max-w-3xl">
          {faqs.map((f) => (
            <div key={f.q} className="pb-6 border-b border-[var(--color-line)] last:border-0">
              <h3 className="font-display text-lg text-[var(--color-royal)] mb-2.5">{f.q}</h3>
              <p className="text-[var(--color-slate)]/75 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEARBY CITIES ── internal linking across the service-area cluster ── */}
      {neighbors.length > 0 && (
        <section className="pb-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          <h2 className="font-display text-xl text-[var(--color-royal)] mb-5">
            We also serve, nearby:
          </h2>
          <div className="flex flex-wrap gap-3">
            {neighbors.map((n) => (
              <Link
                key={n.slug}
                to={`/service-areas/${n.countySlug}/${n.slug}/`}
                className="haptic inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full text-sm font-medium text-[var(--color-royal)] hover:border-[var(--color-copper)] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--color-copper)]" />
                Gutters in {n.name}
              </Link>
            ))}
            <Link
              to={`/service-areas/${area.countySlug}/`}
              className="haptic inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-royal-tint)] rounded-full text-sm font-medium text-[var(--color-royal)] hover:text-[var(--color-copper)] transition-colors"
            >
              All {area.county} County areas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[var(--color-copper)] py-16">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white mb-4">
            Get your {area.name} estimate
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Free, in writing, and good for a full year. Same-week scheduling across{" "}
            {area.county} County.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SITE.phone.tel}
              className="haptic inline-flex items-center gap-2 bg-white text-[var(--color-royal)] px-7 py-3.5 font-semibold rounded-full transition-all hover:shadow-xl"
            >
              <Phone className="w-4 h-4" /> {SITE.phone.display}
            </a>
            <a
              href="/contact/#estimate"
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
