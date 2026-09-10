/*
 * City × service pages — sg4l-plan.md §7's "matrix", scoped deliberately.
 *
 * URL: /service-areas/[county]/[city]/[service]/
 *
 * The plan writes this as /service-areas/[city]/[service]/, but the city
 * pages already live under their county, so nesting one level deeper keeps
 * a single URL hierarchy and a breadcrumb that actually describes the
 * tree: Service Areas → County → City → Service. A second top-level shape
 * would mean two URLs describing the same place.
 *
 * WHY ONLY TEN PAGES: the plan proposes 2 services × ~30 cities ≈ 60 of
 * these. That is where a geographic page cluster stops being useful and
 * starts looking like doorway pages — sixty near-identical documents whose
 * only real variable is a place name in the H1. Google's thin-content and
 * doorway judgments land hardest exactly here. So this covers five markets
 * with genuine search demand behind them, times the two services people
 * actually search by name:
 *
 *   Tacoma, Gig Harbor, Puyallup  — the top of Doug's Pierce book
 *   Bellevue, Edmonds             — the strongest North Sound markets
 *   × seamless gutter installation, gutter guards
 *
 * Each `body` block below has to say something that is only true of that
 * city AND that service. If a new combination can't clear that bar, it
 * doesn't belong here — a city page alone will rank better than a thin
 * child page competing with it. The same content rules as
 * serviceAreas.js apply: real facts only, no invented job history, no
 * pricing.
 */

import { findArea } from "./serviceAreas.js";

export const MATRIX_SERVICES = {
  "seamless-gutter-installation": {
    title: "Seamless Gutter Installation",
    short: "New continuous aluminum gutters formed on site to your exact run lengths.",
  },
  "gutter-guards": {
    title: "Gutter Guards",
    short: "Debris protection matched to what actually falls on your roof.",
  },
};

