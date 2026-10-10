import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAlert } from "../Context/Alert";
import { useAuth } from "../Context/AuthContext";
const OTP_LENGTH = 6;
const RESEND_DELAY = 60;

function maskEmail(email) {
  if (!email || !email.includes("@")) return "your email";

  const [name, domain] = email.split("@");
  const visibleCharacter = name.slice(0, 1);
  const hiddenCharacters = "*".repeat(Math.max(name.length - 1, 3));
  return `${visibleCharacter}${hiddenCharacters}@${domain}`;
}

export default function OTPVerification() {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [resendSeconds, setResendSeconds] = useState(RESEND_DELAY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [notice, setNotice] = useState(null);
  const inputRefs = useRef([]);
const { showAlert } = useAlert();
const {HandleVerificationEmail_OTP  } = useAuth();

  const location = useLocation();
  const emailFromNavigation = location.state?.email ?? "";

  const [verificationData, setVerificationData] = useState({
    email: emailFromNavigation,
    otp: "",
  });




  useEffect(() => {
    setVerificationData((current) => ({
      ...current,
      email: emailFromNavigation,
    }));
  }, [emailFromNavigation]);




  useEffect(() => {
    if (resendSeconds <= 0) return undefined;

    const timer = window.setTimeout(() => {
      setResendSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendSeconds]);

  function updateOtpDigit(index, value) {
    const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

    if (!digits) {
      setOtp((current) =>
        current.map((digit, digitIndex) =>
          digitIndex === index ? "" : digit,
        ),
      );
      setNotice(null);
      return;
    }

    const nextOtp = [...otp];
    digits.split("").forEach((digit, offset) => {
      const targetIndex = index + offset;
      if (targetIndex < OTP_LENGTH) nextOtp[targetIndex] = digit;
    });

    setOtp(nextOtp);
    setNotice(null);

    const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  }

  function handlePaste(event) {
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedDigits) return;

    event.preventDefault();

    const nextOtp = Array(OTP_LENGTH).fill("");
    pastedDigits.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);
    setNotice(null);

    inputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH - 1)]?.focus();
  }

  function handleKeyDown(event, index) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  async function handleSubmit(event) {
  event.preventDefault();
  setNotice(null);

  const code = otp.join("");

  if (!verificationData.email) {

showAlert({ type: "error", message: "Email information is missing. Please register again." });

    return;
  }

  if (code.length !== OTP_LENGTH) {
   
showAlert({ type: "error", message: "Please enter the complete 6-digit verification code" });

    return;
  }

  const payload = {
    email: verificationData.email,
    otp: code,
  };

  setVerificationData(payload);
  console.log("OTP verification data:", payload);

  // Baad mein yahan context function call hoga:
  // const result = await verifyEmail(payload);

}




  async function handleResend() {
    setNotice(null);

    if (resendSeconds > 0 || isResending) return;

    if (!onResend) {
      setNotice({
        type: "info",
        text: "The resend button is ready. Backend email delivery will be connected later.",
      });
      return;
    }

    setIsResending(true);

    try {
      const result = await onResend(email);

      if (result?.success === false) {
        throw new Error(result.message || "A new code could not be sent.");
      }

      setOtp(Array(OTP_LENGTH).fill(""));
      setResendSeconds(RESEND_DELAY);
      setNotice({
        type: "success",
        text: result?.message || "A new verification code has been sent.",
      });
      inputRefs.current[0]?.focus();
    } catch (error) {
      setNotice({
        type: "error",
        text: error.message || "Could not resend the code. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  }

  const noticeStyles = {
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    info: "border-[#D8B65A]/30 bg-[#D8B65A]/10 text-[#725C2B]",
  };
  return (
    <main className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden bg-[#F6F3E8] px-4 py-12 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 -z-10 h-80 w-80 rounded-full bg-[#C4ED70]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -right-24 -z-10 h-96 w-96 rounded-full bg-[#D8B65A]/15 blur-3xl"
      />

      <section
        aria-labelledby="otp-heading"
        className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#123B2B]/10 bg-white shadow-[0_32px_100px_-45px_rgba(18,59,43,0.45)] md:grid-cols-[0.9fr_1.1fr]"
      >
        {/* Brand panel */}
        <div className="relative hidden min-h-[530px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#167A62] via-[#0B4F3C] to-[#062D26] p-9 text-white md:flex lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#C4ED70]/10 blur-2xl"
          />

          <div className="relative">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#C4ED70]/30 bg-[#C4ED70]/10 text-[#D9F49C]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#D9F49C]">
              PSCDB Account Security
            </p>

            <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight lg:text-4xl">
              One small step to get started.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
              Verify your email to help protect your account and continue to
              your student profile.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C4ED70]/15 text-[#D9F49C]">
              ✓
            </span>
            <p className="text-sm leading-6 text-white/80">
              Your verification code is private. Never share it with anyone.
            </p>
          </div>
        </div>

        {/* Verification form */}
        <div className="flex items-center px-5 py-9 sm:px-10 sm:py-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 md:hidden">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#167A62]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#167A62]">
                <span className="h-2 w-2 rounded-full bg-[#167A62]" />
                PSCDB
              </span>
            </div>

            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF3D8] text-[#167A62]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <path
                  d="M3.5 6.5 12 13l8.5-6.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#167A62]">
              Email verification
            </p>

            <h1
              id="otp-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-[#123B2B] sm:text-4xl"
            >
              Check your inbox
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#65756A]">
              Enter the 6-digit code sent to{" "}
              <span className="font-semibold text-[#123B2B]">
{maskEmail(verificationData.email)}              </span>
              .
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-[#123B2B]">
                  Verification code
                </legend>

                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        inputRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      pattern="[0-9]*"
                      maxLength={OTP_LENGTH}
                      value={digit}
                      aria-label={`Verification code digit ${index + 1}`}
                      onChange={(event) =>
                        updateOtpDigit(index, event.target.value)
                      }
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      onPaste={handlePaste}
                      className="h-12 min-w-0 rounded-xl border border-[#173A30]/15 bg-[#FBFCF8] text-center text-xl font-bold text-[#123B2B] outline-none transition duration-200 focus:border-[#167A62] focus:bg-white focus:ring-4 focus:ring-[#167A62]/10 sm:h-14 sm:text-2xl"
                    />
                  ))}
                </div>
              </fieldset>

              {notice && (
                <p
                  role={notice.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`mt-5 rounded-xl border px-4 py-3 text-sm leading-6 ${noticeStyles[notice.type]
                    }`}
                >
                  {notice.text}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#167A62] to-[#0B4F3C] px-5 text-sm font-bold text-white shadow-[0_5px_0_#073B31,0_12px_24px_-12px_rgba(22,122,98,.7)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_0_#073B31,0_16px_28px_-12px_rgba(22,122,98,.75)] active:translate-y-1 active:shadow-[0_2px_0_#073B31] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#167A62]/20 disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none"
              >
                {isSubmitting ? "Verifying..." : "Verify email"}
                {!isSubmitting && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <div className="mt-7 text-center">
              <p className="text-sm text-[#65756A]">
                Didn’t receive the code?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={resendSeconds > 0 || isResending}
                className="mt-2 min-h-11 rounded-lg px-3 text-sm font-bold text-[#167A62] transition hover:bg-[#167A62]/5 hover:text-[#0B4F3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#167A62] disabled:cursor-not-allowed disabled:text-[#89968C] motion-reduce:transition-none"
              >
                {isResending
                  ? "Sending new code..."
                  : resendSeconds > 0
                    ? `Resend code in 00:${String(resendSeconds).padStart(2, "0")}`
                    : "Resend verification code"}
              </button>
            </div>

            <p className="mt-8 text-center text-xs leading-5 text-[#8A9890]">
              PSCDB will never ask you to share your verification code.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}