import { useState, useRef } from "react";
import { Play, Star, ExternalLink, Phone } from "lucide-react";
import HorizontalSnap from "./ios/HorizontalSnap";
import { BRAND_VIDEO, CUSTOMER_VIDEOS } from "../data/videos";
import { SITE } from "../data/site";

/**
 * CustomerVideos — "What our customers say about us".
 *
 * Five customer testimonial videos (carried over verbatim from the
 * current WordPress site) plus the owner's Puget Sound brand intro.
 *
 * Behaviour rules:
 *   1. Nothing autoplays. Every video starts as a static <img poster> with
 *      a copper Play badge. The actual <video> element only mounts after
 *      the user clicks Play — this matters because the source files run
 *      30–115MB each and we never want a passive visitor to incur that
 *      bandwidth.
 *   2. Only one video plays at a time. Activating any other card pauses
 *      the previous one (managed by the `activeId` state).
 *   3. The brand intro's voiceover references "240 reviews" (recorded
 *      circa 2024). We overlay an UPDATED 2026 stat on the brand card so
 *      visitors see the current 479+ Google rating, regardless of what
 *      the voiceover says. Flagged via `voiceoverStale: true` in data.
 *   4. Mobile gets a snap-rail with dots. Desktop is a 5-up grid that
 *      drops to 3-up on tablet so cards never get postage-stamp small.
 */
