import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const passwordRules = [
  { label: "9+ characters", test: (value) => value.length >= 9 },
  { label: "Uppercase", test: (value) => /[A-Z]/.test(value) },
  { label: "Lowercase", test: (value) => /[a-z]/.test(value) },
  { label: "Number", test: (value) => /\d/.test(value) },
  {
    label: "Special character",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

export default function Register({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
const {HandleRegister  } = useAuth();

  const passwordIsValid = passwordRules.every((rule) =>
    rule.test(form.password),
  );

  const passwordsMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const passwordStrength = passwordRules.filter((rule) =>
    rule.test(form.password),
  ).length;

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setNotice(null);
  }

 const  handleSubmit=async (event)=> {
    event.preventDefault();
    setNotice(null);

    if (!passwordIsValid) {
      setNotice({
        type: "error",
        text: "Complete all password requirements first.",
      });
      return;
    }

    if (!passwordsMatch) {
      setNotice({
        type: "error",
        text: "Your passwords do not match.",
      });
      return;
    }

    
    await HandleRegister(form)
    
     setForm({
       name: "",
       email: "",
       phoneNumber: "",
       password: "",
       confirmPassword: "",})
     
    
  }

  const inputClass =
    "mt-1.5 h-11 w-full rounded-xl border border-[#173A30]/15 bg-white px-3.5 text-sm text-[#173A30] outline-none transition placeholder:text-[#8A9890] focus:border-[#167A62] focus:ring-4 focus:ring-[#167A62]/10";

  const passwordInputClass =
    "h-11 w-full rounded-xl border border-[#173A30]/15 bg-white px-3.5 pr-12 text-sm text-[#173A30] outline-none transition focus:border-[#167A62] focus:ring-4 focus:ring-[#167A62]/10";

  return (
    <form onSubmit={handleSubmit} className="auth-tab-enter space-y-3.5">
      <label htmlFor="register-name" className="block">
        <span className="text-sm font-semibold text-[#173A30]">Full name</span>
        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={updateField}
          placeholder="Your full name"
          minLength={2}
          required
          className={inputClass}
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-2">
        <label htmlFor="register-email" className="block">
          <span className="text-sm font-semibold text-[#173A30]">Email</span>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={updateField}
            placeholder="you@example.com"
            required
            className={inputClass}
          />
        </label>

        <label htmlFor="register-phone" className="block">
          <span className="text-sm font-semibold text-[#173A30]">
            Phone number
          </span>
          <input
            id="register-phone"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phoneNumber}
            onChange={updateField}
            placeholder="+92 300 1234567"
            required
            className={inputClass}
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="text-sm font-semibold text-[#173A30]"
        >
          Create password
        </label>

        <div className="relative mt-1.5">
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.password}
            onChange={updateField}
            required
            className={passwordInputClass}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-[#55745D] transition hover:text-[#167A62] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#167A62]"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.8 4.1 10 7-.4 1-1.3 2.4-2.7 3.7M6.2 6.2C3.9 7.6 2.5 9.7 2 12c1.2 2.9 4.8 7 10 7 1.4 0 2.6-.3 3.7-.8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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

        <div
          className="mt-2 grid grid-cols-5 gap-1"
          aria-label={`Password requirements met: ${passwordStrength} of 5`}
        >
          {passwordRules.map((rule) => (
            <span
              key={rule.label}
              aria-hidden="true"
              className={`h-1 rounded-full transition-colors ${
                rule.test(form.password) ? "bg-[#167A62]" : "bg-[#DDE5DC]"
              }`}
            />
          ))}
        </div>

        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
          {passwordRules.map((rule) => {
            const passed = rule.test(form.password);

            return (
              <span
                key={rule.label}
                className={passed ? "font-semibold text-[#167A62]" : "text-[#718077]"}
              >
                {passed ? "✓" : "·"} {rule.label}
              </span>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="register-confirm-password"
          className="text-sm font-semibold text-[#173A30]"
        >
          Confirm password
        </label>

        <div className="relative mt-1.5">
          <input
            id="register-confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={updateField}
            required
            className={passwordInputClass}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword((current) => !current)
            }
            aria-label={
              showConfirmPassword
                ? "Hide confirmation password"
                : "Show confirmation password"
            }
            aria-pressed={showConfirmPassword}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-[#55745D] transition hover:text-[#167A62] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#167A62]"
          >
            {showConfirmPassword ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.8 4.1 10 7-.4 1-1.3 2.4-2.7 3.7M6.2 6.2C3.9 7.6 2.5 9.7 2 12c1.2 2.9 4.8 7 10 7 1.4 0 2.6-.3 3.7-.8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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

        {form.confirmPassword &&
          form.password !== form.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              Passwords do not match.
            </p>
          )}
      </div>

      {notice && (
        <p
          role={notice.type === "error" ? "alert" : "status"}
          className={`rounded-xl border px-3.5 py-2.5 text-sm ${
            notice.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {notice.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#167A62] to-[#0B4F3C] text-sm font-bold text-white shadow-[0_5px_0_#073B31,0_12px_24px_-12px_rgba(22,122,98,.7)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_0_#073B31,0_16px_28px_-12px_rgba(22,122,98,.75)] active:translate-y-1 active:shadow-[0_2px_0_#073B31] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#167A62]/20 disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
        {!loading && (
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </button>
    </form>
  );
}