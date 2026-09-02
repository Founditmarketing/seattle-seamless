/**
 * GET /blog-sitemap.xml (rewritten here from root vercel.json) — sitemap of
 * the blog index + every PUBLISHED post. The build-time sitemap can't know
 * about posts that publish after deploy, so blog URLs live in this dynamic
 * one; robots.txt lists both.
 */
import { listPosts, sendJson } from "./_lib.js";
import { SITE_URL as BASE } from "./site-config.js";

export default async function handler(req, res) {
  try {
    const posts = await listPosts();
    const urls = [
      { loc: `${BASE}/blog/`, lastmod: posts[0]?.date },
      ...posts.map((p) => ({ loc: `${BASE}/blog/${p.slug}/`, lastmod: p.date })),
    ];
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map((u) =>
        [
          "  <url>",
          `    <loc>${u.loc}</loc>`,
          u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
          "  </url>",
        ]
          .filter(Boolean)
          .join("\n"),
      ),
      "</urlset>",
      "",
    ].join("\n");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.end(xml);
  } catch (e) {
    console.error("[blog/sitemap]", e);
    sendJson(res, 500, { error: "sitemap unavailable" });
  }
}
