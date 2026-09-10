/*
 * The canonical list of static routes, shared by the two build steps that
 * must never disagree: scripts/gen-sitemap.mjs (what we tell Google
 * exists) and scripts/prerender.mjs (what we actually write to disk as
 * static HTML). A URL in the sitemap that never got prerendered, or a
 * prerendered page missing from the sitemap, are both silent failures —
 * one list prevents both.
 *
 * Blog POST urls are deliberately absent. Posts publish from the API on a
 * schedule between deploys, so a build-time list would always be stale;
 * they live in the dynamic /blog-sitemap.xml and are served by the SPA
 * fallback. Only the /blog/ index is here.
 *
 * Keep this file free of React imports — both consumers are plain Node.
 */

import { SERVICE_AREA_PATHS } from "./serviceAreas.js";

export const SERVICE_SLUGS = [
  "seamless-gutter-installation",
  "gutter-replacement",
  "gutter-guards",
  "soffit-and-fascia-repair",
  "gutter-cleaning",
];

/* `changefreq` and `priority` are sitemap hints — Google mostly ignores
 * them, Bing still reads them. */
export const SITE_ROUTES = [
  { loc: "/", changefreq: "weekly", priority: 1.0 },
  { loc: "/about/", changefreq: "monthly", priority: 0.7 },
  { loc: "/gallery/", changefreq: "weekly", priority: 0.7 },
  { loc: "/reviews/", changefreq: "weekly", priority: 0.8 },
  { loc: "/faq/", changefreq: "monthly", priority: 0.8 },
  { loc: "/contact/", changefreq: "monthly", priority: 0.8 },
  { loc: "/blog/", changefreq: "weekly", priority: 0.6 },
  ...SERVICE_SLUGS.map((slug) => ({
    loc: `/services/${slug}/`,
    changefreq: "monthly",
    priority: 0.9,
  })),
  /* Service-area pages (sg4l-plan.md §7). The hubs sit a notch below the
   * service pages; individual city pages carry the same weight because
   * they're the local-search entry points. */
  ...SERVICE_AREA_PATHS.map((loc) => ({
    loc,
    changefreq: "monthly",
    priority: loc.split("/").filter(Boolean).length >= 3 ? 0.9 : 0.7,
  })),
];

export const PRERENDER_PATHS = SITE_ROUTES.map((r) => r.loc);
