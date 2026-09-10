/*
 * Service-area landing pages — one per Tier 1 and Tier 2 city
 * (sg4l-plan.md §7).
 *
 * URL shape follows the plan: /service-areas/[county]/[city]/, with a
 * county hub at /service-areas/[county]/ and a top-level hub at
 * /service-areas/. Nesting the county keeps the door open for the
 * [city]/[service] matrix the plan wants later without re-cutting URLs.
 *
 * WHICH CITIES: data/cities.js tiers 1 and 2 — 10 Pierce County markets
 * (tier 1, Doug's core book of work) plus 10 North Sound markets across
 * King and Snohomish (tier 2). Note that sg4l-plan.md §7 lists a DIFFERENT
 * tier 1, the 17 north-Seattle / Eastside cities from the original brief;
 * cities.js is the corrected, later source of truth and its header says
 * tier 1 ships service-area pages first, so we follow the data, not the
 * plan doc. Tier 3 (17 outer Thurston / Kitsap / Mason cities) is what
 * remains, and is genuinely lower value — thinner demand, and we'd be
 * stretching for things that are true and specific about each town.
 * Consider the plan's [city]/[service] matrix for the strongest markets
 * before grinding out tier 3.
 *
 * CONTENT RULES — read before adding a city:
 *   1. Every claim here must be TRUE. Housing stock, geography, tree cover,
 *      and landmarks are real-world facts about the city and are safe.
 *      Job counts, "we installed X here last month", named past customers,
 *      and pricing are NOT — we don't have that data, so we don't say it.
 *   2. Coverage phrasing only ("we serve", "our crews cover"), never
 *      fabricated project history ("we did 40 homes in Proctor").
 *   3. No dollar figures. Pricing depends on linear footage, stories, and
 *      material — the FAQ says exactly that instead of inventing a range.
 *   4. Thin, city-name-swapped copy gets penalized. Each `homes` and
 *      `climate` block must say something that is only true of that city.
 *
 * `photoCity` is the value a gallery entry's `city` field must match for
 * its photo to surface on this page. No gallery entry carries `city` yet
 * (owner is confirming locations) — until one does, the photo section
 * falls back to the general gallery and links out to /gallery/.
 */

/* Extension is explicit — scripts/gen-sitemap.mjs imports this file with
 * raw Node ESM, which (unlike Vite) does not resolve extensionless paths. */
import { SITE } from "./site.js";

export const COUNTY_SLUG = {
  Pierce: "pierce-county",
};

