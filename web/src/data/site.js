/*
 * Single source of truth for NAP and business constants.
 * Anywhere in the app that needs the phone, address, year, or hours
 * imports from this file. NEVER hard-code these values elsewhere.
 */

/* Canonical numbers used anywhere on the site. Owner-confirmed values:
 *  - 21+ years in business (LLC founded ~2005)
 *  - 479 Google reviews
 *  - 5.0 ★ Google rating
 *  - 6 counties served
 *  - lifetime install count: not yet confirmed, displays as "Thousands"
 *
 * Single source of truth — never hard-code these elsewhere. */
export const SITE = {
  name: "Seamless Gutters 4 Less",
  legalName: "Seamless Gutters 4 Less, LLC",
  founded: 2005,
  yearsInBusiness: () => new Date().getFullYear() - 2005,
  /* Display string used for "21+ years in business" copy. Floors down to a
   * round bracket so the number doesn't tick up mid-year and look off. */
  yearsDisplay: () => {
    const yrs = new Date().getFullYear() - 2005;
    return `${yrs}+`;
  },
  /* Approximate lifetime install count — flagged for owner confirmation.
   * Replace with a real number when known. The TrustStack falls back to
   * "1,000+" when this is null so the visual rhythm is preserved. */
  installsApprox: "1,000+",
  installsCount: null,

  phone: {
    display: "(253) 498-5575",
    tel: "tel:+12534985575",
    sms: "sms:+12534985575",
    raw: "+12534985575",
  },
  email: "info@seamlessgutters4less.com",

  address: {
    locality: "Tacoma",
    region: "WA",
    regionFull: "Washington",
    country: "US",
  },

  hours: {
    weekdays: { open: "07:00", close: "18:00" },
    saturday: { open: "08:00", close: "16:00" },
    sunday: null,
  },

  rating: {
    value: 5.0,
    /* Live count from Doug's Google Business profile (via Trustindex
     * aggregation, refreshed 2026-05-13). Trustindex pulls directly from
     * Google's API so this matches the count on the public listing. */
    count: 496,
    source: "Google",
  },

  social: {
    google: "https://g.page/seamlessgutters4less",
    facebook: "",
    instagram: "",
  },

  website: "https://www.seamlessgutters4less.com",
  description:
    "Veteran-owned seamless gutter installation, replacement, guards & repairs across the Puget Sound. Same-week estimates in 6 WA counties. Call (253) 498-5575.",

  /* Primary service cities — where Doug runs the majority of his book. Used
   * for top-of-funnel positioning copy (hero subhead, footer, schema) and
   * service-area page sequencing. Order matters: Tacoma is the home city,
   * Gig Harbor is the second-strongest market. */
  primaryCities: ["Tacoma", "Gig Harbor"],

  /* Counties served, ordered by current install volume. Pierce sits first
   * because the bulk of jobs are anchored in Tacoma + Gig Harbor; the
   * north-Sound counties (King, Snohomish) are still part of the service
   * area but represent secondary volume. */
  countiesServed: [
    "Pierce County",
    "King County",
    "Snohomish County",
    "Thurston County",
    "Kitsap County",
    "Mason County",
  ],

  /* WA Department of Labor & Industries contractor license number.
   * Confirmed from Doug's public Google Business profile listing on
   * 2026-05-13. Verify at https://secure.lni.wa.gov/verify/ if the
   * status needs to be re-checked. */
  license: "SEAMLG4754KO",

  promise:
    "Seamless gutters built for Pacific Northwest rain — installed fast, priced fair, backed by two decades on the ladder.",

  tagline: "Quality Protection. Seamless Results. Always 4 Less.",
};
