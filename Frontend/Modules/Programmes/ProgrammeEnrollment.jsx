import { useEffect, useState } from "react";
import { useStudent } from "../../Context/studentContext";

const inputClass =
  "mt-2 w-full rounded-xl border border-[#DFE8DF] bg-white px-4 py-3 text-sm text-[#173A30] outline-none transition placeholder:text-[#9AA69E] focus:border-[#167A62] focus:ring-4 focus:ring-[#167A62]/10";

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E5EBE3] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#829087]">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-bold text-[#173A30]">{value}</p>
    </div>
  );
}

export default function ProgrammeEnrollment({ programme, onBack }) {
  const { studentProfile, fetchStudentProfile, studentLoading } = useStudent();
  const [payload, setPayload] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    motivation: "",
    confirmDetails: false,
  });

  const profile = studentProfile?.profile || studentProfile || {};
  const location = profile.location || studentProfile?.location || {};
  const availableSeats = Math.max(
    0,
    programme.maxSeats - programme.enrolledSeats,
  );

  useEffect(() => {
    if (!studentProfile && fetchStudentProfile) {
      fetchStudentProfile();
    }
  }, [studentProfile, fetchStudentProfile]);

  useEffect(() => {
    if (!studentProfile) return;

    setForm((current) => ({
      ...current,
      fullName: studentProfile.fullName || current.fullName,
      email: studentProfile.email || current.email,
      phoneNumber: studentProfile.phoneNumber || current.phoneNumber,
      city: location.city || current.city,
    }));
  }, [studentProfile, location.city]);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (availableSeats <= 0) return;

    const enrollmentPayload = {
      program: {
        id: programme.id,
        slug: programme.slug,
        title: programme.title,
        duration: programme.duration,
        timing: programme.timing,
        creditHours: programme.creditHours,
      },
      student: {
        id: studentProfile?._id || studentProfile?.id || null,
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phoneNumber: form.phoneNumber.trim(),
        city: form.city.trim(),
      },
      motivation: form.motivation.trim(),
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    setPayload(enrollmentPayload);
    console.log("Enrollment payload (not submitted to backend):", enrollmentPayload);
  }

  if (payload) {
    return (
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <div className="rounded-3xl border border-[#DCE9D4] bg-white p-7 text-center shadow-sm sm:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#EAF4E2] text-2xl font-bold text-[#167A62]">
            ✓
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#608B3E]">
            Enrollment details prepared
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#173A30]">
            {programme.title}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#68766D]">
            Your enrollment payload is currently saved in component state and
            logged in the browser console. It has not been submitted to the
            server yet.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-xl bg-[#176247] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0B4F3C] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#167A62]/20"
          >
            Back to programmes
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#176247] hover:text-[#0B4F3C]"
      >
        <span aria-hidden="true">←</span> Back to programmes
      </button>

      <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-3xl bg-gradient-to-br from-[#0B4F3C] to-[#176247] p-6 text-white shadow-lg sm:p-8">
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-sm font-black"
            style={{ boxShadow: `inset 0 -3px 0 ${programme.accent}` }}
          >
            {programme.initials}
          </span>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#D6F28D]">
            {programme.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{programme.title}</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            {programme.description}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Detail label="Duration" value={programme.duration} />
            <Detail
              label="Credit hours"
              value={`${programme.creditHours} hours`}
            />
            <Detail label="Class timing" value={programme.timing} />
            <Detail
              label="Seats remaining"
              value={`${availableSeats} of ${programme.maxSeats}`}
            />
          </div>

          {availableSeats === 0 && (
            <p className="mt-4 rounded-xl border border-white/20 bg-white/10 p-3 text-sm font-semibold">
              This programme is currently full.
            </p>
          )}
        </aside>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#E5EBE3] bg-white p-5 shadow-sm sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#608B3E]">
            Student enrollment
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#173A30]">
            Confirm your details
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#718077]">
            Check your contact details and tell us why you want to join this
            programme.
          </p>

          {studentLoading && (
            <p className="mt-4 text-sm text-[#718077]">
              Loading your saved student details…
            </p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-[#30483D]">
                Full name
              </span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputClass}
                placeholder="Your full name"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#30483D]">
                Email
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputClass}
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#30483D]">
                Phone number
              </span>
              <input
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
                autoComplete="tel"
                required
                className={inputClass}
                placeholder="+92 300 1234567"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#30483D]">
                City
              </span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
                required
                className={inputClass}
                placeholder="Your city"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-[#30483D]">
                Why are you interested in this programme?
              </span>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                required
                minLength={20}
                maxLength={1000}
                rows={4}
                className={inputClass}
                placeholder="Tell us briefly about your learning goals…"
              />
            </label>
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#56675B]">
            <input
              name="confirmDetails"
              type="checkbox"
              checked={form.confirmDetails}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 accent-[#176247]"
            />
            <span>I confirm that the information above is accurate.</span>
          </label>

          <button
            type="submit"
            disabled={availableSeats <= 0}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#176247] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0B4F3C] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#167A62]/20 disabled:cursor-not-allowed disabled:bg-[#9AA69E]"
          >
            {availableSeats > 0
              ? "Prepare enrollment"
              : "No seats available"}
          </button>
        </form>
      </div>
    </section>
  );
}