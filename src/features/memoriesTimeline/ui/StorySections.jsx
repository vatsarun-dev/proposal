import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useExperience } from "../../../app/context/ExperienceContext";
import { timelineMoments, memoryCards, loveNotes } from "../../../shared/content/storyContent";
import { gsap } from "../../../shared/lib/gsap";
import { Button } from "../../../shared/ui/Button";
import { Card } from "../../../shared/ui/Card";

export function StorySections() {
  const storyRef = useRef(null);
  const timelineLineRef = useRef(null);
  const navigate = useNavigate();
  const { setStoryProgress } = useExperience();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-story-reveal]", {
        opacity: 0,
        y: 34,
        duration: 0.95,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 75%",
        },
      });

      gsap.to(timelineLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "[data-timeline-zone]",
          start: "top 60%",
          end: "bottom 75%",
          scrub: true,
          onUpdate: (self) => setStoryProgress(self.progress),
        },
      });

      gsap.utils.toArray("[data-memory-card]").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray("[data-love-note]").forEach((note, index) => {
        gsap.fromTo(
          note,
          { opacity: 0, y: 50, rotate: index % 2 === 0 ? -6 : 6 },
          {
            opacity: 1,
            y: 0,
            rotate: index % 2 === 0 ? -2 : 2,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: note,
              start: "top 88%",
            },
          }
        );
      });
    }, storyRef);

    return () => ctx.revert();
  }, [setStoryProgress]);

  return (
    <div ref={storyRef} className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p data-story-reveal className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9a4f64]">
            How it started...
          </p>
          <h1 data-story-reveal className="font-display text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
            Like a romance shelf
            <br />
            <span className="text-shimmer">I never meant to walk past.</span>
          </h1>
          <p data-story-reveal className="max-w-2xl text-base leading-8 text-[#7f4458] sm:text-lg">
            You felt warm, familiar, and quietly magnetic. The story did not rush. It unfolded. And somehow every page after that kept getting better.
          </p>
          <div data-story-reveal className="flex flex-wrap gap-3">
            <span className="rounded-full border border-[rgba(126,36,56,0.12)] bg-white/55 px-4 py-2 text-sm text-[#7b3348]">
              2 years 3 months
            </span>
            <span className="rounded-full border border-[rgba(126,36,56,0.12)] bg-white/55 px-4 py-2 text-sm text-[#7b3348]">
              soft love, real love
            </span>
          </div>
        </div>

        <Card className="paper-noise relative overflow-hidden p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[26px] bg-[#f2a8b9] p-5 text-[#6d2236] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
              <p className="text-xs uppercase tracking-[0.35em]">Bookmark</p>
              <p className="mt-6 font-display text-4xl">The day I knew this mattered</p>
            </div>
            <div className="rounded-[26px] bg-[#fff5ef] p-5">
              <div className="mb-8 flex justify-between text-2xl">
                <span>♡</span>
                <span>✦</span>
                <span>✿</span>
              </div>
              <p className="text-sm leading-7 text-[#7f4458]">
                Use this panel later for an actual photo, a screenshot of your first chat, or a handwritten note scan.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section data-timeline-zone className="relative mt-24 pl-8 sm:pl-12">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9a4f64]">Our timeline</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">A love story told in soft milestones.</h2>
        </div>
        <div className="absolute left-2 top-32 h-[calc(100%-8rem)] w-px bg-[rgba(126,36,56,0.15)] sm:left-4" />
        <div
          ref={timelineLineRef}
          className="absolute left-[7px] top-32 w-[3px] rounded-full bg-gradient-to-b from-[#ad314e] via-[#e97d94] to-[#f4c3cd] sm:left-[14px]"
          style={{ height: 0 }}
        />
        <div className="space-y-6">
          {timelineMoments.map((item, index) => (
            <Card key={item.tag} data-story-reveal className="relative p-6 sm:p-8">
              <span className="absolute left-[-1.7rem] top-8 h-4 w-4 rounded-full border border-[#c24d6b] bg-[#fff6f1] shadow-[0_0_0_4px_rgba(255,241,236,0.8)] sm:left-[-2.3rem]" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#9a5468]">{item.tag}</p>
                  <h3 className="mt-3 font-display text-3xl text-[#5b2130]">{item.title}</h3>
                </div>
                <p className="text-sm text-[#a76178]">0{index + 1}</p>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#7f4458]">{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9a4f64]">Photo gallery</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">The moments I would frame twice.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#8b586a]">
            These cards are designed for your real photos later. Right now, they hold the mood, softness, and pacing of the memory lane.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {memoryCards.map((card, index) => (
            <Card key={card.title} data-memory-card="" className="overflow-hidden p-4">
              <div className={`rounded-[26px] bg-gradient-to-br ${card.accent} p-5`}>
                {card.image ? (
                  <div className="mb-6 overflow-hidden rounded-[22px] border border-white/60 bg-white/50">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-72 w-full object-cover transition duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mb-24 rounded-[22px] border border-white/50 bg-white/50 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#9a5368]">Snapshot 0{index + 1}</p>
                    <div className="mt-6 flex items-center justify-between text-2xl text-[#a53955]">
                      <span>♡</span>
                      <span>✿</span>
                      <span>✦</span>
                    </div>
                    <p className="mt-10 text-sm leading-7 text-[#8d5a6d]">
                      Add your real couple photo here and this card will automatically turn into the snapshot frame.
                    </p>
                  </div>
                )}
                <h3 className="font-display text-3xl text-[#5d2131]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#7f4458]">{card.note}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24 pb-20">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9a4f64]">Floating love notes</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">The little things that never stopped mattering.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {loveNotes.map((note, index) => (
            <div
              key={note}
              data-love-note=""
              className="love-shadow max-w-md rounded-[26px] border border-[rgba(126,36,56,0.12)] bg-[rgba(255,249,245,0.78)] p-6 text-base leading-8 text-[#6f2639] backdrop-blur-xl"
              style={{ marginLeft: index % 2 === 0 ? "0" : "auto" }}
            >
              {note}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button onClick={() => navigate("/game")}>Continue To Our Little Game</Button>
        </div>
      </section>
    </div>
  );
}
