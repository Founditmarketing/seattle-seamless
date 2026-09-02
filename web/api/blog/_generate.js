/**
 * Generic blog-post generation engine — all site specifics (topics, facts,
 * voice, image pool) come from ./site-config.js.
 *
 * Two ways posts get written:
 *
 * 1. CRM-SIDE (the normal, zero-env path): the Found-IT CRM asks this site
 *    for an ASSIGNMENT (buildAssignment → next topic + ready-to-send system/
 *    user prompts + output schema), runs Claude with the agency's own API
 *    key, and posts the draft back to be assembled and saved (ingestDraft).
 *    The site never holds an AI key.
 *
 * 2. ON-SITE (dormant fallback): generateOne() runs the same pipeline locally
 *    when an ANTHROPIC_API_KEY env var happens to be set. Nothing requires it.
 */

import {
  env,
  getPost,
  listPosts,
  savePost,
  markTopicUsed,
  usedTopics,
  recentImages,
  pushRecentImages,
  fmtDateDisplay,
  slugify,
} from "./_lib.js";
import {
  SITE_NAME,
  APPROVED_FACTS,
  VOICE_RULES,
  CTA_GUIDANCE,
  buildTopicPool,
  getImagePool,
  categoryFor,
} from "./site-config.js";

const MODEL = "claude-opus-5";
/* A real post is 700-1000 words in 3-5 sections; anything under this is a
 * truncated model response, not a short article. */
const MIN_WORDS = 450;
const MIN_SECTIONS = 2;
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

/* ─── Topic selection ───────────────────────────────────────────────────── */

async function pickTopic() {
  const [pool, used] = await Promise.all([buildTopicPool(), usedTopics()]);
  const month = new Date().getUTCMonth();
  const fresh = pool.filter((t) => !used.includes(t.key));
  const candidates = fresh.length ? fresh : pool; // pool exhausted → recycle

  const seasonal = candidates.filter((t) => t.months && t.months.includes(month));
  if (seasonal.length) return seasonal[0];
  const info = candidates.filter((t) => t.kind === "informational");
  // Rotate across cities AND services: prefer the city, then the service,
  // with the fewest posts so far.
  const usedByCity = {};
  const usedBySvc = {};
  for (const key of used) {
    const [kind, svc, cty] = key.split(":");
    if (kind !== "city") continue;
    usedBySvc[svc] = (usedBySvc[svc] || 0) + 1;
    if (cty) usedByCity[cty] = (usedByCity[cty] || 0) + 1;
  }
  const city = candidates
    .filter((t) => t.kind === "city-service")
    .sort(
      (a, b) =>
        a.tier - b.tier ||
        (usedByCity[slugify(a.city)] || 0) - (usedByCity[slugify(b.city)] || 0) ||
        (usedBySvc[a.service.slug] || 0) - (usedBySvc[b.service.slug] || 0),
    );
  // Roughly 1 informational for every 2 city posts.
  if (info.length && used.length % 3 === 2) return info[0];
  return city[0] || info[0];
}

/* ─── Prompt + output contract ──────────────────────────────────────────── */

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Post title, 40-65 chars, specific and local. No colons-and-hype patterns.",
    },
    excerpt: {
      type: "string",
      description: "1-2 sentence hook, 120-160 chars. Doubles as the meta description.",
    },
    body: {
      type: "array",
      description: "Ordered content blocks. 700-1000 words total. 3-5 h2 sections; ul lists where they genuinely help.",
      items: {
        type: "object",
        properties: {
          t: { type: "string", enum: ["p", "h2", "h3", "ul"] },
          text: { type: "string", description: "The text for p/h2/h3 blocks. Empty string for ul blocks." },
          items: {
            type: "array",
            items: { type: "string" },
            description: "List items for ul blocks. Empty array for p/h2/h3 blocks.",
          },
        },
        required: ["t", "text", "items"],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "excerpt", "body"],
  additionalProperties: false,
};

function systemPrompt() {
  return `You write blog posts for the website of ${SITE_NAME}.
${VOICE_RULES}

APPROVED FACTS (the only concrete claims permitted):
${APPROVED_FACTS}

${CTA_GUIDANCE}`;
}

function userPrompt(topic, existingTitles) {
  return `Write one blog post.

Topic brief: ${topic.brief}

Length and shape: 700-1000 words total, as 3-5 h2 sections of 2-4 paragraphs each; use a ul list only where it genuinely helps. Return the COMPLETE post — every section, start to finish — as the body array. A body with a single paragraph is a failure.

Existing post titles on the blog (do NOT overlap with these in title or substance):
${existingTitles.map((t) => `- ${t}`).join("\n") || "- (none)"}`;
}

/**
 * The next writing assignment for an external writer (the CRM): the chosen
 * topic plus everything needed to run the model, and the current schedule so
 * the caller can slot the post.
 */
export async function buildAssignment() {
  const topic = await pickTopic();
  const all = await listPosts({ includeScheduled: true });
  return {
    topicKey: topic.key,
    model: MODEL,
    system: systemPrompt(),
    user: userPrompt(topic, all.map((p) => p.title)),
    schema: OUTPUT_SCHEMA,
    scheduledPublishAts: all
      .map((p) => p.publishAt)
      .filter((t) => new Date(t).getTime() > Date.now())
      .sort(),
    postCount: all.length,
  };
}

/* ─── Image selection — real jobsite photos only ────────────────────────── */

