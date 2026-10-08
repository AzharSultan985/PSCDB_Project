import { useState } from "react";
import ScrollReveal3D from "./ScrollReveal3D";

const directors = [
  {
    name: "Rana Kaif Ullah",
    role: "Chief Executive Officer (CEO)",
    image: "/images/leadership/Rana kaif Ullah.png",
    initials: "RKU",
  },
  {
    name: "Syed Ali Raza Shah",
    role: "Director",
    image: "/images/leadership/Syed Ali Raza Shah.png",
    initials: "SRS",
  },
  {
    name: "Col. (Retd.) M. Zaka Ullah",
    role: "Director",
    image: "/images/leadership/Muhammad Zaka Ullah.png",
    initials: "MZU",
  },
  {
    name: "Abdullah Shafiq",
    role: "Director",
    image: "/images/leadership/Abdullah Shafiq.png",
    initials: "AS",
  },
];
const cabinetMembers = [
  {
    name: "Demo Cabinet Member 01",
    role: "Programme Coordination · Demo",
    image: null,
    initials: "D1",
  },
  {
    name: "Demo Cabinet Member 02",
    role: "Community Outreach · Demo",
    image: null,
    initials: "D2",
  },
  {
    name: "Demo Cabinet Member 03",
    role: "Training Support · Demo",
    image: null,
    initials: "D3",
  },
  {
    name: "Demo Cabinet Member 04",
    role: "Partnerships Support · Demo",
    image: null,
    initials: "D4",
  },
];
function DirectorCard({ director }) {
  const [imageError, setImageError] = useState(false);

  return (
    
    <article className="group overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#14503E] to-[#0A342C] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition duration-500 hover:-translate-y-2 hover:border-[#C4ED70]/50 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)] motion-reduce:transition-none">
      <div className="relative aspect-[4/4.2] overflow-hidden bg-[#123B32]">
        {!imageError ? (
          <img
            src={director.image}
            alt={director.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_top,#23735A,#0A342C_70%)]">
            <span className="grid h-24 w-24 place-items-center rounded-full border border-[#C4ED70]/40 bg-[#C4ED70]/10 text-2xl font-bold text-[#C4ED70]">
              {director.initials}
            </span>
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06271F] via-transparent to-transparent"
        />
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C4ED70]">
          {director.role}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-[#FFFDF5]">
          {director.name}
        </h3>
      </div>
    </article>
  );
}

 export default function BoardOfDirectors() {
  return (
    <>
      {/* Board of Directors */}
      <section
        id="directors"
        aria-labelledby="directors-heading"
        className="relative isolate overflow-hidden bg-[#073B31] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#B8E85B]/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl">
          <ScrollReveal3D as="div" direction="up">
            <header className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#B8E85B]/30 bg-[#B8E85B]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D2F28D] sm:text-sm">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#B8E85B]"
                />
                Governance
              </span>

              <h2
                id="directors-heading"
                className="mt-5 text-3xl font-semibold tracking-tight text-[#FFFDF5] sm:text-4xl lg:text-5xl"
              >
                Board of <span className="text-[#C4ED70]">Directors</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D5E9DD] sm:text-base">
                Meet the people guiding PSCDB’s mission and community
                development work.
              </p>
            </header>
          </ScrollReveal3D>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {directors.map((director, index) => (
              <ScrollReveal3D
                key={director.name}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
              >
                <DirectorCard director={director} />
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* Cabinet Members */}
      <section
        id="cabinet-members"
        aria-labelledby="cabinet-heading"
        className="relative isolate overflow-hidden border-t border-white/10 bg-[#073B31] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 -z-10 h-96 w-96 rounded-full bg-[#D8B65A]/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl">
          <ScrollReveal3D as="div" direction="up">
            <header className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D8B65A]/30 bg-[#D8B65A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E8CF8E] sm:text-sm">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#D8B65A]"
                />
                PSCDB Team
              </span>

              <h2
                id="cabinet-heading"
                className="mt-5 text-3xl font-semibold tracking-tight text-[#FFFDF5] sm:text-4xl lg:text-5xl"
              >
                Cabinet <span className="text-[#C4ED70]">Members</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D5E9DD] sm:text-base">
                Meet the members supporting PSCDB programs and community
                work.
              </p>
            </header>
          </ScrollReveal3D>

          {cabinetMembers.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cabinetMembers.map((member, index) => (
                <ScrollReveal3D
                  key={member.name}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 100}
                >
                  <DirectorCard director={member} />
                </ScrollReveal3D>
              ))}
            </div>
          ) : (
            <ScrollReveal3D as="div" direction="up" delay={120}>
              <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-9 text-center shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] sm:px-10">
                <span
                  aria-hidden="true"
                  className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-[#D8B65A]/25 bg-[#D8B65A]/10 text-xl text-[#E8CF8E]"
                >
                  +
                </span>

                <h3 className="mt-4 text-lg font-semibold text-[#FFFDF5]">
                  Cabinet profiles coming soon
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#BDCEC0]">
                  Cabinet member details will appear here once their names,
                  roles and photos are confirmed.
                </p>
              </div>
            </ScrollReveal3D>
          )}
        </div>
      </section>
    </>
  );
}