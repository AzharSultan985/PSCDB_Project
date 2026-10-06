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
              className="h-1.5 w-1.5 rounded-full bg-[#d6b66b]"
            />
            Pakistan Skills Development Community Board
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
            Explore practical skills, trusted guidance and pathways to work.
            Find your next step with a community that helps you move forward.
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

          {heroImages.map((image) => (
            <ScrollReveal3D
              key={image.src}
              direction={image.direction}
              delay={image.delay}
              className={`absolute ${image.position} ${image.layer} h-[52%] w-[34%] transition-[z-index] duration-300 hover:z-50 focus-within:z-50`}
            >
              <a
                href={image.href}
                aria-label={image.label}
                className={`group/card relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-white/30 bg-[#1c4c40] shadow-[0_24px_60px_-22px_rgba(0,0,0,0.75)] [transform-style:preserve-3d] transition-[transform,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] hover:shadow-[0_38px_80px_-22px_rgba(0,0,0,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8cf8e] motion-reduce:transition-none ${image.start} ${image.hover}`}
              >
                <img
                  src={image.src}
                  alt=""
                  className="h-full w-full cursor-pointer object-cover transition-transform duration-700 group-hover/card:scale-105 motion-reduce:transition-none"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071f19]/90 via-[#071f19]/10 to-transparent"
                />

                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-[10px] font-semibold leading-tight text-white drop-shadow sm:p-3 sm:text-xs">
                  {image.label}
                </span>
              </a>
            </ScrollReveal3D>
          ))}

          <div className="pointer-events-none absolute bottom-1 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-[#123b32]/75 px-3 py-2 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-md sm:text-xs">
            LEARN · CONNECT · GROW
          </div>
        </div>
      </div>
    </section>
  );
}