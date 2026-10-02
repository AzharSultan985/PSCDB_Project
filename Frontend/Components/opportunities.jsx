import { useMemo, useState } from "react";
import ScrollReveal3D from "./ScrollReveal3D";

const opportunities = [
  {
    id: "web-internship",
    title: "Web Development Internship",
    type: "Internship",
    field: "Digital Skills",
    level: "Entry level",
    mode: "Details from provider",
    description:
      "A sample listing for learners looking to practise web development skills in a professional setting.",
    tags: ["Web development", "Mentorship", "Portfolio"],
    accent: "#A7E85A",
  },
  {
    id: "marketing-assistant",
    title: "Digital Marketing Assistant",
    type: "Employment",
    field: "Marketing",
    level: "Early career",
    mode: "Details from provider",
    description:
      "A sample role for candidates interested in content, digital campaigns and audience engagement.",
    tags: ["Content", "Social media", "Campaigns"],
    accent: "#65C8FF",
  },
  {
    id: "learning-support",
    title: "Skills Learning Support",
    type: "Scholarship",
    field: "Education",
    level: "Learners",
    mode: "Details from provider",
    description:
      "A sample support listing to demonstrate how learning assistance can appear on the board.",
    tags: ["Skills training", "Learner support", "Education"],
    accent: "#F2C14E",
  },
  {
    id: "career-mentor",
    title: "Career Guidance Session",
    type: "Mentorship",
    field: "Career Development",
    level: "All experience levels",
    mode: "Details from provider",
    description:
      "A sample mentorship listing for learners seeking guidance on career planning and next steps.",
    tags: ["Career planning", "Guidance", "One-to-one"],
    accent: "#FF82B2",
  },
];

const filters = [
  "All opportunities",
  ...new Set(opportunities.map((item) => item.type)),
];

