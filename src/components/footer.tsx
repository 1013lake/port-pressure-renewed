import Link from "next/link";

const locations = [
  "Port Alberni",
  "Qualicum Beach",
  "Parksville",
  "Courtenay",
  "Campbell River",
  "Nanaimo",
  "Duncan",
  "Ladysmith",
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold">Port Pressure</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Professional pressure washing services across Vancouver Island.
              Residential and commercial.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Pages
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Schedule", href: "/schedule" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-2">
              {locations.map((loc) => (
                <li key={loc} className="text-sm text-slate-300">
                  {loc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Follow Us
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Port Pressure Solutions. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