async function pickImages(topic) {
  const [pool, recent] = await Promise.all([getImagePool(), recentImages()]);
  const tag = topic.service?.galleryTag || pool[0]?.service;
  const byTag = pool.filter((g) => g.service === tag);
  // Not-recently-used images first, keeping pool order within each group.
  const freshFirst = (arr) => [
    ...arr.filter((g) => !recent.includes(g.image)),
    ...arr.filter((g) => recent.includes(g.image)),
  ];
  const pickFrom = freshFirst(byTag.length >= 2 ? byTag : pool);
  const hero = pickFrom[0] || pool[0];
  const inline = pickFrom.find((g) => g.image !== hero?.image) || null;
  return { hero, inline };
}

/* ─── Assembly ──────────────────────────────────────────────────────────── */

async function uniqueSlug(base) {
  let slug = base;
  for (let i = 2; await getPost(slug); i++) slug = `${base}-${i}`;
  return slug;
}

function wordCount(body) {
  return body
    .map((b) => (b.t === "ul" ? (b.items || []).join(" ") : b.text || ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Turn a model draft into a saved post: clean blocks, drop in real photos,
 * slot the publish date, mark the topic used. Shared by ingest (CRM-written
 * drafts) and the dormant on-site generator.
 */
export async function ingestDraft({ topicKey, draft, publishAt }) {
  if (!topicKey || !draft?.title || !Array.isArray(draft.body)) {
    throw new Error("ingest requires topicKey and a draft with title/body");
  }
  const pool = await buildTopicPool();
  const topic = pool.find((t) => t.key === topicKey);
  if (!topic) throw new Error(`Unknown topic key: ${topicKey}`);

  const { hero, inline } = await pickImages(topic);
  const body = draft.body
    .filter((b) => (b.t === "ul" ? (b.items || []).length : (b.text || "").trim()))
    .map((b) => (b.t === "ul" ? { t: "ul", items: b.items } : { t: b.t, text: b.text }));

  // The model occasionally returns a truncated body (one opening paragraph and
  // nothing else). Never let that land as a post — reject it so the writer
  // (CRM writer.ts) retries the assignment instead.
  const words = wordCount(body);
  const sections = body.filter((b) => b.t === "h2").length;
  if (words < MIN_WORDS || sections < MIN_SECTIONS) {
    throw new Error(
      `Draft rejected as truncated: ${words} words / ${sections} h2 sections (need ${MIN_WORDS}+ words and ${MIN_SECTIONS}+ sections) — retry the assignment`,
    );
  }

  // Drop a real jobsite photo in after the second h2, like the seed posts do.
  if (inline) {
    let h2Seen = 0;
    for (let i = 0; i < body.length; i++) {
      if (body[i].t === "h2" && ++h2Seen === 2) {
        body.splice(i, 0, { t: "img", image: inline.image, alt: inline.alt });
        break;
      }
    }
  }

  const at = publishAt || new Date().toISOString();
  const post = {
    slug: await uniqueSlug(slugify(draft.title)),
    title: draft.title,
    ...categoryFor(topic),
    city: topic.city,
    publishAt: at,
    date: at.slice(0, 10),
    dateDisplay: fmtDateDisplay(at),
    readMinutes: Math.max(2, Math.round(wordCount(body) / 220)),
    // A scaffolded site may have an empty image pool — post ships imageless.
    heroImage: hero?.image ?? null,
    heroAlt: hero?.alt ?? null,
    excerpt: draft.excerpt,
    body,
    source: "ai",
    createdAt: new Date().toISOString(),
    topicKey: topic.key,
  };

  await savePost(post);
  await markTopicUsed(topic.key);
  await pushRecentImages([hero?.image, inline?.image].filter(Boolean));
  return post;
}

/* ─── Dormant on-site writer (requires ANTHROPIC_API_KEY env; optional) ─── */

async function callClaude(assignment) {
  const apiKey = env("ANTHROPIC_API_KEY");
  if (!apiKey) throw new Error("On-site generation is off (no ANTHROPIC_API_KEY) — posts are written by the CRM");

  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: assignment.model,
      max_tokens: 16000,
      system: assignment.system,
      messages: [{ role: "user", content: assignment.user }],
      output_config: { format: { type: "json_schema", schema: assignment.schema } },
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = await res.json();
  if (json.stop_reason === "refusal") throw new Error("Model declined the request");
  const textBlock = (json.content || []).find((b) => b.type === "text");
  if (!textBlock) throw new Error("No text block in model response");
  return JSON.parse(textBlock.text);
}

export async function generateOne(publishAtIso) {
  const assignment = await buildAssignment();
  const draft = await callClaude(assignment);
  return ingestDraft({ topicKey: assignment.topicKey, draft, publishAt: publishAtIso });
}

/** Next open slot after everything scheduled (admin "generate now"). */
export async function generateNext(postsPerWeek) {
  const now = Date.now();
  const intervalMs = (7 / postsPerWeek) * 86400_000;
  const all = await listPosts({ includeScheduled: true });
  const lastScheduled = all
    .map((p) => new Date(p.publishAt).getTime())
    .filter((t) => t > now)
    .sort((a, b) => a - b)
    .pop();
  const slotMs = lastScheduled ? lastScheduled + intervalMs : now + 86400_000;
  const d = new Date(slotMs);
  const slot = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 15, 0, 0));
  return generateOne(slot.toISOString());
}
