import { Suspense } from "react";
import ContactForm from "@/components/contact-form";
import Team from "@/components/team-section";

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <Suspense>
        <ContactForm />
      </Suspense>
      <Team />
    </div>
  );
}

export const metadata = {
  title: "Contact | Port Pressure Solutions — Port Alberni, BC",
  description:
    "Get a free quote for pressure washing services in Port Alberni and across Vancouver Island. Contact Port Pressure Solutions today.",
  openGraph: {
    title: "Contact Port Pressure Solutions",
    description:
      "Get a free quote for pressure washing services in Port Alberni and across Vancouver Island.",
    images: [{ url: "/pressurelogow.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
};
