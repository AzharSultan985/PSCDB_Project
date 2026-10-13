const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

function Info({ label, value }) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "Not provided"
      : value;

  return (
    <div className="rounded-2xl border border-[#E5EBE3] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#829087]">
        {label}
      </p>
      <p className="mt-1.5 break-words text-sm font-semibold text-[#173A30]">
        {displayValue}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-3xl border border-[#E5EBE3] bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-[#173A30]">{title}</h2>
      {children}
    </section>
  );
}

export default function StudentProfileDisplay({ student }) {
  const profile = student?.profile || {};

  const location = profile.location || student?.location || {};
  const education =
    profile.latestEducation || student?.latestEducation || {};
  const currentEducation =
    profile.currentEducation || student?.currentEducation || {};

  const fullName = student?.fullName || "Student";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const hasProfilePhoto = Boolean(
    profile.profilePhoto?.fileName || student?.profilePhoto?.fileName,
  );

  const photoUrl =
    student?.profilePhotoUrl ||
    profile.profilePhotoUrl ||
    (hasProfilePhoto
      ? `${API_BASE_URL}/api/v1/lms/student/profile-photo`
      : "");

  const currentlyStudying =
    profile.currentlyStudying ?? student?.currentlyStudying ?? false;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B4F3C] to-[#167A62] p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl border-2 border-white/30 bg-white/15 text-2xl font-bold text-[#D6F28D]">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${fullName} profile`}
                crossOrigin="use-credentials"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span>{initials || "ST"}</span>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6F28D]">
              Student profile
            </p>
            <h1 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
              {fullName}
            </h1>
            <p className="mt-1 break-all text-sm text-white/75">
              {student?.email || "Email unavailable"}
            </p>
          </div>
        </div>
      </header>

      <Section title="Personal information">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Info label="Full name" value={fullName} />
          <Info label="Email" value={student?.email} />
          <Info label="Phone number" value={student?.phoneNumber} />
          <Info label="Age" value={profile.age} />
          <Info label="Gender" value={profile.gender} />
          <Info
            label="Location"
            value={[
              location.city,
              location.district,
              location.province,
              location.country,
            ]
              .filter(Boolean)
              .join(", ")}
          />
        </div>
      </Section>

      <Section title="Latest completed education">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Info label="Education level" value={education.level} />
          <Info
            label="Percentage marks"
            value={
              education.percentageMarks != null
                ? `${education.percentageMarks}%`
                : null
            }
          />
          <Info label="Completion year" value={education.completionYear} />
          <Info label="Roll number" value={education.rollNumber} />
        </div>
      </Section>

      <Section title="Current education">
        {currentlyStudying ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Info label="Education level" value={currentEducation.level} />
            <Info label="Field of study" value={currentEducation.fieldOfStudy} />
            <Info label="Institution" value={currentEducation.institution} />
            <Info
              label="Institution city"
              value={currentEducation.institutionCity}
            />
            <Info label="Roll number" value={currentEducation.rollNumber} />
            <Info
              label="Expected completion"
              value={currentEducation.expectedCompletionYear}
            />
          </div>
        ) : (
          <p className="rounded-2xl bg-[#F3F7EF] p-4 text-sm text-[#557066]">
            You are not currently studying.
          </p>
        )}
      </Section>
    </div>
  );
}