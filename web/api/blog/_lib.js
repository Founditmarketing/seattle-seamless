/**
 * Shared blog store + auth helpers.
 *
 * Used by both the Vercel serverless functions in api/blog/* (production)
 * and the Vite dev-server middleware in vite-plugins/blog-dev-api.js (local
 * development), same pattern as api/jobber/_lib.js.
 *
 * Storage: the Upstash Redis / Vercel KV integration already attached to the
 * project for Jobber token persistence (KV_REST_API_URL / KV_REST_API_TOKEN,
 * or the UPSTASH_* names). When no KV creds are present (local dev without
 * env), falls back to a gitignored JSON file at the repo root so the whole
 * flow can run offline.
 *
 * A post is one JSON document:
 *   { slug, title, category, categorySlug, city, publishAt, date,
 *     dateDisplay, readMinutes, heroImage, heroAlt, excerpt,
 *     body: [{t:"p"|"h2"|"h3"|"ul"|"img", ...}], source: "seed"|"ai", createdAt }
 *
 * "Scheduled" is not a status flag — a post with publishAt in the future is
 * scheduled, one in the past is published. Public surfaces (list endpoint,
 * sitemap) filter on publishAt <= now; the admin endpoint returns everything.
 *
 * Env vars:
 *   BLOG_ADMIN_PASSWORD — owner login for /blog/admin (required for admin)
 *   ANTHROPIC_API_KEY   — post generation (required for cron/generate)
 *   CRON_SECRET         — Vercel Cron auth (recommended in production)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash, createHmac, timingSafeEqual, verify as edVerify, createPublicKey } from "node:crypto";
import { FOUNDIT_BLOG_PUBLIC_KEY } from "./_pubkey.js";

export function env(name, fallback = undefined) {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  // Values pasted with surrounding quotes are a recurring .env.local mistake.
  return String(v).replace(/^"(.*)"$/, "$1");
}

/* ─── KV (Upstash REST) ────────────────────────────────────────────────── */

function kvConfig() {
  const url = env("KV_REST_API_URL") || env("UPSTASH_REDIS_REST_URL");
  const token = env("KV_REST_API_TOKEN") || env("UPSTASH_REDIS_REST_TOKEN");
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

/** Run one Redis command via Upstash REST (JSON array body form). */
async function kvCmd(...args) {
  const cfg = kvConfig();
  if (!cfg) throw new Error("KV store not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args.map(String)),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`KV ${args[0]} failed: HTTP ${res.status} ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  if (json.error) throw new Error(`KV ${args[0]} error: ${json.error}`);
  return json.result;
}

/* ─── File-backed dev store (no KV creds) ──────────────────────────────── */

const DEV_STORE_PATH = resolve(process.cwd(), ".blog-dev-store.json");

function devLoad() {
  try {
    return JSON.parse(readFileSync(env("BLOG_DEV_STORE", DEV_STORE_PATH), "utf8"));
  } catch {
    return { kv: {}, sets: {} };
  }
}
function devSave(db) {
  writeFileSync(env("BLOG_DEV_STORE", DEV_STORE_PATH), JSON.stringify(db, null, 2));
}

/* ─── Unified store ops (KV in prod, JSON file in dev) ─────────────────── */

export const usingKv = () => !!kvConfig();

export async function storeGet(key) {
  if (kvConfig()) return kvCmd("GET", key);
  return devLoad().kv[key] ?? null;
}
export async function storeSet(key, value) {
  if (kvConfig()) return kvCmd("SET", key, value);
  const db = devLoad();
  db.kv[key] = value;
  devSave(db);
}
export async function storeDel(key) {
  if (kvConfig()) return kvCmd("DEL", key);
  const db = devLoad();
  delete db.kv[key];
  devSave(db);
}
export async function setAdd(key, member) {
  if (kvConfig()) return kvCmd("SADD", key, member);
  const db = devLoad();
  db.sets[key] = Array.from(new Set([...(db.sets[key] || []), member]));
  devSave(db);
}
export async function setRemove(key, member) {
  if (kvConfig()) return kvCmd("SREM", key, member);
  const db = devLoad();
  db.sets[key] = (db.sets[key] || []).filter((m) => m !== member);
  devSave(db);
}
export async function setMembers(key) {
  if (kvConfig()) return (await kvCmd("SMEMBERS", key)) || [];
  return devLoad().sets[key] || [];
}
async function mget(keys) {
  if (!keys.length) return [];
  if (kvConfig()) return (await kvCmd("MGET", ...keys)) || [];
  const db = devLoad();
  return keys.map((k) => db.kv[k] ?? null);
}

/* ─── Post CRUD ────────────────────────────────────────────────────────── */

const K = {
  slugs: "blog:slugs",
  post: (slug) => `blog:post:${slug}`,
  seeded: "blog:seeded",
  topicsUsed: "blog:topics_used",
  recentImages: "blog:recent_images",
  config: "blog:config",
};

export async function getConfig() {
  const raw = await storeGet(K.config);
  const cfg = raw ? JSON.parse(raw) : {};
  return { postsPerWeek: 2, ...cfg };
}

export async function listPosts({ includeScheduled = false } = {}) {
  await ensureSeeded();
  const slugs = await setMembers(K.slugs);
  const raws = await mget(slugs.map(K.post));
  const now = Date.now();
  const posts = raws
    .filter(Boolean)
    .map((r) => (typeof r === "string" ? JSON.parse(r) : r))
    .filter((p) => includeScheduled || new Date(p.publishAt).getTime() <= now);
  posts.sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt));
  return posts;
}