export const SERVICE_AREAS = [
  {
    slug: "tacoma",
    name: "Tacoma",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Tacoma",
    metaTitle: "Seamless Gutter Installation in Tacoma, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters installed, replaced, and guarded across Tacoma — North End, Proctor, Stadium District, and the South End. Veteran-owned, WA licensed. Call (253) 498-5575.",
    lead:
      "Tacoma is our home city. Our shop is here, our trucks start here, and most mornings a crew is somewhere between Point Defiance and South Tacoma forming gutters on a driveway.",
    areas: [
      "North End",
      "Proctor District",
      "Stadium District",
      "Old Town",
      "Hilltop",
      "South Tacoma",
      "Point Defiance",
      "Ruston",
    ],
    homes:
      "Tacoma's housing stock is older than almost anywhere else in Pierce County, and it shows up in the gutter work. The North End, Proctor, and the Stadium District are full of early-1900s Craftsman bungalows and Foursquares with steep roof pitches, deep overhangs, and original cedar fascia behind the gutter line. Those homes were often fitted with narrow 5-inch sectional gutters that were never sized for a Pacific Northwest downpour, and the seams are usually where the failure starts. Head south and the pattern flips: the South End and South Tacoma run heavily to mid-century ranches with long, low, straight rooflines — easy runs to form seamlessly, but the shallow pitch means slope and hanger spacing have to be right or water sits in the trough.",
    climate:
      "Two things make Tacoma hard on gutters. First, the tree canopy — the North End and the neighborhoods ringing Point Defiance sit under mature big-leaf maple and Douglas fir, which means leaf litter in the fall and needle drop essentially year-round. Second, proximity to salt water. Homes along Ruston Way, Old Town, and the bluff above Commencement Bay get steady salt air, which is exactly the environment where cheap fasteners and untreated fascia give out early.",
    issues: [
      "Original sectional gutters on century-old homes, leaking at every seam",
      "Undersized 5-inch troughs that overflow in a hard Puget Sound rain",
      "Rotted cedar fascia hidden behind the gutter on pre-war houses",
      "Constant needle and leaf load under the North End's mature canopy",
    ],
    nearby: ["university-place", "lakewood", "puyallup"],
  },
  {
    slug: "gig-harbor",
    name: "Gig Harbor",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Gig Harbor",
    metaTitle: "Seamless Gutter Installation in Gig Harbor, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation, replacement, and guards in Gig Harbor and across the peninsula. Waterfront and wooded-lot specialists. Call (253) 498-5575.",
    lead:
      "Gig Harbor is our second-strongest market and a short run across the Narrows Bridge. Between the waterfront, the Canterwood side, and the wooded lots out on the peninsula, it's three different gutter problems in one city.",
    areas: [
      "Historic downtown waterfront",
      "Gig Harbor North",
      "Canterwood",
      "Rosedale",
      "Artondale",
      "Crescent Valley",
    ],
    homes:
      "The harbor itself is ringed by older cottages and remodeled waterfront homes where the roofline runs right down to a view — gutters there have to work without visually cutting the sightline, and downspouts need somewhere to go on a lot that drops toward the water. Up the hill, Gig Harbor North and Canterwood are dominated by 1990s and 2000s builds with the complex, cut-up rooflines that era favored: multiple gables, dormers, and valleys that dump a disproportionate volume of water into a very short run of gutter. Those homes routinely need more downspouts than they were originally built with, not bigger gutters. Out toward Rosedale and Artondale, larger wooded parcels mean tall two-story elevations and long ladder work.",
    climate:
      "Gig Harbor gets it from both directions. Homes on or near the water take salt air off Puget Sound, which shortens the life of low-grade hangers and fasteners. Everything set back from the water sits under dense second-growth Douglas fir and cedar — the peninsula is genuinely heavily treed — so needle drop is relentless and gutter guards do more work here than in most of the county.",
    issues: [
      "Complex 90s and 2000s rooflines with too few downspouts for the volume they shed",
      "Salt-air corrosion on waterfront hangers and fasteners",
      "Heavy fir and cedar needle load on peninsula lots",
      "Steep, sloped lots where downspout runoff has to be routed away from the foundation",
    ],
    nearby: ["tacoma", "university-place"],
  },
  {
    slug: "puyallup",
    name: "Puyallup",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Puyallup",
    metaTitle: "Seamless Gutter Installation in Puyallup, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters for Puyallup — South Hill subdivisions and valley-floor homes alike. Installation, replacement, guards, and fascia repair. Call (253) 498-5575.",
    lead:
      "Puyallup is really two service areas stacked on top of each other: the valley floor around downtown and the Fairgrounds, and South Hill about five hundred feet above it. The gutter work is different on each.",
    areas: [
      "Downtown Puyallup",
      "South Hill",
      "Pioneer Park",
      "Sunrise",
      "Firgrove",
      "Puyallup Valley",
    ],
    homes:
      "Downtown and the streets around Pioneer Park hold Puyallup's oldest housing — Victorian-era and early-1900s homes with steep pitches, decorative trim, and fascia detail that a careless gutter crew will damage on the way to hanging a run. The valley floor mixes those with post-war stock and farm properties left from the valley's agricultural years, where outbuildings and shops need drainage every bit as much as the house does. South Hill is the opposite story: large 1980s-through-2000s subdivisions, two-story homes, multi-gable rooflines, and the tract-built gutter systems that came with them, which are now hitting the age where hangers pull and seams open.",
    climate:
      "The valley floor is the thing to understand. Puyallup sits in a river valley with a high water table, so where a downspout discharges matters more here than it does on higher ground — water dumped at the foundation has nowhere to soak away. Downspout extensions and proper routing to grade are not an upsell in the valley, they're the job. Up on South Hill, elevation brings more wind exposure, and the big cottonwoods and maples along the river corridor throw a heavy fall leaf load into anything downwind.",
    issues: [
      "Valley-floor drainage where a high water table punishes bad downspout routing",
      "Aging tract gutter systems across South Hill subdivisions",
      "Delicate trim and fascia detail on Victorian-era homes near downtown",
      "Heavy fall leaf load off valley cottonwoods and maples",
    ],
    nearby: ["tacoma", "bonney-lake", "graham"],
  },
  {
    slug: "university-place",
    name: "University Place",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "University Place",
    metaTitle: "Seamless Gutter Installation in University Place, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation and replacement in University Place, WA. Mid-century ranch and bluff-home specialists. Veteran-owned, licensed. Call (253) 498-5575.",
    lead:
      "University Place sits on the bluff between Tacoma and the Narrows, and it's one of the most consistent mid-century neighborhoods we work in — which means a lot of long, low rooflines and a lot of gutters that have quietly aged out.",
    areas: [
      "Chambers Bay",
      "Sunset Beach",
      "Day Island",
      "Narrows bluff",
      "Bridgeport corridor",
    ],
    homes:
      "University Place built out mostly in the 1950s through the 1970s, and the housing reflects it: ranches, ramblers, and split-levels on generous lots, with newer infill filling the gaps. Those rooflines are a gift for seamless work — long uninterrupted runs form beautifully with no joints anywhere along the wall — but the low pitch is unforgiving. Slope has to be dialed in and hangers spaced correctly or the trough holds standing water, and a lot of the original systems here were hung with spike-and-ferrule hardware that has been working itself loose for forty years.",
    climate:
      "The bluff is the local variable. Homes along the Narrows and above Sunset Beach take wind and salt air straight off the water, and the exposure is real enough to matter for fastener choice. Inland, the established neighborhoods have grown a genuinely mature canopy of fir and maple since they were built — the trees that were saplings around those 1960s ranches are now sixty years taller, and they drop accordingly.",
    issues: [
      "Spike-and-ferrule hardware failing on original 1960s ranch installs",
      "Low-pitch rooflines where incorrect slope leaves standing water in the trough",
      "Wind and salt exposure on Narrows bluff properties",
      "Sixty years of canopy growth over homes built when the lots were open",
    ],
    nearby: ["tacoma", "lakewood", "gig-harbor"],
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Lakewood",
    metaTitle: "Seamless Gutter Installation in Lakewood, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Lakewood, WA — lakefront homes, mid-century ranches, and JBLM-area properties. Veteran-owned and military-friendly. Call (253) 498-5575.",
    lead:
      "Lakewood is a veteran-owned company's kind of town. It grew up around Joint Base Lewis-McChord, a lot of our neighbors there have served, and the housing stock tells the story of that growth.",
    areas: [
      "Gravelly Lake",
      "American Lake",
      "Steilacoom Lake",
      "Lakewood Towne Center",
      "Tillicum",
      "Oakbrook",
    ],
    homes:
      "Much of Lakewood went up in the 1940s through the 1960s to house base demand, which left the city with block after block of solid, simple ranches and ramblers — straightforward seamless runs, but systems now well past the age where original gutters and hangers can be trusted. Set against that are the older estate homes around Gravelly Lake and the lakefront properties on American and Steilacoom, which are a different job entirely: larger footprints, more complex rooflines, mature landscaping to protect, and owners who care what the gutter profile looks like from the water.",
    climate:
      "Lakewood sits on what was historically Garry oak prairie, and mature oaks still shade a lot of the older neighborhoods. Oak leaf drop is heavier and slower to break down than what most of the county deals with, and it packs into a trough in a way fir needles don't — which is why guard selection matters here. Add the fir stands around the lakes and you have a city where most homes need real debris protection, not the cheapest screen available.",
    issues: [
      "Original mid-century gutter systems at or past end of life",
      "Heavy, slow-rotting oak leaf drop packing troughs solid",
      "Larger, more complex rooflines on lakefront and Gravelly Lake properties",
      "Fascia rot found during teardown on 1950s-era construction",
    ],
    nearby: ["university-place", "tacoma", "spanaway"],
  },
  {
    slug: "bonney-lake",
    name: "Bonney Lake",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Bonney Lake",
    metaTitle: "Seamless Gutter Installation in Bonney Lake, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation and replacement in Bonney Lake and around Lake Tapps. Built for plateau wind and modern multi-gable rooflines. Call (253) 498-5575.",
    lead:
      "Bonney Lake sits up on the plateau above the Puyallup and White River valleys, and it's one of the newest cities we serve — which changes the work from repair-and-replace toward getting modern rooflines properly drained.",
    areas: [
      "Lake Tapps",
      "Sky Island",
      "Church Lake",
      "Falling Water",
      "Eastown",
    ],
    homes:
      "Most of Bonney Lake was built from the 1990s onward, and the subdivisions carry the roof design of their era: multiple gables, dormers, hips, and valleys, all shedding into short gutter runs. That's the defining local problem. The gutters themselves are often still serviceable — the system just never had enough downspouts to move the volume that a cut-up roof concentrates into one corner. Around Lake Tapps the mix shifts to waterfront and view homes, some of them older cabins expanded over decades, where additions have left rooflines that drain in ways nobody planned.",
    climate:
      "Elevation is the differentiator. The plateau catches more wind than the valley floor below it and picks up more snow and ice in a cold snap, which puts real load on gutters and on the hangers holding them. Ice that freezes in a poorly draining trough is how a gutter ends up pulling away from the fascia, so slope and hanger spacing carry more weight up here than they do at sea level.",
    issues: [
      "Multi-gable subdivision rooflines with too few downspouts for the volume",
      "Wind and occasional snow-and-ice load at plateau elevation",
      "Additions and expansions around Lake Tapps that drain in unplanned ways",
      "Builder-grade gutter systems from the 90s and 2000s reaching end of life",
    ],
    nearby: ["puyallup", "buckley", "graham"],
  },
  {
    slug: "spanaway",
    name: "Spanaway",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Spanaway",
    metaTitle: "Seamless Gutter Installation in Spanaway, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Spanaway, WA. Ranches, manufactured homes, and wooded lots — installation, replacement, and guards. Call (253) 498-5575.",
    lead:
      "Spanaway is one of our steadiest service areas, and one where fair pricing genuinely matters to people. The mix of housing here is wider than almost anywhere else in the county.",
    areas: [
      "Spanaway Lake",
      "Parkland",
      "Midland",
      "Elk Plain",
      "Bethel",
    ],
    homes:
      "You'll find three distinct kinds of home in Spanaway, sometimes on the same street. There are 1970s and 1980s ranches on standard lots; there are manufactured and modular homes, which need gutters mounted to a different structure than a stick-built fascia and are frequently skipped entirely by crews that don't want to deal with them; and there are newer subdivisions built in the last twenty years. We hang gutters on all three. Manufactured homes in particular are worth calling out — they're often sold without any gutter system at all, and the runoff goes straight into skirting and foundation.",
    climate:
      "Spanaway sits at the edge of the old prairie south of Tacoma, with heavy Douglas fir cover through the residential streets and around Spanaway Lake. Needle drop is the year-round constant, and it's fine enough that a coarse screen won't stop it — micro-mesh is usually the honest recommendation here. Larger lots also mean more of the surrounding tree canopy actually belongs to the homeowner, which is a maintenance load a gutter guard can retire for good.",
    issues: [
      "Manufactured and modular homes with no gutter system at all",
      "Fine fir needle drop that passes straight through coarse screens",
      "1970s and 80s ranch systems that have never been replaced",
      "Runoff cutting into skirting and foundations on homes with no gutters at all",
    ],
    nearby: ["lakewood", "graham", "roy"],
  },
  {
    slug: "buckley",
    name: "Buckley",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Buckley",
    metaTitle: "Seamless Gutter Installation in Buckley, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Buckley, WA — foothills rain, heavy needle drop, homes and outbuildings. Installation, replacement, and guards. Call (253) 498-5575.",
    lead:
      "Buckley sits in the foothills on the way to Crystal Mountain and Rainier, and it's genuinely wetter up there than it is down in Tacoma. Gutters in the foothills do more work.",
    areas: [
      "Downtown Buckley",
      "White River",
      "Mud Mountain",
      "SR-410 corridor",
      "Rural acreage east of town",
    ],
    homes:
      "Buckley has a real small-town core with older homes close in — modest footprints, simple rooflines, and gutter systems that in a lot of cases are original to the house. Outside of town it opens up into acreage: farmhouses, custom builds, and properties with shops, barns, and detached garages. Those outbuildings are the thing most gutter companies quietly leave off the estimate, and they're often the structures doing the most damage when they shed unmanaged water against a foundation or into a driveway that then ices over.",
    climate:
      "This is the wettest, most tree-heavy part of our Pierce County service area. Foothill towns along the SR-410 corridor pick up noticeably more precipitation than the cities down at water level, and winter brings real snow and freeze cycles that flat-country gutters never have to handle. Combine that with dense conifer cover and constant needle load, and Buckley is the one part of the county where we'd tell almost any homeowner that guards pay for themselves.",
    issues: [
      "Higher foothills rainfall demanding correctly sized troughs and downspouts",
      "Snow and freeze-thaw cycles that pull undersupported gutters off the fascia",
      "Constant conifer needle load on wooded and acreage properties",
      "Shops, barns, and detached garages left with no gutters at all",
    ],
    nearby: ["bonney-lake", "graham", "puyallup"],
  },
  {
    slug: "graham",
    name: "Graham",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Graham",
    metaTitle: "Seamless Gutter Installation in Graham, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters for Graham, WA acreage and wooded lots. Heavy needle drop means guards matter here. Installation and replacement. Call (253) 498-5575.",
    lead:
      "Graham is rural southeast Pierce County — big wooded lots, long driveways, and more Douglas fir per house than just about anywhere else we work.",
    areas: [
      "Kapowsin",
      "Benston",
      "Frederickson edge",
      "Orting Valley approach",
      "Rural 224th corridor",
    ],
    homes:
      "Housing in Graham runs to custom builds and manufactured homes on acreage rather than platted subdivisions, which changes the job in practical ways. Access is a factor — long gravel driveways and soft ground affect where a truck can set up to form gutters on site. Footprints tend to be wide rather than tall, often single-story with attached garages and separate shops, and a full property here can mean two or three structures that all need drainage, not one.",
    climate:
      "Graham's defining feature is tree cover. Homes here sit under and among mature second-growth Douglas fir, and the needle load is heavier and more continuous than anything in the cities to the northwest. A coarse gutter screen is close to useless against fir needles at this density; micro-mesh is what actually holds up. For a lot of Graham homeowners the honest math is that guards cost less over five years than the cleanouts they replace — and cleaning gutters on a rural two-story in the rain is exactly the job nobody should be climbing a ladder for.",
    issues: [
      "Extreme fir needle load under mature second-growth canopy",
      "Multiple structures per property — house, shop, detached garage",
      "Access and setup constraints on long rural driveways",
      "Coarse screens that let fine needles straight through",
    ],
    nearby: ["spanaway", "puyallup", "roy"],
  },
  {
    slug: "roy",
    name: "Roy",
    county: "Pierce",
    countySlug: "pierce-county",
    photoCity: "Roy",
    metaTitle: "Seamless Gutter Installation in Roy, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Roy, WA — farm properties, outbuildings, and prairie-country homes. Veteran-owned, licensed, and fairly priced. Call (253) 498-5575.",
    lead:
      "Roy is small-town south Pierce County out on the prairie, and it's the kind of place where a gutter company's reputation travels by word of mouth faster than any advertising.",
    areas: [
      "Downtown Roy",
      "Muck Creek",
      "Prairie country south of JBLM",
      "McKenna approach",
      "Rural Roy acreage",
    ],
    homes:
      "Roy's core is a compact historic small town — older homes with simple, honest rooflines where a clean seamless run makes an immediate visual difference. Beyond that it's farmland and acreage: farmhouses, barns, equipment sheds, and shops. Agricultural buildings are a real part of the work out here, and they matter more than people assume, because a barn roof sheds an enormous volume of water and dumping it unmanaged next to a foundation, a stall, or a working yard causes problems all winter.",
    climate:
      "The prairie country south of Joint Base Lewis-McChord is more open than the fir-covered parts of the county — less needle drop, but considerably more wind exposure across open ground. Wind-driven rain gets into places sheltered homes never deal with, and it puts lateral load on long gutter runs that have to be hung and braced accordingly. Wide-open properties also mean downspout discharge has real room to be routed properly, which is an advantage worth using.",
    issues: [
      "Barns, sheds, and equipment buildings shedding large volumes unmanaged",
      "Wind exposure across open prairie putting lateral load on long runs",
      "Older in-town homes still on original gutter systems",
      "Winter runoff pooling in working yards and around outbuildings",
    ],
    nearby: ["spanaway", "graham", "lakewood"],
  },
  /* ── TIER 2 — North Sound (King + Snohomish). Added 2026-09-07.
   *
   * BOTHELL straddles the King/Snohomish line — genuinely, roughly down
   * the middle along the Sammamish River. A city can only have one
   * canonical URL, so it lives under King County (city hall and the
   * historic downtown sit on that side) and the copy says outright that
   * we work both halves. Don't "fix" this by adding a second URL under
   * Snohomish; that's duplicate content for one page's worth of demand. */
  {
    slug: "bellevue",
    name: "Bellevue",
    county: "King",
    countySlug: "king-county",
    photoCity: "Bellevue",
    metaTitle: "Seamless Gutter Installation in Bellevue, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters across Bellevue — Somerset, Bridle Trails, Lake Hills, Newport. Installation, replacement, guards, and fascia repair. Call (253) 498-5575.",
    lead:
      "Bellevue is the Eastside's center of gravity, and its gutter work splits cleanly along the age of the neighborhood — mid-century originals on one side of town, teardown-rebuilds on the other.",
    areas: [
      "Somerset",
      "Bridle Trails",
      "Lake Hills",
      "Crossroads",
      "Newport Hills",
      "Eastgate",
      "Factoria",
      "Wilburton",
    ],
    homes:
      "The neighborhoods that built out in the 1950s through the 1970s — Lake Hills, Newport Hills, Eastgate, big stretches of Crossroads — are ramblers and split-levels on generous lots, and a lot of them are still carrying the gutter system they were built with. Somerset climbs the side of Cougar Mountain, which adds a complication most of Bellevue doesn't have: steep lots where whatever leaves the downspout heads straight downhill toward the next foundation, so where the water is discharged matters as much as the gutter itself. Bridle Trails and West Bellevue are where you find the rebuilds — large custom homes with cut-up rooflines, dormers, and long valleys that concentrate a lot of water into short runs and need downspout counts to match.",
    climate:
      "The Eastside runs a touch drier than the shoreline cities, but that's a small edge and it doesn't change the tree math. Bridle Trails in particular sits under genuinely mature Douglas fir — it's the most heavily wooded part of the city — and the Lake Hills greenbelt threads big conifers straight through neighborhoods that otherwise look open. Needle drop, not rainfall, is what actually clogs gutters in Bellevue.",
    issues: [
      "Original 1960s and 70s gutter systems on Lake Hills and Newport ramblers",
      "Steep Somerset and Cougar Mountain lots where downspout discharge runs downhill",
      "Cut-up custom rooflines on Bridle Trails rebuilds with too few downspouts",
      "Mature fir canopy dropping needles year-round into open-top gutters",
    ],
    nearby: ["kirkland", "redmond", "mercer-island"],
  },
  {
    slug: "kirkland",
    name: "Kirkland",
    county: "King",
    countySlug: "king-county",
    photoCity: "Kirkland",
    metaTitle: "Seamless Gutter Installation in Kirkland, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation and replacement in Kirkland, WA — Juanita, Houghton, Rose Hill, Finn Hill. Lakefront and townhome work. Call (253) 498-5575.",
    lead:
      "Kirkland runs downhill to Lake Washington, and that slope is the thread through most of the gutter work here — on the waterfront, in the older cottages above Market Street, and on the townhomes filling in between them.",
    areas: [
      "Juanita",
      "Houghton",
      "Rose Hill",
      "Totem Lake",
      "Finn Hill",
      "Market Street",
      "Norkirk",
    ],
    homes:
      "Three eras share the same streets in Kirkland. Close to downtown and up Market Street there are early-1900s cottages and Craftsman homes with steep pitches and original fascia detail. Rose Hill, Totem Lake, and Finn Hill are largely mid-century — ranches and split-levels now well past the age where original gutters can be trusted. Then there's the redevelopment: Kirkland has taken more townhome and small-lot infill than almost any city on the Eastside, and those buildings pack tall, narrow elevations close together, which means gutters at height, short runs, and very little room to set a ladder. Knowing that before quoting is the difference between a clean job and an afternoon of improvising.",
    climate:
      "The lake slope is the local variable. Lots that fall toward Lake Washington give runoff a head start, and dumping it at the base of a foundation on a grade is how you find out your drainage was never really solved. Kirkland also has substantial mature canopy through Finn Hill and the older streets above the water — a mix of big-leaf maple and fir, meaning both a heavy fall leaf dump and steady needle drop the rest of the year.",
    issues: [
      "Lakeward slopes where downspout runoff needs routing well away from the foundation",
      "Aging mid-century systems through Rose Hill and Finn Hill",
      "Tall, tightly packed townhome elevations with limited ladder access",
      "Original fascia detail on older Market Street and Norkirk homes",
    ],
    nearby: ["bellevue", "redmond", "bothell"],
  },
  {
    slug: "redmond",
    name: "Redmond",
    county: "King",
    countySlug: "king-county",
    photoCity: "Redmond",
    metaTitle: "Seamless Gutter Installation in Redmond, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Redmond, WA — Education Hill, Grass Lawn, Idylwood, Union Hill. Installation, replacement, and guards. Call (253) 498-5575.",
    lead:
      "Redmond is mostly subdivision country with a rural edge on its east side, and the two halves need different things from a gutter crew.",
    areas: [
      "Education Hill",
      "Grass Lawn",
      "Idylwood",
      "Union Hill",
      "Overlake",
      "Bear Creek",
      "Sammamish River valley",
    ],
    homes:
      "Education Hill and Grass Lawn are the heart of it — large 1970s through 1990s subdivisions, two-story homes, multi-gable rooflines, and builder-grade gutter systems that are now hitting the age where hangers pull loose and seams open at the corners. East toward Union Hill and Bear Creek the pattern changes to acreage: custom homes and properties with shops and detached garages, on lots where a truck needs room to set up and form gutters on site. The Sammamish River valley floor adds a third case, where the water table sits high enough that downspout discharge has to be routed with some thought rather than just dropped at grade.",
    climate:
      "Redmond has more standing conifer inside its city limits than most Eastside cities — the Redmond Watershed borders the north end and mature second-growth fir runs through the older subdivisions. That means fine needle drop, which is the debris type that passes straight through a coarse screen and mats at the downspout inlet. Bear Creek and the river corridor also bring genuine drainage sensitivity, which is a good reason not to be careless about where a downspout ends.",
    issues: [
      "Builder-grade subdivision gutters from the 70s-90s at end of life",
      "Fine fir needle drop from the watershed and neighborhood conifers",
      "Acreage properties out Union Hill with shops and outbuildings to drain",
      "High water table on the valley floor punishing lazy downspout routing",
    ],
    nearby: ["kirkland", "sammamish", "bellevue"],
  },
  {
    slug: "bothell",
    name: "Bothell",
    county: "King",
    countySlug: "king-county",
    photoCity: "Bothell",
    metaTitle: "Seamless Gutter Installation in Bothell, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Bothell, WA — both the King and Snohomish sides. Canyon Park, North Creek, Thrashers Corner, downtown. Call (253) 498-5575.",
    lead:
      "Bothell sits on the King–Snohomish line, roughly split down the middle along the Sammamish River. We work both halves; the county line changes your mailing address, not your gutters.",
    areas: [
      "Downtown Bothell",
      "Canyon Park",
      "North Creek",
      "Thrashers Corner",
      "Queensborough",
      "Sammamish River valley",
    ],
    homes:
      "Old Bothell around Main Street holds the city's early housing — modest, older homes with simple rooflines where a clean continuous run makes an obvious difference. Everything above the valley is newer: Canyon Park, North Creek, and Thrashers Corner filled in through the 1980s, 90s, and 2000s with two-story subdivision homes carrying the multi-gable rooflines of that era. The defining Bothell problem is the hillside. The city climbs steeply out of the river valley on both sides, and on a grade like that a downspout emptying at the foundation doesn't soak away — it runs, and it takes soil with it. Extensions and proper routing to grade earn their keep here more than almost anywhere else on this list.",
    climate:
      "The Sammamish River valley collects water off both slopes, so the low ground stays wet well into spring and drainage is a live issue rather than a theoretical one. The hillsides are heavily wooded — North Creek and the greenbelts around Cascadia keep mature conifer right up against the subdivisions — which puts steady needle load on homes that were built with plain open-top gutters.",
    issues: [
      "Steep valley hillsides where runoff erodes rather than soaks away",
      "Multi-gable subdivision rooflines in Canyon Park and North Creek",
      "Wet valley floor keeping drainage a year-round concern",
      "Greenbelt conifers dropping needles onto unprotected gutters",
    ],
    nearby: ["kirkland", "mill-creek", "lynnwood"],
  },
  {
    slug: "mill-creek",
    name: "Mill Creek",
    county: "Snohomish",
    countySlug: "snohomish-county",
    photoCity: "Mill Creek",
    metaTitle: "Seamless Gutter Installation in Mill Creek, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Mill Creek, WA. Master-planned neighborhoods, HOA color matching, heavy greenbelt needle drop. Call (253) 498-5575.",
    lead:
      "Mill Creek is one of the most consistently built cities we serve — a master-planned community wrapped around a golf course — and that consistency changes what a gutter job has to get right.",
    areas: [
      "Mill Creek Town Center",
      "The Country Club",
      "Silver Firs",
      "Mill Creek East",
      "North Creek greenbelts",
    ],
    homes:
      "Most of Mill Creek went up from the 1980s onward under a master plan, so the housing is unusually uniform: two-story homes, similar rooflines, coordinated exterior palettes. That last part matters more than it sounds. A lot of Mill Creek is governed by an HOA with rules about exterior colors, and a gutter that doesn't match the trim it hangs on is the kind of thing that generates a letter. We color-match to the trim rather than defaulting to white, and if your association has an approved color list, bring it to the estimate — it costs nothing to get right the first time and is a genuine nuisance to redo.",
    climate:
      "The master plan kept mature evergreen greenbelts threaded between the neighborhoods, which is exactly what makes the place pleasant to live in and hard on gutters. Homes backing a greenbelt take continuous needle drop from full-height conifers, often onto a two-story roofline that no homeowner should be putting a ladder against twice a year. This is guard country, and the greenbelt lots are the clearest case for it anywhere in Snohomish County.",
    issues: [
      "HOA color rules that a default-white gutter quietly violates",
      "Greenbelt-backing lots under continuous conifer needle drop",
      "Two-story rooflines that make seasonal cleanouts genuinely unsafe",
      "1980s-90s builder gutter systems reaching the end of their service life",
    ],
    nearby: ["lynnwood", "bothell", "mukilteo"],
  },
  {
    slug: "edmonds",
    name: "Edmonds",
    county: "Snohomish",
    countySlug: "snohomish-county",
    photoCity: "Edmonds",
    metaTitle: "Seamless Gutter Installation in Edmonds, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Edmonds, WA — the Bowl, Seaview, Perrinville, Westgate. Salt air, view homes, and older Craftsman stock. Call (253) 498-5575.",
    lead:
      "Edmonds is a water town, and it shows in the two things homeowners here ask about first: how the gutter will look from the street, and how long it will last in salt air.",
    areas: [
      "The Bowl",
      "Downtown Edmonds",
      "Seaview",
      "Perrinville",
      "Westgate",
      "Esperance",
      "Sunset Avenue bluff",
    ],
    homes:
      "The Bowl — the older core sloping down toward the ferry terminal — is full of early-century Craftsman and 1940s-50s homes with steep pitches and original wood fascia, and it's the part of town where the gutter's profile and color are a real consideration rather than an afterthought. Seaview, Westgate, and Perrinville are largely mid-century ranches and split-levels on established lots. Along the bluff and Sunset Avenue there are view homes where the whole point is the sightline to the Sound, and an oversized gutter or a badly placed downspout cuts into what the owner paid for. Those jobs reward a company that will talk through profile and placement instead of just quoting linear feet.",
    climate:
      "Edmonds sits directly on Puget Sound, and salt air is a genuine material consideration — it shortens the life of low-grade fasteners and hangers, and it's unforgiving of bare or untreated fascia behind the gutter line. Add the bluff exposure, where wind comes off the water with nothing in the way, and you have a town where the hardware matters as much as the trough. Inland, the older neighborhoods carry heavy big-leaf maple, so fall brings a serious leaf dump on top of everything else.",
    issues: [
      "Salt-air corrosion on hangers, fasteners, and unprotected fascia",
      "View homes where gutter profile and downspout placement affect the sightline",
      "Original wood fascia behind gutters on Bowl-area Craftsman homes",
      "Heavy fall maple leaf load in the established inland neighborhoods",
    ],
    nearby: ["lynnwood", "mukilteo", "mill-creek"],
  },
  {
    slug: "mukilteo",
    name: "Mukilteo",
    county: "Snohomish",
    countySlug: "snohomish-county",
    photoCity: "Mukilteo",
    metaTitle: "Seamless Gutter Installation in Mukilteo, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Mukilteo, WA — Harbour Pointe, Old Town, and the bluff. Salt air and wind-exposed view homes. Call (253) 498-5575.",
    lead:
      "Mukilteo is built on a bluff above the Sound, and between the salt air, the wind, and the slope, it asks more of a gutter system than most of the North Sound does.",
    areas: [
      "Harbour Pointe",
      "Old Town Mukilteo",
      "Mukilteo waterfront",
      "Japanese Gulch",
      "Chennault Beach",
    ],
    homes:
      "Harbour Pointe is the bulk of the city — a large master-planned area built out from the late 1980s through the 2000s, mostly two-story view homes stepping down the hillside. Those elevations are tall, the lots are steep, and the rooflines are cut up enough that downspout count matters more than gutter size. Old Town, down near the ferry and the lighthouse, is older and smaller-scaled: modest homes, simpler rooflines, and the salt exposure at its worst because there's nothing between them and the water.",
    climate:
      "Two forces, both off the Sound. Salt air corrodes cheap hardware and finds any gap in the fascia's protection, which is why fastener and material choice is a real conversation on this side of the county rather than a default. Wind is the other: the bluff catches it with nothing upwind to break it, and wind-driven rain gets under and behind a gutter line in ways a sheltered inland house never deals with. Then the slope — on a hillside lot, water leaving a downspout at the foundation has somewhere to go, and it goes there fast.",
    issues: [
      "Salt-air corrosion on bluff and waterfront hardware",
      "Wind-driven rain getting behind poorly hung gutter lines",
      "Steep Harbour Pointe hillside lots where runoff needs real routing",
      "Tall two-story view elevations that make DIY maintenance dangerous",
    ],
    nearby: ["edmonds", "mill-creek", "lynnwood"],
  },
  {
    slug: "lynnwood",
    name: "Lynnwood",
    county: "Snohomish",
    countySlug: "snohomish-county",
    photoCity: "Lynnwood",
    metaTitle: "Seamless Gutter Installation in Lynnwood, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Lynnwood, WA — Alderwood, city center, and the established postwar neighborhoods. Fair pricing, one-day installs. Call (253) 498-5575.",
    lead:
      "Lynnwood is a working, practical city, and our name tends to land well here — people want the job done properly without paying for somebody else's advertising budget.",
    areas: [
      "Alderwood",
      "Lynnwood City Center",
      "Meadowdale",
      "Highway 99 corridor",
      "196th Street corridor",
    ],
    homes:
      "Lynnwood built out mainly in the 1950s through the 1970s, and the housing reflects it: ranches, ramblers, and split-levels on standard lots throughout the established neighborhoods. Those are honest, straightforward gutter jobs — long clean runs, single-story or split, formed on the driveway and hung in a day. What makes them worth doing right is that a great many are still on original gutters or on a cheap replacement done decades ago with spike-and-ferrule hardware that has been working loose ever since. Meadowdale, out toward the water, adds steeper lots and more tree cover to the mix, and the redevelopment around the city center and light rail brings taller, denser buildings on tighter sites.",
    climate:
      "Lynnwood's established neighborhoods have grown into their trees. The firs and maples planted around those 1960s ranches are sixty-odd years taller now, and a lot of homeowners are cleaning gutters far more often than they were when they bought the house. There's no salt exposure to speak of this far inland, so the constraint here is straightforwardly debris — leaves in the fall, needles the rest of the year, and a lot of low-pitch roofs where a clogged trough overflows straight down the siding.",
    issues: [
      "Spike-and-ferrule hardware failing on original postwar installs",
      "Sixty years of canopy growth over homes built when the lots were open",
      "Low-pitch ranch roofs where a clogged gutter overflows onto siding",
      "Steeper, more heavily treed lots out toward Meadowdale",
    ],
    nearby: ["edmonds", "mill-creek", "mukilteo"],
  },
  {
    slug: "mercer-island",
    name: "Mercer Island",
    county: "King",
    countySlug: "king-county",
    photoCity: "Mercer Island",
    metaTitle: "Seamless Gutter Installation on Mercer Island, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters on Mercer Island, WA. Heavy tree canopy, steep lakefront lots, mid-century and rebuilt homes. Call (253) 498-5575.",
    lead:
      "Mercer Island is the most heavily wooded place we work on the Eastside, and that single fact drives nearly every gutter conversation on the island.",
    areas: [
      "North end",
      "East Seattle",
      "Mercerdale",
      "First Hill",
      "South end",
      "Island Crest corridor",
    ],
    homes:
      "The island's housing runs from well-kept 1950s and 60s mid-century homes — some of them genuinely good architecture, with low pitches and broad overhangs — through to extensive rebuilds and remodels on the same lots. Both ends of that range share the same two constraints. Lots slope toward the water, often steeply, so downspout discharge has to be carried well clear rather than dropped at the foundation. And access is tight: narrow winding roads, long driveways, and mature landscaping that a crew has to work around rather than through. Low-pitch mid-century rooflines also mean slope and hanger spacing have to be exact, because a shallow roof gives you no margin for a trough that holds water.",
    climate:
      "Mercer Island takes its tree canopy seriously — the island has long-standing tree preservation rules, and the result is mature Douglas fir, cedar, and big-leaf maple standing over houses across the island. That's the whole ballgame for gutters here. Needle drop is continuous, the fall maple dump is heavy, and unlike the shoreline cities there's no salt air to worry about, because Lake Washington is fresh water. Debris protection isn't an upsell on this island; for most homes it's the difference between a system that works and one that's blocked by November.",
    issues: [
      "Continuous needle and leaf load from protected mature canopy",
      "Steep lakeward lots needing runoff carried well clear of foundations",
      "Low-pitch mid-century rooflines with no margin for imprecise slope",
      "Tight access on narrow roads and around mature landscaping",
    ],
    nearby: ["bellevue", "kirkland", "sammamish"],
  },
  {
    slug: "sammamish",
    name: "Sammamish",
    county: "King",
    countySlug: "king-county",
    photoCity: "Sammamish",
    metaTitle: "Seamless Gutter Installation in Sammamish, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutters in Sammamish, WA — Klahanie, Pine Lake, Trossachs. Plateau snow load, big rooflines, heavy fir cover. Call (253) 498-5575.",
    lead:
      "Sammamish sits up on the plateau, and elevation changes the job — more weather, bigger houses, and more trees per lot than anywhere else on the Eastside.",
    areas: [
      "Klahanie",
      "Pine Lake",
      "Beaver Lake",
      "Trossachs",
      "Inglewood Hill",
      "Sahalee",
    ],
    homes:
      "Sammamish is almost entirely a 1990s-through-2010s city, and the housing is large: two-story and three-story homes with ambitious rooflines — multiple gables, dormers, hips, and long valleys. That design concentrates an enormous volume of water into short runs of gutter, and the single most common problem we find here isn't a worn-out gutter at all, it's a roof that never had enough downspouts to move what it sheds. Adding capacity in the right places usually does more for a Sammamish home than upsizing the trough would. The scale of these elevations also puts the gutter line well out of reach, which is worth thinking about before committing to twice-yearly cleanouts.",
    climate:
      "The plateau genuinely gets more weather than the lowlands below it — more snow in a cold snap, and freeze-thaw cycles that flat-country gutters never contend with. Ice sitting in a trough that couldn't drain is how a gutter ends up pulling away from the fascia, so slope and hanger spacing carry extra weight up here. Add the second-growth fir standing through Klahanie, Trossachs, and around Pine and Beaver Lakes, and you have continuous needle load on rooflines that are already asking a lot of their drainage.",
    issues: [
      "Large multi-gable rooflines with too few downspouts for the volume shed",
      "Plateau snow and freeze-thaw cycles loading gutters and hangers",
      "Continuous fir needle drop through Klahanie, Trossachs, and the lakes",
      "Gutter lines high enough that homeowner cleanouts are a real risk",
    ],
    nearby: ["redmond", "bellevue", "mercer-island"],
  },
];

