/**
 * GET /api/blog/list — public feed of PUBLISHED posts (publishAt <= now),
 * newest first, full bodies. Scheduled posts are never exposed here.
 */
import { listPosts, sendJson } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return sendJson(res, 405, { error: "Method not allowed" });
  try {
    const posts = await listPosts();
    sendJson(res, 200, { posts }, {
      // CDN-cache 5 min: a scheduled post going live shows up within minutes.
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    });
  } catch (e) {
    console.error("[blog/list]", e);
    sendJson(res, 500, { error: "Blog temporarily unavailable" });
  }
}
