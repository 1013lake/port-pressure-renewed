"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type SlotStatus = "available" | "booked" | "unavailable";

interface TimeSlot {
  time: string;
  status: SlotStatus;
  service?: string;
}

interface DaySchedule {
  date: number;
  slots: TimeSlot[];
}

// Weekday evening slots (Mon-Fri: 5-10 PM)
const weekdaySlots = ["5:00 PM", "7:00 PM", "9:00 PM"];

// Weekend slots (Sat-Sun: 10-4)
const weekendSlots = ["11:00 AM", "1:00 PM", "3:00 PM"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function generateMonth(year: number, month: number): DaySchedule[] {
  const days: DaySchedule[] = [];
  const daysInMonth = getDaysInMonth(year, month);

  for (let d = 1; d <= daysInMonth; d++) {
    const dayOfWeek = new Date(year, month, d).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const timeOptions = isWeekend ? weekendSlots : weekdaySlots;

    const slots: TimeSlot[] = timeOptions.map((time) => ({
      time,
      status: "available" as SlotStatus,
    }));

    days.push({ date: d, slots });
  }

  return days;
}

export default function ScheduleCalendar() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number>(now.getDate());
  const router = useRouter();

  const monthData = useMemo(
    () => generateMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek = getStartDayOfWeek(currentYear, currentMonth);
  const monthLabel = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  function handlePrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(1);
  }

  function handleNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(1);
  }

  function handleBookSlot(date: number, time: string) {
    const params = new URLSearchParams({
      date: `${MONTH_NAMES[currentMonth]} ${date}, ${currentYear}`,
      time,
    });
    router.push(`/contact?${params.toString()}`);
  }

  const selectedSchedule = monthData.find((d) => d.date === selectedDay);

  return (
    <section className="bg-slate-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            Scheduling
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Book Your Appointment
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Check availability and schedule your pressure washing service.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2 rounded-xl bg-slate-700 border border-slate-600 p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-600 transition-colors"
                aria-label="Previous month"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-white text-center">
                {monthLabel}
              </h3>
              <button
                onClick={handleNextMonth}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-600 transition-colors"
                aria-label="Next month"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-slate-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = i + 1;
                const isSelected = selectedDay === date;
                const isToday =
                  date === now.getDate() &&
                  currentMonth === now.getMonth() &&
                  currentYear === now.getFullYear();

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDay(date)}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-slate-700"
                        : isToday
                        ? "bg-slate-600 text-white ring-1 ring-cyan-400"
                        : "bg-slate-800/50 text-slate-200 hover:bg-slate-600"
                    }`}
                  >
                    {date}
                    {!isSelected && (
                      <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm text-slate-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full ring-1 ring-cyan-400" />
                <span className="text-sm text-slate-300">Today</span>
              </div>
            </div>

            {/* Schedule note */}
            <p className="mt-4 text-center text-sm text-slate-400">
              Mon&ndash;Fri: 5&ndash;10 PM &nbsp;|&nbsp; Sat &amp; Sun: 10 AM&ndash;4 PM
            </p>
          </div>

          {/* Day detail */}
          <div className="rounded-xl bg-slate-700 border border-slate-600 p-6">
            <h3 className="text-lg font-bold text-white mb-1">
              {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Tap a time slot to book
            </p>

            <div className="space-y-2">
              {selectedSchedule?.slots.map((slot, i) => (
                <div
                  key={i}
                  onClick={() =>
                    slot.status === "available" &&
                    handleBookSlot(selectedDay, slot.time)
                  }
                  className="flex items-center justify-between rounded-lg px-4 py-3 bg-slate-800/50 border border-slate-600 hover:border-green-500/50 cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {slot.time}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors">
                    Book Now
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