/* Questions are the ones people actually type or ask an assistant. Answers
 * are built per city but stay factual — coverage, process, and timing come
 * from SITE; cost deliberately refuses to invent a number. */
export function cityFaqs(area) {
  return [
    {
      q: `Do you serve all of ${area.name}?`,
      a: `Yes. We cover ${area.name} and the surrounding ${area.county} County communities, including ${area.areas.slice(0, 3).join(", ")}. ${SITE.name} has been working across the Puget Sound since ${SITE.founded}, and ${area.county} County is our primary service area. Call ${SITE.phone.display} and we'll confirm your address on the spot.`,
    },
    {
      q: `How much does gutter installation cost in ${area.name}?`,
      a: `Cost comes down to the linear footage of your roofline, how many stories we're working at, the number of downspouts the roof actually needs, and the material you choose. That's why we don't quote a flat number online — a straight ranch run and a cut-up two-story elevation are different jobs. Every estimate we give is free, in writing, and good for one full year, so you can get a real number for your ${area.name} home with no pressure to decide on the spot.`,
    },
    {
      q: `How long does a gutter installation take in ${area.name}?`,
      a: `Most residential jobs are a single day. We form the gutters on site at your ${area.name} home, so there are no seams and no waiting on a fabrication shop — old gutters come off, fascia gets inspected and repaired if it needs it, and the new seamless runs go up the same visit, cleanup included.`,
    },
    {
      q: `Do I need gutter guards in ${area.name}?`,
      a: `${area.guardAnswer}`,
    },
  ];
}

