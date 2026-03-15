import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-navy pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/driveway.jpg"
          alt="Pressure washing"
          fill
          className="object-cover opacity-15"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Vancouver Island&apos;s Trusted Pressure Washing Pros
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            We make surfaces
            <span className="text-accent"> look brand new</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Professional pressure washing for homes and businesses across
            Vancouver Island. From driveways to heavy equipment, we bring the
            power to get the job done right.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="rounded-lg border border-white/20 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