export const SERVICE_MATRIX = [
  /* ── TACOMA ─────────────────────────────────────────────── */
  {
    city: "tacoma",
    service: "seamless-gutter-installation",
    metaTitle: "Seamless Gutter Installation in Tacoma, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation in Tacoma — century-old fascia, steep pre-war pitches, and 6-inch upsizing for the North End canopy. Formed on site. Call (253) 498-5575.",
    h1: "Seamless Gutter Installation in Tacoma, WA",
    lead:
      "Installing gutters on Tacoma's older housing stock is a fascia job as much as a gutter job — and that's the part most quotes leave out.",
    body: [
      "On a century-old Tacoma house, the gutter is the easy part. The North End, Proctor, and the Stadium District are full of Craftsman bungalows and Foursquares whose original cedar fascia has been sitting behind a leaking sectional gutter for decades, and you don't know what you're mounting to until the old run comes off. We inspect and price fascia repair as part of the install rather than discovering it mid-job and calling you with a change order, because a new seamless gutter hung on soft wood will pull loose no matter how good the gutter is.",
      "The other Tacoma-specific decision is size. Most of these homes were originally fitted with 5-inch troughs, which were never sized for a Puget Sound downpour landing on a steep pre-war roof pitch with a mature maple canopy overhead. Moving to 6-inch with correctly spaced hidden hangers is usually the right call in the North End and around Point Defiance. In the South End and South Tacoma, where the mid-century ranches have long low rooflines and less overhead cover, 5-inch is often genuinely sufficient and we'll say so rather than upselling you.",
      "Practical note on access: forming a continuous run on site needs somewhere to put the brake, and Tacoma's older blocks have narrow driveways, alley access, and street parking. We work these streets constantly and plan the setup before the truck arrives — a run formed in one piece on your driveway is the whole point of seamless, and it's not something to improvise on a tight lot.",
    ],
    bullets: [
      "Fascia inspected and priced with the install, not discovered halfway through",
      "6-inch upsizing where the canopy and roof pitch justify it — 5-inch where they don't",
      "Hidden hangers, correctly spaced, replacing failed spike-and-ferrule hardware",
      "Continuous runs formed on site, planned around narrow older-Tacoma lots",
    ],
    faqs: [
      {
        q: "Can you install gutters on a historic Tacoma home without damaging the trim?",
        a: "Yes, and it's a fair thing to ask. The pre-war homes in the North End, the North Slope area, and the Stadium District have trim and fascia detail worth protecting, and a crew working fast with a nail gun can do real damage. We detach carefully, work the fascia by hand where the detail warrants it, and match the gutter profile and color to the house rather than defaulting to whatever's on the truck.",
      },
      {
        q: "Do I need 6-inch gutters in Tacoma?",
        a: "Often in the North End, less often in the South End. The deciding factors are roof pitch, the square footage of roof draining into each run, and how much tree cover sits above it. A steep pre-war roof under mature maple sheds fast and carries debris; a low-pitch ranch on an open lot doesn't. We'll tell you which situation you're in at the estimate.",
      },
    ],
  },
  {
    city: "tacoma",
    service: "gutter-guards",
    metaTitle: "Gutter Guards in Tacoma, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Gutter guards for Tacoma homes — maple leaf, fir needle, and roof moss all at once. Micro-mesh where it's needed, honest advice where it isn't. Call (253) 498-5575.",
    h1: "Gutter Guards in Tacoma, WA",
    lead:
      "Tacoma throws three different kinds of debris at a gutter, and most guard systems only handle one of them well.",
    body: [
      "In the North End and the neighborhoods ringing Point Defiance you get big-leaf maple and Douglas fir over the same roof. Those are opposite problems. Maple leaf is large and wet and sits on top of a screen, and if the screen is coarse enough to let water through fast it will also let fir needles straight into the trough. Needles are the ones that actually kill a gutter — they slip through anything coarse, mat at the downspout inlet, and hold water against the fascia. That combination is why we default to micro-mesh in canopied Tacoma neighborhoods rather than the cheaper screen a lot of companies lead with.",
      "The third one is moss, and it's genuinely a Tacoma issue rather than a general Pacific Northwest one because of how much older roofing is still in service here. Moss fragments coming off a north-facing roof are small, heavy, and abrasive, and they behave more like sediment than debris — they'll settle in a trough that leaves and needles never reach. A guard keeps the bulk of it out of the system, but it isn't a substitute for dealing with the moss on the roof, and we'll tell you that rather than selling you a guard as a cure for it.",
      "Where guards aren't worth it, we say so. On an open South End or South Tacoma lot with nothing overhanging the roofline, a guard is a solution to a problem you don't have. Our name is Seamless Gutters 4 Less and we'd rather keep the estimate honest than add a line item that does nothing for you.",
    ],
    bullets: [
      "Micro-mesh for the North End's mixed maple-and-needle load",
      "Honest read on roof moss — guards help, but they aren't a moss treatment",
      "Guard install that doesn't void your roofing warranty",
      "A straight 'you don't need these' on open lots with no canopy",
    ],
    faqs: [
      {
        q: "Will gutter guards stop moss from clogging my Tacoma gutters?",
        a: "They'll keep most of it out of the trough, which helps a lot. But moss fragments are fine and heavy, and no guard is a moss treatment — if your roof is growing moss, that's a roof conversation, and we'd rather be straight with you about it than let you buy a guard expecting it to solve the whole problem.",
      },
      {
        q: "Which guard type works best under Tacoma's tree canopy?",
        a: "Micro-mesh, in almost every canopied neighborhood here. The reason is the mix: coarse screens handle maple leaf acceptably but pass fir needles straight through, and needles are what mat at the downspout and hold water. If your lot is open with no overhanging trees, the calculation changes and we'll tell you guards are optional.",
      },
    ],
  },

  /* ── GIG HARBOR ─────────────────────────────────────────── */
  {
    city: "gig-harbor",
    service: "seamless-gutter-installation",
    metaTitle: "Seamless Gutter Installation in Gig Harbor, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation in Gig Harbor — downspout capacity for cut-up rooflines, salt-air hardware, and view-conscious profiles. Call (253) 498-5575.",
    h1: "Seamless Gutter Installation in Gig Harbor, WA",
    lead:
      "In Gig Harbor the size of the gutter is rarely the problem. The number of downspouts almost always is.",
    body: [
      "Gig Harbor North and Canterwood are dominated by homes built in the 1990s and 2000s, and that era loved a cut-up roofline: multiple gables, dormers, hips, and long valleys. A valley collects the runoff from two roof planes and delivers it into one short section of gutter, and no trough size fixes an outlet problem. When we design an install on one of these homes we're counting downspouts and placing them where the volume actually lands, not just measuring linear feet. That's the single biggest difference between a Gig Harbor install that works and one that overflows at the same corner every November.",
      "Hardware selection matters more here than inland. Homes on or near the water take steady salt air, and it finds cheap fasteners fast — a gutter is only attached to your house by its hangers, and corroded hangers are how a run ends up sagging four years after it was installed. On waterfront and near-water jobs we specify accordingly rather than using the same box of screws that's fine in Puyallup.",
      "Then there's the view, which is the reason a lot of people live here. On a harbor or Sound-facing elevation, an oversized trough and a badly placed downspout cut straight through the sightline the house was built for. Profile, color, and where the downspout drops are worth talking through at the estimate. On the wooded lots out toward Rosedale and Artondale the constraint flips to access and height — tall two-story elevations on sloped, treed parcels, where planning the setup ahead of time is what keeps a one-day install a one-day install.",
    ],
    bullets: [
      "Downspout count and placement designed to the roofline, not the linear footage",
      "Corrosion-conscious hardware on waterfront and near-water homes",
      "Profile and downspout placement chosen with the view in mind",
      "Setup planned for steep, treed peninsula lots and tall elevations",
    ],
    faqs: [
      {
        q: "Why does my Gig Harbor house overflow in the same spot every year?",
        a: "Almost always because a valley or a pair of gables is concentrating runoff into a stretch of gutter with no outlet near it. Upsizing the trough moves the problem a few feet; adding a downspout where the water actually lands fixes it. That's the most common thing we correct on 90s and 2000s homes up the hill.",
      },
      {
        q: "Does salt air really affect gutters in Gig Harbor?",
        a: "On and near the water, yes — and it shows up in the hangers and fasteners before it shows up in the gutter itself. The trough can look fine while the hardware holding it up is failing. It's a reason to care what a bid specifies, not just what it costs.",
      },
    ],
  },
  {
    city: "gig-harbor",
    service: "gutter-guards",
    metaTitle: "Gutter Guards in Gig Harbor, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Gutter guards in Gig Harbor. Peninsula fir and cedar drop fine needles year-round — micro-mesh, correctly installed, on elevations you shouldn't be climbing. Call (253) 498-5575.",
    h1: "Gutter Guards in Gig Harbor, WA",
    lead:
      "The peninsula is genuinely heavily treed, and what falls out of second-growth fir and cedar is the hardest debris there is to keep out of a gutter.",
    body: [
      "Fir and cedar needles are the worst case for gutter protection, and Gig Harbor has them in volume. They're fine enough to pass through a coarse screen, they arrive continuously rather than in one seasonal dump, and once a handful of them reach a downspout inlet they mat into a plug that holds standing water in the trough. Standing water against fascia is how the expensive damage starts. A screen that stops maple leaf will do essentially nothing about this, which is why micro-mesh is the honest recommendation across most of the peninsula rather than an upsell.",
      "Installation detail matters as much as the product. Guards have to be fitted so water still gets in freely at the volume these rooflines shed — on a cut-up Gig Harbor North roof, a guard installed tightly across a valley outlet can turn a debris problem into an overflow problem. And on any home still under a roofing warranty, we fit guards without going under or through the shingle course in ways that would void it. Worth asking any contractor about, not just us.",
      "There's a safety argument here that we think is the real one. Out toward Rosedale and Artondale, houses are tall, lots are sloped, and the ground you'd set a ladder on is soft and uneven half the year. Cleaning gutters twice a year on that kind of elevation is a genuinely bad idea, and retiring that chore permanently is worth more than the guard costs. Waterfront homes with little overhead canopy are the exception, and we'll tell you when you're in that case.",
    ],
    bullets: [
      "Micro-mesh — the only thing that reliably stops fine fir and cedar needles",
      "Fitted to pass the water volume a cut-up roofline actually sheds",
      "Installed without compromising an existing roofing warranty",
      "Retires ladder work on tall, sloped, wooded peninsula lots",
    ],
    faqs: [
      {
        q: "Do gutter guards actually keep fir needles out?",
        a: "Micro-mesh does. Screens and coarse mesh don't — needles are fine enough to pass straight through, and they're the debris that actually blocks a downspout. If someone quotes you a cheap screen for a wooded Gig Harbor lot, you'll be cleaning gutters anyway.",
      },
      {
        q: "Will guards void my roof warranty?",
        a: "They can if they're installed by lifting or fastening through the shingle course, which some systems require. We fit guards in a way that doesn't, and if you have an active roofing warranty, bring the terms to the estimate and we'll work inside them.",
      },
    ],
  },

  /* ── PUYALLUP ───────────────────────────────────────────── */
  {
    city: "puyallup",
    service: "seamless-gutter-installation",
    metaTitle: "Seamless Gutter Installation in Puyallup, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation in Puyallup — valley-floor drainage and South Hill subdivisions need different work. Formed on site, cleanup included. Call (253) 498-5575.",
    h1: "Seamless Gutter Installation in Puyallup, WA",
    lead:
      "A Puyallup install is really two different jobs depending on whether you're on the valley floor or five hundred feet up on South Hill.",
    body: [
      "Down in the valley, the install decision that matters most isn't the gutter at all — it's where the water goes after it leaves the downspout. The valley floor sits on a high water table, and runoff dumped at the base of a foundation there has nowhere to soak away. Extensions and proper routing to grade aren't an add-on in the valley, they're the difference between a system that protects the house and one that concentrates water against it. Any bid for a valley-floor home that doesn't address discharge is an incomplete bid.",
      "Downtown and around Pioneer Park the second consideration is the housing itself. Puyallup's oldest homes are Victorian-era and early-1900s, with decorative trim and fascia detail that a fast crew will chew up. Those installs get worked by hand where the detail warrants it, with the profile and color chosen to suit the house rather than whatever's standard.",
      "South Hill is a different animal: large 1980s-through-2000s subdivisions, two-story elevations, multi-gable rooflines, and builder-grade gutter systems now at the age where hangers pull and seams open at the corners. Replacing those is straightforward seamless work — the thing to get right is downspout capacity, because the roof design concentrates volume, and wind exposure up on the hill drives rain into the gutter line at angles a sheltered valley house never sees.",
    ],
    bullets: [
      "Valley-floor discharge routed to grade, not dropped at the foundation",
      "Careful hand-work around Victorian-era trim near downtown",
      "Downspout capacity sized for South Hill's multi-gable rooflines",
      "Hidden hangers replacing failed builder-grade subdivision hardware",
    ],
    faqs: [
      {
        q: "Why does downspout placement matter so much in the Puyallup valley?",
        a: "Because the water table is high enough that runoff put at the foundation doesn't soak away — it sits, and then it finds the path of least resistance into your crawlspace or basement. On the valley floor, routing discharge well clear and to grade is the actual job. On South Hill the ground drains better and the emphasis shifts to capacity.",
      },
      {
        q: "Can you replace the gutters on a South Hill two-story in one day?",
        a: "Most of them, yes. We pull the old system, inspect and repair the fascia, form the new runs on site, and clean up the same visit. What extends a job past a day is usually fascia damage we find during teardown — which is why we look at fascia condition during the estimate rather than after the old gutter is on the ground.",
      },
    ],
  },
  {
    city: "puyallup",
    service: "gutter-guards",
    metaTitle: "Gutter Guards in Puyallup, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Gutter guards in Puyallup. Valley cottonwood and maple mat into a plug; South Hill lots are a judgment call. Straight advice either way. Call (253) 498-5575.",
    h1: "Gutter Guards in Puyallup, WA",
    lead:
      "Puyallup's debris problem is leaf, not needle — and leaf fails a gutter in a completely different way.",
    body: [
      "The cottonwoods and big maples along the river corridor and through the older valley neighborhoods drop large leaves in a short, heavy window every fall. Unlike fir needles, which sift through and mat at the outlet, wet leaf builds a mass on top of whatever is covering the gutter and then either blocks the water entirely or slides in and seals the downspout inlet in one go. That difference matters when picking a guard: the failure mode you're protecting against here is a sudden blockage during exactly the storm you needed the gutter to work in.",
      "It also changes the trade-off on mesh size. A very fine mesh under heavy wet leaf can shed water over the front edge if it isn't pitched and fitted properly, so on valley-floor homes with big deciduous cover we care as much about how the guard is fitted and how much open area it presents as about the mesh rating on the box. That's an install-quality question more than a product question, and it's where cheap guard jobs fail.",
      "Up on South Hill, plenty of lots have little overhanging cover, and there guards are a genuine judgment call rather than an obvious yes. We'll walk the roofline with you and give you a straight read. If your subdivision lot has nothing dropping on it, the better spend is usually correcting the downspout count the builder skimped on.",
    ],
    bullets: [
      "Guard choice matched to heavy wet leaf, not just fine needle",
      "Fitted and pitched so a leaf mass doesn't shed water over the front edge",
      "Honest 'probably not' on open South Hill lots with no canopy",
      "Downspout capacity checked at the same visit — often the better fix",
    ],
    faqs: [
      {
        q: "Do I need gutter guards on South Hill?",
        a: "Often not. A lot of South Hill subdivision lots have little overhanging tree cover, and a guard there solves a problem you don't have. Down in the valley under cottonwood and maple, the answer flips. We'll look at what's actually above your roofline and tell you which case you're in.",
      },
      {
        q: "What kind of guard handles big wet leaves best?",
        a: "The fit matters more than the label. Heavy wet leaf sits on top of a guard rather than passing through it, so what you need is enough open area and correct pitch so water still gets in while the mass sheds off. A fine mesh installed badly will send water straight over the front edge in a hard fall storm.",
      },
    ],
  },

  /* ── BELLEVUE ───────────────────────────────────────────── */
  {
    city: "bellevue",
    service: "seamless-gutter-installation",
    metaTitle: "Seamless Gutter Installation in Bellevue, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation in Bellevue — first replacements on Lake Hills and Newport ramblers, downspout design for Bridle Trails rebuilds. Call (253) 498-5575.",
    h1: "Seamless Gutter Installation in Bellevue, WA",
    lead:
      "A lot of Bellevue installs are the first time a house has had its gutters replaced since it was built — and fifty-year-old fascia has opinions about that.",
    body: [
      "Lake Hills, Newport Hills, Eastgate, and much of Crossroads are ramblers and split-levels from the 1950s through the 1970s, and a meaningful number are still carrying original gutters on original spike-and-ferrule hardware. Pulling that off after five decades routinely exposes fascia that has been quietly taking water at every hanger point. We inspect and price that with the install, because hanging new seamless runs on compromised wood guarantees you'll be looking at sagging gutters again in a few years, and finding it mid-job is how a one-day install becomes a phone call about extra cost.",
      "Bridle Trails and West Bellevue are the opposite job. The rebuilds there are large custom homes with cut-up rooflines — dormers, hips, and long valleys concentrating a lot of water into short runs. On those, the design work is downspout count and placement, plus matching profile and color to an exterior that somebody chose deliberately. A default white gutter on a considered facade reads as an afterthought.",
      "Somerset adds a constraint that's easy to miss on a bid: the slope. On the side of Cougar Mountain, water leaving a downspout doesn't sit, it travels, and it travels toward whatever is downhill — frequently a neighbor's foundation. Discharge routing on Somerset and the other hillside neighborhoods is part of designing the system, not an afterthought once the gutters are up.",
    ],
    bullets: [
      "Fascia condition assessed before the old mid-century system comes off",
      "Hidden hangers replacing fifty-year-old spike-and-ferrule hardware",
      "Downspout design for cut-up Bridle Trails and West Bellevue rooflines",
      "Discharge routing planned for Somerset and Cougar Mountain slopes",
    ],
    faqs: [
      {
        q: "My Bellevue house still has its original 1960s gutters. Is the fascia going to be a problem?",
        a: "Frequently, yes — and it's better to know at the estimate than after the old run is on the ground. Spike-and-ferrule hardware works itself loose over decades and lets water sit at each hanger point. We look at fascia condition up front and price any repair with the install.",
      },
      {
        q: "Can you match the gutter color to my exterior?",
        a: "Yes, and on the rebuilt homes in Bridle Trails and West Bellevue we'd push you to. A white gutter on a facade whose colors were chosen carefully undoes some of that work. Color matching costs nothing extra to get right the first time.",
      },
    ],
  },
  {
    city: "bellevue",
    service: "gutter-guards",
    metaTitle: "Gutter Guards in Bellevue, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Gutter guards in Bellevue. Bridle Trails fir and the Lake Hills greenbelt need micro-mesh; open Factoria lots don't need guards at all. Call (253) 498-5575.",
    h1: "Gutter Guards in Bellevue, WA",
    lead:
      "Whether guards are worth it in Bellevue depends almost entirely on which street you're on, and we'd rather tell you that than sell everyone the same thing.",
    body: [
      "Bridle Trails is the most heavily wooded part of the city, with genuinely mature Douglas fir standing over houses, and the Lake Hills greenbelt threads full-height conifers through neighborhoods that look open from the street. On those lots, guards do real work — fir needle drop is continuous rather than seasonal, it's fine enough to pass straight through a coarse screen, and it mats at the downspout inlet where it holds water in the trough. Micro-mesh is the recommendation there, and a cheap screen genuinely isn't worth installing.",
      "On plenty of other Bellevue lots — much of Factoria, Wilburton, and the more open parts of Eastgate — there's nothing overhanging the roofline and a guard is a line item that buys you very little. We'll say so. People are sometimes surprised that a company selling guards will talk them out of guards, but a quote that includes things you don't need is how you end up distrusting the whole bid.",
      "The case that gets undersold is the two-story elevation. On a Somerset hillside house or a taller Bridle Trails rebuild, the gutter line is high enough that twice-yearly cleanouts mean a ladder on sloped ground — and that's a safety decision as much as a maintenance one. If you're currently doing that yourself, it's the strongest argument for guards we can make, independent of how much debris your lot actually gets.",
    ],
    bullets: [
      "Micro-mesh for Bridle Trails fir and greenbelt-adjacent Lake Hills lots",
      "A straight 'you don't need these' on open Factoria and Wilburton lots",
      "Guards as a safety call on tall Somerset hillside elevations",
      "Downspout capacity reviewed at the same visit on cut-up rooflines",
    ],
    faqs: [
      {
        q: "Are gutter guards worth it in Bellevue?",
        a: "It depends on your specific lot more than on the city. Under the fir canopy in Bridle Trails or backing the Lake Hills greenbelt, clearly yes. On an open Factoria lot with nothing above the roof, no — and we'll tell you that rather than quoting them anyway.",
      },
      {
        q: "Do guards help with the needles from the greenbelt conifers?",
        a: "Micro-mesh does; coarse screens don't. Fine fir needles pass through anything coarse and then mat at the downspout inlet, which is the blockage that actually causes overflow and holds water against your fascia.",
      },
    ],
  },

  /* ── EDMONDS ────────────────────────────────────────────── */
  {
    city: "edmonds",
    service: "seamless-gutter-installation",
    metaTitle: "Seamless Gutter Installation in Edmonds, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Seamless gutter installation in Edmonds — salt-air hardware, Bowl-area Craftsman fascia, and view-conscious profiles on the bluff. Call (253) 498-5575.",
    h1: "Seamless Gutter Installation in Edmonds, WA",
    lead:
      "Two things drive an Edmonds install that don't matter much inland: how the gutter looks from the street, and how long the hardware survives salt air.",
    body: [
      "The Bowl — the older core sloping toward the ferry terminal — is Craftsman and 1940s-50s housing with steep pitches, original wood fascia, and a streetscape people care about. Profile and color are real decisions here rather than defaults, and the fascia behind those gutters has often been taking salt-laden moisture for decades. We inspect it as part of the install and repair what needs repairing before hanging anything, because bare or softened wood behind a gutter line in this climate deteriorates faster than most homeowners expect.",
      "Salt air is the material question. Edmonds sits directly on Puget Sound, and low-grade fasteners and hangers corrode here in a way they simply don't in Lynnwood a few miles inland. Your gutter is held to the house entirely by that hardware, so the specification matters more than the trough gauge on any bid you're comparing. On the bluff and along Sunset Avenue you get wind on top of it, driving rain into the gutter line at angles a sheltered house never deals with, which puts a premium on how the run is hung and braced.",
      "On view homes the sightline is the point of the house. An oversized trough across a Sound-facing elevation, or a downspout dropped in the wrong place, takes away part of what the owner paid for. That's a conversation worth having at the estimate — where the downspouts go, what profile reads cleanest from inside, and how to keep the drainage right without cutting the view.",
    ],
    bullets: [
      "Corrosion-conscious hangers and fasteners, not inland-grade hardware",
      "Fascia behind Bowl-area gutters inspected and repaired before install",
      "Runs hung and braced for wind-driven rain on the bluff",
      "Profile and downspout placement chosen around Sound-facing sightlines",
    ],
    faqs: [
      {
        q: "How long will gutters last in Edmonds salt air?",
        a: "The aluminum trough holds up well; the hardware is what decides it. Hangers and fasteners are the first thing to go in salt air, and a run can sag while the gutter itself still looks new. When you compare bids here, compare what they specify for hardware, not just the price and the gauge.",
      },
      {
        q: "Can you install gutters without blocking my view?",
        a: "Yes, and it's worth planning rather than leaving to the crew on the day. Profile choice, color, and above all where the downspouts drop are what determine whether a system disappears into the elevation or cuts across it. We'll walk it with you before anything gets hung.",
      },
    ],
  },
  {
    city: "edmonds",
    service: "gutter-guards",
    metaTitle: "Gutter Guards in Edmonds, WA — Seamless Gutters 4 Less",
    metaDesc:
      "Gutter guards in Edmonds. Inland maple drops all at once and mats a downspout shut; exposed bluff lots often don't need guards. Call (253) 498-5575.",
    h1: "Gutter Guards in Edmonds, WA",
    lead:
      "Edmonds splits cleanly on this one: inland neighborhoods have a real leaf problem, and the exposed bluff mostly doesn't.",
    body: [
      "Seaview, Westgate, Perrinville, and the established streets back from the water carry heavy big-leaf maple, and maple is a different adversary from fir needle. It comes down in a concentrated few weeks, it's large and wet, and it forms a mat that can seal a downspout inlet in a single storm rather than clogging gradually over a season. The practical consequence is that the failure happens at the worst possible moment — during the fall storm you needed the gutter working for. A guard that keeps that mass out of the trough earns its place on these lots.",
      "Guard selection here is as much about fit as product. Wet leaf sits on top rather than sifting through, so what matters is enough open area and correct pitch for water to still get in while the mass sheds off the front. A very fine mesh fitted badly will push water over the edge in a hard downpour, which is a worse outcome than the clog you were trying to prevent. This is the part cheap guard installs get wrong, and it's not visible until the first real storm.",
      "Out on the bluff and along Sunset Avenue there's much less overhead canopy, and there guards become optional. What matters more on those exposed elevations is how the gutter is hung and what the hardware is made of, because wind-driven rain and salt air do more damage than debris ever will. We'd rather put your money there.",
    ],
    bullets: [
      "Guard choice matched to a heavy, concentrated maple leaf drop",
      "Fitted for open area and pitch so a wet mat doesn't shed water forward",
      "Optional on exposed bluff lots — hardware and hanging matter more there",
      "Downspout inlets checked, since that's where a leaf mat actually seals",
    ],
    faqs: [
      {
        q: "Do I need gutter guards in Edmonds?",
        a: "Inland — Seaview, Westgate, Perrinville — usually yes, because the big-leaf maples come down all at once and a wet mat can seal a downspout in one storm. On the exposed bluff with little overhead cover, they're optional, and we'd rather you spent the money on hardware that survives the salt air.",
      },
      {
        q: "Can a gutter guard make overflow worse?",
        a: "A badly fitted one can, yes. Heavy wet leaf sits on top of the guard, so if there isn't enough open area or the pitch is wrong, water runs over the front edge instead of into the trough. That's an installation-quality problem rather than a product problem, and it's the main reason we care how guards are fitted.",
      },
    ],
  },
];

