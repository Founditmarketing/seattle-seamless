import { createContext, useContext } from "react";

/*
 * Head collection for the build-time prerender (scripts/prerender.mjs).
 *
 * The app is a client-rendered SPA: PageSEO sets <title>/description/
 * canonical inside an effect, and SchemaJsonLd appends its JSON-LD to
 * document.head inside an effect. Effects don't run during
 * renderToString, so a naively prerendered page would ship the body copy
 * but the generic index.html <head> — every route claiming the homepage's
 * title and canonical, which is worse than no prerender at all.
 *
 * So during SSR we wrap the tree in a collector. PageSEO and SchemaJsonLd
 * check for one and, when present, record what they would have written to
 * the DOM. This is the approach react-helmet uses: a single-pass
 * renderToString makes the write safe, and on the client the collector is
 * null so the effects behave exactly as they did before.
 *
 * The collector hands out METHODS rather than a bare object to mutate.
 * Assigning to a field of a value returned from a hook trips
 * react-hooks/immutability (and is a genuinely bad habit in a codebase
 * that may later turn on the React Compiler); calling a method the
 * collector closed over at construction is equivalent here and honest
 * about the fact that this is a write-only sink for the build.
 *
 * Deliberately dumb — last title wins, schemas accumulate in render
 * order. Exactly one PageSEO renders per route.
 */
export const HeadCollectorContext = createContext(null);

export function createHeadCollector() {
  const state = { meta: null, schemas: [] };
  return {
    state,
    setMeta(meta) {
      state.meta = meta;
    },
    addSchemas(entries) {
      state.schemas.push(...entries);
    },
  };
}

export function useHeadCollector() {
  return useContext(HeadCollectorContext);
}
