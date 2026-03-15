"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const date = searchParams.get("date");
    const time = searchParams.get("time");
    if (date && time) {
      setMessage(
        `I'd like to book an appointment on ${date} at ${time}.\n\nService needed: `
      );
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const date = searchParams.get("date");
  const time = searchParams.get("time");

  return (
    <section className="bg-slate-800 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            Get In Touch
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Request a Free Quote
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
        </div>

        {date && time && (
          <div className="mt-8 rounded-lg bg-accent/20 border border-accent/30 px-5 py-4 text-center">
            <p className="text-base font-semibold text-white">
              Booking for {date} at {time}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-200"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1.5 block w-full rounded-lg border border-slate-500 bg-slate-600 px-4 py-3 text-white placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1.5 block w-full rounded-lg border border-slate-500 bg-slate-600 px-4 py-3 text-white placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-200"
            >
              Phone Number <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="mt-1.5 block w-full rounded-lg border border-slate-500 bg-slate-600 px-4 py-3 text-white placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
              placeholder="(250) 555-1234"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-200"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 block w-full rounded-lg border border-slate-500 bg-slate-600 px-4 py-3 text-white placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none resize-y"
              placeholder="Describe what you need cleaned..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg bg-accent px-8 py-3 text-base font-semibold text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-slate-700 disabled:opacity-50 transition-colors"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>

          {status === "sent" && (
            <p className="text-center text-green-400 font-medium">
              Message sent! We&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-red-400 font-medium">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
