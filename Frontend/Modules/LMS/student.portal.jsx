import { useState } from "react";
import StudentWelcome from "./StudentWelcome";
import "./StudentPortal.css";
import ProgrammesSection from "../Programmes/ProgrammesSection";

const navItems = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "programmes", label: "Programmes", icon: "book" },
  { id: "applications", label: "My applications", icon: "file" },
  { id: "profile", label: "My profile", icon: "user" },
];

function NavIcon({ name }) {
  const paths = {
    grid: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h6" />
      </>
    ),
    file: (
      <>
        <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
        <path d="M14 3.5v5h5M9 13h6M9 16.5h6" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      {paths[name]}
    </svg>
  );
}

function ComingSoon({ title }) {
  return (
    <section className="portal-card portal-page-enter rounded-3xl border border-[#E5EBE3] bg-white p-8 shadow-sm sm:p-12">
      <span className="inline-flex rounded-full bg-[#EFF6E8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#167A62]">
        Student portal
      </span>
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#173A30]">
        {title}
      </h1>
      <p className="mt-3 max-w-xl leading-7 text-[#69786F]">
        This section is being prepared. Your student information and updates
        will appear here.
      </p>
    </section>
  );
}

export default function StudentPortal({ user, onLogout }) {
  const [activePage, setActivePage] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fullName = user?.fullName || user?.name || "Student";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const activeLabel =
    navItems.find((item) => item.id === activePage)?.label || "Overview";

  function selectPage(page) {
    setActivePage(page);
    setMobileMenuOpen(false);
  }
const pageComponents = {
  overview: <StudentWelcome user={user} />,
  programmes: <ProgrammesSection/>,
//   applications: <Applications />,
//   profile: <Profile />,
};
  return (
    <div className="student-portal min-h-screen bg-[#F5F8F4] text-[#173A30]">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-[#10251E]/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`student-sidebar fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-[#E7ECE5] bg-white px-4 py-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="/" className="flex items-center gap-3 px-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0B4F3C] text-sm font-black tracking-wide text-[#D6F28D] shadow-lg shadow-[#0B4F3C]/15">
            P
          </span>
          <span>
            <span className="block text-sm font-extrabold tracking-wide text-[#173A30]">
              PSCDB
            </span>
            <span className="mt-0.5 block text-xs text-[#829087]">
              Student Portal
            </span>
          </span>
        </a>

        <p className="mb-3 mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9AA69E]">
          Workspace
        </p>

        <nav aria-label="Student navigation" className="space-y-1">
          {navItems.map((item) => {
            const active = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => selectPage(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition duration-200 ${
                  active
                    ? "bg-[#EAF4E2] text-[#0B684F] shadow-sm"
                    : "text-[#718077] hover:bg-[#F5F8F4] hover:text-[#173A30]"
                }`}
              >
                <NavIcon name={item.icon} />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8EBE43]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-[#F3F7EF] p-4">
          <p className="text-sm font-bold text-[#173A30]">Need assistance?</p>
          <p className="mt-1 text-xs leading-5 text-[#718077]">
            Our team is here to help with your student account.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex text-xs font-bold text-[#167A62] hover:text-[#0B4F3C]"
          >
            Contact PSCDB <span className="ml-1">→</span>
          </a>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-[#E7ECE5] bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#E5EBE3] text-[#173A30] hover:bg-[#F3F7EF] lg:hidden"
            >
              <span className="text-xl leading-none">☰</span>
            </button>

            <div>
              <p className="text-xs text-[#829087]">Student portal</p>
              <p className="text-sm font-bold text-[#173A30]">{activeLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-right sm:block">
              <span className="block text-sm font-bold text-[#173A30]">
                {fullName}
              </span>
              <span className="block text-xs text-[#829087]">Student</span>
            </span>

            <span
              aria-label={`${fullName} profile`}
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#DDECCB] text-xs font-extrabold text-[#0B684F] shadow ring-1 ring-[#DCE5D8]"
            >
              {initials || "ST"}
            </span>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="hidden rounded-xl border border-[#E5EBE3] px-3 py-2 text-xs font-bold text-[#557066] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 sm:block"
              >
                Log out
              </button>
            )}
          </div>
        </header>

       <main className=" w-full  p-4 sm:p-7 lg:p-0">
  {pageComponents[activePage]}
</main>
      </div>
    </div>
  );
}