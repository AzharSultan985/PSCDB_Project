import { useEffect, useMemo, useState } from "react";
import "./StudentPortal.css";

const initialForm = (user) => ({
  fullName: user?.fullName || user?.name || "",
  age: "",
  gender: "",

  province: "",
  district: "",
  city: "",

  latestEducationLevel: "",
  latestPercentage: "",
  latestCompletionYear: "",
  latestRollNumber: "",

  currentlyStudying: "",
  currentEducationLevel: "",
  currentFieldOfStudy: "",
  currentInstitution: "",
  currentInstitutionCity: "",
});

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[#DFE8DF] bg-white px-4 py-3 text-sm text-[#173A30] outline-none transition placeholder:text-[#9AA69E] hover:border-[#B8C9B6] focus:border-[#167A62] focus:ring-4 focus:ring-[#167A62]/10";

const educationOptions = [
  "Primary",
  "Middle",
  "Matriculation",
  "Intermediate",
  "DAE / Diploma",
  "Bachelor’s",
  "Master’s",
  "MPhil / PhD",
  "Other",
];

function TextField({
  label,
  name,
  value,
  onChange,
  required = false,
  optional = false,
  ...props
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#30483D]">
        {label}
        {required && <span className="ml-1 text-[#167A62]">*</span>}
        {optional && (
          <span className="ml-1 text-xs font-normal text-[#93A097]">
            Optional
          </span>
        )}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
        {...props}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#30483D]">
        {label}
        {required && <span className="ml-1 text-[#167A62]">*</span>}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function StudentProfile({ user }) {
  const [form, setForm] = useState(() => initialForm(user));
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!profilePhoto) {
      setPhotoPreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(profilePhoto);
    setPhotoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePhoto]);

  const completion = useMemo(() => {
    const fields = [
      "fullName",
      "age",
      "province",
      "district",
      "city",
      "latestEducationLevel",
      "latestPercentage",
      "latestCompletionYear",
      "latestRollNumber",
    ];

    if (form.currentlyStudying === "yes") {
      fields.push(
        "currentEducationLevel",
        "currentFieldOfStudy",
        "currentInstitution",
        "currentInstitutionCity",
      );
    } else {
      fields.push("currentlyStudying");
    }

    const completed = fields.filter((field) =>
      String(form[field] || "").trim(),
    ).length;

    return Math.round((completed / fields.length) * 100);
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "currentlyStudying" && value === "no"
        ? {
            currentEducationLevel: "",
            currentFieldOfStudy: "",
            currentInstitution: "",
            currentInstitutionCity: "",
          }
        : {}),
    }));

    setNotice("");
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setNotice("Please choose a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setNotice("Image size must be 2 MB or less.");
      event.target.value = "";
      return;
    }

    setProfilePhoto(file);
    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      fullName: form.fullName.trim(),
      age: Number(form.age),
      gender: form.gender || null,

      location: {
        province: form.province,
        district: form.district.trim(),
        city: form.city.trim(),
      },

      latestEducation: {
        level: form.latestEducationLevel,
        percentageMarks: Number(form.latestPercentage),
        completionYear: Number(form.latestCompletionYear),
        rollNumber: form.latestRollNumber.trim(),
      },

      currentlyStudying: form.currentlyStudying === "yes",

      currentEducation:
        form.currentlyStudying === "yes"
          ? {
              level: form.currentEducationLevel,
              fieldOfStudy: form.currentFieldOfStudy.trim(),
              institution: form.currentInstitution.trim(),
              institutionCity: form.currentInstitutionCity.trim(),
            }
          : null,

      // File object: actual upload ke liye baad mein FormData use hoga.
      profilePhoto,
    };

    console.log("Student profile payload:", payload);
    setNotice("Profile payload is ready and logged in the browser console.");
  }

  return (
    <div className="student-profile-page mx-auto max-w-7xl">
      <header className="profile-heading mb-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#DCE9D4] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#167A62]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8EBE43]" />
          Student profile
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#173A30] sm:text-4xl">
          Complete your profile
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718077] sm:text-base">
          Add your personal and education details to prepare your PSCDB student
          profile.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <form
          onSubmit={handleSubmit}
          className="profile-form-card rounded-3xl border border-[#E5EBE3] bg-white p-5 shadow-[0_16px_50px_-38px_rgba(23,58,48,.35)] sm:p-8"
        >
          <section aria-labelledby="photo-heading">
            <div className="mb-5">
              <h2 id="photo-heading" className="font-bold text-[#173A30]">
                Profile photo
              </h2>
              <p className="mt-1 text-xs text-[#829087]">
                Upload a clear, passport-style photo. JPG, PNG or WEBP, up to
                2 MB.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#DFE8DF] bg-[#F3F7EF]">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile photo preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-[#8AA08B]">
                    {(form.fullName.trim()[0] || "S").toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-[#C8D8C3] bg-white px-4 py-2.5 text-sm font-bold text-[#176247] transition hover:border-[#167A62] hover:bg-[#F4F8F1] focus-within:ring-4 focus-within:ring-[#167A62]/10">
                  Choose photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                </label>
                <p className="mt-2 text-xs text-[#829087]">
                  Keep your face centered in the photo.
                </p>
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-[#EDF1EB]" />

          <section aria-labelledby="personal-heading">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6E8] text-sm font-bold text-[#167A62]">
                01
              </span>
              <div>
                <h2 id="personal-heading" className="font-bold text-[#173A30]">
                  Personal information
                </h2>
                <p className="mt-0.5 text-xs text-[#829087]">
                  Your basic details
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <TextField
                  label="Full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={2}
                  required
                />
              </div>

              <TextField
                label="Age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="13"
                max="100"
                required
              />

              <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={[
                  { value: "female", label: "Female" },
                  { value: "male", label: "Male" },
                  { value: "prefer-not-to-say", label: "Prefer not to say" },
                ]}
              />
            </div>
          </section>

          <div className="my-8 border-t border-[#EDF1EB]" />

          <section aria-labelledby="location-heading">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6E8] text-sm font-bold text-[#167A62]">
                02
              </span>
              <div>
                <h2 id="location-heading" className="font-bold text-[#173A30]">
                  Location
                </h2>
                <p className="mt-0.5 text-xs text-[#829087]">
                  Where you are based
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Province"
                name="province"
                value={form.province}
                onChange={handleChange}
                required
                options={[
                  { value: "punjab", label: "Punjab" },
                  { value: "sindh", label: "Sindh" },
                  {
                    value: "khyber-pakhtunkhwa",
                    label: "Khyber Pakhtunkhwa",
                  },
                  { value: "balochistan", label: "Balochistan" },
                  { value: "gilgit-baltistan", label: "Gilgit-Baltistan" },
                  {
                    value: "azad-jammu-kashmir",
                    label: "Azad Jammu & Kashmir",
                  },
                  {
                    value: "islamabad",
                    label: "Islamabad Capital Territory",
                  },
                ]}
              />

              <TextField
                label="District"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Enter your district"
                required
              />

              <div className="sm:col-span-2">
                <TextField
                  label="City or town"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter your city or town"
                  autoComplete="address-level2"
                  required
                />
              </div>
            </div>
          </section>

          <div className="my-8 border-t border-[#EDF1EB]" />

          <section aria-labelledby="latest-education-heading">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6E8] text-sm font-bold text-[#167A62]">
                03
              </span>
              <div>
                <h2
                  id="latest-education-heading"
                  className="font-bold text-[#173A30]"
                >
                  Latest completed education
                </h2>
                <p className="mt-0.5 text-xs text-[#829087]">
                  Your most recently completed level
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Completion level"
                name="latestEducationLevel"
                value={form.latestEducationLevel}
                onChange={handleChange}
                options={educationOptions}
                required
              />

              <TextField
                label="Percentage marks"
                name="latestPercentage"
                type="number"
                value={form.latestPercentage}
                onChange={handleChange}
                placeholder="e.g. 78.5"
                min="0"
                max="100"
                step="0.01"
                required
              />

              <TextField
                label="Completion year"
                name="latestCompletionYear"
                type="number"
                value={form.latestCompletionYear}
                onChange={handleChange}
                placeholder="e.g. 2025"
                min="1950"
                max="2100"
                required
              />

              <TextField
                label="Roll number"
                name="latestRollNumber"
                value={form.latestRollNumber}
                onChange={handleChange}
                placeholder="Enter your roll number"
                required
              />
            </div>
          </section>

          <div className="my-8 border-t border-[#EDF1EB]" />

          <section aria-labelledby="current-education-heading">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EFF6E8] text-sm font-bold text-[#167A62]">
                04
              </span>
              <div>
                <h2
                  id="current-education-heading"
                  className="font-bold text-[#173A30]"
                >
                  Current education
                </h2>
                <p className="mt-0.5 text-xs text-[#829087]">
                  Tell us if you are currently studying
                </p>
              </div>
            </div>

            <SelectField
              label="Are you currently studying?"
              name="currentlyStudying"
              value={form.currentlyStudying}
              onChange={handleChange}
              required
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />

            {form.currentlyStudying === "yes" && (
              <div className="profile-current-study mt-5 grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Current education level"
                  name="currentEducationLevel"
                  value={form.currentEducationLevel}
                  onChange={handleChange}
                  options={educationOptions}
                  required
                />

                <TextField
                  label="Current field of study"
                  name="currentFieldOfStudy"
                  value={form.currentFieldOfStudy}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  required
                />

                <TextField
                  label="School, college or institution"
                  name="currentInstitution"
                  value={form.currentInstitution}
                  onChange={handleChange}
                  placeholder="Enter institution name"
                  required
                />

                <TextField
                  label="Institution city"
                  name="currentInstitutionCity"
                  value={form.currentInstitutionCity}
                  onChange={handleChange}
                  placeholder="Enter institution city"
                  required
                />
              </div>
            )}
          </section>

          {notice && (
            <p
              role="status"
              aria-live="polite"
              className="mt-6 rounded-xl border border-[#DCE9D4] bg-[#F1F7EC] px-4 py-3 text-sm text-[#176247]"
            >
              {notice}
            </p>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#EDF1EB] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#829087]">
              Fields marked <span className="font-bold text-[#167A62]">*</span>{" "}
              are required.
            </p>

            <button
              type="submit"
              className="profile-submit inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B684F] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#0B684F]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#09563F] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#167A62]/20"
            >
              Save profile <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>

        <aside className="profile-aside space-y-5 lg:sticky lg:top-24">
          <section className="rounded-3xl border border-[#E5EBE3] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#173A30]">
                  Profile completion
                </p>
                <p className="mt-1 text-xs text-[#829087]">
                  Required details added
                </p>
              </div>
              <span className="text-2xl font-extrabold text-[#167A62]">
                {completion}%
              </span>
            </div>

            <div
              className="mt-5 h-2 overflow-hidden rounded-full bg-[#EAF0E7]"
              role="progressbar"
              aria-label="Profile completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={completion}
            >
              <span
                className="profile-progress-fill block h-full rounded-full bg-gradient-to-r from-[#167A62] to-[#A5CD57]"
                style={{ width: `${completion}%` }}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-[#718077]">
              {completion === 100
                ? "All required profile details are filled in."
                : "Complete the required fields to finish your student profile."}
            </p>
          </section>

          <section className="rounded-3xl bg-[#0B4F3C] p-6 text-white shadow-lg shadow-[#0B4F3C]/10">
            <span
              aria-hidden="true"
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-xl text-[#D6F28D]"
            >
              ✦
            </span>
            <h2 className="mt-4 font-bold">Your profile, your progress</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Keep your education information current so your student record
              stays useful.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}