import { useEffect, useMemo, useRef, useState } from "react";
import { messageParagraphs } from "../../../shared/content/storyContent";
import { GlassPanel } from "../../../shared/ui/GlassPanel";
import { SectionShell } from "../../../shared/ui/SectionShell";
import { gsap } from "../../../shared/lib/gsap";

const fullMessage = messageParagraphs.join(" ");

export function PersonalMessageSection() {
  const sectionRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);
  const visibleMessage = useMemo(() => fullMessage.slice(0, characterCount), [characterCount]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.to(counter, {
        value: fullMessage.length,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 45%",
          scrub: true,
        },
        onUpdate: () => setCharacterCount(Math.floor(counter.value)),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell
      id="message"
      eyebrow="Chapter 04"
      title="There is something I need you to know."
      copy="Not in a caption. Not in a rushed text. In the kind of words that deserve room to breathe."
    >
      <div ref={sectionRef} className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/42">Letterform</p>
            <p className="mt-4 font-display text-4xl text-white sm:text-5xl">A message written slowly, like a promise.</p>
          </div>
          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6 text-base leading-8 text-white/68">
            Replace the text in `storyContent.js` with your exact memories, favorite sentences, and the words you want her
            to hear in your own voice.
          </div>
        </div>

        <GlassPanel className="min-h-[24rem] p-8 sm:p-10">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/42">For her</p>
          <p className="font-display text-2xl leading-[1.6] text-white sm:text-3xl">
            <span className="type-caret">{visibleMessage}</span>
          </p>
        </GlassPanel>
      </div>
    </SectionShell>
  );
}
