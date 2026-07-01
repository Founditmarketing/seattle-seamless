/*
 * Canonical FAQ content — the single source of truth for both the /faq/
 * page and the FAQPage JSON-LD (see lib/schema.js `faqSchema`).
 *
 * Why one file drives both: Google and AI answer engines require the
 * answer text in the structured data to MATCH the text visible on the
 * page. Rendering the page and the schema from the same array guarantees
 * they can never drift apart.
 *
 * Writing style is deliberately tuned for AI search / answer engines
 * (a.k.a. GEO / AEO):
 *   - Each answer is SELF-CONTAINED — it names the company, the region,
 *     and the specific fact, so a model can quote a single answer without
 *     needing the rest of the page for context.
 *   - Questions are phrased the way a person actually types or speaks them
 *     ("How much do new gutters cost?"), because that's what a retrieval
 *     model matches against.
 *   - Facts (counties, license #, hours, rating) come from data/site.js —
 *     never hard-code them here.
 *
 * Each answer is an array of paragraph strings. The page renders them as
 * <p> elements; the schema joins them with a blank line into one string.
 */

import { SITE } from "./site";

const counties = SITE.countiesServed
  .map((c) => c.replace(" County", ""))
  .reduce((str, c, i, arr) => {
    if (i === 0) return c;
    if (i === arr.length - 1) return `${str}, and ${c}`;
    return `${str}, ${c}`;
  }, "");

