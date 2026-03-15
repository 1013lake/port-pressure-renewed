import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";

const MAX_EMAILS_PER_DAY = 5;

function getBookingsStore() {
  const siteID = process.env.NETLIFY_SITE_ID || "";
  const token = process.env.NETLIFY_API_TOKEN || "";
  return getStore({ name: "bookings", siteID, token });
}

function getRateLimitStore() {
  const siteID = process.env.NETLIFY_SITE_ID || "";
  const token = process.env.NETLIFY_API_TOKEN || "";
  return getStore({ name: "ratelimit", siteID, token });
}

function todayKey(ip: string) {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return `email:${ip}:${date}`;
}

function parseDateToKey(dateStr: string): string | null {
  // Parse "March 15, 2026" → "2026-03-15"
  const months: Record<string, string> = {
    January: "01", February: "02", March: "03", April: "04",
    May: "05", June: "06", July: "07", August: "08",
    September: "09", October: "10", November: "11", December: "12",
  };
  const match = dateStr.match(/^(\w+)\s+(\d+),\s+(\d{4})$/);
  if (!match) return null;
  const [, monthName, day, year] = match;
  const mm = months[monthName];
  if (!mm) return null;
  return `${year}-${mm}-${day.padStart(2, "0")}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { success: false, error: "Email service not configured" },
      { status: 500 }
    );
  }

  // Rate limiting by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const rlStore = getRateLimitStore();
    const key = todayKey(ip);
    const current = await rlStore.get(key);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= MAX_EMAILS_PER_DAY) {
      return NextResponse.json(
        { success: false, error: "Daily email limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }

    await rlStore.set(key, String(count + 1));
  } catch {
    // If blobs unavailable (local dev), skip rate limiting
  }

  const resend = new Resend(apiKey);
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  try {
    const { error } = await resend.emails.send({
      from: "Port Pressure <noreply@portpressure.alberni.dev>",
      to: "general_blake@hotmail.com",
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // If this was a booking (message contains date/time), mark the slot as booked
    const dateMatch = message.match(/on (\w+ \d+, \d{4}) at ([\d:]+ [AP]M)/);
    if (dateMatch) {
      const [, dateStr, time] = dateMatch;
      const dateKey = parseDateToKey(dateStr);
      if (dateKey) {
        try {
          const store = getBookingsStore();
          const key = `slots:${dateKey}`;
          const existing = await store.get(key);
          const slots: string[] = existing ? JSON.parse(existing) : [];
          if (!slots.includes(time)) {
            slots.push(time);
            await store.set(key, JSON.stringify(slots));
          }
        } catch {
          // Blob write failed, non-critical
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unknown error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
