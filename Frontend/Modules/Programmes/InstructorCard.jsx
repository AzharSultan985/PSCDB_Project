import { useState } from "react";

export default function InstructorCard({ instructor }) {
  const [imageFailed, setImageFailed] = useState(false);
  const name = instructor?.name || "PSCDB Training Team";

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-[#E4EAE1] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
      <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#EAF2E3] text-xl font-black text-[#176247]">
        {instructor?.image && !imageFailed ? (
          <img
            src={instructor.image}
            alt={name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold text-[#173A30]">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-[#688F45]">
          {instructor?.role || "PSCDB Instructor"}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#718077]">
          {instructor?.bio || "Experienced instructors supporting practical learning at PSCDB."}
        </p>
      </div>
    </article>
  );
}