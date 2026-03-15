import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-navy py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Contact us today for a free estimate. No job too big or too small.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-accent hover:bg-slate-100 transition-colors"
        >
          Get Your Free Quote
        </Link>
      </div>
    </section>
  );
}