export default function OpportunitiesSection() {
  const [activeFilter, setActiveFilter] = useState("All opportunities");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState([]);

  const visibleOpportunities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return opportunities.filter((item) => {
      const matchesFilter =
        activeFilter === "All opportunities" || item.type === activeFilter;

      const searchableText = [
        item.title,
        item.type,
        item.field,
        item.level,
        item.description,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchableText.includes(query);
    });
  }, [activeFilter, searchQuery]);

  function toggleSaved(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  function clearFilters() {
    setActiveFilter("All opportunities");
    setSearchQuery("");
  }

  return (
    <section
      id="opportunities"
      aria-labelledby="opportunities-heading"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#062D26] via-[#083B30] to-[#06271F] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#A7E85A]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#65C8FF]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal3D as="div" direction="left">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9EF73] sm:text-sm">
                Opportunity board
              </p>

              <h2
                id="opportunities-heading"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#FFFDF5] sm:text-5xl"
              >
                Take your next step.
                <span className="block text-[#B9EF73]">
                  Find an opportunity.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#D5E9DD] sm:text-base">
                Explore example roles, internships, scholarships and mentorship
                opportunities connected to skills and career growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
              <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4">
                <p className="text-2xl font-bold text-[#C4ED70]">
                  {opportunities.length}
                </p>
                <p className="mt-1 text-xs text-[#D5E9DD]">Sample listings</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4">
                <p className="text-2xl font-bold text-[#F2C14E]">
                  {filters.length - 1}
                </p>
                <p className="mt-1 text-xs text-[#D5E9DD]">Opportunity types</p>
              </div>
            </div>
          </div>
        </ScrollReveal3D>

        {/* Catalogue controls */}
        <ScrollReveal3D as="div" direction="front" delay={100}>
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#0B362D]/85 p-4 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.9)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-sm">
                <span className="sr-only">Search opportunities</span>

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
                  placeholder="Search roles, skills or fields"
                  className="w-full rounded-2xl border border-white/15 bg-[#062D26] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-[#AFC8B7] focus:border-[#B9EF73] focus:ring-4 focus:ring-[#B9EF73]/10"
                />
              </label>

              <div
                aria-label="Filter opportunities by type"
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-end"
              >
                {filters.map((filter) => {
                  const isActive = activeFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveFilter(filter)}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition duration-300 sm:text-sm ${
                        isActive
                          ? "bg-[#C4ED70] text-[#123B2B] shadow-[0_0_24px_rgba(196,237,112,0.18)]"
                          : "border border-white/15 bg-white/[0.05] text-[#E1EBDF] hover:border-[#C4ED70]/50 hover:bg-white/10"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <p aria-live="polite" className="text-sm text-[#D5E9DD]">
                Showing{" "}
                <span className="font-bold text-white">
                  {visibleOpportunities.length}
                </span>{" "}
                {visibleOpportunities.length === 1
                  ? "opportunity"
                  : "opportunities"}
              </p>

              {(searchQuery || activeFilter !== "All opportunities") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-semibold text-[#C4ED70] transition hover:text-white"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </ScrollReveal3D>

        {/* Opportunity cards */}
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleOpportunities.map((item, index) => {
            const isSaved = savedIds.includes(item.id);

            return (
              <ScrollReveal3D
                key={item.id}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 100}
                className="h-full"
              >
                <article
                  style={{ "--opportunity-accent": item.accent }}
                  className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-[#14503E] via-[#0D4034] to-[#0A342C] p-6 shadow-[0_22px_55px_-30px_rgba(0,0,0,0.75)] [transform-style:preserve-3d] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-[var(--opportunity-accent)]/60 hover:shadow-[0_30px_70px_-32px_rgba(0,0,0,0.85)] hover:[transform:perspective(1100px)_rotateX(3deg)_rotateY(1deg)_translateY(-8px)_translateZ(10px)] motion-reduce:transition-none sm:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-15 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-35"
                    style={{ backgroundColor: item.accent }}
                  />

                  <div className="relative flex items-start justify-between gap-3">
                    <span
                      className="rounded-full border border-white/15 bg-black/10 px-3 py-1.5 text-xs font-semibold text-[#E1EBDF]"
                      style={{ color: item.accent }}
                    >
                      {item.type}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSaved(item.id)}
                      aria-pressed={isSaved}
                      aria-label={
                        isSaved
                          ? `Remove ${item.title} from saved opportunities`
                          : `Save ${item.title}`
                      }
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${
                        isSaved
                          ? "border-[#C4ED70]/60 bg-[#C4ED70] text-[#123B2B]"
                          : "border-white/20 bg-white/[0.06] text-white hover:border-[#C4ED70]/60 hover:text-[#C4ED70]"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill={isSaved ? "currentColor" : "none"}
                        className="h-5 w-5"
                      >
                        <path
                          d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.8L6 21V4.75Z"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.15em] text-[#B9EF73]">
                    {item.field}
                  </p>

                  <h3 className="relative mt-2 text-2xl font-semibold tracking-tight text-[#FFFDF5]">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-7 text-[#D5E5D9]">
                    {item.description}
                  </p>

                  <div className="relative mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-[#E1EBDF]">
                      {item.level}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs text-[#E1EBDF]">
                      {item.mode}
                    </span>
                  </div>

                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#B8CFC0] before:mr-2 before:text-[#C4ED70] before:content-['•']"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/opportunities/${item.id}`}
                    className="relative mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[var(--opportunity-accent)] focus:outline-none focus-visible:underline"
                  >
                    View opportunity
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </article>
              </ScrollReveal3D>
            );
          })}
        </div>

        {visibleOpportunities.length === 0 && (
          <div className="mt-7 rounded-3xl border border-white/15 bg-white/[0.06] px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-white">
              No matching opportunities
            </h3>
            <p className="mt-2 text-sm text-[#D5E9DD]">
              Try another search term or choose a different opportunity type.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-full bg-[#C4ED70] px-5 py-2.5 text-sm font-bold text-[#123B2B] transition hover:bg-[#D7F69A]"
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs leading-6 text-[#AFC8B7]">
          Demo listings for the interface. Replace with verified opportunities
          and provider details before launch.
        </p>
      </div>
    </section>
  );
}