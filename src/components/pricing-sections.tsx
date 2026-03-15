import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const tiers = [
  {
    name: "Residential Bin Cleaning",
    price: "$30",
    period: "one-time",
    description:
      "One-time cleaning for your residential bins. Keep them fresh and odor-free.",
    features: [
      "$30 for a single bin cleaning",
      "$60 for all 3 bins",
      "Recycling, organics, and garbage",
      "Eco-friendly cleaning products",
    ],
    featured: false,
  },
  {
    name: "Commercial Dumpster Pad",
    price: "$350",
    period: "initial clean",
    description:
      "Deep cleaning for commercial dumpster pads with ongoing monthly maintenance.",
    features: [
      "$350 initial deep cleaning",
      "$200/month recurring maintenance",
      "Comprehensive deodorizing",
      "Priority scheduling",
    ],
    featured: true,
  },
];

const surfacePricing = [
  { name: "Driveways", price: "$0.40 / sq ft" },
  { name: "Deck & Patios", price: "$0.40 / sq ft" },
  { name: "House Exterior", price: "Starting at $250" },
  { name: "Industrial Machine Cleaning", price: "$150/hr (4hr min)" },
  { name: "Graffiti Removal & Gutter Cleaning", price: "Starting at $150" },
  { name: "Roofs", price: "Coming Soon", note: "Pending equipment expansion — available in a future update" },
];

const pricingFactors = [
  "Access & complexity (steep hillsides)",
  "Amount of organics buildup",
  "Delicate surfaces",
  "Surrounding plants & trees",
  "Travel time",
  "Insurance coverage",
];

export default function Pricing() {
  return (
    <section className="bg-slate-700 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            Pricing
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Flexible pricing for residential and commercial cleaning needs.
          </p>
          <p className="mt-3 text-base font-medium text-cyan-400">
            First-year customers receive exclusive discounts — contact us for details.
          </p>
        </div>

        {/* Surface pricing grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {surfacePricing.map((item) => (
            <div
              key={item.name}
              className={`rounded-xl bg-slate-800 border p-6 text-center ${item.note ? "border-slate-600/50 opacity-70" : "border-slate-600"}`}
            >
              <p className="text-base font-semibold text-slate-200">{item.name}</p>
              <p className={`mt-2 text-2xl font-bold ${item.note ? "text-slate-400" : "text-white"}`}>{item.price}</p>
              {item.note && (
                <p className="mt-2 text-xs text-slate-400">{item.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Key pricing factors */}
        <div className="mt-10 rounded-xl bg-navy ring-2 ring-accent p-6 max-w-2xl mx-auto">
          <h3 className="text-base font-semibold uppercase tracking-wider text-accent text-center">
            Key Pricing Factors
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pricingFactors.map((factor) => (
              <li key={factor} className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-base text-white">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bin & dumpster plans */}
        <div className="mt-16 grid max-w-lg mx-auto grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 lg:p-10 ${
                tier.featured
                  ? "bg-navy text-white ring-2 ring-accent"
                  : "bg-navy ring-2 ring-accent"
              }`}
            >
              <h3 className="text-lg font-semibold text-accent">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {tier.price}
                </span>
                <span className="text-base text-slate-400">/ {tier.period}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {tier.description}
              </p>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                    <span className="text-base text-slate-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 block rounded-lg px-4 py-3 text-center text-base font-semibold transition-colors ${
                  tier.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "bg-accent text-white hover:bg-accent-hover"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
