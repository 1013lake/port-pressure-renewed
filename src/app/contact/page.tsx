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
  title: "Contact | Port Pressure Solutions",
  description:
    "Get a free quote for pressure washing services on Vancouver Island. Contact Port Pressure Solutions today.",
};
