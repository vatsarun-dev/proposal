import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperience } from "../../../app/context/ExperienceContext";
import { gsap } from "../../../shared/lib/gsap";
import { Button } from "../../../shared/ui/Button";
import { Card } from "../../../shared/ui/Card";

const noTexts = ["NO 💔", "Are you sure?", "Think again 😏", "गलत button है 😌"];

export function ProposalEntryCard() {
  const navigate = useNavigate();
  const frameRef = useRef(null);
  const interactionRef = useRef(null);
  const noButtonRef = useRef(null);
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setEntryAccepted, setNoButtonDodges, noButtonDodges } = useExperience();

  const currentNoText = useMemo(() => noTexts[noTextIndex % noTexts.length], [noTextIndex]);

  const moveNoButton = useCallback(() => {
    if (!interactionRef.current || !noButtonRef.current) return;

    const cardRect = interactionRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const padding = 28;
    const maxX = cardRect.width - buttonRect.width - padding * 2;
    const maxY = 90;
    const randomX = Math.max(0, Math.random() * maxX);
    const randomY = (Math.random() - 0.5) * maxY;

    setNoTextIndex((index) => index + 1);
    setNoButtonDodges((count) => count + 1);

    gsap.to(noButtonRef.current, {
      x: randomX - cardRect.width * 0.15,
      y: randomY,
      duration: 0.55,
      ease: "power3.out",
      rotation: gsap.utils.random(-8, 8),
    });
  }, [setNoButtonDodges]);

  useEffect(() => {
    const container = interactionRef.current;
    const noButton = noButtonRef.current;
    if (!container || !noButton) return undefined;

    const handleMove = (event) => {
      const buttonRect = noButton.getBoundingClientRect();
      const distanceX = Math.abs(event.clientX - (buttonRect.left + buttonRect.width / 2));
      const distanceY = Math.abs(event.clientY - (buttonRect.top + buttonRect.height / 2));

      if (distanceX < 120 && distanceY < 70) {
        moveNoButton();
      }
    };

    container.addEventListener("pointermove", handleMove);
    return () => container.removeEventListener("pointermove", handleMove);
  }, [moveNoButton]);

  const handleYes = () => {
    setEntryAccepted(true);
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => navigate("/story"),
    });

    tl.to(frameRef.current, {
      scale: 0.97,
      duration: 0.28,
      ease: "power2.out",
    }).to(frameRef.current, {
      opacity: 0,
      scale: 1.06,
      duration: 0.7,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-10 sm:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[9%] top-[14%] h-24 w-24 animate-[float-soft_6s_ease-in-out_infinite] rounded-full bg-white/30 blur-2xl" />
        <div className="absolute right-[10%] top-[20%] h-36 w-36 animate-[float-soft_8s_ease-in-out_infinite] rounded-full bg-[#ffdce4]/70 blur-3xl" />
        <div className="absolute bottom-[14%] left-[18%] h-28 w-28 animate-[float-soft_7s_ease-in-out_infinite] rounded-full bg-[#fff0e6]/70 blur-2xl" />
      </div>

      {isTransitioning ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,248,244,0.8),transparent_30%),linear-gradient(180deg,rgba(255,225,232,0.38),rgba(255,225,232,0.12))]" />
      ) : null}

      <Card
        ref={frameRef}
        className="love-window paper-noise relative w-full max-w-4xl overflow-hidden rounded-[38px] p-0"
      >
        <div className="flex items-center justify-between border-b border-[rgba(126,36,56,0.18)] bg-[#f09ab0] px-5 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#df6482]" />
            <span className="h-3 w-3 rounded-full bg-[#e77a93]" />
            <span className="h-3 w-3 rounded-full bg-[#f1b3c3]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7d2138]">Our little love window</p>
          <span className="text-xl text-[#8d2741]">×</span>
        </div>

        <div
          ref={interactionRef}
          className="relative grid min-h-[34rem] gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-14"
        >
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#9e4a63]">For my favorite person</p>
            <h1 className="font-display text-5xl leading-[0.92] text-[#5b2130] sm:text-6xl lg:text-7xl">
              Would you
              <br />
              <span className="text-shimmer">be my wife?</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#7f4458] sm:text-lg">
              I made you a small world of us, but before the story unfolds, I need the answer I have been carrying in my heart.
            </p>
            <p className="mt-6 text-sm text-[#9a5468]">The `NO` button has already dodged you {noButtonDodges} times.</p>

            <div className="relative mt-10 flex min-h-[7rem] flex-wrap items-center gap-4">
              <Button className="px-8 py-4 text-sm sm:text-base" onClick={handleYes}>
                YES ❤️
              </Button>
              <Button
                ref={noButtonRef}
                variant="secondary"
                className="absolute left-36 top-0 px-7 py-4 text-sm normal-case tracking-normal sm:text-base"
                onMouseEnter={moveNoButton}
                onFocus={moveNoButton}
                onClick={moveNoButton}
              >
                {currentNoText}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-[34px] border border-[rgba(126,36,56,0.16)] bg-[#fff7f0] p-6 shadow-[0_24px_45px_rgba(173,49,78,0.12)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffd6de] text-2xl">💌</div>
                <div>
                  <p className="font-display text-3xl text-[#6d2236]">A tiny preface</p>
                  <p className="text-sm text-[#936072]">Before forever, one playful question.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {["Favorite hand to hold", "Source of my calm", "Reason ordinary days sparkle", "Permanent main character"].map(
                  (line) => (
                    <div key={line} className="rounded-[22px] border border-[rgba(126,36,56,0.1)] bg-white px-4 py-5 text-sm text-[#7a3d51]">
                      {line}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