export async function getPost(slug) {
  const raw = await storeGet(K.post(slug));
  return raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : null;
}

export async function savePost(post) {
  await storeSet(K.post(post.slug), JSON.stringify(post));
  await setAdd(K.slugs, post.slug);
}

export async function deletePost(slug) {
  await storeDel(K.post(slug));
  await setRemove(K.slugs, slug);
}

export async function markTopicUsed(key) {
  await setAdd(K.topicsUsed, key);
}
export async function usedTopics() {
  return setMembers(K.topicsUsed);
}

/** Ring buffer of recently used hero/inline image bases (avoid repeats). */
export async function recentImages() {
  const raw = await storeGet(K.recentImages);
  return raw ? JSON.parse(raw) : [];
}
export async function pushRecentImages(bases) {
  const cur = await recentImages();
  const next = [...bases, ...cur].slice(0, 10);
  await storeSet(K.recentImages, JSON.stringify(next));
}

/* ─── Seeding — migrate the original static posts into the store once ──── */

export async function ensureSeeded() {
  const done = await storeGet(K.seeded);
  if (done) return false;
  // Import the original hand-migrated posts from the site's data file (plain
  // ESM data, no JSX — safe to import from a serverless function). Most
  // sites the CRM installs this engine into have NO seed file (and repos
  // whose Vercel root directory is web/ can't resolve this path at all) —
  // that's fine: the blog simply starts empty and the CRM fills it.
  let POSTS = [];
  try {
    ({ POSTS } = await import("../../web/src/data/blog.js"));
  } catch {
    POSTS = [];
  }
  for (const p of POSTS) {
    // Never resurrect a seed the owner already deleted.
    const deleted = await setMembers("blog:seed_deleted");
    if (deleted.includes(p.slug)) continue;
    await savePost({
      ...p,
      publishAt: `${p.date}T12:00:00.000Z`,
      source: "seed",
      createdAt: new Date().toISOString(),
    });
  }
  await storeSet(K.seeded, new Date().toISOString());
  return true;
}

/* ─── Owner auth — signed session cookie ───────────────────────────────── */

const COOKIE_NAME = "wg4l_admin";
const SESSION_DAYS = 30;

function sessionSecret() {
  const pw = env("BLOG_ADMIN_PASSWORD");
  if (!pw) return null;
  // Keyed off the password: changing the password invalidates all sessions,
  // and no second secret env var is needed.
  return createHash("sha256").update(`wg4l-blog-session::${pw}`).digest();
}

function sign(exp) {
  return createHmac("sha256", sessionSecret()).update(String(exp)).digest("hex");
}

export function checkPassword(input) {
  const pw = env("BLOG_ADMIN_PASSWORD");
  if (!pw || typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeSessionCookie() {
  const exp = Date.now() + SESSION_DAYS * 86400_000;
  const secure = env("VERCEL") ? "; Secure" : "";
  return `${COOKIE_NAME}=${exp}.${sign(exp)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}${secure}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function isAuthed(req) {
  if (!sessionSecret()) return false;
  const cookies = String(req.headers?.cookie || "");
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (!m) return false;
  const [expStr, sig] = m[1].split(".");
  const exp = Number(expStr);
  if (!exp || !sig || exp < Date.now()) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/* ─── CRM signature auth — the zero-env machine path ────────────────────────
 * The Found-IT CRM signs requests with its private key; this site only holds
 * the committed PUBLIC key (_pubkey.js), so the engine needs no env secret.
 * Message: `${ts}.${METHOD}.${pathWithQuery}.${sha256hex(bodyString)}`
 * where bodyString is exactly what the CRM JSON.stringify'd ('' for GET/
 * DELETE). ±5 min timestamp window as the replay guard.
 */
export function isCrmSigned(req, bodyString = "") {
  try {
    const ts = String(req.headers?.["x-foundit-ts"] || "");
    const sig = String(req.headers?.["x-foundit-sig"] || "");
    if (!ts || !sig) return false;
    if (Math.abs(Date.now() - Number(ts)) > 5 * 60_000) return false;
    const path = new URL(req.url, "http://local");
    const bodyHash = createHash("sha256").update(bodyString ?? "").digest("hex");
    const message = `${ts}.${String(req.method).toUpperCase()}.${path.pathname}${path.search}.${bodyHash}`;
    return edVerify(
      null,
      Buffer.from(message),
      createPublicKey(FOUNDIT_BLOG_PUBLIC_KEY),
      Buffer.from(sig, "base64"),
    );
  } catch {
    return false;
  }
}

/* ─── Request/response helpers (Vercel node runtime + Vite middleware) ── */

export async function readJsonBody(req) {
  return (await readBody(req)).json;
}

/**
 * Body as BOTH parsed JSON and the string used for signature hashing.
 * Vercel pre-parses JSON bodies (raw stream already consumed) — there we
 * re-serialize, which matches because the CRM signs exactly what it
 * JSON.stringify'd and V8 key order survives the round trip. The Vite dev
 * middleware hands us the raw stream directly.
 */
export async function readBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") return { raw: req.body, json: JSON.parse(req.body || "{}") };
    return { raw: JSON.stringify(req.body), json: req.body };
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return { raw, json: raw ? JSON.parse(raw) : {} };
}

export function sendJson(res, status, data, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.end(JSON.stringify(data));
}

export function queryOf(req) {
  return new URL(req.url, "http://local").searchParams;
}

/* ─── Formatting helpers shared by generator + endpoints ───────────────── */

export function fmtDateDisplay(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
