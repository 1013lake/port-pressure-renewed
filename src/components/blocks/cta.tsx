import Link from "next/link";

export interface CtaProps {
  acf_fc_layout: "cta";
  title?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
}

export function Cta({
  title = "Ready to get started?",
  description,
  button_text = "Get Your Free Quote",
  button_link = "/contact",
}: CtaProps) {
  return (
    <section className="bg-accent py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-blue-100">{description}</p>
        )}
        <Link
          href={button_link}
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-accent hover:bg-slate-100 transition-colors"
        >
          {button_text}
        </Link>
      </div>
    </section>
  );
}
