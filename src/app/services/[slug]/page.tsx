import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import { services, getServiceBySlug } from "@/data/services";
import type { Metadata } from "next";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | Port Pressure Solutions — Port Alberni, BC`,
    description: `${service.shortDescription} Professional pressure washing in Port Alberni and across Vancouver Island.`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative bg-navy">
        <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            priority
            className="object-cover brightness-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {service.name}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price badge */}
      <section className="bg-slate-800">
        <div className="mx-auto max-w-4xl px-6 -mt-6 relative z-10">
          <div className="inline-flex items-center gap-3 rounded-xl bg-accent px-6 py-3 shadow-lg">
            <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
              Starting at
            </span>
            <span className="text-2xl font-bold text-white">
              {service.price}
            </span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="bg-slate-800 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">
            About This Service
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            {service.description}
          </p>
        </div>
      </section>

      {/* Benefits & Process */}
      <section className="bg-slate-700 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Why Choose This Service
            </h2>
            <ul className="space-y-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 flex-shrink-0 mt-0.5 text-cyan-400" />
                  <span className="text-base text-slate-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Our Process
            </h2>
            <ol className="space-y-4">
              {service.process.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-base text-slate-200 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Contact us for a free quote or book your appointment online.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="rounded-lg bg-accent px-8 py-3 text-base font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/schedule"
              className="rounded-lg border border-cyan-400 px-8 py-3 text-base font-semibold text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
          <Link
            href="/services"
            className="mt-6 inline-block text-sm text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back to All Services
          </Link>
        </div>
      </section>
    </div>
  );
}
