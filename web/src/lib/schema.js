/*
 * JSON-LD generators. Each function returns a plain object that can be
 * serialized via <script type="application/ld+json">. Keep this file the
 * only place schema is defined — pages compose schemas, not invent them.
 */

import { SITE } from "../data/site";
import { SERVICES } from "../data/services";

const baseUrl = SITE.website;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${baseUrl}#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: baseUrl,
    telephone: SITE.phone.raw,
    email: SITE.email,
    image: `${baseUrl}/og-default.jpg`,
    logo: `${baseUrl}/logo.png`,
    priceRange: "$$",
    foundingDate: String(SITE.founded),
    slogan: SITE.tagline,
    description: SITE.description,
    /* Topical entity signals — help answer engines connect this business to
     * the concepts buyers ask about ("who installs seamless gutters in
     * Tacoma?"). Entity Authority is the single lowest-scoring axis in the
     * AI-visibility audits, so we spell the entity out explicitly. */
    knowsAbout: [
      "Seamless gutter installation",
      "Gutter replacement",
      "Gutter guards",
      "Soffit and fascia repair",
      "Gutter cleaning",
      "Rain gutter drainage",
      "Pacific Northwest home exterior maintenance",
    ],
    keywords:
      "seamless gutters Tacoma, gutter installation Tacoma WA, gutter repair Tacoma, seamless gutters Seattle, gutter guards Puget Sound, veteran-owned gutter company Washington",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.2529,
      longitude: -122.4443,
    },
    areaServed: [
      ...SITE.countiesServed.map((c) => ({
        "@type": "AdministrativeArea",
        name: `${c}, ${SITE.address.regionFull}`,
      })),
      ...SITE.primaryCities.map((city) => ({
        "@type": "City",
        name: `${city}, ${SITE.address.region}`,
      })),
    ],
    /* WA Department of Labor & Industries contractor license — a
     * verifiable, government-issued identifier. This is the strongest
     * single "this is a real, distinct business" signal we can emit, and it
     * was previously absent from the structured data entirely. */
    identifier: {
      "@type": "PropertyValue",
      propertyID: "WA L&I Contractor License",
      value: SITE.license,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Contractor License",
      name: `Washington State Contractor License ${SITE.license}`,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "Washington State Department of Labor & Industries",
        url: "https://secure.lni.wa.gov/verify/",
      },
    },
    paymentAccepted: "Cash, Check, Credit Card",
    currenciesAccepted: "USD",
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        url: `${baseUrl}/services/${s.slug}/`,
      },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: SITE.hours.weekdays.open,
        closes: SITE.hours.weekdays.close,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: SITE.hours.saturday.open,
        closes: SITE.hours.saturday.close,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(SITE.rating.value),
      reviewCount: String(SITE.rating.count),
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@id": `${baseUrl}#business` },
    areaServed: SITE.countiesServed.map((c) => ({
      "@type": "AdministrativeArea",
      name: `${c}, ${SITE.address.regionFull}`,
    })),
    description: service.short || service.desc,
    url: `${baseUrl}/services/${service.slug}/`,
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

/*
 * FAQPage schema — the highest-leverage structured data for AI search and
 * answer engines. Each Q&A becomes a Question/acceptedAnswer pair that
 * Google, Bing, and LLM-backed search can lift directly into a rich result
 * or a generated answer.
 *
 * `faqs` is the ALL_FAQS array from data/faqs.js: [{ q, a: [para, ...] }].
 * The answer paragraphs are joined into a single string so the schema text
 * matches exactly what the page renders (a requirement for FAQ rich
 * results). Google forbids HTML tags other than a small allow-list here, so
 * we emit plain text.
 */
export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/faq/#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(a) ? a.join("\n\n") : a,
      },
    })),
  };
}

/*
 * WebSite node. Establishes the domain itself as an entity and ties it to
 * the business (publisher), which helps search and answer engines resolve
 * "seamlessgutters4less.com" to the Seamless Gutters 4 Less organization
 * rather than treating the pages as unattributed content.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-US",
    publisher: { "@id": `${baseUrl}#business` },
  };
}

export function reviewSchema(reviews) {
  return reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(r.rating),
      bestRating: "5",
    },
    author: { "@type": "Person", name: r.name },
    reviewBody: r.text,
    itemReviewed: { "@id": `${baseUrl}#business` },
  }));
}
