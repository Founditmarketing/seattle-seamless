import { useParams, Navigate, Link } from "react-router-dom";
import { Phone, ArrowRight, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import PageHero from "../components/PageHero";
import PageSEO from "../components/PageSEO";
import SchemaJsonLd from "../components/SchemaJsonLd";
import {
  localBusinessSchema,
  cityServiceSchema,
  breadcrumbSchema,
  faqSchema,
} from "../lib/schema";
import { findMatrixEntry, matrixForCity, matrixForService } from "../data/serviceMatrix";
import { REVIEWS } from "../data/reviews";
import { SITE } from "../data/site";

/*
 * City × service page — /service-areas/[county]/[city]/[service]/.
 *
 * The most specific page in the service-area tree, and the one that has to
 * justify existing: if it says nothing its parent city page doesn't
 * already say, it competes with that page instead of helping it. All the
 * combination-specific copy lives in data/serviceMatrix.js; this file is
 * layout plus the internal links that tie the cluster together — up to the
 * city and the generic service page, sideways to the other service in this
 * city and the same service in the other matrix cities.
 */
export default function CityServicePage() {
  const { county, city, service } = useParams();
  const entry = findMatrixEntry(city, service);

  /* No matrix page for this combination, or the county doesn't match the
   * city's — fall back to the city page rather than 404, since that page
   * covers the same service anyway. */
  if (!entry) return <Navigate to={`/service-areas/${county}/${city}/`} replace />;
  if (entry.area.countySlug !== county) return <Navigate to={entry.path} replace />;

  const { area } = entry;
  const siblings = matrixForCity(city).filter((e) => e.service !== service);
  const otherCities = matrixForService(service, city);
  const localReviews = REVIEWS.filter((r) => r.city === area.name).slice(0, 2);

  const schemas = [
    localBusinessSchema(),
    cityServiceSchema(entry),
    faqSchema(entry.faqs, `${SITE.website}${entry.path}#faq`),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas/" },
      { name: `${area.county} County`, path: `/service-areas/${area.countySlug}/` },
      { name: area.name, path: `/service-areas/${area.countySlug}/${area.slug}/` },
      { name: entry.serviceTitle, path: entry.path },
    ]),
  ];

  return (
    <>
      <PageSEO title={entry.metaTitle} description={entry.metaDesc} path={entry.path} />
      <SchemaJsonLd data={schemas} id={`matrix-${city}-${service}`} />

      <PageHero
        eyebrow={`${area.name}, ${SITE.address.region}`}
        title={entry.h1}
        accent={area.name}
        lead={entry.lead}
        image="jobs/1000028751"
        imageAlt={`Seamless Gutters 4 Less crew installing gutters on a ${SITE.address.regionFull} home.`}
        chips={[
          `${SITE.yearsDisplay()} years in business`,
          `${SITE.rating.value}★ Google (${SITE.rating.count} reviews)`,
          "Veteran-owned",
          `WA Lic. ${SITE.license}`,
        ]}
      />

      {/* ── BREADCRUMB ── four levels deep, so the trail earns its keep ── */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] pt-6"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--color-slate)]/60">
          <li><Link to="/" className="hover:text-[var(--color-copper)]">Home</Link></li>
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
          <li>
            <Link
              to={`/service-areas/${area.countySlug}/${area.slug}/`}
              className="hover:text-[var(--color-copper)]"
            >
              {area.name}
            </Link>
          </li>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <li aria-current="page" className="text-[var(--color-royal)] font-medium">
            {entry.serviceTitle}
          </li>
        </ol>
      </nav>

      {/* ── THE COMBINATION-SPECIFIC COPY ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>
              {entry.serviceTitle} in {area.name}
            </Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-6">
              What this job actually{" "}
              <span className="text-[var(--color-copper)]">involves here.</span>
            </h2>
            {entry.body.map((para, i) => (
              <p key={i} className="text-[var(--color-slate)]/75 leading-relaxed mb-5 last:mb-0">
                {para}
              </p>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 lg:p-7">
              <h3 className="font-display text-lg text-[var(--color-royal)] mb-5">
                What you get
              </h3>
              <ul className="space-y-3.5">
                {entry.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[var(--color-copper)] shrink-0 mt-0.5" />
                    <span className="text-[var(--color-slate)]/80">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-[var(--color-line)]">
                <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-slate)]/50 font-bold mb-3">
                  Covered in {area.name}
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.areas.slice(0, 6).map((n) => (
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

              <a
                href={SITE.phone.tel}
                className="haptic mt-7 w-full inline-flex items-center justify-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-5 py-3 font-display-bold uppercase tracking-tight rounded-full transition-colors"
              >
                <Phone className="w-4 h-4" /> {SITE.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCAL REVIEWS ── real ones from this city, or the section is gone ── */}
      {localReviews.length > 0 && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-paper)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow>{area.name} Customers</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
              From <span className="text-[var(--color-copper)]">{area.name}.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {localReviews.map((r) => (
                <figure
                  key={r.name}
                  className="bg-[var(--color-bone)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6"
                >
                  <blockquote className="text-[var(--color-slate)]/80 text-sm leading-relaxed">
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
          </div>
        </section>
      )}

      {/* ── FAQ ── mirrors the FAQPage schema above ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-10">
          {entry.serviceTitle} in {area.name},{" "}
          <span className="text-[var(--color-copper)]">answered.</span>
        </h2>
        <div className="grid gap-6 max-w-3xl">
          {entry.faqs.map((f) => (
            <div key={f.q} className="pb-6 border-b border-[var(--color-line)] last:border-0">
              <h3 className="font-display text-lg text-[var(--color-royal)] mb-2.5">{f.q}</h3>
              <p className="text-[var(--color-slate)]/75 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLUSTER LINKS ── up, sideways, and across ── */}
      <section className="pb-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="font-display text-xl text-[var(--color-royal)] mb-4">
              More in {area.name}
            </h2>
            <div className="flex flex-col gap-2.5">
              <Link
                to={`/service-areas/${area.countySlug}/${area.slug}/`}
                className="haptic inline-flex items-center gap-2 text-sm font-medium text-[var(--color-royal)] hover:text-[var(--color-copper)] transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
                Everything we do in {area.name}
              </Link>
              {siblings.map((s) => (
                <Link
                  key={s.path}
                  to={s.path}
                  className="haptic inline-flex items-center gap-2 text-sm font-medium text-[var(--color-royal)] hover:text-[var(--color-copper)] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
                  {s.serviceTitle} in {area.name}
                </Link>
              ))}
              <Link
                to={`/services/${service}/`}
                className="haptic inline-flex items-center gap-2 text-sm font-medium text-[var(--color-royal)] hover:text-[var(--color-copper)] transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
                How {entry.serviceTitle.toLowerCase()} works, in general
              </Link>
            </div>
          </div>

          {otherCities.length > 0 && (
            <div>
              <h2 className="font-display text-xl text-[var(--color-royal)] mb-4">
                {entry.serviceTitle} elsewhere
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {otherCities.map((o) => (
                  <Link
                    key={o.path}
                    to={o.path}
                    className="haptic inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full text-sm font-medium text-[var(--color-royal)] hover:border-[var(--color-copper)] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-copper)]" />
                    {o.area.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--color-copper)] py-16">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white mb-4">
            {entry.serviceTitle} in {area.name}?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Free estimate, in writing, good for a full year. Same-week scheduling
            across {area.county} County.
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
