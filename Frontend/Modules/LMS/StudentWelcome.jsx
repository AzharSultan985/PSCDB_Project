const quickStats = [
  { label: "Applications", value: "0", note: "No applications yet", icon: "↗" },
  { label: "Saved programmes", value: "0", note: "Explore opportunities", icon: "☆" },
  { label: "Profile status", value: "New", note: "Complete your profile", icon: "◎" },
];

export default function StudentWelcome({ user }) {
  const fullName = user?.fullName || user?.name || "Student";
  const firstName = fullName.trim().split(/\s+/)[0] || "Student";

  return (
    <div className="space-y-7">
      <section className="student-welcome relative isolate overflow-hidden rounded-[28px] bg-[#0B4F3C] p-6 text-white shadow-[0_24px_70px_-35px_rgba(11,79,60,.65)] sm:p-9 lg:p-11">
        <div
          aria-hidden="true"
          className="welcome-orb absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full border border-white/10 bg-[#8EBE43]/20 blur-[1px]"
        />
        <div
          aria-hidden="true"
          className="welcome-orb welcome-orb-delay absolute -right-2 bottom-[-190px] -z-10 h-80 w-80 rounded-full border border-[#D6F28D]/20"
        />

        <div className="welcome-copy max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D6F28D] sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D6F28D]" />
            Your learning journey starts here
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[46px]">
            Welcome, {firstName}
            <span className="text-[#D6F28D]">.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Your PSCDB student space is ready. Complete your profile to discover
            programmes and keep track of your applications.
          </p>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("student-next-step")
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="welcome-button mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D6F28D] px-5 py-3 text-sm font-extrabold text-[#173A30] shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-[#E2F7A9] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
          >
            Continue to your profile <span aria-hidden="true">→</span>
          </button>
        </div>

        <div
          aria-hidden="true"
          className="welcome-mark pointer-events-none absolute bottom-[-42px] right-5 hidden select-none font-black leading-none text-white/[0.06] sm:block sm:text-[190px] lg:right-12 lg:text-[230px]"
        >
          P
        </div>

        <div
          aria-hidden="true"
          className="welcome-sparkle absolute right-[19%] top-9 hidden h-3 w-3 rotate-45 rounded-sm bg-[#D6F28D] sm:block"
        />
      </section>

      <section
        aria-label="Student overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {quickStats.map((stat, index) => (
          <article
            key={stat.label}
            className="portal-card portal-stat rounded-2xl border border-[#E5EBE3] bg-white p-5 shadow-[0_8px_30px_-22px_rgba(24,58,48,.25)]"
            style={{ "--card-delay": `${index * 90}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-[#718077]">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#173A30]">
                  {stat.value}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6E8] text-xl font-bold text-[#167A62]">
                {stat.icon}
              </span>
            </div>
            <p className="mt-3 text-xs text-[#8A9890]">{stat.note}</p>
          </article>
        ))}
      </section>

      <section
        id="student-next-step"
        className="grid gap-5 lg:grid-cols-[1.35fr_0.85fr]"
      >
        <article className="portal-card rounded-2xl border border-[#E5EBE3] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#167A62]">
                Recommended next step
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#173A30]">
                Complete your student profile
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#718077]">
                Add your education, location and skills so PSCDB can show you
                more relevant programmes.
              </p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#EFF6E8] text-2xl text-[#167A62]">
              ✦
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {["Personal details", "Education and location", "Skills and interests"].map(
              (step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl bg-[#F7F9F6] px-4 py-3"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-[#DCE7D7] bg-white text-xs font-bold text-[#167A62]">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#40564B]">
                    {step}
                  </span>
                  <span className="ml-auto text-xs text-[#9AA69E]">To do</span>
                </div>
              ),
            )}
          </div>
        </article>

        <aside className="portal-card rounded-2xl border border-[#E5EBE3] bg-[#F0F6E9] p-6 sm:p-7">
          <span className="text-2xl" aria-hidden="true">🌱</span>
          <h2 className="mt-4 text-lg font-bold text-[#173A30]">
            A little progress goes a long way
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#63746A]">
            Keep your details up to date to make your programme applications
            easier to complete.
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
            <span className="block h-full w-[18%] rounded-full bg-[#8EBE43]" />
          </div>
          <p className="mt-2 text-xs font-semibold text-[#718077]">
            Start by adding your profile information
          </p>
        </aside>
      </section>
    </div>
  );
}