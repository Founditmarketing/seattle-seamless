import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import ResponsiveImg from "../components/atoms/ResponsiveImg";
import SchemaJsonLd from "../components/SchemaJsonLd";
import PageSEO from "../components/PageSEO";
import { localBusinessSchema, breadcrumbSchema } from "../lib/schema";
import useBlogPosts from "../hooks/useBlogPosts";
import { SITE } from "../data/site";

/*
 * Blog index — every PUBLISHED post as a card, newest first. Posts come from
 * /api/blog/list (see api/blog/); they're written and scheduled by the
 * Found-IT CRM, so there is nothing to edit in this repo to add a post.
 */
export default function BlogPage() {
  const { posts, loading, error } = useBlogPosts();
  const schemas = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
    ]),
  ];

  return (
    <>
      <PageSEO
        title={`Gutter Blog — Puget Sound Guides & Straight Talk — ${SITE.name}`}
        description={`Local guides and straight talk on seamless gutters, guards, cleaning, and fascia repair across Tacoma and the Puget Sound — written by the veteran-owned crew that does the work. Call ${SITE.phone.display}.`}
        path="/blog/"
      />
      <SchemaJsonLd data={schemas} id="blog" />

      <PageHero
        eyebrow="Blog"
        title="Gutter know-how from around the Sound."
        accent="around the Sound."
        lead="Local guides and straight talk on gutter installation, guards, cleaning, and fascia repair across Tacoma and the Puget Sound — written by the crew that does the work."
        image="service-install-real"
        imageAlt="Fresh white seamless gutter with mounting bracket along a residential roofline."
        chips={[
          "Veteran-Owned",
          `${SITE.yearsDisplay()} years`,
          `${SITE.rating.value.toFixed(1)} ★ Google`,
          `${SITE.countiesServed.length} counties`,
        ]}
      />

      <section className="py-section-mobile lg:py-[var(--space-section-md)]">
        <div className="max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" aria-hidden>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-tile)] overflow-hidden"
                >
                  <div className="aspect-[16/10] bg-[var(--color-line)]/40" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-1/3 bg-[var(--color-line)]/60 rounded" />
                    <div className="h-5 w-4/5 bg-[var(--color-line)]/60 rounded" />
                    <div className="h-3 w-full bg-[var(--color-line)]/40 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="max-w-xl mx-auto text-center py-10">
              <h2 className="font-display-bold text-2xl text-[var(--color-royal)] mb-3">
                {error ? "The blog is taking a breather." : "First posts are on the way."}
              </h2>
              <p className="text-[var(--color-slate)]/70 leading-relaxed">
                {error
                  ? "We couldn't load the latest posts just now. Try again in a minute."
                  : "New guides for Puget Sound homeowners land here every week."}{" "}
                Need a gutter answer today? Call or text{" "}
                <a href={SITE.phone.tel} className="text-[var(--color-copper)] font-semibold">
                  {SITE.phone.display}
                </a>
                .
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}/`}
                className="haptic group flex flex-col bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-tile)] overflow-hidden hover:border-[var(--color-copper)]/50 transition-colors"
              >
                {post.heroImage && (
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--color-royal)]">
                    <ResponsiveImg
                      base={post.heroImage}
                      alt={post.heroAlt || ""}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--color-slate)]/55 mb-3">
                    <span className="inline-flex items-center gap-1 text-[var(--color-copper)] font-semibold uppercase tracking-[0.14em]">
                      <MapPin className="w-3.5 h-3.5" /> {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.dateDisplay}
                    </span>
                  </div>
                  <h2 className="font-display-bold text-xl text-[var(--color-royal)] leading-tight tracking-tight mb-3">
                    {post.title}
                  </h2>
                  <p className="text-[var(--color-slate)]/70 text-[14.5px] leading-relaxed mb-5">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[var(--color-royal)] group-hover:text-[var(--color-copper)] font-semibold text-sm transition-colors">
                    Read article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
