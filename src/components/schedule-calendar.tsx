"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
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
const weekendSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

// Approximate sunset hour (24h) for Port Alberni by month (avg mid-month, PST/PDT adjusted)
// Jan 4:30, Feb 5:30, Mar 7:15, Apr 8:00, May 8:45, Jun 9:15,
// Jul 9:10, Aug 8:30, Sep 7:30, Oct 6:20, Nov 4:30, Dec 4:15
const SUNSET_HOUR: Record<number, number> = {
  0: 16.5,  // Jan
  1: 17.5,  // Feb
  2: 19.25, // Mar (DST)
  3: 20,    // Apr
  4: 20.75, // May
  5: 21.25, // Jun
  6: 21.17, // Jul
  7: 20.5,  // Aug
  8: 19.5,  // Sep
  9: 18.33, // Oct
  10: 16.5, // Nov (DST ends)
  11: 16.25,// Dec
};

function parseSlotHour(time: string): number {
  const [rawH, rest] = time.split(":");
  const mins = parseInt(rest, 10);
  let h = parseInt(rawH, 10);
  const isPM = time.includes("PM");
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h + mins / 60;
}

function isAfterDark(month: number, time: string): boolean {
  return parseSlotHour(time) >= SUNSET_HOUR[month];
}

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
      status: isAfterDark(month, time) ? "unavailable" as SlotStatus : "available" as SlotStatus,
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

  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  const fetchBookedSlots = useCallback(async () => {
    try {
      const res = await fetch(`/api/bookings?year=${currentYear}&month=${currentMonth}`);
      if (res.ok) {
        const data = await res.json();
        setBookedSlots(data.booked || {});
      }
    } catch {
      // Silently fail on local dev / no blobs
    }
  }, [currentYear, currentMonth]);

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  const monthData = useMemo(() => {
    const base = generateMonth(currentYear, currentMonth);
    // Merge booked slots into the schedule
    for (const day of base) {
      const dayBooked = bookedSlots[day.date] || [];
      for (const slot of day.slots) {
        if (dayBooked.includes(slot.time)) {
          slot.status = "booked";
        }
      }
    }
    return base;
  }, [currentYear, currentMonth, bookedSlots]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek = getStartDayOfWeek(currentYear, currentMonth);
  const monthLabel = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  const minMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const minYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const canGoPrev = currentYear > minYear || (currentYear === minYear && currentMonth > minMonth);

  function handlePrevMonth() {
    if (!canGoPrev) return;
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
                disabled={!canGoPrev}
                className={`rounded-lg p-2 transition-colors ${canGoPrev ? "text-slate-300 hover:bg-slate-600" : "text-slate-600 cursor-not-allowed"}`}
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
                const cellDate = new Date(currentYear, currentMonth, date);
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const isPast = cellDate < today;
                const isSelected = selectedDay === date;
                const isToday =
                  date === now.getDate() &&
                  currentMonth === now.getMonth() &&
                  currentYear === now.getFullYear();
                const dayData = monthData.find((d) => d.date === date);
                const bookableSlots = dayData?.slots.filter((s) => s.status !== "unavailable") || [];
                const isFullyBooked = bookableSlots.length > 0 && bookableSlots.every((s) => s.status === "booked");
                const isBlocked = isPast || isFullyBooked;

                return (
                  <button
                    key={date}
                    onClick={() => !isBlocked && setSelectedDay(date)}
                    disabled={isBlocked}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      isPast
                        ? "bg-navy text-slate-600 cursor-not-allowed relative overflow-hidden"
                        : isFullyBooked
                        ? "bg-navy text-slate-600 cursor-not-allowed relative overflow-hidden"
                        : isSelected
                        ? "bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-slate-700"
                        : isToday
                        ? "bg-slate-600 text-white ring-1 ring-cyan-400"
                        : "bg-slate-800/50 text-slate-200 hover:bg-slate-600"
                    }`}
                  >
                    {(isPast || isFullyBooked) && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="block w-[140%] h-[2px] bg-cyan-400/60 rotate-[-45deg]" />
                      </span>
                    )}
                    {date}
                    {!isBlocked && !isSelected && (
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
              <div className="flex items-center gap-2">
                <span className="relative h-3 w-3 rounded-full bg-navy overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block w-[140%] h-[1px] bg-cyan-400/60 rotate-[-45deg]" />
                  </span>
                </span>
                <span className="text-sm text-slate-300">Fully Booked</span>
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
              {selectedSchedule?.slots.map((slot, i) => {
                const dark = slot.status === "unavailable";
                const booked = slot.status === "booked";
                const blocked = dark || booked;
                return (
                  <div
                    key={i}
                    onClick={() =>
                      !blocked &&
                      handleBookSlot(selectedDay, slot.time)
                    }
                    className={`flex items-center justify-between rounded-lg px-4 py-3 border ${
                      blocked
                        ? "bg-navy/60 border-slate-700 cursor-not-allowed opacity-50"
                        : "bg-slate-800/50 border-slate-600 hover:border-green-500/50 cursor-pointer"
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-semibold ${blocked ? "text-slate-500 line-through" : "text-white"}`}>
                        {slot.time}
                      </p>
                      {dark && (
                        <p className="text-xs text-slate-500 mt-0.5">After dark</p>
                      )}
                      {booked && (
                        <p className="text-xs text-slate-500 mt-0.5">Already booked</p>
                      )}
                    </div>
                    {booked ? (
                      <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-navy text-white">
                        Booked
                      </span>
                    ) : dark ? (
                      <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-700 text-slate-500">
                        Unavailable
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors">
                        Book Now
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
