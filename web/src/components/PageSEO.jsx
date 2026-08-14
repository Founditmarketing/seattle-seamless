import { useDocumentMeta } from "../hooks/useDocumentMeta";

/*
 * Per-route <head> tags (title, description, canonical, OG/Twitter) as a
 * component rather than a bare hook call, so every page's SEO tags are
 * grep-able and visually obvious in JSX. Delegates to useDocumentMeta —
 * see that file for the actual DOM work.
 */
export default function PageSEO({ title, description, path }) {
  useDocumentMeta({ title, description, path });
  return null;
}
