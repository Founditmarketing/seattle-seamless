/*
 * Generates web/public/sitemap.xml from the canonical route list.
 *
 * Run automatically as part of `vite build`. Also runnable on its own
 * via `node scripts/gen-sitemap.mjs` for testing.
 *
 * The static routes are a hand-rolled list because we don't have a router
 * config we can introspect from Node. The service-area routes are NOT
 * hand-rolled — they're imported from src/data/serviceAreas.js, the same
 * module the pages render from, so a new city page can never ship missing
 * from the sitemap. Keep that file free of React imports for this to work.
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { SERVICE_AREA_PATHS } from "../src/data/serviceAreas.js";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");
const OUT_PATH   = resolve(ROOT, "public", "sitemap.xml");

const BASE = "https://www.seamlessgutters4less.com";

const SERVICE_SLUGS = [
  "seamless-gutter-installation",
  "gutter-replacement",
  "gutter-guards",
  "soffit-and-fascia-repair",
  "gutter-cleaning",
];

/* Each entry mirrors the routes registered in src/App.jsx.
 * `changefreq` and `priority` are hints, not contracts — Google mostly
 * ignores them but Bing still uses them.  */
const PAGES = [
  { loc: "/",          changefreq: "weekly",  priority: 1.0 },
  { loc: "/about/",    changefreq: "monthly", priority: 0.7 },
  { loc: "/gallery/",  changefreq: "weekly",  priority: 0.7 },
  { loc: "/reviews/",  changefreq: "weekly",  priority: 0.8 },
  { loc: "/faq/",      changefreq: "monthly", priority: 0.8 },
  { loc: "/contact/",  changefreq: "monthly", priority: 0.8 },
  /* Blog POST urls live in the DYNAMIC sitemap (/blog-sitemap.xml, served by
   * api/blog/sitemap.js and listed in robots.txt) — posts publish on a
   * schedule between deploys, so a build-time list would always be stale.
   * Only the /blog/ index belongs here. */
  { loc: "/blog/",     changefreq: "weekly",  priority: 0.6 },
  ...SERVICE_SLUGS.map((slug) => ({
    loc: `/services/${slug}/`,
    changefreq: "monthly",
    priority: 0.9,
  })),
  /* Service-area pages (sg4l-plan.md §7). The hub sits a notch below the
   * service pages; individual city pages carry the same weight as a
   * service page because they're the local-search entry points. */
  ...SERVICE_AREA_PATHS.map((loc) => ({
    loc,
    changefreq: "monthly",
    priority: loc.split("/").filter(Boolean).length >= 3 ? 0.9 : 0.7,
  })),
];

function urlEl({ loc, changefreq, priority }, lastmod) {
  return [
    "  <url>",
    `    <loc>${BASE}${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    "  </url>",
  ].join("\n");
}

function main() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = PAGES.map((p) => urlEl(p, lastmod)).join("\n");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    "</urlset>",
    "",
  ].join("\n");

  if (!existsSync(dirname(OUT_PATH))) {
    mkdirSync(dirname(OUT_PATH), { recursive: true });
  }
  writeFileSync(OUT_PATH, xml, "utf8");
  console.log(`[sitemap] wrote ${PAGES.length} urls → ${OUT_PATH}`);
}

main();
