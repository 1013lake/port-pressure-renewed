import Image from "next/image";

const services = [
  {
    name: "Driveway & Cement Cleaning",
    description:
      "Remove years of grime, oil stains, and buildup from concrete and paved surfaces.",
    image: "/driveway.jpg",
  },
  {
    name: "Heavy Machinery Cleaning",
    description:
      "Industrial-grade cleaning for excavators, loaders, and heavy equipment.",
    image: "/980clean.jpg",
  },
  {
    name: "Exterior House Wash",
    description:
      "Gentle yet thorough cleaning of siding, stucco, and exterior walls.",
    image: "/siding.png",
  },
  {
    name: "Deck & Fence Cleaning",
    description:
      "Restore the natural beauty of your wood or composite outdoor surfaces.",
    image: "/wood.png",
  },
  {
    name: "Bin & Dumpster Pad Cleaning",
    description:
      "Eliminate odors and bacteria from garbage bins and commercial dumpster areas.",
    image: "/bluetrash.jpg",
  },
  {
    name: "Graffiti Removal",
    description:
      "Professional removal of graffiti from brick, concrete, and painted surfaces.",
    image: "/graffiti.jpg",
  },
  {
    name: "Walkway & Brick Cleaning",
    description:
      "Bring walkways, patios, and brick surfaces back to their original look.",
    image: "/brick.jpg",
  },
  {
    name: "Gutter Cleaning",
    description:
      "Clear out debris and buildup to keep your gutters flowing properly.",
    image: "/gutter.jpg",
  },
];

export default function Services() {
  return (
    <section className="bg-slate-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            What We Do
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            From residential to commercial, we have the tools and expertise to
            handle any cleaning job.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="group relative overflow-hidden rounded-xl bg-slate-700 border border-slate-600 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
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
