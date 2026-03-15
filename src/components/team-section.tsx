import Image from "next/image";

const people = [
  {
    name: "Dan Blake",
    role: "Owner / Operator",
    imageUrl: "/pressurelogow.png",
  },
  {
    name: "Brendo",
    role: "Company High Jacker",
    imageUrl: "/pressurelogow.png",
  },
  {
    name: "Rene",
    role: "Mentor",
    imageUrl: "/pressurelogow.png",
  },
];

export default function Team() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Our Team
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet the Crew
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Born and raised in Port Alberni, passionate about what we do and
            dedicated to delivering the best results.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <li
              key={person.name}
              className="flex items-center gap-5 rounded-xl bg-slate-700 border border-slate-600 p-6"
            >
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-navy">
                <Image
                  alt={person.name}
                  src={person.imageUrl}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {person.name}
                </h3>
                <p className="text-sm text-cyan-400">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
