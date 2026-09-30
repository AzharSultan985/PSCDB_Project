const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Programmes", href: "#programmes" },
      { label: "Opportunities", href: "#opportunities" },
      { label: "Our Work", href: "#our-work" },
      { label: "About PSCDB", href: "#about" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "For Learners", href: "#learners" },
      { label: "For Employers", href: "#employers" },
      { label: "Become a Mentor", href: "#mentors" },
      { label: "Support Our Work", href: "#support" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "Privacy Notice", href: "#privacy" },
      { label: "Terms of Use", href: "#terms" },
      { label: "Accessibility", href: "#accessibility" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#123b32] text-white">
      <div className="mx-auto max-w-7xl px-5 pb-7 pt-14 sm:px-8 lg:px-10 lg:pt-16">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          {/* Brand and summary */}
          <div className="max-w-sm">
            <a
              href="#home"
              aria-label="PSCDB home"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e]"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-[#d6b66b] bg-[#f7f5ef] p-0.5">
                <img
                  src="/logo.png"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>

              <span>
                <span className="block text-sm font-extrabold tracking-[0.16em] text-[#e8cf8e]">
                  PSCDB
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-white/65">
                  Pakistan Skills Development
                  <br />
                  Community Board
                </span>
              </span>
            </a>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Connecting people with skills, guidance and pathways to
              opportunity.
            </p>

            <a
              href="#programmes"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d6b66b] px-5 text-sm font-bold text-[#173c32] transition hover:-translate-y-0.5 hover:bg-[#e8cf8e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore programmes
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Footer link groups */}
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-bold text-white">{group.title}</h2>

              <ul className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-[#e8cf8e] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-0 border-t border-white/15 pt-6 text-center text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:text-start">
  <p>
    © {new Date().getFullYear()} Pakistan Skills Development Community Board
  </p>

  <p>
    Powered by{" "}
    <span className="font-semibold text-[#e8cf8e]">Azhar Sultan</span>
  </p>

  <a
    href="#home"
    className="inline-flex items-center justify-center gap-2 text-white/70 transition-colors hover:text-[#e8cf8e] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e]"
  >
    Back to top <span aria-hidden="true">↑</span>
  </a>
</div>
      </div>
    </footer>
  );
}