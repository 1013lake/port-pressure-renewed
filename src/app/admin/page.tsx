"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const weekdaySlots = ["5:00 PM", "7:00 PM", "9:00 PM"];
const weekendSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getSlotsForDate(year: number, month: number, date: number): string[] {
  const dayOfWeek = new Date(year, month, date).getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  return isWeekend ? weekendSlots : weekdaySlots;
}

function formatDateKey(year: number, month: number, date: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
}

export default function AdminPage() {
  const now = new Date();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number>(now.getDate());
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchBookedSlots = useCallback(async () => {
    try {
      const res = await fetch(`/api/bookings?year=${currentYear}&month=${currentMonth}`);
      if (res.ok) {
        const data = await res.json();
        setBookedSlots(data.booked || {});
      }
    } catch {
      // silently fail
    }
  }, [currentYear, currentMonth]);

  useEffect(() => {
    if (authed) fetchBookedSlots();
  }, [authed, fetchBookedSlots]);

  async function handleLogin() {
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ authCheck: true }),
      });
      if (res.status === 401) {
        setAuthError(true);
        return;
      }
      setAuthed(true);
      setAuthError(false);
    } catch {
      setAuthed(true);
    }
  }

  async function toggleSlot(date: number, time: string) {
    const dateStr = formatDateKey(currentYear, currentMonth, date);
    setToggling(`${date}-${time}`);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ date: dateStr, time }),
      });
      if (res.ok) {
        await fetchBookedSlots();
      }
    } catch {
      // silently fail
    }
    setToggling(null);
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek = getStartDayOfWeek(currentYear, currentMonth);
  const monthLabel = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  const daySlots = useMemo(() => {
    if (!selectedDay) return [];
    return getSlotsForDate(currentYear, currentMonth, selectedDay);
  }, [currentYear, currentMonth, selectedDay]);

  const dayBooked = bookedSlots[selectedDay] || [];

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400 text-sm mb-6">Enter your admin password to manage bookings.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
          />
          {authError && (
            <p className="mt-2 text-sm text-red-400">Wrong password. Try again.</p>
          )}
          <button
            onClick={handleLogin}
            className="mt-4 w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Booking Manager</h1>
            <p className="text-slate-400 mt-1">Click time slots to toggle them as booked or available.</p>
          </div>
          <button
            onClick={() => { setAuthed(false); setPassword(""); }}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2 rounded-xl bg-slate-800 border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                  else setCurrentMonth(currentMonth - 1);
                  setSelectedDay(1);
                }}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 transition-colors"
                aria-label="Previous month"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-white">{monthLabel}</h3>
              <button
                onClick={() => {
                  if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                  else setCurrentMonth(currentMonth + 1);
                  setSelectedDay(1);
                }}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 transition-colors"
                aria-label="Next month"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const date = i + 1;
                const isSelected = selectedDay === date;
                const dayBookedSlots = bookedSlots[date] || [];
                const hasBookings = dayBookedSlots.length > 0;
                const totalSlots = getSlotsForDate(currentYear, currentMonth, date).length;
                const isFullyBooked = dayBookedSlots.length >= totalSlots;

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDay(date)}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      isFullyBooked
                        ? "bg-black text-white/40 relative overflow-hidden"
                        : isSelected
                        ? "bg-accent text-white ring-2 ring-accent ring-offset-2 ring-offset-slate-800"
                        : "bg-slate-700/50 text-slate-200 hover:bg-slate-700"
                    }`}
                  >
                    {isFullyBooked && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="block w-[140%] h-[2px] bg-white/60 rotate-[-45deg]" />
                      </span>
                    )}
                    {date}
                    {hasBookings && !isFullyBooked && (
                      <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white" />
                <span className="text-sm text-slate-300">Has bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative h-3 w-3 rounded-full bg-black overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block w-[140%] h-[1px] bg-white/60 rotate-[-45deg]" />
                  </span>
                </span>
                <span className="text-sm text-slate-300">Fully booked</span>
              </div>
            </div>
          </div>

          {/* Slot management */}
          <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-white mb-1">
              {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Tap to toggle booked / available
            </p>

            <div className="space-y-2">
              {daySlots.map((time) => {
                const isBooked = dayBooked.includes(time);
                const isToggling = toggling === `${selectedDay}-${time}`;

                return (
                  <button
                    key={time}
                    onClick={() => toggleSlot(selectedDay, time)}
                    disabled={isToggling}
                    className={`w-full flex items-center justify-between rounded-lg px-4 py-3 border transition-colors ${
                      isBooked
                        ? "bg-black/50 border-white/10 hover:bg-black/70"
                        : "bg-slate-700/50 border-slate-600 hover:bg-slate-700"
                    } ${isToggling ? "opacity-50" : ""}`}
                  >
                    <div className="text-left">
                      <p className={`text-sm font-semibold ${isBooked ? "text-white/50 line-through" : "text-white"}`}>
                        {time}
                      </p>
                      {isBooked && (
                        <p className="text-xs text-white/30 mt-0.5">Booked - click to unbook</p>
                      )}
                    </div>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${
                      isBooked
                        ? "bg-black text-white"
                        : "bg-green-600/20 text-green-400"
                    }`}>
                      {isToggling ? "..." : isBooked ? "Booked" : "Available"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
