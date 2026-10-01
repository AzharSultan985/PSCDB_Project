import { useMemo, useState } from "react";
import ScrollReveal3D from "../../Components/ScrollReveal3D";

const programmes = [
  {
    title: "Web Development",
    category: "Digital Skills",
    level: "Foundation to advanced",
    description:
      "Learn to plan and build responsive websites using modern web technologies.",
    skills: ["HTML & CSS", "JavaScript", "Problem solving"],
    accent: "#A7E85A",
    initials: "WD",
    slug: "web-development",
  },
  {
    title: "Graphic Design",
    category: "Creative Skills",
    level: "Foundation to advanced",
    description:
      "Develop visual communication skills for digital and print design projects.",
    skills: ["Visual design", "Branding", "Digital media"],
    accent: "#F2C14E",
    initials: "GD",
    slug: "graphic-design",
  },
  {
    title: "Digital Marketing",
    category: "Digital Skills",
    level: "Foundation to advanced",
    description:
      "Explore online campaigns, content planning and digital audience engagement.",
    skills: ["Content strategy", "SEO basics", "Campaign planning"],
    accent: "#65C8FF",
    initials: "DM",
    slug: "digital-marketing",
  },
  {
    title: "Entrepreneurship",
    category: "Business Skills",
    level: "Foundation to advanced",
    description:
      "Build a foundation in shaping, planning and communicating a business idea.",
    skills: ["Business planning", "Research", "Communication"],
    accent: "#FF9D78",
    initials: "EN",
    slug: "entrepreneurship",
  },
  {
    title: "Office Productivity",
    category: "Digital Skills",
    level: "Foundation to advanced",
    description:
      "Strengthen everyday digital skills for organised, productive work.",
    skills: ["Documents", "Spreadsheets", "Digital workflow"],
    accent: "#B9A0FF",
    initials: "OP",
    slug: "office-productivity",
  },
  {
    title: "Professional Communication",
    category: "Career Skills",
    level: "Foundation to advanced",
    description:
      "Practise clear communication for workplace and professional settings.",
    skills: ["Presentations", "Teamwork", "Workplace writing"],
    accent: "#FF82B2",
    initials: "PC",
    slug: "professional-communication",
  },
];

const categories = [
  "All programmes",
  ...new Set(programmes.map((programme) => programme.category)),
];

export default function ProgrammesSection() {
  const [activeCategory, setActiveCategory] = useState("All programmes");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleProgrammes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return programmes.filter((programme) => {
      const matchesCategory =
        activeCategory === "All programmes" ||
        programme.category === activeCategory;

      const searchableContent = [
        programme.title,
        programme.category,
        programme.description,
        ...programme.skills,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableContent.includes(query);
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="programmes"
      aria-labelledby="programmes-heading"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#062D26] via-[#083B30] to-[#06271F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 -z-10 h-96 w-96 rounded-full bg-[#A7E85A]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#65C8FF]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal3D as="div" direction="left">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9EF73] sm:text-sm">
                PSCDB learning catalogue
              </p>

              <h2
                id="programmes-heading"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#FFFDF5] sm:text-5xl"
              >
                Find a programme
                <span className="text-[#B9EF73]"> for your next step.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#D5E9DD] sm:text-base">
                Explore learning pathways designed to help you build skills,
                confidence and new possibilities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4">
                <p className="text-2xl font-bold text-[#C4ED70]">
                  {programmes.length}
                </p>
                <p className="mt-1 text-xs text-[#D5E9DD]">Catalogue examples</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4">
                <p className="text-2xl font-bold text-[#F2C14E]">
                  {categories.length - 1}
                </p>
                <p className="mt-1 text-xs text-[#D5E9DD]">Skill areas</p>
              </div>
            </div>
          </div>
        </ScrollReveal3D>

        {/* Search and category filters */}
        <ScrollReveal3D as="div" direction="front" delay={100}>
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0B362D]/80 p-4 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.9)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-sm">
                <span className="sr-only">Search programmes</span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#AFC8B7]"
                >
                  <circle
                    cx="10.8"
                    cy="10.8"
                    r="6.8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="m16 16 4.2 4.2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search skills or programmes"
                  className="w-full rounded-2xl border border-white/15 bg-[#062D26] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-[#AFC8B7] focus:border-[#B9EF73] focus:ring-4 focus:ring-[#B9EF73]/10"
                />
              </label>

              <div
                aria-label="Filter by programme category"
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end"
              >
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition duration-300 sm:text-sm ${
                        isActive
                          ? "bg-[#C4ED70] text-[#123B2B] shadow-[0_0_24px_rgba(196,237,112,0.18)]"
                          : "border border-white/15 bg-white/[0.05] text-[#E1EBDF] hover:border-[#C4ED70]/50 hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <p
                aria-live="polite"
                className="text-sm text-[#D5E9DD]"
              >
                Showing{" "}
                <span className="font-bold text-white">
                  {visibleProgrammes.length}
                </span>{" "}
                {visibleProgrammes.length === 1 ? "programme" : "programmes"}
              </p>

              {(searchQuery || activeCategory !== "All programmes") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All programmes");
                  }}
                  className="text-sm font-semibold text-[#C4ED70] transition hover:text-white"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </ScrollReveal3D>

        {/* Programme cards */}
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProgrammes.map((programme, index) => (
            <ScrollReveal3D
              key={programme.slug}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={(index % 3) * 100}
              className="h-full"
            >
              <article
                style={{ "--programme-accent": programme.accent }}
                className="group relative flex h-full min-h-[350px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-[#14503E] via-[#0D4034] to-[#0A342C] p-6 shadow-[0_22px_55px_-30px_rgba(0,0,0,0.75)] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-[var(--programme-accent)]/60 hover:shadow-[0_30px_70px_-32px_rgba(0,0,0,0.85)] motion-reduce:transition-none sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-15 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-35"
                  style={{ backgroundColor: programme.accent }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl border border-white/60 bg-[#F3F5E9] text-sm font-black tracking-wide text-[#123B2B] shadow-lg"
                    style={{ boxShadow: `0 0 28px ${programme.accent}30` }}
                  >
                    {programme.initials}
                  </span>

                  <span className="rounded-full border border-white/15 bg-black/10 px-3 py-1.5 text-xs font-semibold text-[#E1EBDF]">
                    {programme.category}
                  </span>
                </div>

                <h3 className="relative mt-7 text-2xl font-semibold tracking-tight text-[#FFFDF5]">
                  {programme.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-[#D5E5D9]">
                  {programme.description}
                </p>

                <p className="relative mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#B9EF73]">
                  {programme.level}
                </p>

                <div className="relative mt-4 flex flex-wrap gap-2">
                  {programme.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-[#E1EBDF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={`/programmes/${programme.slug}`}
                  className="relative mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[var(--programme-accent)] focus:outline-none focus-visible:underline"
                >
                  View programme details
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </article>
            </ScrollReveal3D>
          ))}
        </div>

        {visibleProgrammes.length === 0 && (
          <div className="mt-7 rounded-3xl border border-white/15 bg-white/[0.06] px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-white">
              No matching programmes
            </h3>
            <p className="mt-2 text-sm text-[#D5E9DD]">
              Try another search term or choose a different skill area.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All programmes");
              }}
              className="mt-5 rounded-full bg-[#C4ED70] px-5 py-2.5 text-sm font-bold text-[#123B2B] transition hover:bg-[#D7F69A]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}