/* Per-city answer to the guards question — this is where a generic template
 * would be obvious, so each one is tied to that city's actual tree cover. */
const GUARD_ANSWERS = {
  tacoma:
    "It depends on your block. Under the mature maple and fir canopy in the North End and around Point Defiance, guards save you two cleanouts a year and are usually worth it. On an open South End lot with no overhanging trees, they're optional and we'll tell you so.",
  "gig-harbor":
    "Usually yes. The peninsula's second-growth fir and cedar cover means near-continuous needle drop, and needles are the debris type that clogs a trough fastest. Waterfront homes with less canopy are the exception.",
  puyallup:
    "On South Hill it depends on your lot. Down in the valley, where big cottonwoods and maples throw a heavy fall leaf load, guards make a real difference — leaves mat down and block a downspout inlet completely.",
  "university-place":
    "Often, yes. The trees planted around those 1960s ranches are sixty years bigger now, and a lot of homeowners here are cleaning gutters far more often than they expected to when they bought the place.",
  lakewood:
    "In most of Lakewood, yes. Oak leaf drop from the old Garry oak prairie is heavy and slow to break down, and it packs into a trough in a way that fir needles don't. Guard choice matters as much as whether you get them.",
  "bonney-lake":
    "Less about trees here and more about drainage. Plateau subdivisions usually need downspout capacity addressed before guards, though lots backing onto greenbelt or the Lake Tapps shoreline benefit from both.",
  spanaway:
    "Generally yes, and the type matters. The fir needle drop here is fine enough to pass straight through a coarse screen, so micro-mesh is the honest recommendation — a cheap screen will leave you cleaning gutters anyway.",
  buckley:
    "In Buckley we'd say yes to almost any homeowner. Dense conifer cover plus the heaviest rainfall in our service area is the exact combination guards are built for, and freeze-ups start with a trough that couldn't drain.",
  graham:
    "Almost certainly. Graham has the heaviest needle load of anywhere we work, and for most homeowners here guards cost less over five years than the cleanouts they replace. Micro-mesh, not screen — fir needles walk right through coarse mesh.",
  roy: "Out on the prairie there's less overhead canopy than in the wooded parts of the county, so guards are more of a judgment call. Properties with a treeline or mature windbreak near the house are the ones where they earn their keep.",
  bellevue:
    "Depends which Bellevue you're in. Under the fir canopy in Bridle Trails or backing the Lake Hills greenbelt, guards pay for themselves. On an open Factoria or Wilburton lot with nothing overhanging the roof, we'll tell you to skip them.",
  kirkland:
    "Usually worth it above the lake, where the older streets and Finn Hill carry mature maple and fir — that combination gives you a heavy fall leaf dump on top of year-round needles. Newer townhomes with no established trees nearby are the exception.",
  redmond:
    "Generally yes, and the type matters. Redmond's debris is mostly fine fir needles off the watershed and the neighborhood conifers, and needles that fine go straight through a coarse screen. Micro-mesh or don't bother.",
  bothell:
    "For anything backing a greenbelt or sitting under the North Creek conifers, yes. Bothell's more open valley-floor lots are a closer call — there the drainage question usually matters more than the debris one.",
  "mill-creek":
    "If your lot backs a greenbelt, this is the clearest yes on our whole service map: full-height conifers dropping onto a two-story roofline you should not be laddering up to twice a year. Interior lots with less cover, we'll give you an honest read.",
  edmonds:
    "Often, especially inland where the big-leaf maples come down all at once in the fall — a matted layer of wet maple leaf will block a downspout inlet completely. On the exposed bluff there's less overhead cover and it becomes optional.",
  mukilteo:
    "It varies more here than most places. Harbour Pointe lots against the gulch or a stand of firs benefit clearly; open bluff lots facing the water have little overhanging them, and there the hardware and how the gutter is hung matter far more than guards.",
  lynnwood:
    "For most established Lynnwood neighborhoods, yes. The trees planted around those postwar ranches are sixty years bigger now, and homeowners here are usually cleaning gutters more often than they expected to be.",
  "mercer-island":
    "On Mercer Island, yes, for nearly every home. Protected mature canopy across the island means continuous needle drop plus a heavy fall maple load, and there's no version of that a bare open gutter handles well.",
  sammamish:
    "Yes, and for a reason beyond debris: these rooflines are high. Even setting aside the fir needle load from Klahanie and the lakes, guards on a three-story Sammamish elevation are as much a safety decision as a maintenance one.",
};

