/*
 * JSON-LD generators. Each function returns a plain object that can be
 * serialized via <script type="application/ld+json">. Keep this file the
 * only place schema is defined — pages compose schemas, not invent them.
 */

import { SITE } from "../data/site";

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
    priceRange: "$$",
    foundingDate: String(SITE.founded),
    description: SITE.description,
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
    areaServed: SITE.countiesServed.map((c) => ({
      "@type": "AdministrativeArea",
      name: `${c}, ${SITE.address.regionFull}`,
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
