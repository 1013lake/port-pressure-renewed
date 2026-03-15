import Link from "next/link";
import Image from "next/image";

export interface HeroProps {
  acf_fc_layout: "hero";
  tag_line?: string;
  title?: string;
  highlight?: string;
  description?: string;
  cta_text?: string;
  cta_link?: string;
  secondary_text?: string;
  secondary_link?: string;
  bg_image?: string;
}

export function Hero({
  tag_line,
  title,
  highlight,
  description,
  cta_text = "Get a Free Quote",
  cta_link = "/contact",
  secondary_text = "View Services",
  secondary_link = "/services",
  bg_image,
}: HeroProps) {
  return (
    <section className="relative bg-navy pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {bg_image && (
        <div className="absolute inset-0">
          <Image
            src={bg_image}
            alt=""
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          {tag_line && (
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              {tag_line}
            </p>
          )}
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
            {highlight && <span className="text-accent"> {highlight}</span>}
          </h1>
          {description && (
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={cta_link}
              className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              {cta_text}
            </Link>
            <Link
              href={secondary_link}
              className="rounded-lg border border-white/20 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {secondary_text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
