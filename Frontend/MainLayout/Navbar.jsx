import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Governce & Managment", href: "/directors" },
  { label: "Projects", href: "/our-work" },
  { label: "Contact Us", href: "/contact" },
  { label: "Student Portal", href: "/contact" },
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

  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled])'
        );

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-[#123b32]/10 bg-white/95 text-[#123b32] backdrop-blur-xl transition-shadow duration-300 ${
          scrolled
            ? "shadow-md shadow-[#123b32]/10"
            : "shadow-sm shadow-[#123b32]/5"
        }`}
      >
        <div className="mx-auto flex min-h-[82px] max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-10">
          {/* Logo and brand */}
          <a
            href="/"
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
              <span className="block text-3xl font-extrabold tracking-[0.16em] text-[#123b32]">
                PSCDB
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
          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <a
              href="/register"
              className="rounded-lg px-2 py-2 text-[13px] font-bold text-[#123b32] transition-colors hover:text-[#167a62] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#167a62]"
            >
              Sign In
            </a>

            <a
              href="/register"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#123b32] px-5 text-[13px] font-bold text-white shadow-md shadow-[#123b32]/15 transition hover:-translate-y-0.5 hover:bg-[#167a62] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6b66b]"
            >
Register              <span aria-hidden="true" className="text-[#e8cf8e]">
                ↗
              </span>
            </a>
          </div>

          {/* Mobile/tablet menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="pscdb-mobile-drawer"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#123b32]/15 bg-white text-[#123b32] transition hover:border-[#167a62]/40 hover:bg-[#f3f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#167a62] lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Backdrop: sibling of header, covers the viewport */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] cursor-default bg-[#10251f]/40 transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0 delay-300"
        }`}
      />

      {/* Right-side mobile drawer: sibling of header */}
      <aside
        id="pscdb-mobile-drawer"
        ref={drawerRef}
        role={menuOpen ? "dialog" : undefined}
        aria-modal={menuOpen ? "true" : undefined}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={`fixed inset-y-0 right-0 z-[70] flex h-dvh w-[min(88vw,390px)] flex-col overflow-hidden bg-white shadow-2xl shadow-[#10251f]/20 transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {menuOpen && (
          <>
            {/* Drawer header */}
            <div className="flex min-h-[82px] shrink-0 items-center justify-between border-b border-[#123b32]/10 px-5">
              <a
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <img
                  src="/logo.png"
                  alt=""
                  className="h-12 w-12 rounded-full border border-[#d6b66b] object-contain"
                />
                <span className="text-sm font-extrabold tracking-[0.16em] text-[#123b32]">
                  PSCDB
                </span>
              </a>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#123b32]/15 text-[#123b32] transition hover:bg-[#f3f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#167a62]"
              >
                <MenuIcon open />
              </button>
            </div>

            {/* Drawer links */}
            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto px-5 py-6"
            >
              <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8a968f]">
                Explore PSCDB
              </p>

              <div className="grid gap-2">
                {links.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex min-h-14 items-center justify-between rounded-2xl px-4 text-[15px] font-semibold text-[#40564d] transition-all duration-200 hover:translate-x-1 hover:bg-[#f3f7f4] hover:text-[#123b32] focus-visible:outline-2 focus-visible:outline-[#167a62]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-[#b18d3f]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </span>

                    <span
                      aria-hidden="true"
                      className="text-[#167a62] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </nav>

            {/* Drawer actions */}
            <div className="grid shrink-0 gap-3 border-t border-[#123b32]/10 p-5">
              <a
                href="/sign-in"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center rounded-full border border-[#123b32]/20 text-sm font-bold text-[#123b32] transition hover:bg-[#f3f7f4] focus-visible:outline-2 focus-visible:outline-[#167a62]"
              >
                Sign In
              </a>

              <a
                href="/register"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#123b32] text-sm font-bold text-white transition hover:bg-[#167a62] focus-visible:outline-2 focus-visible:outline-[#d6b66b]"
              >
Register
                <span aria-hidden="true" className="text-[#e8cf8e]">
                  ↗
                </span>
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}