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
  title: "Services | Port Pressure Solutions",
  description:
    "Pressure washing services including driveways, decks, siding, heavy equipment, bin cleaning, and more across Vancouver Island.",
};
