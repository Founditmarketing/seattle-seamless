import { useEffect } from "react";
import { SITE } from "../data/site";

/*
 * Per-route <head> management for the SPA.
 *
 * This is a single-page app: without this hook every route inherits the
 * static <title>, <meta name="description">, and <link rel="canonical"> from
 * index.html. That means Google and AI answer engines see one title and one
 * canonical for the whole site — so service pages can't rank for their own
 * terms (e.g. "gutter installation Tacoma") and duplicate-canonical signals
 * bleed across routes.
 *
 * The hook sets three things on mount / when its inputs change:
 *   - document.title
 *   - <meta name="description">        (created if absent)
 *   - <link rel="canonical">           (created if absent)
 *   - Open Graph title/description/url (kept in sync for social + some crawlers)
 *
 * `path` should be the route's canonical path with a trailing slash, e.g.
 * "/services/gutter-guards/". Pass "/" for the homepage.
 */
export function useDocumentMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector, attr, attrValue, content) => {
      if (!content) return;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    if (title) {
      setMeta('meta[property="og:title"]', "property", "og:title", title);
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    }

    if (path) {
      const url = `${SITE.website}${path}`;
      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
      setMeta('meta[property="og:url"]', "property", "og:url", url);
    }
  }, [title, description, path]);
}
