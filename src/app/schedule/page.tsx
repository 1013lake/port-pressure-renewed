import ScheduleCalendar from "@/components/schedule-calendar";
import CTA from "@/components/cta";

export default function SchedulePage() {
  return (
    <div className="pt-[72px]">
      <ScheduleCalendar />
      <CTA />
    </div>
  );
}

export const metadata = {
  title: "Schedule | Port Pressure Solutions — Port Alberni, BC",
  description:
    "Book your pressure washing appointment in Port Alberni. Check availability and schedule service across Vancouver Island.",
  openGraph: {
    title: "Schedule Your Pressure Washing | Port Pressure Solutions",
    description:
      "Book your pressure washing appointment in Port Alberni. Check availability and schedule service.",
    images: [{ url: "/pressurelogow.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
};
