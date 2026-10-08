import ScrollReveal3D from "./ScrollReveal3D";

const heroImages = [
  {
    src: "/images/",
    alt: "Learner developing practical skills",
    
    position: "left-[4%] top-[22%]",
    layer: "z-10",
    direction: "left",
    delay: 100,
    start:
      "[transform:perspective(1200px)_rotateY(12deg)_rotateX(5deg)_rotateZ(-6deg)_translateZ(-25px)]",
    hover:
      "hover:[transform:perspective(1200px)_translate3d(-20px,-8px,90px)_rotateY(4deg)_rotateX(3deg)_rotateZ(-2deg)] focus-visible:[transform:perspective(1200px)_translate3d(-20px,-8px,90px)_rotateY(4deg)_rotateX(3deg)_rotateZ(-2deg)]",
  },
  {
    src: "/images/leadership/groupphoto.jpeg",
    alt: "Mentor guiding a learner",
    position: "left-[33%] top-[14%]",
    layer: "z-20",
    direction: "front",
    delay: 220,
    start:
      "[transform:perspective(1200px)_rotateY(-4deg)_rotateX(4deg)_rotateZ(1deg)_translateZ(-15px)]",
    hover:
      "hover:[transform:perspective(1200px)_translate3d(0,-18px,110px)_rotateY(0deg)_rotateX(5deg)_rotateZ(0deg)] focus-visible:[transform:perspective(1200px)_translate3d(0,-18px,110px)_rotateY(0deg)_rotateX(5deg)_rotateZ(0deg)]",
  },
  {
    src: "/images/",
    alt: "People learning together in a workshop",
    position: "left-[62%] top-[22%]",
    layer: "z-30",
    direction: "right",
    delay: 340,
    start:
      "[transform:perspective(1200px)_rotateY(-12deg)_rotateX(5deg)_rotateZ(6deg)_translateZ(-25px)]",
    hover:
      "hover:[transform:perspective(1200px)_translate3d(20px,-8px,90px)_rotateY(-4deg)_rotateX(3deg)_rotateZ(2deg)] focus-visible:[transform:perspective(1200px)_translate3d(20px,-8px,90px)_rotateY(-4deg)_rotateX(3deg)_rotateZ(2deg)]",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#123b32] text-white"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-40 h-[30rem] w-[32rem] rounded-full border border-white/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-[20rem] w-[24rem] rounded-full border border-[#d6b66b]/20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-[-12rem] h-[24rem] w-[28rem] rounded-full bg-[#167a62]/20 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-10">
        {/* Hero text: each piece reveals separately */}
        <div className="relative z-10 max-w-2xl">
          <ScrollReveal3D
            as="p"
            direction="left"
            className="inline-flex items-center gap-2 rounded-full border border-[#d6b66b]/30 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-[#e8cf8e] sm:text-sm"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 text-3xl rounded-full bg-[#d6b66b]"
            />
            Professtional Skills and  Community Development  Beirat
          </ScrollReveal3D>

          <ScrollReveal3D
            as="h1"
            id="hero-heading"
            direction="front"
            delay={100}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]"
          >
            EMPOWERING PEOPLE ,{" "}
            <span className="text-[#e8cf8e]">BUILDING COMMUNITIES</span>
          </ScrollReveal3D>
          

          <ScrollReveal3D
            as="p"
            direction="left"
            delay={180}
            className="mt-5 max-w-xl text-pretty text-sm leading-7 text-white/75 sm:text-base sm:leading-8"
          >
           Through quality education, innovative skills development, emerging technologies, entrepreneurship, and building communities, we equip people with the knowledge, confidence, and capabilities to succeed.
          </ScrollReveal3D>

          <ScrollReveal3D
            direction="right"
            delay={260}



























            
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/programmes"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d6b66b] px-6 text-sm font-bold text-[#173c32] shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:bg-[#e8cf8e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              Explore Programmes
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="/opportunities"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e] motion-reduce:transition-none"
            >
              Discover Opportunities
            </a>
          </ScrollReveal3D>

          <ScrollReveal3D
            as="p"
            direction="up"
            delay={340}
            className="mt-6 flex items-center gap-2 text-xs text-white/60 sm:text-sm"
          >
            <span aria-hidden="true" className="text-[#e8cf8e]">
              ✓
            </span>
            Skills, guidance and opportunity in one community
          </ScrollReveal3D>
        </div>

        {/* Three individual 3D image cards */}
        <div className="group relative mx-auto h-[360px] w-full max-w-[590px] [perspective:1200px] sm:h-[450px] lg:h-[500px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#167a62]/35 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:bg-[#167a62]/45 motion-reduce:transition-none"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 group-hover:rotate-6 motion-reduce:transition-none"
          />
{/* Single animated campus image */}
<ScrollReveal3D
  direction="right"
  delay={220}
  className="relative mx-auto w-full max-w-[660px]"
>
  <div className="pscdb-hero-float relative">
    {/* Soft glow behind the image */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[#d6b66b]/15 blur-2xl sm:-inset-7"
    />

    <figure className="pscdb-hero-image-frame group relative aspect-[1.45/1] overflow-hidden rounded-[1.5rem] border border-white/30 bg-[#123b32] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.65)] sm:rounded-[2rem]">
      <img
        src="/images/PSCDB Campus Welcome.png"
        alt="Students arriving at the PSCDB campus for a welcome event"
        className="h-full w-full object-cover object-center"
      />

      {/* Subtle contrast for the caption */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071f19]/70 via-transparent to-[#071f19]/10"
      />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#123b32]/65 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e8cf8e] backdrop-blur-md sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d6b66b]" />
            Welcome to PSCDB
          </span>

          <p className="mt-2 text-sm font-semibold text-white drop-shadow sm:text-base">
            Learn · Connect · Grow
          </p>
        </div>

        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 text-lg text-white backdrop-blur-md"
        >
          ↗
        </span>
      </figcaption>
    </figure>

    {/* Decorative frame */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[1.5rem] border border-[#d6b66b]/50 sm:-bottom-4 sm:-right-4 sm:rounded-[2rem]"
    />
  </div>
</ScrollReveal3D>

          <div className="pointer-events-none absolute bottom-1 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-[#123b32]/75 px-3 py-2 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-md sm:text-xs">
            LEARN · CONNECT · GROW
          </div>
        </div>
      </div>
    </section>
  );
}