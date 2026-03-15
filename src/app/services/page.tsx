import Services from "@/components/services";
import Pricing from "@/components/pricing-sections";
import CTA from "@/components/cta";

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <Services />
      <Pricing />
      <CTA />
    </div>
  );
}

export const metadata = {
  title: "Pressure Washing Services | Port Pressure Solutions — Port Alberni, BC",
  description:
    "Pressure washing services in Port Alberni including driveways, decks, siding, heavy equipment, bin cleaning, and more across Vancouver Island.",
  openGraph: {
    title: "Pressure Washing Services | Port Pressure Solutions",
    description:
      "Pressure washing services in Port Alberni including driveways, decks, siding, heavy equipment, and more.",
    images: [{ url: "/pressurelogow.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
};
