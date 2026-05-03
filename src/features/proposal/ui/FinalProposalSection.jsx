import { useEffect, useRef } from "react";
import { useExperience } from "../../../app/context/ExperienceContext";
import { gsap } from "../../../shared/lib/gsap";

export function FinalProposalSection() {
  const sectionRef = useRef(null);
  const { proposalUnlocked, finaleActive, setFinaleActive } = useExperience();

  useEffect(() => {
    if (!proposalUnlocked) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-final-line]", {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [proposalUnlocked]);

  return (
    <section
      ref={sectionRef}
      id="proposal"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,182,198,0.25),transparent_32%),linear-gradient(180deg,#0b0810_0%,#070509_100%)]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p data-final-line className="mb-5 text-xs uppercase tracking-[0.45em] text-white/45">
          Final Chapter
        </p>
        <h2 data-final-line className="font-display text-5xl leading-[0.94] text-white sm:text-7xl lg:text-[7rem]">
          Will you be mine
          <br />
          <span className="text-shimmer">forever?</span>
        </h2>
        <p data-final-line className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
          Not just for the beautiful days. For the real ones. For the evolving ones. For the entire life we have not met yet.
        </p>
        <button
          type="button"
          disabled={!proposalUnlocked}
          onClick={() => setFinaleActive(true)}
          className="mt-12 rounded-full border border-white/16 bg-white/8 px-9 py-4 text-sm uppercase tracking-[0.35em] text-white backdrop-blur-xl transition hover:scale-[1.02] hover:border-rose-200/35 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Ask The Question
        </button>
      </div>

      {finaleActive ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#06050add]/95 px-6 backdrop-blur-md">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 animate-[pulse-soft_3s_ease-in-out_infinite] rounded-full bg-rose-300/20 blur-3xl" />
            <div className="absolute left-[30%] top-[42%] h-24 w-24 rounded-full bg-white/8 blur-2xl" />
            <div className="absolute right-[28%] top-[38%] h-20 w-20 rounded-full bg-amber-200/10 blur-2xl" />
          </div>

          <div className="relative z-10 max-w-4xl text-center">
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/45">For you, always</p>
            <h3 className="font-display text-5xl leading-none text-white sm:text-7xl lg:text-[7.5rem]">
              You are my once,
              <br />
              my always.
            </h3>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              If this story has felt like home to you too, then let us make the rest of it together.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-rose-200 to-rose-300 px-8 py-4 text-sm uppercase tracking-[0.3em] text-[#1a1016]"
              >
                Say Yes
              </button>
              <button
                type="button"
                onClick={() => setFinaleActive(false)}
                className="rounded-full border border-white/12 px-8 py-4 text-sm uppercase tracking-[0.3em] text-white/72"
              >
                Replay Moment
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
