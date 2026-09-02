import { useEffect, useState } from "react";

/*
 * Published blog posts, fetched once per page load from /api/blog/list
 * (the blog store behind api/blog/_lib.js — posts are written and scheduled
 * by the Found-IT CRM). Module-level cache so the index page and a post page
 * opened from it share one request.
 */

let cache = null;
let inflight = null;

async function fetchPosts() {
  if (cache) return cache;
  if (!inflight) {
    inflight = fetch("/api/blog/list")
      .then((r) => {
        if (!r.ok) throw new Error(`blog list HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        cache = Array.isArray(j.posts) ? j.posts : [];
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export default function useBlogPosts() {
  const [state, setState] = useState(() => ({
    posts: cache || [],
    loading: !cache,
    error: null,
  }));

  useEffect(() => {
    if (cache) return;
    let alive = true;
    fetchPosts()
      .then((posts) => alive && setState({ posts, loading: false, error: null }))
      .catch((e) => alive && setState({ posts: [], loading: false, error: e }));
    return () => {
      alive = false;
    };
  }, []);

  return state;
}
