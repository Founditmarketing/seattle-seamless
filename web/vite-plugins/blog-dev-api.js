/**
 * Vite plugin: mounts api/blog/* as middleware on the dev server, so the
 * exact same handlers that run on Vercel in production also handle local
 * /api/blog/* requests during `npm run dev`. Same pattern as
 * jobber-dev-api.js.
 *
 * With KV_REST_API_URL/TOKEN in .env.local the dev server talks to the real
 * store; without them, api/blog/_lib.js falls back to a gitignored JSON file
 * at the repo root so the whole flow works offline.
 *
 * GOTCHA: the `?t=` cache-buster only re-imports the top-level handler
 * module — edits to _lib.js / _generate.js / site-config.js need a dev-server
 * restart.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROUTES = {
  "/api/blog/list": "list",
  "/api/blog/admin": "admin",
  "/api/blog/sitemap": "sitemap",
  "/blog-sitemap.xml": "sitemap", // mirror of the production rewrite
};

function loadEnvLocal(root) {
  try {
    const txt = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq < 0) continue;
      const key = t.slice(0, eq).trim();
      const val = t.slice(eq + 1).trim();
      if (process.env[key] === undefined || process.env[key] === "") {
        process.env[key] = val;
      }
    }
  } catch {
    /* missing .env.local is fine */
  }
}

export default function blogDevApi() {
  return {
    name: "blog-dev-api",
    configureServer(server) {
      const root = server.config.root; // web/
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url || "").split("?")[0];
        const mod = ROUTES[path];
        if (!mod) return next();

        loadEnvLocal(root);
        // Keep the dev store out of web/ so Vite's watcher never restarts on writes.
        if (!process.env.BLOG_DEV_STORE) {
          process.env.BLOG_DEV_STORE = resolve(root, "../.blog-dev-store.json");
        }

        try {
          const filePath = resolve(root, `api/blog/${mod}.js`);
          const fileUrl = pathToFileURL(filePath).href + `?t=${Date.now()}`;
          const handler = await import(fileUrl);
          await handler.default(req, res);
        } catch (e) {
          console.error(`[blog-dev-api] handler error for ${path}:`, e);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ ok: false, error: e.message }));
          }
        }
      });
    },
  };
}
