/**
 * SITE-SPECIFIC blog configuration — the ONLY file in api/blog/ that knows
 * this is Seamless Gutters 4 Less. Everything else (_lib, _generate, admin,
 * list, sitemap) is the generic engine, synced verbatim from the canonical
 * source (Founditmarketing/washingtongutters) by the Found-IT CRM.
 *
 * Topics and images derive from the site's own data files so the blog and
 * the rest of the site can never drift. NOTE: this project's Vercel root
 * directory is web/, so the engine lives at web/api/blog and the data files
 * are at ../../src/data (web/src/data), not ../../web/src/data.
 */

import { slugify } from "./_lib.js";

/** Public site origin — canonical URLs, sitemap entries. No trailing slash.
 * The apex 307s to www, so www is canonical (matches index.html + sitemap). */
export const SITE_URL = "https://www.seamlessgutters4less.com";

export const SITE_NAME = "Seamless Gutters 4 Less";

/* The ONLY concrete claims a post may make. Every line is owner-confirmed and
 * already published on the site (src/data/site.js, services.js). */
export const APPROVED_FACTS = `
- Business: Seamless Gutters 4 Less — veteran-owned and operated, based in Tacoma, WA
- Phone (call or text): (253) 498-5575
- Email: info@seamlessgutters4less.com
- In business since 2005 — 20+ years hanging gutters in Puget Sound rain
- 5.0-star Google rating with 500+ Google reviews
- Licensed, bonded & insured in Washington State
- Service area: six counties — Pierce, King, Snohomish, Thurston, Kitsap, Mason.
  Home base is Tacoma; Gig Harbor is the second-strongest market
- Our own crew does the work — zero subcontractors
- Free estimates, usually same-week
- Services: seamless gutter installation, gutter replacement, gutter guards,
  soffit & fascia repair, gutter cleaning
- Materials & methods: seamless aluminum formed on-site to exact run lengths;
  lifetime gutter guard options; rotted fascia rebuilt with primed cedar or
  composite before re-hanging; replacements typically done in a single day
  with cleanup included; cleanings are hand-cleared, flushed, downspouts checked`;

export const VOICE_RULES = `
Voice: honest tradesman. Quiet authority. Pacific Northwest local.
- Speak like a craftsman who actually gets on the ladder, not a salesperson.
- Concrete specifics over puffery. Plainspoken. Cut adjectives. Use periods.
- Acknowledge this is rain country — weather as setting, not gimmick.
- Never "BEST IN TACOMA!!!" hype. Never em-dash-heavy AI cadence.
- Sentence test: could a 60-year-old Gig Harbor homeowner read it out loud
  without rolling her eyes? If no, rewrite.
HARD RULES (violating any of these makes the post unusable):
- NEVER state a dollar price, license number, employee name, street address,
  or business hours. The founding year and years in business may be stated
  ONLY as they appear in the approved facts.
- NEVER invent statistics, review quotes, customer names, or project stories
  presented as real events. Speak in patterns ("we see a lot of…"), not
  fabricated specifics.
- The ONLY concrete claims allowed are in the approved facts list.
- Do not reference or link to competitors.`;

/** Closing guidance appended to the system prompt. */
export const CTA_GUIDANCE = `Structure: open with the problem as the homeowner experiences it, earn trust with pattern-level local knowledge, explain the craft plainly, close with a natural call to action around the free same-week estimate and the phone number (253) 498-5575 (call or text). Do not add a generic FAQ section. Do not write a conclusion heading like "Conclusion".`;

/* Inline copy of the service list — src/data/services.js imports lucide-react
 * icons, which a serverless function must not pull in. galleryTag maps each
 * service onto the photo tags actually present in src/data/gallery.js
 * ("installation" / "replacement" / "guards"). */
const SERVICES = [
  { slug: "seamless-gutter-installation", label: "seamless gutter installation", galleryTag: "installation" },
  { slug: "gutter-replacement", label: "gutter replacement", galleryTag: "replacement" },
  { slug: "gutter-guards", label: "gutter guards", galleryTag: "guards" },
  { slug: "soffit-and-fascia-repair", label: "soffit & fascia repair", galleryTag: "replacement" },
  { slug: "gutter-cleaning", label: "gutter cleaning", galleryTag: "replacement" },
];

