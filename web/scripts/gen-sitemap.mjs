/*
 * Generates web/public/sitemap.xml from the canonical route list.
 *
 * Run automatically as part of `npm run build`. Also runnable on its own
 * via `node scripts/gen-sitemap.mjs` for testing.
 *
 * The route list lives in src/data/routes.js, shared with
 * scripts/prerender.mjs so the sitemap can never advertise a URL that
 * didn't get prerendered (or miss one that did). Keep that file free of
 * React imports — this script is plain Node.
 */

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_ROUTES } from "../src/data/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, "..");
const OUT_PATH   = resolve(ROOT, "public", "sitemap.xml");

const BASE = "https://www.seamlessgutters4less.com";

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
  const body = SITE_ROUTES.map((p) => urlEl(p, lastmod)).join("\n");
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
  console.log(`[sitemap] wrote ${SITE_ROUTES.length} urls → ${OUT_PATH}`);
}

main();
