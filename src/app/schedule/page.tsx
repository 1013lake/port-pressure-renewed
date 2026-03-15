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
  title: "Schedule | Port Pressure Solutions",
  description:
    "Book your pressure washing appointment. Check availability and schedule service across Vancouver Island.",
};
