import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useAlert } from "../../Context/Alert";
import { useStudent } from "../../Context/studentContext";
import ScrollReveal3D from "../../Components/ScrollReveal3D";
import EnrollmentCart from "./EnrollmentCart";
import InstructorCard from "./InstructorCard";

export default function ProgrammeEnrollment({
  programme,
  onBack,
  onContinue,
}) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { studentProfile } = useStudent();
  const { showAlert } = useAlert();

  const seatsLeft = Math.max(
    0,
    Number(programme.maxSeats || 50) - Number(programme.enrolledSeats || 0),
  );

  function handleContinue() {
    if (!selectedMode) {
      showAlert({
        type: "warning",
        message: "Please select Remote or Centre learning first.",
      });
      return;
    }

    if (!isAuthenticated) {
      showAlert({
        type: "warning",
        message: "Please register or log in before enrolling.",
      });

      navigate("/register", { state: { from: "/programmes" } });
      return;
    }

    const student =
      studentProfile?.data?.student ??
      studentProfile?.student ??
      studentProfile ??
      {};

    const profile = student.profile ?? student;
    const education = profile.latestEducation ?? student.latestEducation;
    const location = profile.location ?? student.location;

    const hasCompleteProfile = Boolean(
      profile.age &&
        profile.gender &&
        location?.city &&
        location?.district &&
        location?.province &&
        education?.level &&
        education?.rollNumber &&
        education?.completionYear,
    );

    if (!hasCompleteProfile) {
      showAlert({
        type: "warning",
        message: "Please complete your student profile before enrolling.",
      });

      navigate("/student-portal", {
        state: { openTab: "profile" },
      });
      return;
    }

    // Parent component mode set karega; uske baad challan page render hoga.
    onContinue(selectedMode);
  }

  return (
    <main className="min-h-screen w-full bg-[#F7F8F4] px-4 py-6 text-[#173A30] sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-bold text-[#176247] hover:text-[#0B4F3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176247]"
        >
          <span aria-hidden="true">←</span>
          All programmes
        </button>

        {/* Portal sidebar ke saath content ko squeeze hone se bachane ke liye cart stack hota hai */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_320px] 2xl:gap-8">
          <div className="min-w-0">
            <ScrollReveal3D as="section" direction="left">
              <header className="rounded-3xl bg-[#0B3D31] p-5 text-white sm:p-7 lg:p-8">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#D7E99C]">
                  {programme.category} · {programme.level}
                </p>

                <h1 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl 2xl:text-4xl">
                  {programme.title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                  {programme.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/85 sm:text-sm">
                  <span>★ {Number(programme.rating || 0).toFixed(1)} rating</span>
                  <span>{programme.studentCount || 0} learners</span>
                  <span>{programme.duration || "Duration TBA"}</span>
                  <span>{seatsLeft} seats left</span>
                </div>
              </header>
            </ScrollReveal3D>

            <ScrollReveal3D as="section" direction="front" delay={100}>
              <div className="mt-5 overflow-hidden rounded-3xl border border-[#E4EAE1] bg-white shadow-sm">
                <div className="relative aspect-[16/8] overflow-hidden bg-gradient-to-br from-[#0B4F3C] via-[#176247] to-[#A8C66C]">
                  {programme.thumbnail && !imageFailed ? (
                    <img
                      src={programme.thumbnail}
                      alt={`${programme.title} programme`}
                      onError={() => setImageFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-4xl font-black text-white/90">
                      {programme.title.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06271F]/45 to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/25 bg-[#073B31]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:bottom-5 sm:left-5">
                    PSCDB · Learn, practise, progress
                  </span>
                </div>

                <section className="p-5 sm:p-7">
                  <h2 className="text-xl font-extrabold sm:text-2xl">
                    Course overview
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[#647268] sm:text-base">
                    {programme.overview || programme.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Info label="Duration" value={programme.duration} />
                    <Info label="Class timing" value={programme.timing} />
                    <Info
                      label="Credit hours"
                      value={
                        programme.creditHours
                          ? `${programme.creditHours} hours`
                          : "To be announced"
                      }
                    />
                  </div>
                </section>
              </div>
            </ScrollReveal3D>

            <section className="mt-5 rounded-3xl border border-[#E4EAE1] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-extrabold sm:text-2xl">
                What you’ll learn
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(programme.whatYouWillLearn || programme.skills || []).map(
                  (item) => (
                    <div
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-[#56675B]"
                    >
                      <span className="mt-0.5 text-[#62913D]">✓</span>
                      <span>{item}</span>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="mt-5 rounded-3xl border border-[#E4EAE1] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Course content
              </h2>

              <p className="mt-1 text-sm text-[#718077]">
                {programme.curriculum?.length || 0} learning sections
              </p>

              <div className="mt-4 divide-y divide-[#EDF0EB]">
                {(programme.curriculum || []).map((module, index) => (
                  <div
                    key={`${module.title}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-3 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#EFF6E9] text-xs font-bold text-[#176247]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="font-bold text-[#173A30]">
                          {module.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#829087]">
                          {module.lessons} lessons
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-[#718077]">
                      {module.duration}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {programme.requirements?.length > 0 && (
              <section className="mt-5 rounded-3xl border border-[#E4EAE1] bg-white p-5 shadow-sm sm:p-7">
                <h2 className="text-xl font-extrabold sm:text-2xl">
                  Requirements
                </h2>

                <ul className="mt-4 space-y-2 text-sm leading-6 text-[#56675B]">
                  {programme.requirements.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-5">
              <h2 className="mb-4 text-xl font-extrabold sm:text-2xl">
                Our Instructor
              </h2>
              <InstructorCard instructor={programme.instructor} />
            </section>
          </div>

          <EnrollmentCart
            programme={programme}
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F7F9F5] p-4">
      <p className="text-xs text-[#829087]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#173A30]">
        {value || "To be announced"}
      </p>
    </div>
  );
}