const serviceAreas = [
  "Port Alberni",
  "Qualicum Beach",
  "Parksville",
  "Courtenay",
  "Campbell River",
  "Nanaimo",
  "Duncan",
  "Ladysmith",
];

export default function ServiceAreaMap() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base font-semibold uppercase tracking-widest text-cyan-400">
            Where We Work
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Service Area
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Based in Port Alberni, serving communities across Vancouver Island.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          <div className="rounded-xl overflow-hidden border border-white/10 h-[400px]">
            <iframe
              title="Port Pressure Service Area - Port Alberni, BC"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.09!2d-124.88!3d49.2338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5488a45314241e1d%3A0x50135152a7b0fd0!2sPort%20Alberni%2C%20BC%2C%20Canada!5e0!3m2!1sen!2sca!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Communities We Serve
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {serviceAreas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-slate-300">
                  <svg
                    className="h-5 w-5 text-cyan-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-400">
              Don&apos;t see your area? Contact us — we may still be able to
              help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
