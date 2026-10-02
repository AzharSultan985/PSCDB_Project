import ScrollReveal3D from "./ScrollReveal3D";

const address =
  "Office No. 11, 1st Floor, Star Complex, Stadium Road, Sahiwal, Pakistan";

const mapQuery = encodeURIComponent(address);
const mapUrl = `https://www.google.com/maps?q=${mapQuery}`;

function handleContactSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const mailSubject = encodeURIComponent(
    subject ? `${subject} — PSCDB website inquiry` : "PSCDB website inquiry",
  );

  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );

  window.location.href = `mailto:info@pscdb.org?subject=${mailSubject}&body=${mailBody}`;
}

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-hidden bg-gradient-to-br from-[#062D26] via-[#083B30] to-[#06271F] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-[#A7E85A]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-80 -z-10 h-96 w-96 rounded-full bg-[#65C8FF]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <ScrollReveal3D as="header" direction="up">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#B8E85B]/30 bg-[#B8E85B]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D2F28D] sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#B8E85B]" />
              Contact PSCDB
            </span>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#FFFDF5] sm:text-5xl lg:text-6xl">
              Let’s start a
              <span className="block text-[#C4ED70]">conversation.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#D5E9DD] sm:text-base">
              Have a question about skills, partnerships or our work? Send us a
              message or get in touch using the contact details below.
            </p>
          </div>
        </ScrollReveal3D>

        {/* Contact details and form */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <ScrollReveal3D direction="left">
            <aside className="h-full rounded-[2rem] border border-white/10 bg-[#0B362D]/85 p-6 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.9)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B9EF73]">
                Get in touch
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#FFFDF5]">
                We’d be glad to hear from you.
              </h2>

              <div className="mt-8 space-y-4">
                <a
                  href="mailto:info@pscdb.org"
                  className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#C4ED70]/40 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4ED70]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#C4ED70] text-[#123B2B]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="m4 7 8 6 8-6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#AFC8B7]">
                      Email
                    </span>
                    <span className="mt-1 block break-all font-semibold text-white group-hover:text-[#C4ED70]">
                      info@pscdb.org
                    </span>
                  </span>
                </a>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#C4ED70]/40 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4ED70]"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#F2C14E] text-[#123B2B]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                    >
                      <path
                        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </span>

                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-[#AFC8B7]">
                      Office address
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-6 text-white group-hover:text-[#C4ED70]">
                      {address}
                    </span>
                  </span>
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-[#C4ED70]/20 bg-[#C4ED70]/[0.07] p-5">
                <p className="text-sm font-semibold text-[#D7F69A]">
                  Planning a collaboration?
                </p>
                <p className="mt-2 text-sm leading-6 text-[#D5E9DD]">
                  Email us with a short description of your organisation and
                  what you’d like to discuss.
                </p>
              </div>
            </aside>
          </ScrollReveal3D>

         <ScrollReveal3D direction="right" delay={120}>
  <section
    aria-labelledby="ai-agent-heading"
    className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B362D]/90 p-6 text-white shadow-[0_25px_70px_-45px_rgba(0,0,0,0.9)] sm:p-8"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#A7E85A]/10 blur-3xl"
    />

    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#F2C14E]/30 bg-[#F2C14E]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F6D783]">
          <span className="h-2 w-2 rounded-full bg-[#F2C14E]" />
          Coming soon
        </span>

        <span className="text-xs font-medium text-[#AFC8B7]">
          PSCDB AI Assistant
        </span>
      </div>

      <div className="mt-7 flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#C4ED70] text-[#123B2B] shadow-[0_0_30px_rgba(196,237,112,0.18)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
          >
            <path
              d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        </span>

        <div>
          <h2
            id="ai-agent-heading"
            className="text-2xl font-semibold text-[#FFFDF5] sm:text-3xl"
          >
            Ask our AI Agent
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#D5E9DD]">
            A future AI guide to help visitors explore PSCDB programmes,
            learning pathways and partnership information.
          </p>
        </div>
      </div>

      {/* Preview only; this does not send a message to an AI service */}
      <div className="mt-7 rounded-2xl border border-white/10 bg-[#062D26] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C4ED70]/15 text-sm font-bold text-[#C4ED70]">
            AI
          </span>
          <div>
            <p className="text-sm font-semibold text-white">
              PSCDB AI Assistant
            </p>
            <p className="text-xs text-[#AFC8B7]">Planned feature</p>
          </div>
        </div>

        <div className="mt-5 max-w-sm rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-4 py-3">
          <p className="text-sm leading-6 text-[#E1EBDF]">
            Ask about skills programmes, learning support or getting in touch
            with PSCDB.
          </p>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#AFC8B7]">
          Example questions
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Which skills can I explore?",
            "How can I contact PSCDB?",
            "Where is the office?",
          ].map((question) => (
            <span
              key={question}
              className="rounded-full border border-[#C4ED70]/20 bg-[#C4ED70]/[0.06] px-3 py-2 text-xs text-[#D5E9DD]"
            >
              {question}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-2">
          <input
            type="text"
            disabled
            aria-label="AI assistant message input"
            placeholder="AI chat will be available in a future release"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white placeholder:text-[#8FA99A] outline-none disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            aria-label="AI assistant is coming soon"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#C4ED70]/40 text-[#123B2B] opacity-70"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <p className="mt-3 text-xs leading-5 text-[#AFC8B7]">
          The AI assistant is not connected yet. Until then, email our team
          directly.
        </p>
      </div>

      <a
        href="mailto:info@pscdb.org"
        className="group mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#C4ED70] px-6 text-sm font-bold text-[#123B2B] transition duration-300 hover:-translate-y-0.5 hover:bg-[#D7F69A] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C4ED70]/30"
      >
        Email our team
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  </section>
</ScrollReveal3D>
        </div>

        {/* Map */}
        <ScrollReveal3D as="div" direction="front" delay={100}>
          <section
            aria-labelledby="map-heading"
            className="mt-8 overflow-hidden rounded-[2rem] border border-white/15 bg-[#0B362D]/85 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B9EF73]">
                  Find our office
                </p>
                <h2
                  id="map-heading"
                  className="mt-2 text-xl font-semibold text-white sm:text-2xl"
                >
                  Visit PSCDB in Sahiwal
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#D5E9DD]">
                  {address}
                </p>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#C4ED70]/40 px-5 text-sm font-semibold text-[#D7F69A] transition hover:bg-[#C4ED70] hover:text-[#123B2B] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C4ED70]/30"
              >
                Open in Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="h-[320px] border-t border-white/10 bg-[#0A342C] sm:h-[400px]">
              <iframe
                title="PSCDB office location map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </ScrollReveal3D>
      </div>
    </main>
  );
}