export const FAQ_CATEGORIES = [
  {
    id: "seamless-gutters-basics",
    title: "Seamless Gutters 101",
    items: [
      {
        q: "What are seamless gutters, and how are they different from sectional gutters?",
        a: [
          "Seamless gutters are custom-formed on-site in one continuous run with no joints along each straight length of your roofline. Seamless Gutters 4 Less extrudes them from a single coil of aluminum right on your driveway so they fit your home exactly.",
          "Sectional (retail) gutters come in pre-cut 10-foot segments that must be joined with seams, caulk, and screws. Those joints are where leaks start and where leaves and pine needles snag. Because seamless gutters remove the joints along each run, they leak less, clog less, and hold up far better in Pacific Northwest rain.",
        ],
      },
      {
        q: "What size gutters do I need for a Pacific Northwest home?",
        a: [
          "Most homes in the Puget Sound do well with standard 5-inch seamless gutters. Homes with steep roof pitches, large or metal roof runs, or spots where a lot of rain concentrates benefit from high-capacity 6-inch gutters.",
          "During a free estimate we size the gutters and place the downspouts to handle heavy PNW storms, so water is carried away from your fascia and foundation instead of overflowing.",
        ],
      },
      {
        q: "What gutter materials do you offer?",
        a: [
          "We install aluminum, copper, and stainless steel seamless gutters. Aluminum is lightweight, rust-resistant, cost-effective, and comes in many colors — it's the most popular choice for the Pacific Northwest's wet climate.",
          "Copper develops a natural patina over time and adds a high-end look, while stainless steel is extremely strong and rust-resistant for the harshest exposures. We'll recommend the right material for your home and budget during the estimate.",
        ],
      },
      {
        q: "Are seamless gutters worth it in a rainy climate like Seattle's?",
        a: [
          "Yes. The Puget Sound sees near-constant rain, needle drop, and moss, which is exactly the environment where sectional-gutter joints fail. Seamless gutters give water a smooth, uninterrupted path to the downspouts, so they clog and leak far less and protect your siding, fascia, and foundation better over the long run.",
        ],
      },
    ],
  },
  {
    id: "pricing-and-estimates",
    title: "Pricing & Estimates",
    items: [
      {
        q: "How much do new seamless gutters cost?",
        a: [
          "Every home is different, so we price each job after seeing your roofline, the total footage, the number of downspouts, and whether any fascia repair or gutter guards are involved. Rather than quote a generic number, we give you a free written estimate with fair, direct pricing and no hidden fees.",
          `Call Seamless Gutters 4 Less at ${SITE.phone.display} or request a free estimate online and we'll get you an exact price in writing.`,
        ],
      },
      {
        q: "Do you offer free estimates?",
        a: [
          `Yes — estimates are always free. Call ${SITE.phone.display} or request one online and we'll assess your gutters, fascia, and drainage, then hand you a written quote. There's never any pressure or obligation.`,
        ],
      },
      {
        q: "How long is a written quote good for?",
        a: [
          "Every quote is provided in writing and is good for one full year. The price we put on paper is the price you pay — no surprise upcharges once the work begins.",
        ],
      },
      {
        q: "Do you offer any discounts?",
        a: [
          "Yes. As a Washington Certified Veteran-Owned business, we're proud to offer a 10% discount to fellow veterans and active service members, along with senior discounts. Just mention it when you call and we'll apply it to your estimate.",
        ],
      },
      {
        q: "Are you licensed, bonded, and insured?",
        a: [
          `Yes. Seamless Gutters 4 Less is fully licensed, bonded, and insured in Washington State. Our WA contractor license number is ${SITE.license}, which you can verify through the Washington Department of Labor & Industries.`,
        ],
      },
    ],
  },
  {
    id: "process-and-timeline",
    title: "Process & Timeline",
    items: [
      {
        q: "How long does a gutter installation or replacement take?",
        a: [
          "A standard residential gutter replacement — pulling the old gutters and installing new seamless aluminum runs — takes our crew a single day. Larger or more complex homes may take longer, but most projects are done start-to-finish in one visit.",
          "We leave the property completely clean of scrap metal, old nails, and packaging before we go.",
        ],
      },
      {
        q: "What happens to my old gutters?",
        a: [
          "We handle the full teardown and disposal — old gutters, hangers, and downspouts are removed and hauled away. Before hanging the new system we inspect the fascia and repair any rot, then leave your property cleaner than we found it.",
        ],
      },
      {
        q: "Do you use subcontractors?",
        a: [
          "Never. Every gutter system is formed on-site and installed by our own trained, in-house crew. Zero subcontractors means consistent quality and one company that stands behind the work.",
        ],
      },
      {
        q: "How soon can you come out for an estimate?",
        a: [
          `We offer same-week estimates across our service area. Call ${SITE.phone.display} and we'll schedule a visit that fits your timeline.`,
        ],
      },
    ],
  },
  {
    id: "service-area",
    title: "Service Area",
    items: [
      {
        q: "What areas do you serve?",
        a: [
          `Seamless Gutters 4 Less serves the greater Seattle–Tacoma area and the wider Puget Sound, covering ${counties} counties in Washington. Our trucks run regular routes from Marysville down to Olympia, and from Gig Harbor out to Bremerton.`,
        ],
      },
      {
        q: "Do you serve Seattle, Tacoma, Gig Harbor, and Bellevue?",
        a: [
          `Yes. We're based in Tacoma and cover Tacoma, Gig Harbor, Seattle, Bellevue, and the surrounding cities throughout ${counties} counties. If you're in the greater Puget Sound, we most likely serve your neighborhood — call ${SITE.phone.display} to confirm.`,
        ],
      },
    ],
  },
  {
    id: "guards-and-maintenance",
    title: "Gutter Guards & Maintenance",
    items: [
      {
        q: "Are your gutter guards compatible with cedar shake or metal roofs?",
        a: [
          "Yes. Our gutter guards install directly onto the gutter lip and fascia board — they don't pierce your roof or void your shingle, cedar shake, or metal roof warranties. We offer several guard systems, including micro-mesh for the finest debris protection.",
        ],
      },
      {
        q: "Do gutter guards mean I'll never have to clean my gutters again?",
        a: [
          "Quality gutter guards dramatically reduce how often gutters need cleaning by keeping leaves, pine needles, and moss out of the trough. They make maintenance far easier, though the occasional inspection is still smart in a heavy-tree Pacific Northwest setting. We'll walk you through realistic expectations before you decide.",
        ],
      },
      {
        q: "How often should gutters be cleaned in the Pacific Northwest?",
        a: [
          "We recommend cleaning twice a year for most Puget Sound homes: once in late spring after needle drop and once in late fall after the leaves come down. Homes surrounded by heavy tree canopy may need more frequent visits.",
          "On every cleaning we hand-clear the troughs (no blowers pushing debris onto your roof or garden), flush the downspouts, and inspect hangers and seals to catch small problems early.",
        ],
      },
      {
        q: "Do you repair soffit and fascia?",
        a: [
          "Yes. Fascia and soffit are the structural backbone your gutters hang on, and hidden rot behind the gutter line is common in our climate. We replace damaged sections with primed cedar or composite, then re-hang your gutters clean on solid material.",
        ],
      },
    ],
  },
  {
    id: "company-and-trust",
    title: "About the Company",
    items: [
      {
        q: "Is Seamless Gutters 4 Less veteran-owned?",
        a: [
          "Yes. Seamless Gutters 4 Less is a Washington Certified Veteran-Owned business. It's a state-verified designation, and we honor it with a 10% discount for fellow veterans and active service members.",
        ],
      },
      {
        q: "How long have you been in business?",
        a: [
          `Seamless Gutters 4 Less has been serving the Puget Sound since ${SITE.founded} — more than ${SITE.yearsDisplay()} years — with decades of combined experience across our crew.`,
        ],
      },
      {
        q: "What is your rating and how many reviews do you have?",
        a: [
          `We hold a ${SITE.rating.value.toFixed(1)}-star rating on ${SITE.rating.source} from ${SITE.rating.count}+ verified customer reviews across the greater Seattle–Tacoma area.`,
        ],
      },
      {
        q: "How do I get in touch or request service?",
        a: [
          `Call or text us at ${SITE.phone.display}, or email ${SITE.email}. Our hours are Monday–Friday 7:00 AM–6:00 PM and Saturday 8:00 AM–4:00 PM (closed Sunday). You can also request a free estimate right from our website.`,
        ],
      },
    ],
  },
];

/* Flattened list of every Q&A — handy for the FAQPage schema generator. */
export const ALL_FAQS = FAQ_CATEGORIES.flatMap((cat) => cat.items);
