function formatFee(amount) {
  if (amount === null || amount === undefined) return "Fee to be confirmed";

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EnrollmentCart({
  programme,
  selectedMode,
  onSelectMode,
  onContinue,
}) {
  const modeKeys = ["remote", "centre"];
  const mode = selectedMode ? programme.modes?.[selectedMode] : null;

  return (
    <aside className="rounded-3xl border border-[#DDE8D5] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(23,58,48,.45)] sm:p-6 lg:sticky lg:top-24">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-[#688F45]">
        Choose your learning format
      </p>

      <h2 className="mt-2 text-xl font-bold text-[#173A30]">
        Select an option
      </h2>

      <div className="mt-5 space-y-3">
        {modeKeys.map((key) => {
          const option = programme.modes?.[key];
          if (!option) return null;

          const active = selectedMode === key;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onSelectMode(key)}
              className={`w-full rounded-2xl border p-4 text-left transition duration-200 ${
                active
                  ? "border-[#176247] bg-[#F1F7ED] ring-2 ring-[#176247]/10"
                  : "border-[#E5EBE3] bg-white hover:border-[#A9BE99] hover:bg-[#FAFCF8]"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block font-bold text-[#173A30]">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#718077]">
                    {option.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                    active
                      ? "border-[#176247] bg-[#176247] text-white"
                      : "border-[#C9D3C7] text-transparent"
                  }`}
                >
                  ✓
                </span>
              </span>

              <span className="mt-3 block text-sm font-extrabold text-[#176247]">
                {formatFee(option.fee)}
              </span>
            </button>
          );
        })}
      </div>

      {mode && (
        <div className="mt-5 rounded-2xl bg-[#F7F9F5] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#829087]">
            Selected option details
          </p>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#829087]">Schedule</dt>
              <dd className="mt-0.5 font-semibold text-[#173A30]">
                {mode.schedule || programme.timing || "To be announced"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#829087]">Location</dt>
              <dd className="mt-0.5 font-semibold text-[#173A30]">
                {mode.location || "To be announced"}
              </dd>
            </div>
          </dl>
          {mode.includes?.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-[#617066]">
              {mode.includes.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-[#EDF0EB] pt-4">
        <span className="text-sm text-[#718077]">Programme fee</span>
        <strong className="text-lg text-[#173A30]">
          {mode ? formatFee(mode.fee) : "Select an option"}
        </strong>
      </div>

      <button
        type="button"
        disabled={!selectedMode}
        onClick={() => selectedMode && onContinue(selectedMode)}
        className="mt-5 min-h-12 w-full rounded-xl bg-[#176247] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#176247]/15 transition hover:bg-[#0B4F3C] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#176247]/20 disabled:cursor-not-allowed disabled:opacity-45"
      >
        Enrol and continue
        <span aria-hidden="true" className="ml-2">→</span>
      </button>

      <p className="mt-3 text-center text-xs leading-5 text-[#829087]">
        You can review the contract and fee details on the next page.
      </p>
    </aside>
  );
}