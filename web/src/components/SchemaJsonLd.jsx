import { useEffect } from "react";
import { useHeadCollector } from "../lib/ssrHead";

/*
 * Renders one or more JSON-LD blobs into <head>. Accepts a single object or
 * an array of objects. Each blob is keyed by its index and removed on unmount.
 *
 * Under the build-time prerender the effect never runs, so the blobs are
 * handed to the head collector (lib/ssrHead.js) instead and written into
 * the static HTML by scripts/prerender.mjs. Structured data that only
 * exists after JS executes is invisible to every crawler that doesn't run
 * JS, which is most of the AI answer engines.
 */
export default function SchemaJsonLd({ data, id }) {
  const collector = useHeadCollector();
  if (collector) {
    const blobs = Array.isArray(data) ? data : [data];
    collector.addSchemas(
      blobs.map((blob, i) => ({ id: `${id || "sg4l"}-${i}`, blob })),
    );
  }

  useEffect(() => {
    /* The prerendered <head> already carries a static copy of this route's
     * schema (scripts/prerender.mjs). Once React is driving the page it
     * owns these tags, so drop the static set first — otherwise a crawler
     * that DOES execute JS finds every node twice, including duplicate
     * FAQPage and Review entries sharing one @id. Idempotent: after the
     * first mount there's nothing left to remove. */
    document
      .querySelectorAll('script[type="application/ld+json"][data-prerendered="1"]')
      .forEach((n) => n.remove());

    const blobs = Array.isArray(data) ? data : [data];
    const nodes = blobs.map((blob, i) => {
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.dataset.schema = `${id || "sg4l"}-${i}`;
      tag.textContent = JSON.stringify(blob);
      document.head.appendChild(tag);
      return tag;
    });
    return () => nodes.forEach((n) => n.remove());
  }, [data, id]);
  return null;
}