SERVICE_AREAS.forEach((a) => {
  a.guardAnswer = GUARD_ANSWERS[a.slug];
});

export function findArea(citySlug) {
  return SERVICE_AREAS.find((a) => a.slug === citySlug);
}

export function areasInCounty(countySlug) {
  return SERVICE_AREAS.filter((a) => a.countySlug === countySlug);
}

export const SERVICE_AREA_COUNTIES = [
  {
    slug: "pierce-county",
    name: "Pierce County",
    blurb:
      "Our home county and the bulk of our book of work. Tacoma is where the shop is; the rest of the county is a short drive from it.",
  },
  {
    slug: "king-county",
    name: "King County",
    blurb:
      "The Eastside and the cities around Lake Washington. Older mid-century stock in the established neighborhoods, ambitious rooflines on everything built since — and more standing fir than people expect this close to Seattle.",
  },
  {
    slug: "snohomish-county",
    name: "Snohomish County",
    blurb:
      "The North Sound corridor. Salt air along the water in Edmonds and Mukilteo, master-planned neighborhoods and greenbelt conifers inland, and a lot of postwar housing still on its original gutters.",
  },
];

/* Flat path list consumed by scripts/gen-sitemap.mjs so the sitemap can
 * never drift from the routes actually registered in App.jsx. */
export const SERVICE_AREA_PATHS = [
  "/service-areas/",
  ...SERVICE_AREA_COUNTIES.map((c) => `/service-areas/${c.slug}/`),
  ...SERVICE_AREAS.map((a) => `/service-areas/${a.countySlug}/${a.slug}/`),
];
