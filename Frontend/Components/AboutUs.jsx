import ScrollReveal3D from "./ScrollReveal3D";
import { useState } from "react";

const leadership = [
  {
    name: "Rana Kaif Ullah",
    role: "Chief Executive Officer (CEO)",
    image: "/images/leadership/Rana kaif Ullah.png",
    initials: "CB",
  },
  {
    name: "Abdullah Shafiq",
    role: "Director",
    image: "/images/leadership/Abdullah Shafiq.png",
    initials: "VC",
  },
  {
    name: "Col. (Retd.) M.Zaka Ullah",
    role: "Director ",
    image: "/images/leadership/Muhammad Zaka Ullah.png",
    initials: "DG",
  },
  {
    name: "Syed Ali Raza Shah",
    role: "Director",
    image: "/images/leadership/Syed Ali Raza Shah.png",
    initials: "BM",
  },
];

function LeadershipCard({ leader }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#14503E] to-[#0A342C] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition duration-500 hover:-translate-y-2 hover:border-[#C4ED70]/50 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]">
      <div className="relative aspect-[4/4.2] overflow-hidden bg-[#123B32]">
        {!imageError ? (
          <img
            src={leader.image}
            alt={leader.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_top,#23735A,#0A342C_70%)]">
            <span className="grid h-24 w-24 place-items-center rounded-full border border-[#C4ED70]/40 bg-[#C4ED70]/10 text-3xl font-bold text-[#C4ED70]">
              {leader.initials}
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
          {leader.role}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-[#FFFDF5]">
          {leader.name}
        </h3>
      </div>
    </article>
  );
}
const values = [
  {
    number: "01",
    title: "Practical learning",
    description: "Build useful skills through learning designed for real opportunities.",
  },
  {
    number: "02",
    title: "Inclusive access",
    description: "Help learners from different backgrounds move forward with confidence.",
  },
  {
    number: "03",
    title: "Community impact",
    description: "Connect learners, mentors and partners to create lasting progress.",
  },
];

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#073B31] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#B8E85B]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-[#D8B65A]/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Text content */}
        <div>
          <ScrollReveal3D as="div" direction="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B8E85B]/30 bg-[#B8E85B]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D2F28D] sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#B8E85B]" />
              About PSCDB
            </span>
          </ScrollReveal3D>

          <ScrollReveal3D as="div" direction="left" delay={100}>
            <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight text-[#FFFDF5] sm:text-5xl lg:text-6xl">
              Skills that open doors.
              <span className="mt-2 block text-[#C4ED70]">
                Communities that move forward.
              </span>
            </h2>
          </ScrollReveal3D>

          <ScrollReveal3D as="div" direction="left" delay={180}>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#E1EBDF] sm:text-lg">
              The Pakistan Skills and Community Development Board works to
              connect people with practical learning, guidance and pathways
              toward a stronger future.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#BDCEC0] sm:text-base">
              We bring learners, educators, donors and community partners
              together to make skill development more accessible and create
              opportunities that can make a meaningful difference.
            </p>
          </ScrollReveal3D>

          <ScrollReveal3D as="div" direction="left" delay={260}>
            <a
              href="#programmes"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#C4ED70] px-6 py-3.5 text-sm font-bold text-[#123B2B] shadow-[0_10px_35px_rgba(196,237,112,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#D7F69A] hover:shadow-[0_16px_40px_rgba(196,237,112,0.3)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C4ED70]/40"
            >
              Explore our programmes
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </ScrollReveal3D>
        </div>

        {/* Values panel */}
        <ScrollReveal3D as="div" direction="right" delay={120}>
          <div className="relative">
            {/* Decorative orbit */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-5 -top-6 h-28 w-28 rounded-full border border-[#C4ED70]/25 motion-safe:animate-[spin_24s_linear_infinite] motion-reduce:animate-none sm:-right-7 sm:-top-8 sm:h-36 sm:w-36"
            >
              <span className="absolute left-3 top-5 h-3 w-3 rounded-full bg-[#D8B65A] shadow-[0_0_18px_rgba(216,182,90,0.8)]" />
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#F6F3E8] p-6 text-[#123B2B] shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#C4ED70]/35 blur-2xl"
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#55745D]">
                    What guides us
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Progress with purpose
                  </h3>
                </div>

                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#123B2B] text-[#C4ED70] shadow-lg">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                  >
                    <path
                      d="M12 3.5 14.5 9l6 .7-4.4 4.1 1.2 5.9L12 16.8l-5.3 2.9 1.2-5.9-4.4-4.1 6-.7L12 3.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative mt-7 space-y-3">
                {values.map((value) => (
                  <article
                    key={value.number}
                    className="group rounded-2xl border border-[#123B2B]/10 bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#8DBA42]/50 hover:bg-white hover:shadow-[0_12px_30px_rgba(18,59,43,0.1)] sm:p-5"
                  >
                    <div className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EAF3D8] text-sm font-extrabold text-[#42652D] transition-colors duration-300 group-hover:bg-[#C4ED70]">
                        {value.number}
                      </span>

                      <div>
                        <h4 className="font-semibold text-[#123B2B]">
                          {value.title}
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-[#5F7062]">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="relative mt-6 flex items-center gap-3 rounded-2xl bg-[#123B2B] px-5 py-4 text-white">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#C4ED70] text-lg font-bold text-[#123B2B]">
                  +
                </span>
                <p className="text-sm leading-6 text-[#E8F0E5]">
                  Creating opportunity through skills, support and collaboration.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal3D>
      </div>

      <div className="mx-auto mt-24 max-w-7xl">
  <ScrollReveal3D as="div" direction="up">
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4ED70] sm:text-sm">
        Our leadership
      </p>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#FFFDF5] sm:text-4xl lg:text-5xl">
        Guided by experience.
        <span className="block text-[#C4ED70]">Driven by community.</span>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#D5E9DD] sm:text-base">
        Meet the people guiding PSCDB’s mission, governance and community
        development work.
      </p>
    </div>
  </ScrollReveal3D>

  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {leadership.map((leader, index) => (
      <ScrollReveal3D
        key={leader.role}
        direction={index % 2 === 0 ? "left" : "right"}
        delay={index * 100}
      >
        <LeadershipCard leader={leader} />
      </ScrollReveal3D>
    ))}
  </div>
</div>
    </section>
  );
}