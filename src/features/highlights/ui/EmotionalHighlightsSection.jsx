import { useEffect, useRef } from "react";
import { highlightCards } from "../../../shared/content/storyContent";
import { SectionShell } from "../../../shared/ui/SectionShell";
import { gsap } from "../../../shared/lib/gsap";

export function EmotionalHighlightsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-memory-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 48,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out",
      });

      gsap.to("[data-memory-visual]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.12,
        yPercent: -10,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell
      id="highlights"
      eyebrow="Chapter 03"
      title="The feelings I keep returning to."
      copy="A gallery of emotional memories. Not posed. Not polished. Just the truth of how love kept showing up."
    >
      <div ref={sectionRef} className="grid gap-6 lg:grid-cols-3">
        {highlightCards.map((card, index) => (
          <article
            key={card.heading}
            data-memory-card=""
            className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <div
              data-memory-visual=""
              className={`absolute inset-4 rounded-[24px] bg-gradient-to-br ${card.tone} transition duration-700 group-hover:scale-110`}
            />
            <div className="relative flex min-h-[24rem] flex-col justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-white/45">Memory {index + 1}</span>
              <div>
                <h3 className="font-display text-3xl text-white">{card.heading}</h3>
                <p className="mt-4 max-w-sm text-base leading-8 text-white/70">{card.subheading}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
