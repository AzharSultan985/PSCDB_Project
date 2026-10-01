import ScrollReveal3D from "./ScrollReveal3D";

const pathways = [
  {
    number: "01",
    title: "Skills Programmes",
    description:
      "Explore practical training designed to help you build skills for your next step.",
    linkText: "Explore programmes",
    href: "/programmes",
    icon: "learning",
    accent: "#A7E85A",
    hover:
      "hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(-5deg)_translateY(-7px)_translateZ(16px)] focus-visible:[transform:perspective(1100px)_rotateX(4deg)_rotateY(-5deg)_translateY(-7px)_translateZ(16px)]",
  },
  {
    number: "02",
    title: "Learner Support",
    description:
      "Discover guidance and support options that can help you continue learning.",
    linkText: "View learner support",
    href: "/learner-support",
    icon: "support",
    accent: "#F2C14E",
    hover:
      "hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(0deg)_translateY(-8px)_translateZ(18px)] focus-visible:[transform:perspective(1100px)_rotateX(4deg)_rotateY(0deg)_translateY(-8px)_translateZ(18px)]",
  },
  {
    number: "03",
    title: "Career Opportunities",
    description:
      "Connect your skills with employment, internships and other opportunities.",
    linkText: "Find opportunities",
    href: "/opportunities",
    icon: "career",
    accent: "#65C8FF",
    hover:
      "hover:[transform:perspective(1100px)_rotateX(4deg)_rotateY(5deg)_translateY(-7px)_translateZ(16px)] focus-visible:[transform:perspective(1100px)_rotateX(4deg)_rotateY(5deg)_translateY(-7px)_translateZ(16px)]",
  },
];

function PathwayIcon({ type }) {
  const icons = {
    learning: (
      <>
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H20v16H5.5A2.5 2.5 0 0 0 3 21.5v-16Z" />
        <path d="M3 17.5A2.5 2.5 0 0 1 5.5 15H20" />
        <path d="M8 7h7M8 10h5" />
      </>
    ),
    support: (
      <>
        <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
        <path d="M12 9v6M9 12h6" />
      </>
    ),
    career: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[type]}
    </svg>
  );
}

export default function PathwaysSection() {
  return (
    <section
      aria-labelledby="pathways-heading"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#062D26] via-[#083B30] to-[#06271F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10"
    >
      {/* Bright ambient color behind the cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-[#A7E85A]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#65C8FF]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal3D
            as="p"
            direction="up"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[#B9EF73] sm:text-sm"
          >
            Find your next step
          </ScrollReveal3D>

          <ScrollReveal3D
            as="h2"
            id="pathways-heading"
            direction="front"
            delay={100}
            className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-[#FFFDF5] sm:text-4xl lg:text-5xl"
          >
            One community. More ways forward.
          </ScrollReveal3D>

          <ScrollReveal3D
            as="p"
            direction="right"
            delay={180}
            className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-7 text-[#D5E9DD] sm:text-base"
          >
            Choose a pathway to explore learning, support and opportunities
            through PSCDB.
          </ScrollReveal3D>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {pathways.map((pathway, index) => (
            <ScrollReveal3D
              key={pathway.number}
              direction={index === 1 ? "front" : index === 0 ? "left" : "right"}
              delay={index * 130}
              className="h-full"
            >
              <a
                href={pathway.href}
                style={{ "--pathway-accent": pathway.accent }}
                className={`pathway-card group relative block h-full min-h-[330px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-[#14503E] via-[#0D4034] to-[#0A342C] p-7 shadow-[0_22px_55px_-30px_rgba(0,0,0,0.75)] [transform:perspective(1100px)_rotateX(0deg)_rotateY(0deg)_translateZ(0)] [transform-style:preserve-3d] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:border-[var(--pathway-accent)]/60 hover:shadow-[0_30px_70px_-32px_rgba(0,0,0,0.85)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B9EF73] motion-reduce:transition-none ${pathway.hover}`}
              >
                {/* Accent glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-40"
                  style={{ backgroundColor: pathway.accent }}
                />

                {/* Icon */}
                <span
                  aria-hidden="true"
                  className="relative grid h-[72px] w-[72px] place-items-center rounded-[1.35rem] border border-white/60 bg-[#F3F5E9] text-[var(--pathway-accent)] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.55)] [transform:translateZ(22px)] transition-transform duration-500 group-hover:[transform:translateZ(42px)_rotateX(-6deg)_rotateY(8deg)_scale(1.06)]"
                >
                  <PathwayIcon type={pathway.icon} />
                </span>

                <span className="relative mt-8 block text-xs font-bold tracking-[0.16em] text-[#C1D5C8] [transform:translateZ(12px)]">
                  {pathway.number}
                  <span className="mx-1 text-[#F2C14E]">/</span>
                  PSCDB PATHWAY
                </span>

                <h3 className="relative mt-3 text-2xl font-semibold tracking-[-0.025em] text-[#FFFDF5] [transform:translateZ(18px)]">
                  {pathway.title}
                </h3>

                <p className="relative mt-3 max-w-sm text-sm leading-7 text-[#D5E5D9] [transform:translateZ(12px)]">
                  {pathway.description}
                </p>

                <span
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--pathway-accent)] [transform:translateZ(22px)]"
                >
                  {pathway.linkText}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 rounded-full border border-white/25 transition-all duration-500 group-hover:rotate-45 group-hover:scale-125 group-hover:border-[var(--pathway-accent)]/70"
                />
              </a>
            </ScrollReveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}