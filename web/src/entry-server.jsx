import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { HeadCollectorContext, createHeadCollector } from "./lib/ssrHead";

/*
 * Build-time prerender entry. Not a server — nothing runs this at request
 * time. scripts/prerender.mjs imports it once per route during the build
 * and writes the result to dist/<route>/index.html.
 *
 * Returns the body HTML plus whatever PageSEO and SchemaJsonLd recorded
 * while rendering, so the prerender script can write a real <head> for
 * each route instead of leaving every page with index.html's homepage
 * title and canonical.
 */
export function render(url) {
  const collector = createHeadCollector();

  const html = renderToString(
    <HeadCollectorContext.Provider value={collector}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HeadCollectorContext.Provider>,
  );

  return { html, meta: collector.state.meta, schemas: collector.state.schemas };
}
