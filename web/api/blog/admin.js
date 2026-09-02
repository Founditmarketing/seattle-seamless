/**
 * Blog management endpoint — powers /blog/admin, the Found-IT CRM's Site
 * Blog tab, and the client portal's Blog tab.
 *
 *   POST  {action:"login", password}   → owner session cookie (optional path —
 *                                        only if BLOG_ADMIN_PASSWORD env set)
 *   POST  {action:"logout"}            → clears it
 *   GET                                → all posts incl. scheduled     (auth)
 *   GET   ?action=assignment           → next writing assignment       (auth)
 *   POST  {action:"ingest", topicKey, draft, publishAt}
 *                                      → assemble + save a CRM-written draft (auth)
 *   POST  {action:"generate"}          → dormant on-site writer (needs env)  (auth)
 *   DELETE ?slug=…                     → delete a post, live or scheduled    (auth)
 *
 * Auth, in order of preference — the site itself needs NO env vars:
 *   1. Ed25519 signature from the Found-IT CRM (x-foundit-ts/-sig, verified
 *      against the committed public key in _pubkey.js)
 *   2. Bearer BLOG_API_KEY (legacy machine path; dead unless the env is set)
 *   3. The owner's signed session cookie (only if BLOG_ADMIN_PASSWORD is set)
 */
import { timingSafeEqual } from "node:crypto";
import {
  listPosts,
  getPost,
  deletePost,
  setAdd,
  getConfig,
  checkPassword,
  makeSessionCookie,
  clearSessionCookie,
  isAuthed,
  isCrmSigned,
  readBody,
  sendJson,
  queryOf,
} from "./_lib.js";
import { buildAssignment, ingestDraft, generateNext } from "./_generate.js";

function bearerAuthed(req) {
  const key = process.env.BLOG_API_KEY;
  if (!key) return false;
  const m = String(req.headers?.authorization || "").match(/^Bearer (.+)$/);
  if (!m) return false;
  const a = Buffer.from(m[1]);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  try {
    const { raw, json: body } =
      req.method === "POST" ? await readBody(req).catch(() => ({ raw: "", json: {} })) : { raw: "", json: {} };
    const authed = () => isCrmSigned(req, raw) || bearerAuthed(req) || isAuthed(req);
    const q = queryOf(req);

    if (req.method === "POST") {
      if (body.action === "login") {
        if (!process.env.BLOG_ADMIN_PASSWORD) {
          return sendJson(res, 503, { error: "On-site login is off — manage this blog from your client portal" });
        }
        if (!checkPassword(body.password)) {
          return sendJson(res, 401, { error: "Wrong password" });
        }
        return sendJson(res, 200, { ok: true }, { "Set-Cookie": makeSessionCookie() });
      }

      if (body.action === "logout") {
        return sendJson(res, 200, { ok: true }, { "Set-Cookie": clearSessionCookie() });
      }

      if (!authed()) return sendJson(res, 401, { error: "Not signed in" });

      if (body.action === "ingest") {
        const post = await ingestDraft({ topicKey: body.topicKey, draft: body.draft, publishAt: body.publishAt });
        return sendJson(res, 200, {
          ok: true,
          post: { slug: post.slug, title: post.title, publishAt: post.publishAt },
        });
      }

      if (body.action === "generate") {
        const cfg = await getConfig();
        const post = await generateNext(cfg.postsPerWeek);
        return sendJson(res, 200, {
          ok: true,
          post: { slug: post.slug, title: post.title, publishAt: post.publishAt },
        });
      }

      return sendJson(res, 400, { error: "Unknown action" });
    }

    if (req.method === "GET") {
      if (!authed()) return sendJson(res, 401, { error: "Not signed in" });
      if (q.get("action") === "assignment") {
        return sendJson(res, 200, await buildAssignment());
      }
      const posts = await listPosts({ includeScheduled: true });
      return sendJson(res, 200, { posts, now: new Date().toISOString() });
    }

    if (req.method === "DELETE") {
      if (!authed()) return sendJson(res, 401, { error: "Not signed in" });
      const slug = q.get("slug");
      if (!slug) return sendJson(res, 400, { error: "slug required" });
      const post = await getPost(slug);
      if (!post) return sendJson(res, 404, { error: "Post not found" });
      if (post.source === "seed") await setAdd("blog:seed_deleted", slug); // never resurrect
      await deletePost(slug);
      return sendJson(res, 200, { ok: true, deleted: slug });
    }

    return sendJson(res, 405, { error: "Method not allowed" });
  } catch (e) {
    console.error("[blog/admin]", e);
    sendJson(res, 500, { error: e.message || "Admin error" });
  }
}
