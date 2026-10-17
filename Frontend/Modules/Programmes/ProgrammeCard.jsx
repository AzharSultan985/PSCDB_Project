import { useState } from "react";

function CourseImage({ src, title, accent }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#0B4F3C] via-[#176247] to-[#A8C66C]"
      style={{ "--course-accent": accent || "#78A942" }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_top_right,rgba(214,182,107,.38),transparent_45%)]">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/30 bg-white/10 text-2xl font-black text-white backdrop-blur">
            {title?.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#06271F]/55 via-transparent to-transparent" />

      <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#073B31]/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        {title}
      </span>
    </div>
  );
}

export default function ProgrammeCard({ programme, onSelect }) {
  const seatsLeft = Math.max(
    0,
    Number(programme.maxSeats || 50) - Number(programme.enrolledSeats || 0),
  );

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#E4EAE1] bg-white shadow-[0_18px_55px_-38px_rgba(23,58,48,.35)] transition duration-300 hover:-translate-y-1.5 hover:border-[#B8C9A7] hover:shadow-[0_28px_65px_-38px_rgba(23,58,48,.42)]">
      <button
        type="button"
        onClick={() => onSelect(programme)}
        aria-label={`View ${programme.title} course details`}
        className="block w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#78A942]/40"
      >
        <CourseImage
          src={programme.thumbnail}
          title={programme.title}
          accent={programme.accent}
        />

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-[.14em] text-[#638943]">
              {programme.category}
            </span>
            <span className="rounded-full bg-[#F1F6EB] px-3 py-1 text-xs font-semibold text-[#4B6F37]">
              {programme.level}
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-[#173A30]">
            {programme.title}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#68766D]">
            {programme.description}
          </p>

          <p className="mt-3 text-sm font-semibold text-[#40564A]">
            {programme.instructor?.name || "PSCDB Training Team"}
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="font-bold text-[#9A7424]">
              {Number(programme.rating || 0).toFixed(1)}
            </span>
            <span aria-label="star rating" className="text-[#D2A43B]">★</span>
            <span className="text-xs text-[#7B887F]">
              ({programme.reviewCount || 0} reviews)
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#EDF0EB] pt-4 text-xs text-[#68766D]">
            <span>{programme.duration || "Duration TBA"}</span>
            <span>{programme.creditHours || "—"} credit hours</span>
            <span>{seatsLeft} seats left</span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-bold text-[#176247]">
              View course
            </span>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#EFF6E9] text-[#176247] transition group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}