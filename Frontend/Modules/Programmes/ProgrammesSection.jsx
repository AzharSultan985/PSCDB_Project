import { useMemo, useState } from "react";
import ScrollReveal3D from "../../Components/ScrollReveal3D";
import ProgrammeEnrollment from "./ProgrammeEnrollment";
import programmes from "./data/programmes.json";

const programmes = [
  {
    title: "Web Development",
    category: "Digital Skills",
    level: "Foundation to advanced",
    description:
      "Learn to plan and build responsive websites using modern web technologies.",
    skills: ["HTML & CSS", "JavaScript", "Problem solving"],
    accent: "#76A83B",
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
    accent: "#D6A73B",
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
    accent: "#4B9BB6",
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
    accent: "#C77857",
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
    accent: "#8170B5",
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
    accent: "#C66F8D",
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
  const [selectedProgramme, setSelectedProgramme] = useState(null);

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

  function clearFilters() {
    setSearchQuery("");
    setActiveCategory("All programmes");
  }
if (selectedProgramme) {
  return (
    <ProgrammeEnrollment
      programme={selectedProgramme}
      onBack={() => setSelectedProgramme(null)}
    />
  );
}
  return (
    <section
      id="programmes"
      aria-labelledby="programmes-heading"
      className="relative isolate overflow-hidden bg-[#F7F8F4] px-5 py-20 text-[#173A30] sm:px-8 sm:py-24 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-12 -z-10 h-96 w-96 rounded-full bg-[#DCEBCB]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-96 w-96 rounded-full bg-[#F4E8CC]/60 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal3D as="div" direction="left">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#608B3E] sm:text-sm">
                PSCDB Learning Divisions
              </p>

              <h2
                id="programmes-heading"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#173A30] sm:text-5xl"
              >
                Find a programme
                <span className="text-[#668D3C]"> for your career.</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#68766D] sm:text-base">
                Explore learning pathways designed to help you build skills,
                confidence and new possibilities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              <div className="rounded-2xl border border-[#E5E9E1] bg-white px-5 py-4 shadow-sm">
                <p className="text-2xl font-bold text-[#176247]">
                  {programmes.length}
                </p>
                <p className="mt-1 text-xs text-[#758178]">
                  Programme examples
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E9E1] bg-white px-5 py-4 shadow-sm">
                <p className="text-2xl font-bold text-[#B3892F]">
                  {categories.length - 1}
                </p>
                <p className="mt-1 text-xs text-[#758178]">Skill areas</p>
              </div>
            </div>
          </div>
        </ScrollReveal3D>

        <ScrollReveal3D as="div" direction="front" delay={100}>
          <div className="mt-10 rounded-3xl border border-[#E5E9E1] bg-white p-4 shadow-[0_18px_55px_-42px_rgba(23,58,48,.3)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-sm">
                <span className="sr-only">Search programmes</span>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7E8D82]"
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
                  className="w-full rounded-2xl border border-[#E3E9E1] bg-[#F8FAF6] py-3.5 pl-12 pr-4 text-sm text-[#173A30] outline-none transition placeholder:text-[#8C988F] focus:border-[#739C4A] focus:ring-4 focus:ring-[#739C4A]/10"
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
                          ? "bg-[#176247] text-white shadow-md shadow-[#176247]/15"
                          : "border border-[#E2E8DF] bg-white text-[#56675B] hover:border-[#A7BE91] hover:bg-[#F5F8F1]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#EDF0EB] pt-4">
              <p aria-live="polite" className="text-sm text-[#68766D]">
                Showing{" "}
                <span className="font-bold text-[#173A30]">
                  {visibleProgrammes.length}
                </span>{" "}
                {visibleProgrammes.length === 1 ? "programme" : "programmes"}
              </p>

              {(searchQuery || activeCategory !== "All programmes") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-[#176247] transition hover:text-[#668D3C]"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </ScrollReveal3D>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProgrammes.map((programme, index) => (
            <ScrollReveal3D
              key={programme.slug}
              direction={index % 2 === 0 ? "left" : "right"}
              delay={(index % 3) * 100}
              className="h-full"
            >
              <article
                className="group relative flex h-full min-h-[350px] flex-col overflow-hidden rounded-[1.75rem] border border-[#E5E9E1] bg-white p-6 shadow-[0_18px_50px_-35px_rgba(23,58,48,.28)] transition duration-500 ease-out hover:-translate-y-2 hover:border-[#CAD8C2] hover:shadow-[0_28px_65px_-35px_rgba(23,58,48,.3)] motion-reduce:transition-none sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-20"
                  style={{ backgroundColor: programme.accent }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl border border-[#E7EADF] bg-[#F7F8F3] text-sm font-black tracking-wide text-[#173A30] transition duration-500 group-hover:-rotate-3 group-hover:scale-105"
                    style={{ boxShadow: `inset 0 -3px 0 ${programme.accent}` }}
                  >
                    {programme.initials}
                  </span>

                  <span className="rounded-full border border-[#E9ECE5] bg-[#F8F9F6] px-3 py-1.5 text-xs font-semibold text-[#637268]">
                    {programme.category}
                  </span>
                </div>

                <h3 className="relative mt-7 text-2xl font-semibold tracking-tight text-[#173A30]">
                  {programme.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-[#69776D]">
                  {programme.description}
                </p>

                <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[#668D3C]">
                  {programme.level}
                </p>
<div className="relative mt-5 grid grid-cols-3 gap-2 border-y border-[#EDF0EB] py-4">
  <div>
    <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
      Duration
    </p>
    <p className="mt-1 text-xs font-semibold text-[#173A30]">
      {programme.duration}
    </p>
  </div>

  <div>
    <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
      Credits
    </p>
    <p className="mt-1 text-xs font-semibold text-[#173A30]">
      {programme.creditHours} hours
    </p>
  </div>

  <div>
    <p className="text-[10px] font-bold uppercase tracking-wide text-[#829087]">
      Seats left
    </p>
    <p className="mt-1 text-xs font-semibold text-[#173A30]">
      {Math.max(0, programme.maxSeats - programme.enrolledSeats)}
    </p>
  </div>
</div>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {programme.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#E8ECE5] bg-[#F8F9F6] px-3 py-1.5 text-xs text-[#5F6F64]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
  type="button"
  onClick={() => setSelectedProgramme(programme)}
  className="relative mt-auto inline-flex items-center gap-2 pt-7 text-left text-sm font-bold text-[#176247] focus:outline-none focus-visible:underline"
>
  View details and enrol
  <span aria-hidden="true">→</span>
</button>
              </article>
            </ScrollReveal3D>
          ))}
        </div>

        {visibleProgrammes.length === 0 && (
          <div className="mt-7 rounded-3xl border border-[#E5E9E1] bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-[#173A30]">
              No matching programmes
            </h3>
            <p className="mt-2 text-sm text-[#718077]">
              Try another search term or choose a different skill area.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-[#176247] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0B4F3C]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}