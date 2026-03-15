import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

const isNetlify = !!process.env.NETLIFY;

// --- Local JSON fallback for dev (dynamic imports to avoid bundling fs on Netlify) ---
async function readLocalBookings(): Promise<Record<string, string[]>> {
  try {
    const { readFile } = await import("fs/promises");
    const { join } = await import("path");
    const file = join(process.cwd(), ".bookings", "slots.json");
    const data = await readFile(file, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeLocalBookings(data: Record<string, string[]>) {
  const { mkdir, writeFile } = await import("fs/promises");
  const { join } = await import("path");
  const dir = join(process.cwd(), ".bookings");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "slots.json"), JSON.stringify(data, null, 2));
}

// --- Netlify Blobs ---
function getBookingsStore() {
  return getStore("bookings");
}

function dateKey(date: string) {
  return `slots:${date}`;
}

function checkAdmin(req: Request): boolean {
  const password = req.headers.get("x-admin-password");
  return password === process.env.ADMIN_PASSWORD;
}

// GET: return booked slots for a given month/year
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  if (!year || !month) {
    return NextResponse.json({ error: "year and month required" }, { status: 400 });
  }

  if (!isNetlify) {
    const all = await readLocalBookings();
    const booked: Record<string, string[]> = {};
    const daysInMonth = new Date(Number(year), Number(month) + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(Number(month) + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      if (all[key]?.length) booked[d] = all[key];
    }
    return NextResponse.json({ booked });
  }

  try {
    const store = getBookingsStore();
    const daysInMonth = new Date(Number(year), Number(month) + 1, 0).getDate();
    const booked: Record<string, string[]> = {};

    const reads = Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      const key = dateKey(`${year}-${String(Number(month) + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
      return store.get(key).then((val) => {
        if (val) booked[d] = JSON.parse(val);
      });
    });
    await Promise.all(reads);

    return NextResponse.json({ booked });
  } catch (err) {
    return NextResponse.json({ booked: {}, error: String(err) });
  }
}

// POST: toggle a slot (book or unbook) — admin only
export async function POST(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date, time, authCheck } = await req.json();

  if (authCheck) {
    return NextResponse.json({ success: true });
  }

  if (!date || !time) {
    return NextResponse.json({ error: "date and time required" }, { status: 400 });
  }

  if (!isNetlify) {
    const all = await readLocalBookings();
    const slots = all[date] || [];

    let action: "booked" | "unbooked";
    if (slots.includes(time)) {
      slots.splice(slots.indexOf(time), 1);
      action = "unbooked";
    } else {
      slots.push(time);
      action = "booked";
    }

    if (slots.length > 0) {
      all[date] = slots;
    } else {
      delete all[date];
    }

    await writeLocalBookings(all);
    return NextResponse.json({ success: true, action, slots });
  }

  try {
    const store = getBookingsStore();
    const key = dateKey(date);
    const existing = await store.get(key);
    const slots: string[] = existing ? JSON.parse(existing) : [];

    let action: "booked" | "unbooked";
    if (slots.includes(time)) {
      slots.splice(slots.indexOf(time), 1);
      action = "unbooked";
    } else {
      slots.push(time);
      action = "booked";
    }

    if (slots.length > 0) {
      await store.set(key, JSON.stringify(slots));
    } else {
      await store.delete(key);
    }

    return NextResponse.json({ success: true, action, slots });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update booking", detail: String(err) },
      { status: 500 }
    );
  }
}
