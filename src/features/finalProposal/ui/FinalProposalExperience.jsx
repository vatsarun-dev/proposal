import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperience } from "../../../app/context/ExperienceContext";
import { finalLines } from "../../../shared/content/storyContent";
import { gsap } from "../../../shared/lib/gsap";
import { Button } from "../../../shared/ui/Button";

function HeartBurst({ active }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: 45 + Math.cos(index) * 8,
        delay: index * 0.03,
        size: index % 3 === 0 ? "text-3xl" : "text-2xl",
      })),
    [],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={heart.id}
          className={`absolute top-1/2 ${heart.size} text-[#ffc6d2]`}
          style={{
            left: `${heart.left}%`,
            animation: `float-soft 2.4s ease-in-out ${heart.delay}s forwards`,
            transform: `translate(${(index - 9) * 12}px, ${(index % 2 === 0 ? -1 : 1) * 18}px)`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

export function FinalProposalExperience() {
  const sectionRef = useRef(null);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const { proposalCelebrated, setProposalCelebrated } = useExperience();
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-final-copy]", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCelebrate = () => {
    setProposalCelebrated(true);
    setCelebrationVisible(true);

    gsap.fromTo(
      "[data-glow-ring]",
      { scale: 0.4, opacity: 0.1 },
      { scale: 1.2, opacity: 0.9, duration: 1.1, ease: "power3.out" },
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-16 sm:px-8"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffcad6]/16 blur-3xl" />
        <div
          data-glow-ring=""
          className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffdbe3]/30 opacity-0"
        />
      </div>

      <div className="relative z-10 w-full rounded-[40px] border border-white/12 bg-[linear-gradient(180deg,rgba(92,23,42,0.82),rgba(124,30,55,0.88))] p-8 text-center shadow-[0_28px_90px_rgba(67,10,24,0.32)] sm:p-12 lg:p-16">
        <p
          data-final-copy
          className="text-xs uppercase tracking-[0.45em] text-[#ffd3dc]/72"
        >
          Final chapter
        </p>
        <div className="mt-8 space-y-3">
          {finalLines.map((line) => (
            <h1
              key={line}
              data-final-copy
              className="font-display text-5xl leading-[0.96] text-[#fff4ef] sm:text-6xl lg:text-7xl"
            >
              {line}
            </h1>
          ))}
        </div>
        <p
          data-final-copy
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#ffe8ee]/75 sm:text-lg"
        >
          I do not want to love you only inside the memories we already made. I
          want to keep choosing you in everything still ahead of us.
        </p>

        <HeartBurst active={celebrationVisible} />

        {!proposalCelebrated ? (
          <div
            data-final-copy
            className="relative z-10 mt-12 flex flex-wrap justify-center gap-4"
          >
            <Button
              className="bg-[#fff3ef] text-black hover:bg-white"
              onClick={handleCelebrate}
            >
              Will you marry me?
            </Button>
            <Button
              variant="ghost"
              className="text-[#ffe7ec]"
              onClick={() => navigate("/story")}
            >
              Replay Story
            </Button>
          </div>
        ) : null}

        {proposalCelebrated ? (
          <div className="relative z-10 mt-16 rounded-[30px] border border-white/12 bg-white/8 px-6 py-8 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.45em] text-[#ffd3dc]/72">
              With all my heart
            </p>
            <h2 className="mt-5 font-display text-5xl text-[#fff3ee] sm:text-6xl">
              I love you ❤️
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#ffe8ee]/76">
              However you answer in this moment, this was made with every ounce
              of tenderness I have for you.
            </p>
            <div className="mt-8">
              <Button
                variant="ghost"
                className="text-[#ffe7ec]"
                onClick={() => navigate("/story")}
              >
                Replay Story
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
