/*
 * Build-time prerender. Turns the client-rendered SPA into real static
 * HTML for every route we care about ranking.
 *
 * WHY: the site sets its <title>, description, canonical, and JSON-LD from
 * JavaScript after load. Googlebot executes JS and will eventually see
 * that, but it indexes JS-rendered pages more slowly and less reliably,
 * and most AI answer-engine crawlers don't execute JS at all — so the
 * ~750 words of local copy on each service-area page, and the schema that
 * frames it, were invisible to them. This step writes body copy AND head
 * tags into the file that gets served.
 *
 * HOW: `vite build --ssr src/entry-server.jsx` produces a Node-runnable
 * bundle. For each path we render the same route tree under a
 * StaticRouter, collect the head values PageSEO/SchemaJsonLd would have
 * written to the DOM (see src/lib/ssrHead.js), splice both into the built
 * index.html, and write dist/<path>/index.html.
 *
 * Vercel checks the filesystem before applying rewrites, so those files
 * win over the SPA fallback in vercel.json. Routes NOT prerendered (blog
 * posts, anything unknown) still fall through to the SPA exactly as
 * before — this is additive.
 *
 * NOT hydration. main.jsx still calls createRoot, so React discards the
 * static markup and renders from scratch on load. That's deliberate: the
 * prerendered HTML exists for crawlers and first paint, and skipping
 * hydration means a mismatch can never break the live page. The cost is
 * re-rendering markup we already have, which for a site this size is not
 * worth the fragility of hydrating a tree full of browser-only effects.
 *
 * Run: `node scripts/prerender.mjs` (after both vite builds).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PRERENDER_PATHS } from "../src/data/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const SSR_ENTRY = resolve(ROOT, "dist-ssr", "entry-server.js");
const TEMPLATE = resolve(DIST, "index.html");

const BASE = "https://www.seamlessgutters4less.com";

if (!existsSync(TEMPLATE)) {
  console.error(`[prerender] missing ${TEMPLATE} — run \`vite build\` first.`);
  process.exit(1);
}
if (!existsSync(SSR_ENTRY)) {
  console.error(
    `[prerender] missing ${SSR_ENTRY} — run \`vite build --ssr src/entry-server.jsx --outDir dist-ssr\` first.`,
  );
  process.exit(1);
}

const { render } = await import(SSR_ENTRY);
const template = readFileSync(TEMPLATE, "utf8");

/* HTML-escape for attribute values. Titles and descriptions are authored
 * copy and legitimately contain apostrophes, ampersands, and em dashes. */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Replace the content="" of a meta tag matched by one attribute, or a
 * link's href. Leaves the tag alone if the template doesn't have it —
 * every tag we touch is present in index.html today, and a silent no-op
 * beats injecting a duplicate. */
function setMeta(html, attr, name, value) {
  const re = new RegExp(
    `(<meta\\s+[^>]*${attr}=["']${name}["'][^>]*content=["'])[^"']*(["'])`,
    "i",
  );
  return html.replace(re, `$1${esc(value)}$2`);
}

function setCanonical(html, url) {
  return html.replace(
    /(<link\s+rel=["']canonical["']\s+href=["'])[^"']*(["'])/i,
    `$1${esc(url)}$2`,
  );
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
}

/* The SPA fallback shell, written BEFORE the loop overwrites
 * dist/index.html with the prerendered homepage.
 *
 * This matters more than it looks. vercel.json rewrites every unknown
 * extensionless path to a single file; if that file were dist/index.html,
 * then after this script runs, a blog post URL would serve the fully
 * rendered HOMEPAGE — body copy and canonical="/" — to any crawler that
 * doesn't execute JS. React would correct it client-side and a human
 * would never notice, which is exactly what makes it dangerous.
 *
 * So non-prerendered routes get spa.html: the original untouched shell,
 * identical to what the whole site served before this step existed. The
 * rewrite in both vercel.json files points here. */
writeFileSync(join(DIST, "spa.html"), template, "utf8");

let written = 0;
const problems = [];

for (const path of PRERENDER_PATHS) {
  let result;
  try {
    result = render(path);
  } catch (err) {
    problems.push(`${path} — render threw: ${err.message}`);
    continue;
  }

  const { html: body, meta, schemas } = result;

  if (!meta) problems.push(`${path} — no PageSEO rendered, head left generic`);
  if (meta && meta.path !== path) {
    /* A route that fell through to a redirect or the 404 page would
     * otherwise be written to disk under the wrong URL with a canonical
     * pointing somewhere else. Skip it rather than ship that. */
    problems.push(`${path} — PageSEO claims ${meta.path}; skipped`);
    continue;
  }

  /* Drop the hand-rolled <noscript> fallback. It exists because the site
   * was CSR-only: a generic "Seamless Gutters 4 Less" h1 plus homepage
   * boilerplate and a service list. Crawlers that don't run JS parse
   * noscript content, so leaving it in a prerendered page hands them a
   * second, competing h1 and a block of homepage copy on top of the real
   * page — precisely the signal this whole step exists to fix. Routes we
   * don't prerender still get it, via spa.html above. */
  let page = template.replace(/\s*<noscript>[\s\S]*?<\/noscript>/i, "");

  if (meta) {
    const url = `${BASE}${meta.path}`;
    page = setTitle(page, meta.title);
    page = setMeta(page, "name", "description", meta.description);
    page = setMeta(page, "property", "og:title", meta.title);
    page = setMeta(page, "property", "og:description", meta.description);
    page = setMeta(page, "property", "og:url", url);
    page = setMeta(page, "name", "twitter:title", meta.title);
    page = setMeta(page, "name", "twitter:description", meta.description);
    page = setCanonical(page, url);
  }

  /* JSON-LD goes in the head as static script tags. data-schema matches
   * what SchemaJsonLd writes at runtime so the client's cleanup on route
   * change stays predictable. */
  if (schemas.length) {
    const tags = schemas
      .map(
        ({ id, blob }) =>
          `    <script type="application/ld+json" data-schema="${esc(id)}" data-prerendered="1">${JSON.stringify(
            blob,
          ).replace(/</g, "\\u003c")}</script>`,
      )
      .join("\n");
    page = page.replace("</head>", `${tags}\n  </head>`);
  }

  page = page.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outDir = path === "/" ? DIST : join(DIST, path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), page, "utf8");
  written++;
}

const kb = (p) => Math.round(readFileSync(p, "utf8").length / 1024);
console.log(
  `[prerender] wrote ${written}/${PRERENDER_PATHS.length} routes ` +
    `(root index.html ${kb(TEMPLATE)} KB)`,
);

if (problems.length) {
  console.error(`[prerender] ${problems.length} problem(s):`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
