import { useState } from "react";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  onBlur,
  autoComplete,
  hint,
  error,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#173A30]">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          required
          className="h-12 w-full rounded-xl border border-[#173A30]/15 bg-white px-4 pr-12 text-sm text-[#173A30] outline-none transition duration-200 placeholder:text-[#8A9890] focus:border-[#4C8A58] focus:ring-4 focus:ring-[#4C8A58]/10"
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-[#55745D] transition hover:bg-[#EAF3E5] hover:text-[#173A30] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C8A58]"
        >
          {visible ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.8 4.1 10 7-.4 1-1.3 2.4-2.7 3.7M6.2 6.2C3.9 7.6 2.5 9.7 2 12c1.2 2.9 4.8 7 10 7 1.4 0 2.6-.3 3.7-.8"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>
          )}
        </button>
      </div>

      {hint && !error && (
        <p className="mt-2 text-xs leading-5 text-[#718077]">{hint}</p>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs leading-5 text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}