import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice(null);

    try {
      setLoading(true);

      const result = await onLogin({
        email: email.trim(),
        password,
      });

      setNotice({
        type: result.ok ? "success" : "error",
        text: result.message,
      });
    } catch {
      setNotice({
        type: "error",
        text: "Sign in failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-tab-enter space-y-4">
      <label htmlFor="login-email" className="block">
        <span className="text-sm font-semibold text-[#173A30]">
          Email address
        </span>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setNotice(null);
          }}
          placeholder="you@example.com"
          required
          className="mt-1.5 h-11 w-full rounded-xl border border-[#173A30]/15 bg-white px-3.5 text-sm text-[#173A30] outline-none transition placeholder:text-[#8A9890] focus:border-[#167A62] focus:ring-4 focus:ring-[#167A62]/10"
        />
      </label>

      <div>
        <label
          htmlFor="login-password"
          className="text-sm font-semibold text-[#173A30]"
        >
          Password
        </label>

        <div className="relative mt-1.5">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setNotice(null);
            }}
            required
            className="h-11 w-full rounded-xl border border-[#173A30]/15 bg-white px-3.5 pr-12 text-sm text-[#173A30] outline-none transition focus:border-[#167A62] focus:ring-4 focus:ring-[#167A62]/10"
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
        {loading ? "Signing in..." : "Sign in to your account"}
        {!loading && (
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </button>

      <p className="text-center text-xs text-[#718077]">
        Demo mode: sign in with an account registered in this session.
      </p>
    </form>
  );
}