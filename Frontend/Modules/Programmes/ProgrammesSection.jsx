import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal3D from "../../Components/ScrollReveal3D";
import { useAuth } from "../../Context/AuthContext";
import { useAlert } from "../../Context/Alert";
import { useStudent } from "../../Context/studentContext";
import ProgrammeCard from "./ProgrammeCard";
import ProgrammeEnrollment from "./ProgrammeEnrollment";
import EnrollmentContractChallan from "./EnrollmentContractChallan";
import programmes from "./data/programmes.json";

const categories = [
  "All programmes",
  ...new Set(programmes.map((programme) => programme.category)),
];

export default function ProgrammesSection() {
  const [activeCategory, setActiveCategory] = useState("All programmes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { studentProfile } = useStudent();
  const { showAlert } = useAlert();

  const student =
    studentProfile?.data?.student ??
    studentProfile?.student ??
    studentProfile ??
    {};

  const visibleProgrammes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return programmes.filter((programme) => {
      const matchesCategory =
        activeCategory === "All programmes" ||
        programme.category === activeCategory;

      const content = [
        programme.title,
        programme.category,
        programme.description,
        ...(programme.skills || []),
        ...(programme.whatYouWillLearn || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && content.includes(query);
    });
  }, [activeCategory, searchQuery]);

 function continueToEnrollment(mode) {
  setSelectedMode(mode);
}

  function goBackToCourses() {
    setSelectedMode(null);
    setSelectedProgramme(null);
  }

  if (selectedProgramme && selectedMode) {
    return (
      <EnrollmentContractChallan
        programme={selectedProgramme}
        mode={selectedMode}
        student={student}
        onBack={() => setSelectedMode(null)}
      />
    );
  }

  if (selectedProgramme) {
    return (
    <ProgrammeEnrollment
  programme={selectedProgramme}
  onBack={goBackToCourses}
  onContinue={continueToEnrollment}
/>
    );
  }

  return (
    <section
      id="programmes"
      className="relative isolate overflow-hidden bg-[#F7F8F4] px-5 py-16 text-[#173A30] sm:px-8 sm:py-20 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollReveal3D as="header" direction="left">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#638943]">
            PSCDB Learning
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Build skills for your{" "}
            <span className="text-[#6F963E]">next opportunity.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68766D] sm:text-base">
            Explore practical programmes, compare learning formats and choose
            the path that fits your goals.
          </p>
        </ScrollReveal3D>

        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-[#E4EAE1] bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search programmes, skills or topics"
            aria-label="Search programmes"
            className="min-h-12 w-full rounded-xl border border-[#E1E8DE] bg-[#F8FAF6] px-4 text-sm outline-none focus:border-[#6F963E] focus:ring-4 focus:ring-[#6F963E]/10 lg:max-w-sm"
          />

          <div
            aria-label="Filter programmes by category"
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                  activeCategory === category
                    ? "bg-[#176247] text-white"
                    : "border border-[#E4EAE1] bg-white text-[#56675B] hover:bg-[#F2F6EE]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-extrabold sm:text-2xl">
            Explore programmes
          </h2>
          <p className="text-sm text-[#718077]">
            {visibleProgrammes.length} courses
          </p>
        </div>

        {visibleProgrammes.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProgrammes.map((programme) => (
              <ScrollReveal3D key={programme.slug} as="div" direction="up">
                <ProgrammeCard
                  programme={programme}
                  onSelect={(course) => {
                    setSelectedMode(null);
                    setSelectedProgramme(course);
                  }}
                />
              </ScrollReveal3D>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-[#E4EAE1] bg-white p-10 text-center">
            <h2 className="text-xl font-bold">No programmes found</h2>
            <p className="mt-2 text-sm text-[#718077]">
              Try another search term or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}