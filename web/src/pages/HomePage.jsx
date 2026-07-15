import { useState } from "react";
import Hero from "../components/Hero";
import LeadCaptureSection from "../components/LeadCaptureSection";
import TrustBadgeBar from "../components/TrustBadgeBar";
import CityMarquee from "../components/CityMarquee";
import Services from "../components/Services";
import Process from "../components/Process";
import TrustStack from "../components/TrustStack";
import WhyPnw from "../components/WhyPnw";
import Gallery from "../components/Gallery";
import DiscountBand from "../components/DiscountBand";
import ReviewsMarquee from "../components/ReviewsMarquee";
import CustomerVideos from "../components/CustomerVideos";
import EstimatorSection from "../components/EstimatorSection";
import FinalCta from "../components/FinalCta";
import EstimateModal from "../components/EstimateModal";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { localBusinessSchema, websiteSchema, reviewSchema, breadcrumbSchema } from "../lib/schema";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { REVIEWS } from "../data/reviews";

export default function HomePage() {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const openEstimate = () => setEstimateOpen(true);

  useDocumentMeta({
    title:
      "Seamless Gutters Tacoma & Puget Sound | Seamless Gutters 4 Less",
    description:
      "Veteran-owned seamless gutter installation, replacement, guards & repair in Tacoma and across the Puget Sound. Same-week free estimates. 21+ years, 5★ on Google. Call (253) 498-5575.",
    path: "/",
  });

  const schemas = [
    localBusinessSchema(),
    websiteSchema(),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
    ...reviewSchema(REVIEWS),
  ];

  return (
    <>
      <SchemaJsonLd data={schemas} id="home" />
      <Hero onEstimate={openEstimate} />
      <LeadCaptureSection />
      <TrustBadgeBar />
      <CityMarquee />
      <Services />
      <Process />
      <TrustStack />
      <WhyPnw />
      <Gallery />
      <DiscountBand />
      <ReviewsMarquee />
      <CustomerVideos />
      <EstimatorSection onEstimate={openEstimate} />
      <FinalCta onEstimate={openEstimate} />
      <EstimateModal open={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </>
  );
}