/* Attach the parent city record so pages and the sitemap don't have to
 * re-resolve it. Fails loudly at import time on a typo'd slug rather
 * than shipping a page whose breadcrumb points nowhere. */
SERVICE_MATRIX.forEach((entry) => {
  const area = findArea(entry.city);
  if (!area) {
    throw new Error(
      `serviceMatrix: no service area for city slug "${entry.city}". ` +
        `Every matrix entry needs a parent city page in serviceAreas.js.`,
    );
  }
  if (!MATRIX_SERVICES[entry.service]) {
    throw new Error(
      `serviceMatrix: unknown service slug "${entry.service}" for ${entry.city}.`,
    );
  }
  entry.area = area;
  entry.serviceTitle = MATRIX_SERVICES[entry.service].title;
  entry.path = `/service-areas/${area.countySlug}/${area.slug}/${entry.service}/`;
});

export function findMatrixEntry(citySlug, serviceSlug) {
  return SERVICE_MATRIX.find(
    (e) => e.city === citySlug && e.service === serviceSlug,
  );
}

/* Matrix pages that exist for a given city — the city page uses this to
 * link its service cards at the more specific page where one exists. */
export function matrixForCity(citySlug) {
  return SERVICE_MATRIX.filter((e) => e.city === citySlug);
}

/* Same service, other cities — cross-links at the foot of each page. */
export function matrixForService(serviceSlug, excludeCity) {
  return SERVICE_MATRIX.filter(
    (e) => e.service === serviceSlug && e.city !== excludeCity,
  );
}

export const SERVICE_MATRIX_PATHS = SERVICE_MATRIX.map((e) => e.path);
