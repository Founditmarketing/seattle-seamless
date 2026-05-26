/*
 * Customer video data.
 *
 * Five video testimonials carried over from the current WordPress site,
 * plus one brand intro video.
 *
 * Cities are owner-confirmed (Doug, 2026-05-13). Names remain a placeholder
 * ("Customer testimonial") until Doug provides the real first names; the
 * component will still read clearly with city-only since 3 of the 5 are
 * in Pierce County and reinforce the primary service-area positioning.
 *
 * Brand video known issues (carried over from current WordPress site):
 *   - Voiceover references "240 reviews" — current count is 479+.
 *   - Bottom watermark is permanently baked into every frame with
 *     phone number (206) 533-3355, which is NOT the canonical number.
 *     The canonical is (253) 498-5575 (see SITE.phone.display).
 *
 * `maskBottom: true` tells CustomerVideos to overlay an opaque NAP band
 * across the bottom ~22% of the card. That hides the wrong number both
 * in the poster and during playback, and replaces it with the canonical
 * number + current 479+ review count. Action item for the owner: re-
 * record the brand video with correct NAP + review count, then drop the
 * mask.
 */

export const BRAND_VIDEO = {
  id: "brand",
  src:    "/videos/brand.mp4",
  poster: "/videos/posters/brand.jpg",
  kicker: "Our Story",
  title:  "Pacific Northwest gutters, built right.",
  blurb:  "Two minutes on who we are, why we started, and how we work.",
  voiceoverStale: true,
  maskBottom:     true,
};

export const CUSTOMER_VIDEOS = [
  {
    id:     "testimonial-1",
    src:    "/videos/testimonial-1.mp4",
    poster: "/videos/posters/testimonial-1.jpg",
    name:   "Customer testimonial",
    city:   "Federal Way, WA",
  },
  {
    id:     "testimonial-2",
    src:    "/videos/testimonial-2.mp4",
    poster: "/videos/posters/testimonial-2.jpg",
    name:   "Customer testimonial",
    city:   "Maple Valley, WA",
  },
  {
    id:     "testimonial-3",
    src:    "/videos/testimonial-3.mp4",
    poster: "/videos/posters/testimonial-3.jpg",
    name:   "Customer testimonial",
    city:   "Buckley, WA",
  },
  {
    id:     "testimonial-4",
    src:    "/videos/testimonial-4.mp4",
    poster: "/videos/posters/testimonial-4.jpg",
    name:   "Customer testimonial",
    city:   "Graham, WA",
  },
  {
    id:     "testimonial-5",
    src:    "/videos/testimonial-5.mp4",
    poster: "/videos/posters/testimonial-5.jpg",
    name:   "Customer testimonial",
    city:   "Tacoma, WA",
  },
];
