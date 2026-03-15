interface TestimonialItem {
  name: string;
  location: string;
  text: string;
}

export interface TestimonialsProps {
  acf_fc_layout: "testimonials";
  tag_line?: string;
  title?: string;
  items?: TestimonialItem[];
}

export function Testimonials({
  tag_line = "Testimonials",
  title = "What Our Clients Say",
  items = [],
}: TestimonialsProps) {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            {tag_line}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="rounded-xl bg-white/5 border border-white/10 p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed">{t.text}</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-slate-400">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
