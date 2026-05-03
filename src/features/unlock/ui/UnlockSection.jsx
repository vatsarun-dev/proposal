import { useEffect, useRef, useState } from "react";
import { useExperience } from "../../../app/context/ExperienceContext";
import { SectionShell } from "../../../shared/ui/SectionShell";

export function UnlockSection() {
  const timeoutRef = useRef(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const { proposalUnlocked, setProposalUnlocked } = useExperience();

  const startHold = () => {
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / 2200, 1);
      setHoldProgress(progress);

      if (progress >= 1) {
        setProposalUnlocked(true);
        return;
      }

      timeoutRef.current = window.requestAnimationFrame(tick);
    };

    timeoutRef.current = window.requestAnimationFrame(tick);
  };

  const stopHold = () => {
    if (timeoutRef.current) {
      window.cancelAnimationFrame(timeoutRef.current);
    }

    if (!proposalUnlocked) {
      setHoldProgress(0);
    }
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        window.cancelAnimationFrame(timeoutRef.current);
      }
    },
    []
  );

  return (
    <SectionShell
      id="unlock"
      eyebrow="Chapter 05"
      title="One last thing before the ending."
      copy="Hold on to this moment. Literally. Sometimes love asks us to stay present for a second longer."
      className="justify-center"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <button
          type="button"
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] backdrop-blur-2xl transition hover:border-rose-200/35"
        >
          <span
            className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-300/28 to-transparent"
            style={{ transform: `scale(${0.9 + holdProgress * 0.15})`, opacity: 0.4 + holdProgress * 0.6 }}
          />
          <span className="font-display relative text-3xl text-white">{proposalUnlocked ? "Unlocked" : "Hold Me"}</span>
        </button>

        <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-200 via-rose-300 to-amber-200 transition-[width]"
            style={{ width: `${holdProgress * 100}%` }}
          />
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-white/48">
          {proposalUnlocked ? "The final chapter is ready." : "Press and hold to reveal the ending."}
        </p>
      </div>
    </SectionShell>
  );
}
