/*
 * Cities served. Used by the homepage marquee, the footer "Top Service Areas"
 * column, and the service-area landing page templates.
 *
 * `tier` corresponds to install volume + SEO priority. Tier 1 ships first
 * (service-area pages, footer prominence, schema). Tier 2 is supporting
 * coverage; tier 3 is outer service area.
 *
 * The order reflects Doug's actual book of work — Tacoma + Gig Harbor +
 * the Pierce County corridor are where the majority of installs happen,
 * so they lead. North-Sound markets are still served but represent
 * secondary volume and rank below.
 */

export const CITIES = [
  // Tier 1 — Pierce County primary markets (Doug's home base)
  { name: "Tacoma",           county: "Pierce",        tier: 1 },
  { name: "Gig Harbor",       county: "Pierce",        tier: 1 },
  { name: "Puyallup",         county: "Pierce",        tier: 1 },
  { name: "University Place", county: "Pierce",        tier: 1 },
  { name: "Lakewood",         county: "Pierce",        tier: 1 },
  { name: "Bonney Lake",      county: "Pierce",        tier: 1 },
  { name: "Spanaway",         county: "Pierce",        tier: 1 },
  { name: "Buckley",          county: "Pierce",        tier: 1 },
  { name: "Graham",           county: "Pierce",        tier: 1 },
  { name: "Roy",              county: "Pierce",        tier: 1 },

  // Tier 2 — North Sound (Eastside + close-in north suburbs)
  { name: "Bellevue",         county: "King",          tier: 2 },
  { name: "Kirkland",         county: "King",          tier: 2 },
  { name: "Redmond",          county: "King",          tier: 2 },
  { name: "Bothell",          county: "King/Snohomish", tier: 2 },
  { name: "Mill Creek",       county: "Snohomish",     tier: 2 },
  { name: "Edmonds",          county: "Snohomish",     tier: 2 },
  { name: "Mukilteo",         county: "Snohomish",     tier: 2 },
  { name: "Lynnwood",         county: "Snohomish",     tier: 2 },
  { name: "Mercer Island",    county: "King",          tier: 2 },
  { name: "Sammamish",        county: "King",          tier: 2 },

  // Tier 3 — Outer service area, grouped by county for readability.
  // Doug works these markets but they represent secondary volume vs. the
  // Pierce-anchored Tier 1 cities above.
  { name: "Everett",          county: "Snohomish",     tier: 3 },
  { name: "Marysville",       county: "Snohomish",     tier: 3 },
  { name: "Lake Stevens",     county: "Snohomish",     tier: 3 },
  { name: "Snohomish",        county: "Snohomish",     tier: 3 },
  { name: "Monroe",           county: "Snohomish",     tier: 3 },
  { name: "Issaquah",         county: "King",          tier: 3 },
  { name: "Woodinville",      county: "King",          tier: 3 },
  { name: "Shoreline",        county: "King",          tier: 3 },
  { name: "Covington",        county: "King",          tier: 3 },
  { name: "North Bend",       county: "King",          tier: 3 },
  { name: "Olympia",          county: "Thurston",      tier: 3 },
  { name: "Bremerton",        county: "Kitsap",        tier: 3 },
  { name: "Silverdale",       county: "Kitsap",        tier: 3 },
  { name: "Port Orchard",     county: "Kitsap",        tier: 3 },
  { name: "Kingston",         county: "Kitsap",        tier: 3 },
  { name: "Shelton",          county: "Mason",         tier: 3 },
  { name: "Belfair",          county: "Mason",         tier: 3 },
];

/* Cities surfaced in the footer "Top Service Areas" column. Order is the
 * order they're displayed in. Lead with Pierce since that's our primary
 * service area, then the strongest north-Sound markets we want to rank for. */
export const TOP_FOOTER_CITIES = [
  "Tacoma",
  "Gig Harbor",
  "Puyallup",
  "University Place",
  "Lakewood",
  "Bonney Lake",
  "Bellevue",
  "Edmonds",
  "Bothell",
  "Mill Creek",
];

/* Recent / currently-booking cities used by the home-page activity rail.
 * Rotated occasionally to keep the surface fresh. */
export const NOW_BOOKING = ["Tacoma", "Gig Harbor", "Puyallup"];
