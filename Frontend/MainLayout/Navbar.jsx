import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Programmes", href: "#programmes" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Our Work", href: "#our-work" },
  { label: "About Us", href: "#about" },
];

function MenuIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
        <path d="m6 6 12 12M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#123b32]/10 bg-white/95 text-[#123b32] backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-[#123b32]/10" : "shadow-sm shadow-[#123b32]/5"
      }`}
    >
      <div className="mx-auto flex min-h-[82px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
        {/* Brand and logo */}
        <a
          href="#home"
          aria-label="PSCDB home"
          className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#167a62]"
        >
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d6b66b] bg-white p-0.5 shadow-sm sm:h-16 sm:w-16">
            <img
              src="/logo.png"
              alt="Pakistan Skills Development Community Board logo"
              className="h-full w-full rounded-full object-contain"
            />
          </span>

          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-extrabold tracking-[0.16em] text-[#123b32]">
              PSCDB
            </span>
            <span className="mt-1 block text-[10px] leading-4 text-[#53615a]">
              Pakistan Skills Development
              <br />
              Community Board
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex xl:gap-9"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded py-2 text-[13px] font-semibold text-[#40564d] transition-colors hover:text-[#167a62] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#167a62]"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[#d6b66b] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <a
            href="#sign-in"
            className="rounded-lg px-2 py-2 text-[13px] font-bold text-[#123b32] transition-colors hover:text-[#167a62] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#167a62]"
          >
            Sign In
          </a>

          <a
            href="#programmes"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#123b32] px-5 text-[13px] font-bold text-white shadow-md shadow-[#123b32]/15 transition hover:-translate-y-0.5 hover:bg-[#167a62] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6b66b]"
          >
            Get Started
            <span aria-hidden="true" className="text-[#e8cf8e]">
              ↗
            </span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="pscdb-mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#123b32]/15 bg-white text-[#123b32] transition hover:border-[#167a62]/40 hover:bg-[#f3f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#167a62] lg:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="pscdb-mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#123b32]/10 bg-white px-4 pb-5 pt-3 shadow-lg shadow-[#123b32]/10 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold text-[#40564d] transition-colors hover:bg-[#f3f7f4] hover:text-[#123b32] focus-visible:outline-2 focus-visible:outline-[#167a62]"
              >
                {link.label}
                <span aria-hidden="true" className="text-[#b18d3f]">
                  ↗
                </span>
              </a>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#123b32]/10 pt-4">
              <a
                href="#sign-in"
                onClick={closeMenu}
                className="flex min-h-11 items-center justify-center rounded-full border border-[#123b32]/20 text-sm font-bold text-[#123b32] transition hover:bg-[#f3f7f4] focus-visible:outline-2 focus-visible:outline-[#167a62]"
              >
                Sign In
              </a>

              <a
                href="#programmes"
                onClick={closeMenu}
                className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#123b32] text-sm font-bold text-white transition hover:bg-[#167a62] focus-visible:outline-2 focus-visible:outline-[#d6b66b]"
              >
                Get Started
                <span aria-hidden="true" className="text-[#e8cf8e]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}