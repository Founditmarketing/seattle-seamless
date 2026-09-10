import { useParams, Navigate, Link } from "react-router-dom";
import { Phone, ArrowRight, MapPin } from "lucide-react";
import Eyebrow from "../components/atoms/Eyebrow";
import PageHero from "../components/PageHero";
import PageSEO from "../components/PageSEO";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import {
  SERVICE_AREAS,
  SERVICE_AREA_COUNTIES,
  areasInCounty,
} from "../data/serviceAreas";
import { CITIES } from "../data/cities";
import { SITE } from "../data/site";

/*
 * Service-area hub. One component serves two routes:
 *   /service-areas/            → every county, with linked city pages
 *   /service-areas/:county/    → one county's cities
 *
 * Cities WITHOUT a landing page are still listed, as plain text rather
 * than dead links. We serve them; we just haven't written their page yet.
 * Listing them keeps the coverage claim honest and gives the next batch of
 * pages an obvious home. (Tiers 1 and 2 have pages; tier 3 — the outer
 * Thurston / Kitsap / Mason ring — is what's left.)
 */
export default function ServiceAreasPage() {
  const { county } = useParams();
  const countyMeta = county
    ? SERVICE_AREA_COUNTIES.find((c) => c.slug === county)
    : null;

  if (county && !countyMeta) return <Navigate to="/service-areas/" replace />;

  const path = countyMeta ? `/service-areas/${countyMeta.slug}/` : "/service-areas/";
  const linked = countyMeta ? areasInCounty(countyMeta.slug) : SERVICE_AREAS;

  /* One group per county on the hub, a single unlabelled group on a
   * county page. Counties with no city pages yet never appear. */
  const groups = (countyMeta ? [countyMeta] : SERVICE_AREA_COUNTIES)
    .map((c) => ({ slug: c.slug, name: c.name, cities: areasInCounty(c.slug) }))
    .filter((g) => g.cities.length > 0);

  /* Every city we serve that doesn't yet have its own page. */
  const linkedNames = new Set(SERVICE_AREAS.map((a) => a.name));
  const alsoServed = CITIES.filter((c) => !linkedNames.has(c.name));

  const title = countyMeta
    ? `Gutter Installation in ${countyMeta.name}, WA`
    : "Service Areas Across the Puget Sound";

  const metaTitle = countyMeta
    ? `${countyMeta.name} Gutter Installation — ${SITE.name}`
    : `Service Areas — ${SITE.name}`;

  const metaDesc = countyMeta
    ? `Seamless gutter installation, replacement, guards, and repair across ${countyMeta.name}, WA. ${linked.length} cities served. Call ${SITE.phone.display}.`
    : `Seamless gutter service across ${SITE.countiesServed.length} Washington counties — ${CITIES.length} cities from Tacoma and Gig Harbor to the North Sound. Call ${SITE.phone.display}.`;

  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema(
      countyMeta
        ? [
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas/" },
            { name: countyMeta.name, path },
          ]
        : [
            { name: "Home", path: "/" },
            { name: "Service Areas", path: "/service-areas/" },
          ],
    ),
  ];

  return (
    <>
      <PageSEO title={metaTitle} description={metaDesc} path={path} />
      <SchemaJsonLd data={schemas} id={`service-areas-${county || "all"}`} />

      <PageHero
        eyebrow="Service Areas"
        title={title}
        accent={countyMeta ? countyMeta.name : "Puget Sound"}
        lead={
          countyMeta
            ? countyMeta.blurb
            : `We're based in ${SITE.address.locality} and run seamless gutter work across ${SITE.countiesServed.length} Washington counties. Pierce County is home — the rest of the Sound is a drive we make gladly.`
        }
        image="jobs/1000028736"
        imageAlt="Seamless gutter work on a Pacific Northwest home with a Seamless Gutters 4 Less yard sign."
        chips={[
          `${SITE.countiesServed.length} counties`,
          `${CITIES.length} cities served`,
          `${SITE.yearsDisplay()} years in business`,
          "Veteran-owned",
        ]}
      />

      {/* ── LINKED CITY PAGES ──
           The all-counties view groups by county; twenty cards in one flat
           run reads as a dump and buries the county structure the URLs
           already encode. A county view is a single grid. */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>{countyMeta ? countyMeta.name : "City by City"}</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-3">
          Where we work <span className="text-[var(--color-copper)]">most.</span>
        </h2>
        <p className="text-[var(--color-slate)]/70 leading-relaxed max-w-2xl mb-10">
          Each of these has its own page — the housing stock, the tree cover, and
          the gutter problems that actually come up there.
        </p>

        {groups.map((group, gi) => (
          <div key={group.slug} className={gi > 0 ? "mt-12" : ""}>
            {groups.length > 1 && (
              <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-[var(--color-line)]">
                <h3 className="font-display text-xl text-[var(--color-royal)]">
                  {group.name}
                </h3>
                <Link
                  to={`/service-areas/${group.slug}/`}
                  className="haptic inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-slate)]/70 hover:text-[var(--color-copper)] transition-colors shrink-0"
                >
                  County overview <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.cities.map((a) => (
                <Link
                  key={a.slug}
                  to={`/service-areas/${a.countySlug}/${a.slug}/`}
                  className="haptic group bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card)] p-6 hover:border-[var(--color-copper)] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[var(--color-copper)]" />
                    <h4 className="font-display text-lg text-[var(--color-royal)]">
                      {a.name}, {SITE.address.region}
                    </h4>
                  </div>
                  <p className="text-[var(--color-slate)]/70 text-sm leading-relaxed mb-4">
                    {a.lead}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-display-bold uppercase tracking-tight text-[var(--color-royal)] group-hover:text-[var(--color-copper)] transition-colors">
                    Gutters in {a.name} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── EVERYWHERE ELSE ── honest coverage list, no dead links ── */}
      {!countyMeta && alsoServed.length > 0 && (
        <section className="py-[var(--space-section-md)] bg-[var(--color-paper)]">
          <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
            <Eyebrow>Also Served</Eyebrow>
            <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-3">
              The rest of the <span className="text-[var(--color-copper)]">Sound.</span>
            </h2>
            <p className="text-[var(--color-slate)]/70 leading-relaxed max-w-2xl mb-10">
              We serve these cities too. If yours is on the list, call{" "}
              <a
                href={SITE.phone.tel}
                className="text-[var(--color-royal)] font-medium hover:text-[var(--color-copper)]"
              >
                {SITE.phone.display}
              </a>{" "}
              and we'll get you on the schedule.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
              {alsoServed.map((c) => (
                <li
                  key={c.name}
                  className="text-sm text-[var(--color-slate)]/75 flex items-baseline gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--color-copper)] shrink-0" />
                  {c.name}
                  <span className="text-[var(--color-slate)]/40 text-[12px]">
                    {c.county}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── COUNTIES ── */}
      <section className="py-[var(--space-section-md)] max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        <Eyebrow>Counties</Eyebrow>
        <h2 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] mt-4 mb-8">
          Serving <span className="text-[var(--color-copper)]">{SITE.countiesServed.length} counties.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SITE.countiesServed.map((c) => {
            const hub = SERVICE_AREA_COUNTIES.find((h) => h.name === c);
            const inner = (
              <>
                <MapPin className="w-4 h-4 text-[var(--color-copper)] shrink-0" />
                <span className="text-sm font-medium text-[var(--color-royal)]">{c}</span>
              </>
            );
            /* Don't link the county we're already on — a self-referential
             * link is noise for a reader and a crawler alike. */
            return hub && hub.slug !== county ? (
              <Link
                key={c}
                to={`/service-areas/${hub.slug}/`}
                className="haptic flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card-sm)] px-4 py-3 hover:border-[var(--color-copper)] transition-colors"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={c}
                className="flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-card-sm)] px-4 py-3"
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--color-copper)] py-16">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] text-center">
          <h2 className="font-display-black uppercase text-display-sm text-white mb-4">
            Not sure if we reach you?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Call and ask. If we serve your address, you'll get a free written
            estimate that's good for a full year.
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
