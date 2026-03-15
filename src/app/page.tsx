import Hero from "@/components/hero";
import Services from "@/components/services";
import Testimonials from "@/components/testimonial";
import ServiceAreaMap from "@/components/service-area-map";
import CTA from "@/components/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ServiceAreaMap />
      <Testimonials />
      <CTA />
    </>
  );
}

export const metadata = {
  title: "Port Pressure Solutions | Vancouver Island Pressure Washing",
  description:
    "Professional pressure washing services for homes and businesses across Vancouver Island. Driveways, decks, siding, heavy equipment, and more.",
  keywords: [
    "pressure washing",
    "Vancouver Island",
    "Port Alberni",
    "power washing",
    "cleaning services",
  ],
  openGraph: {
    title: "Port Pressure Solutions | Vancouver Island Pressure Washing",
    description:
      "Professional pressure washing services for homes and businesses across Vancouver Island.",
    images: [{ url: "/pressurelogow.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
};
