import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useHeadCollector } from "../lib/ssrHead";

/*
 * Per-route <head> tags (title, description, canonical, OG/Twitter) as a
 * component rather than a bare hook call, so every page's SEO tags are
 * grep-able and visually obvious in JSX. Delegates to useDocumentMeta —
 * see that file for the actual DOM work.
 *
 * Under the build-time prerender there is no DOM and effects never fire,
 * so we also hand the values to the head collector (lib/ssrHead.js) during
 * render. On the client the collector is null and nothing changes.
 */
export default function PageSEO({ title, description, path }) {
  const collector = useHeadCollector();
  if (collector) collector.setMeta({ title, description, path });

  useDocumentMeta({ title, description, path });
  return null;
}
