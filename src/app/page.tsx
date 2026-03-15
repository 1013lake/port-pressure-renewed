import Hero from "@/components/hero";
import Services from "@/components/services";
import Testimonials from "@/components/testimonial";
import ServiceAreaMap from "@/components/service-area-map";
import CTA from "@/components/cta";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Port Pressure Solutions",
  description:
    "Professional pressure washing services in Port Alberni and across Vancouver Island. Driveways, decks, siding, heavy equipment, and more.",
  url: "https://portpressure.netlify.app",
  logo: "https://portpressure.netlify.app/pressurelogow.png",
  image: "https://portpressure.netlify.app/pressurelogow.png",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Alberni",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Port Alberni" },
    { "@type": "City", name: "Qualicum Beach" },
    { "@type": "City", name: "Parksville" },
    { "@type": "City", name: "Courtenay" },
    { "@type": "City", name: "Campbell River" },
    { "@type": "City", name: "Nanaimo" },
    { "@type": "City", name: "Duncan" },
    { "@type": "City", name: "Ladysmith" },
  ],
  serviceType: [
    "Pressure Washing",
    "Driveway Cleaning",
    "Deck and Fence Cleaning",
    "Exterior House Washing",
    "Heavy Machinery Cleaning",
    "Graffiti Removal",
    "Gutter Cleaning",
  ],
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "16:00",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <ServiceAreaMap />
      <Testimonials />
      <CTA />
    </>
  );
}

export const metadata = {
  title: "Port Pressure Solutions | Port Alberni Pressure Washing",
  description:
    "Professional pressure washing services in Port Alberni and across Vancouver Island. Driveways, decks, siding, heavy equipment, and more.",
  keywords: [
    "pressure washing Port Alberni",
    "Port Alberni pressure washing",
    "pressure washing",
    "power washing",
    "Vancouver Island pressure washing",
    "Port Pressure Solutions",
    "portpressure",
    "cleaning services Port Alberni",
  ],
  openGraph: {
    title: "Port Pressure Solutions | Port Alberni Pressure Washing",
    description:
      "Professional pressure washing services in Port Alberni and across Vancouver Island.",
    images: [{ url: "/pressurelogow.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
};