export default function CustomerVideos() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section
      id="customer-videos"
      aria-label="Customer video testimonials"
      className="bg-[var(--color-royal-deep)] text-white py-section-mobile lg:py-[var(--space-section-md)] relative overflow-hidden"
      /* Anchor scrolls (#customer-videos) account for the fixed header so
         the eyebrow and headline don't tuck behind it. */
      style={{ scrollMarginTop: "calc(var(--safe-top) + 6rem)" }}
    >
      <div className="absolute inset-0 grain opacity-10" aria-hidden />

      <div className="relative max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)]">
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 lg:mb-14">
          <div className="lg:col-span-8">
            <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-3">
              In their own words
            </div>
            <h2 className="font-display-black uppercase text-display-sm lg:text-display-md leading-[0.95]">
              What our customers
              <br />
              <span className="text-[var(--color-copper)]">say about us.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex items-center gap-4 lg:justify-end">
            <div className="flex" aria-label={`${SITE.rating.value} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[var(--color-copper)] text-[var(--color-copper)]"
                />
              ))}
            </div>
            <div className="leading-tight">
              <div className="font-display-bold text-[26px] lg:text-[32px] tabular-nums">
                {SITE.rating.value.toFixed(1)}
              </div>
              <div className="text-white/65 text-[12px]">
                {SITE.rating.count}+ verified reviews
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURED BRAND VIDEO ───────────────────────────────── */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <h3 className="font-display-bold uppercase tracking-tight text-xl lg:text-2xl">
              {BRAND_VIDEO.title}
            </h3>
            <div className="hidden sm:block text-[11px] tracking-[0.22em] uppercase font-bold text-white/50">
              {BRAND_VIDEO.kicker} · 2 min
            </div>
          </div>
          <VideoCard
            video={BRAND_VIDEO}
            featured
            isActive={activeId === BRAND_VIDEO.id}
            onActivate={() => setActiveId(BRAND_VIDEO.id)}
            onDeactivate={() => setActiveId(null)}
          />
        </div>

        {/* ── TESTIMONIAL RAIL ───────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display-bold uppercase tracking-tight text-2xl lg:text-3xl">
              From homeowners across the Puget Sound.
            </h3>
            <a
              href={SITE.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-[12px] tracking-[0.18em] uppercase font-semibold text-white/70 hover:text-[var(--color-copper)] transition-colors"
            >
              All reviews on Google
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile rail */}
        <div className="lg:hidden">
          <HorizontalSnap>
            {CUSTOMER_VIDEOS.map((v) => (
              <div key={v.id} className="w-[78vw] max-w-[340px]">
                <VideoCard
                  video={v}
                  isActive={activeId === v.id}
                  onActivate={() => setActiveId(v.id)}
                  onDeactivate={() => setActiveId(null)}
                />
              </div>
            ))}
          </HorizontalSnap>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-5">
          {CUSTOMER_VIDEOS.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              isActive={activeId === v.id}
              onActivate={() => setActiveId(v.id)}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>

        <div className="mt-8 text-[12px] text-white/55 text-center lg:text-left">
          Real customers. Filmed on jobsites across the Puget Sound — no actors, no scripts.
        </div>
      </div>
    </section>
  );
}

/**
 * VideoCard — poster + Play badge until clicked, then real <video>.
 *
 * `featured` widens the card to a 16:9 hero. Without it, the card is
 * a vertical 4:5 portrait that fits 5-up on desktop.
 */
function VideoCard({ video, featured = false, isActive, onActivate, onDeactivate }) {
  const ref = useRef(null);

  const onPlayClick = () => {
    onActivate();
    /* Use rAF so the <video> element is mounted before we tell it to play. */
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.play().catch(() => {/* user gesture not granted yet — controls will allow */});
    });
  };

  const onEnded = () => onDeactivate();

  return (
    <article
      className={`group relative overflow-hidden rounded-[var(--radius-tile)] border border-white/10 bg-black ${
        /* Mobile gets a 4:3 ratio so vertical content (badges, mask,
           play target) has breathing room; desktop reverts to a wide
           16:9 cinema frame. */
        featured ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/5]"
      }`}
    >
      {isActive ? (
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="auto"
          onEnded={onEnded}
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      ) : null}

      {/* Bottom NAP mask — hides the legacy phone number watermark that's
          baked into every frame of the brand video, and replaces it with
          the canonical phone + current review count. Sits ABOVE the
          <video> element (z-10) so it stays visible during playback. */}
      {video.maskBottom && (
        <a
          href={SITE.phone.tel}
          className="haptic absolute inset-x-0 bottom-0 z-10 bg-[var(--color-royal-ink)] border-t-2 border-[var(--color-copper)] px-4 py-3 lg:py-4 flex items-center justify-between gap-3 text-white"
          aria-label={`Call ${SITE.phone.display}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--color-copper)] flex-shrink-0" />
            <div className="leading-tight min-w-0">
              <div className="font-display-bold tracking-tight text-[15px] lg:text-xl truncate">
                {SITE.phone.display}
              </div>
              <div className="text-[10px] lg:text-[11px] tracking-[0.18em] uppercase text-white/65 truncate">
                Free estimate · same-week scheduling
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-bold text-[var(--color-copper)] flex-shrink-0">
            <Star className="w-3 h-3 fill-[var(--color-copper)]" />
            {SITE.rating.value.toFixed(1)} · {SITE.rating.count}+ reviews
          </div>
        </a>
      )}

      {!isActive && (
        <>
          <img
            src={video.poster}
            alt={video.title || `${video.name} · ${video.city}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* dark scrim so the play button + caption always read */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/35"
            aria-hidden
          />

          {/* "Updated 2026" stat badge — brand video only. Voiceover
              references an older review count; this overlay keeps the
              social proof current without re-recording. */}
          {video.voiceoverStale && (
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3">
              <div className="bg-[var(--color-copper)] text-white text-[10px] tracking-[0.25em] uppercase font-bold px-3 py-1.5 rounded-full">
                Updated 2026
              </div>
              <div className="text-white text-[12px] font-display-bold tracking-tight bg-black/55 backdrop-blur px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Star className="w-3 h-3 fill-[var(--color-copper)] text-[var(--color-copper)]" />
                {SITE.rating.value.toFixed(1)} · {SITE.rating.count}+ reviews
              </div>
            </div>
          )}

          {/* Play target — covers the whole card so the entire poster is tappable */}
          <button
            type="button"
            onClick={onPlayClick}
            aria-label={`Play video: ${video.title || video.name}`}
            className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-copper)]"
          >
            <span
              className={`flex items-center justify-center bg-[var(--color-copper)] text-white rounded-full shadow-[0_18px_36px_-10px_oklch(0.62_0.10_42_/_0.7)] transition-transform duration-300 group-hover:scale-110 ${
                featured ? "w-20 h-20 lg:w-24 lg:h-24" : "w-14 h-14"
              }`}
            >
              <Play className={featured ? "w-9 h-9 lg:w-10 lg:h-10 ml-1.5" : "w-6 h-6 ml-0.5"} fill="currentColor" />
            </span>
          </button>

          {/* Bottom caption — only renders when there's no NAP mask, since
              the mask already serves as the bottom slab. With a mask, the
              title moves OUTSIDE the card (above it), keeping the poster
              uncluttered. */}
          {!video.maskBottom && (
          <div
            className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 pointer-events-none"
          >
            {video.kicker && (
              <div className="text-[var(--color-copper)] text-[10px] tracking-[0.28em] uppercase font-bold mb-1.5">
                {video.kicker}
              </div>
            )}
            <div
              className={`font-display-bold uppercase tracking-tight text-white ${
                featured ? "text-xl lg:text-3xl leading-[1.05]" : "text-[15px] leading-tight"
              }`}
            >
              {video.title || video.name}
            </div>
            {video.blurb && featured && (
              <div className="text-white/75 text-[13px] lg:text-sm mt-2 max-w-md">
                {video.blurb}
              </div>
            )}
            {video.city && !featured && (
              <div className="text-white/55 text-[10px] tracking-[0.22em] uppercase font-bold mt-1.5">
                {video.city}
              </div>
            )}
          </div>
          )}
        </>
      )}
    </article>
  );
}
