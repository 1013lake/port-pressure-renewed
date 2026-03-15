import Image from "next/image";

interface ServiceItem {
  name: string;
  description: string;
  image?: string;
}

export interface ServicesProps {
  acf_fc_layout: "services";
  tag_line?: string;
  title?: string;
  description?: string;
  items?: ServiceItem[];
}

export function Services({
  tag_line = "What We Do",
  title = "Our Services",
  description,
  items = [],
}: ServicesProps) {
  return (
    <section className="bg-slate-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            {tag_line}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-slate-300">{description}</p>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service) => (
            <div
              key={service.name}
              className="group relative overflow-hidden rounded-xl bg-slate-700 border border-slate-600 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              {service.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-base font-semibold text-white">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