const INFO_TOPICS = [
  { key: "seamless-vs-sectional", angle: "Seamless vs. sectional gutters — why the joints are where gutters fail in Puget Sound rain", service: "seamless-gutter-installation" },
  { key: "gutter-guards-worth-it", angle: "Are gutter guards worth it under fir and cedar cover? An installer's honest take", service: "gutter-guards" },
  { key: "overflow-diagnosis", angle: "Gutters overflowing in heavy rain — how to tell if it's a clog, pitch, or undersizing problem", service: "gutter-replacement" },
  { key: "fascia-rot-signs", angle: "Five early signs of fascia and soffit rot homeowners miss until it's expensive", service: "soffit-and-fascia-repair" },
  { key: "downspout-placement", angle: "Where downspouts should actually go — drainage mistakes we fix constantly", service: "seamless-gutter-installation" },
  { key: "5-vs-6-inch", angle: "5-inch vs 6-inch gutters — matching capacity to big Northwest roof planes", service: "seamless-gutter-installation" },
  { key: "moss-and-gutters", angle: "Moss country: what roof moss does to gutters and fascia, and what helps", service: "gutter-cleaning" },
  { key: "replace-or-repair", angle: "Repair or replace? How we make the honest call on an aging gutter system", service: "gutter-replacement" },
  { key: "cleaning-timing", angle: "When to clean gutters in western Washington — before the fall rains, after the needle drop, or both", service: "gutter-cleaning", months: [8, 9, 10] },
  { key: "what-a-cleaning-includes", angle: "What a proper gutter cleaning visit actually includes — hand-clearing, flushing, and checking every downspout", service: "gutter-cleaning" },
  { key: "winter-prep", angle: "Getting gutters ready for a western Washington winter — an installer's checklist", service: "gutter-replacement", months: [9, 10] },
  { key: "spring-checkup", angle: "The spring gutter checkup: what winter did to your system and what to look for", service: "gutter-cleaning", months: [2, 3, 4] },
  { key: "fir-needle-clogs", angle: "Fir needles are the #1 gutter clog in our six counties — what actually keeps them out", service: "gutter-guards", months: [8, 9, 10, 11] },
  { key: "new-construction", angle: "Gutters on new construction — what builders skip and what to check before closing", service: "seamless-gutter-installation" },
  { key: "waterfront-homes", angle: "Gutters on waterfront and hillside homes around the Sound — wind, salt air, and where the water has to go", service: "gutter-replacement" },
];

/** Full candidate topic list, derived from the site's own city data. */
export async function buildTopicPool() {
  const { CITIES } = await import("../../src/data/cities.js");
  const pool = [];

  for (const city of CITIES) {
    const county = city.county.split("/")[0].trim();
    for (const svc of SERVICES) {
      pool.push({
        key: `city:${svc.slug}:${slugify(city.name)}`,
        kind: "city-service",
        city: city.name,
        county,
        service: svc,
        tier: city.tier,
        brief: `A local landing-style blog post about ${svc.label} for homeowners in ${city.name}, WA (${county} County). Ground it in what ${city.name} homes, trees, and weather are actually like.`,
      });
    }
  }

  const counties = ["Pierce", "King", "Snohomish", "Thurston", "Kitsap", "Mason"];
  INFO_TOPICS.forEach((t, i) => {
    const county = counties[i % counties.length];
    pool.push({
      key: `info:${t.key}`,
      kind: "informational",
      city: null,
      county,
      service: SERVICES.find((s) => s.slug === t.service),
      tier: 1,
      months: t.months,
      brief: `An informational post for Puget Sound homeowners: ${t.angle}. Anchor examples in ${county} County towns.`,
    });
  });

  return pool;
}

/** Real jobsite photos only — {image, alt, service} pool for hero/inline
 * shots. The post hero renders the 1024w variant, so only images that ship a
 * 1024w file qualify (entries with an explicit widths list lacking 1024 are
 * the small 640-only gallery thumbs). Portraits with homeowners are excluded. */
export async function getImagePool() {
  const { GALLERY } = await import("../../src/data/gallery.js");
  return GALLERY.filter((g) => !g.portrait && (!g.widths || g.widths.includes(1024))).map(
    ({ image, alt, service }) => ({ image, alt, service }),
  );
}

/** No per-county landing pages on this site yet — category is a label only. */
export function categoryFor(topic) {
  return {
    category: `${topic.county} County`,
    categorySlug: null,
  };
}
