/**
 * TradeStamp — generic third-party / state-issued credential seal.
 *
 * Renders any of the optimized trade-stamp PNG/WebP variants produced by
 * scripts/gen-trade-stamps.mjs. Picks the right source resolution for the
 * displayed size and ships .webp first with a .png fallback so older Safari
 * builds still render cleanly.
 *
 * Treat each stamp like a license number: it's a verifiable third-party
 * trust signal, not a marketing graphic. Show sparingly and with honest
 * alt text. Three stamps are currently configured below; add a new entry
 * to STAMPS to wire up a new credential.
 */

/* `w`/`h` are the intrinsic pixel dimensions of each source image. They're
 * used for the correct display aspect ratio in `fluid` mode (and to reserve
 * layout space so the image doesn't cause a shift as it loads). Several of
 * these stamps are NOT square \u2014 the veteran seal is 240\u00d7198 and the
 * satisfaction badge is 240\u00d7228 \u2014 so anything that renders them must respect
 * the ratio rather than forcing a square box. */
const STAMPS = {
  "wa-veteran-certified": {
    base: "/wa-veteran-certified",
    alt:  "Washington Certified Veteran-Owned Business \u2014 state-issued credential",
    w: 240, h: 198,
  },
  "veteran-owned-business": {
    base: "/veteran-owned-business",
    alt:  "Veteran-Owned Business",
  },
  "google-5-star-rating": {
    base: "/google-5-star-rating",
    alt:  "5-Star Rating on Google",
    w: 1203, h: 1206,
  },
  "satisfaction-guarantee": {
    base: "/satisfaction-guarantee",
    alt:  "100% Satisfaction Guaranteed",
    w: 240, h: 228,
  },
};

const SIZE_MAP = {
  /* Each entry maps to a CSS pixel display width. We ship two source
   * widths (240 and 480) and pick the larger one whenever the displayed
   * size exceeds 240, so retina screens stay sharp. */
  sm: 44,
  md: 112,
  lg: 180,
  xl: 220,
};

export default function TradeStamp({ name, size = "sm", alt, className = "", fluid = false }) {
  const config = STAMPS[name];
  if (!config) {
    if (typeof console !== "undefined") {
      console.warn(`TradeStamp: unknown name "${name}"`);
    }
    return null;
  }

  const displayed = SIZE_MAP[size] || SIZE_MAP.sm;

  /* Fluid mode: the PARENT owns the box. The image fills 100% of the width it
   * is given and takes its height from the intrinsic aspect ratio (via the
   * width/height attributes), so it can never be squished into a square.
   * The hero badge row uses this so three stamps of different ratios line up
   * at one height and scale to fit their column. Ships the 480 source since
   * the fluid display width is unknown and may hit retina. */
  if (fluid) {
    const w = config.w || 1;
    const h = config.h || 1;
    const fluidImgStyle = { width: "100%", height: "auto" };
    if (name === "google-5-star-rating") {
      return (
        <img
          src="/google_transparent.png"
          alt={alt || config.alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          className={`block ${className}`}
          style={fluidImgStyle}
        />
      );
    }
    return (
      <picture className={className} style={{ display: "block", width: "100%" }}>
        <source srcSet={`${config.base}-480.webp`} type="image/webp" />
        <img
          src={`${config.base}-480.png`}
          alt={alt || config.alt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          className="block"
          style={fluidImgStyle}
        />
      </picture>
    );
  }

  if (name === "google-5-star-rating") {
    return (
      <img
        src="/google_transparent.png"
        alt={alt || config.alt}
        width={displayed}
        height={displayed}
        loading="lazy"
        decoding="async"
        className={`block ${className}`}
        style={{ width: displayed, height: displayed }}
      />
    );
  }

  const useLargeSrc = displayed > 240;
  const base = useLargeSrc ? `${config.base}-480` : `${config.base}-240`;

  return (
    <picture className={className}>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.png`}
        alt={alt || config.alt}
        width={displayed}
        height={displayed}
        loading="lazy"
        decoding="async"
        className="block"
        style={{ width: displayed, height: displayed }}
      />
    </picture>
  );
}

/* Convenience export so existing imports of WAVeteranSeal keep working
 * without a wholesale rename across the app. New code should prefer
 * `<TradeStamp name="wa-veteran-certified" .../>` directly. */
export function WAVeteranSeal(props) {
  return <TradeStamp {...props} name="wa-veteran-certified" />;
}
