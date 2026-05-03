import { useEffect, useRef } from "react";
import { SectionShell } from "../../../shared/ui/SectionShell";
import { gsap } from "../../../shared/lib/gsap";

export function IntroSection() {
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-intro-line]", {
        opacity: 0,
        y: 48,
        duration: 1.2,
        stagger: 0.18,
        ease: "power3.out",
      });
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="intro" className="justify-center">
      <div ref={introRef} className="relative py-20">
        <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/55 backdrop-blur-xl">
          A private story
        </div>
        <p data-intro-line className="mb-4 max-w-xl text-sm uppercase tracking-[0.45em] text-white/40 sm:text-base">
          It all started somewhere...
        </p>
        <h1
          data-intro-line
          className="font-display max-w-5xl text-5xl leading-[0.95] text-white sm:text-7xl lg:text-[8rem]"
        >
          Not with fireworks.
          <br />
          <span className="text-shimmer">With a feeling that stayed.</span>
        </h1>
        <p data-intro-line className="mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-xl">
          This is not a website. It is the slow replay of how one person became my favorite place in the world.
        </p>
      </div>
    </SectionShell>
  );
}
