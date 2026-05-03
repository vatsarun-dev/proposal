import { useEffect, useRef } from "react";
import { useExperience } from "../../../app/context/ExperienceContext";
import { journeyMilestones } from "../../../shared/content/storyContent";
import { GlassPanel } from "../../../shared/ui/GlassPanel";
import { SectionShell } from "../../../shared/ui/SectionShell";
import { gsap } from "../../../shared/lib/gsap";

export function JourneyTimelineSection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const { setJourneyProgress } = useExperience();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-timeline-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
      });

      gsap.to(progressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onUpdate: (self) => setJourneyProgress(self.progress),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [setJourneyProgress]);

  return (
    <SectionShell
      id="timeline"
      eyebrow="Chapter 02"
      title="Two years and three months of becoming us."
      copy="Not a highlight reel. A real timeline. Tender, imperfect, growing, and still moving forward."
    >
      <div ref={sectionRef} className="relative grid gap-8 pl-10 lg:pl-20">
        <div className="absolute left-3 top-0 h-full w-px bg-white/10 lg:left-8" />
        <div
          ref={progressRef}
          className="absolute left-[11px] top-0 w-[3px] rounded-full bg-gradient-to-b from-rose-200 via-rose-300 to-transparent lg:left-[30px]"
        />
        {journeyMilestones.map((item, index) => (
          <GlassPanel key={item.year} className="relative p-6 sm:p-8" data-timeline-card="">
            <div className="absolute left-[-2.15rem] top-8 h-4 w-4 rounded-full border border-rose-200/35 bg-[#120d14] shadow-[0_0_16px_rgba(255,124,168,0.45)] lg:left-[-3.15rem]" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-white/42">{item.year}</p>
                <h3 className="font-display text-2xl text-white sm:text-3xl">{item.title}</h3>
              </div>
              <div className="text-sm uppercase tracking-[0.35em] text-rose-100/70">
                0{index + 1}
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">{item.copy}</p>
          </GlassPanel>
        ))}
      </div>
    </SectionShell>
  );
}
