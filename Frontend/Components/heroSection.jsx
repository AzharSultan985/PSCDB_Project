const heroImages = [
  {
    src: "/images/images.jfif",
    alt: "Learner developing practical skills",
    label: "Learn practical skills",
    href: "/programmes",
    position: "left-[6%] top-[22%]",
    initialTransform:
      "rotateY(14deg) rotateX(5deg) rotateZ(-7deg) translateZ(-30px)",
    hoverTransform:
      "translate3d(-30px,-8px,110px) rotateY(4deg) rotateX(0deg) rotateZ(-2deg)",
  },
  {
    src: "/images/images 1.jfif",
    alt: "Mentor guiding a learner",
    label: "Get expert guidance",
    href: "/mentors",
    position: "left-[33%] top-[14%]",
    initialTransform:
      "rotateY(-5deg) rotateX(4deg) rotateZ(2deg) translateZ(-15px)",
    hoverTransform:
      "translate3d(0,-24px,140px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)",
  },
  {
    src: "/images/images 2.jfif",
    alt: "People learning together in a workshop",
    label: "Move toward opportunity",
    href: "/opportunities",
    position: "left-[60%] top-[22%]",
    initialTransform:
      "rotateY(-15deg) rotateX(5deg) rotateZ(7deg) translateZ(-30px)",
    hoverTransform:
      "translate3d(30px,-8px,110px) rotateY(-4deg) rotateX(0deg) rotateZ(2deg)",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#123b32] text-white"
    >

      {/* Ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-40 h-[30rem] w-[32rem] rounded-full border border-white/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-26 h-[20rem] w-[24rem] rounded-full border border-[#d6b66b]/20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-[-12rem] h-[24rem] w-[28rem] rounded-full bg-[#167a62]/20 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-10">
        {/* Hero copy */}
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d6b66b]/30 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-[#e8cf8e] sm:text-sm">
            <span
              aria-hidden="true"
              className="h-1 w-2 rounded-full bg-[#d6b66b]"
            />
            Pakistan Skills Development Community Board
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-6xl"
          >
            Turn your potential into{" "}
            <span className="text-[#e8cf8e]">opportunity.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-white/75 sm:text-lg">
            Explore practical skills, trusted guidance and pathways to work.
            Find your next step with a community that helps you move forward.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#programmes"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d6b66b] px-6 text-sm font-bold text-[#173c32] shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:bg-[#e8cf8e] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              Explore Programmes
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#opportunities"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e] motion-reduce:transition-none"
            >
              Discover Opportunities
            </a>
          </div>

          <p className="mt-7 flex items-center gap-2 text-xs text-white/55 sm:text-sm">
            <svg
              aria-hidden="true"
              className="h-4 w-4 text-[#e8cf8e]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.53-9.97a.75.75 0 0 0-1.06-1.06L9 10.44 7.53 8.97a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4Z"
                clipRule="evenodd"
              />
            </svg>
            Skills, guidance and opportunity in one community
          </p>
        </div>

        {/* Three-image 3D composition */}
        <div className="group relative mx-auto h-[390px] w-full max-w-[590px] cursor-default [perspective:1400px] sm:h-[490px] lg:h-[540px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#167a62]/35 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:bg-[#167a62]/45 motion-reduce:transition-none"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 group-hover:rotate-6 motion-reduce:transition-none"
          />

         {heroImages.map((image, index) => (
  <a
    key={image.src}
    href={image.href}
    aria-label={image.label}
    className={`group/card absolute ${image.position} z-[${index + 10}] h-[52%] w-[34%] cursor-pointer overflow-hidden rounded-2xl border border-white/30 bg-[#1c4c40] shadow-[0_24px_60px_-22px_rgba(0,0,0,0.75)] transition-[transform,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] hover:shadow-[0_38px_80px_-22px_rgba(0,0,0,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e] motion-reduce:transition-none motion-reduce:transform-none`}
    style={{ transform: image.initialTransform }}
    onMouseEnter={(event) => {
      event.currentTarget.style.transform = image.hoverTransform;
    }}
    onMouseLeave={(event) => {
      event.currentTarget.style.transform = image.initialTransform;
    }}
    onFocus={(event) => {
      event.currentTarget.style.transform = image.hoverTransform;
    }}
    onBlur={(event) => {
      event.currentTarget.style.transform = image.initialTransform;
    }}
  >
    <img
      src={image.src}
      alt=""
      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110 motion-reduce:transition-none"
    />

    <span
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-[#071f19]/90 via-[#071f19]/10 to-transparent"
    />

    <span className="absolute inset-x-0 bottom-0 p-2.5 text-[10px] font-semibold leading-tight text-white drop-shadow sm:p-3 sm:text-xs">
      {image.label}
    </span>
  </a>
))} 

          <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-[#123b32]/70 px-4 py-2 text-[11px] font-medium tracking-wide text-white/75 backdrop-blur-md sm:bottom-0 sm:text-xs">
            LEARN · CONNECT · GROW
          </div>
        </div>
      </div>
    </section>
  );
}