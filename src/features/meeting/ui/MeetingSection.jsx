import { useEffect, useRef } from "react";
import { SectionShell } from "../../../shared/ui/SectionShell";
import { GlassPanel } from "../../../shared/ui/GlassPanel";
import { gsap, ScrollTrigger } from "../../../shared/lib/gsap";

export function MeetingSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-meeting-copy]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 32,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to("[data-glow]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        yPercent: -18,
      });
    }, sectionRef);

    return () => {
      ScrollTrigger.refresh();
      ctx.revert();
    };
  }, []);

  return (
    <SectionShell
      id="meeting"
      eyebrow="Chapter 01"
      title="The first memory still glows."
      copy="Some beginnings are loud. Ours felt different. Softer. Stranger. Like life had quietly changed its lighting."
      className="relative"
    >
      <div ref={sectionRef} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel className="relative overflow-hidden p-8 sm:p-10">
          <div
            data-glow
            className="absolute inset-x-8 top-8 h-40 rounded-full bg-gradient-to-r from-rose-300/30 via-amber-100/25 to-fuchsia-300/20 blur-3xl"
          />
          <div className="relative space-y-6">
            <p data-meeting-copy className="text-sm uppercase tracking-[0.35em] text-white/42">
              That moment
            </p>
            <p data-meeting-copy className="font-display text-3xl leading-tight text-white sm:text-4xl">
              An ordinary day suddenly had a before and after.
            </p>
            <p data-meeting-copy className="max-w-xl text-base leading-8 text-white/70">
              I remember the feeling more than the details. The sense that something familiar had arrived for the first
              time. As if my heart recognized you a second before my mind caught up.
            </p>
          </div>
        </GlassPanel>

        <div className="grid gap-5">
          {["A look that lingered.", "A conversation that felt effortless.", "A beginning that never really ended."].map(
            (line) => (
              <div
                key={line}
                data-meeting-copy
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 text-lg text-white/78 backdrop-blur-sm"
              >
                {line}
              </div>
            )
          )}
        </div>
      </div>
    </SectionShell>
  );
}
