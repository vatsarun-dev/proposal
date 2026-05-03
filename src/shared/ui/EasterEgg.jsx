import { useExperience } from "../../app/context/ExperienceContext";
import { hiddenMessage } from "../content/storyContent";

const constellation = [
  { top: "28%", left: "16%" },
  { top: "34%", left: "22%" },
  { top: "39%", left: "29%" },
  { top: "35%", left: "36%" },
];

export function EasterEgg() {
  const { easterEggOpen, setEasterEggOpen } = useExperience();

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {constellation.map((dot) => (
          <button
            key={`${dot.top}-${dot.left}`}
            type="button"
            onClick={() => setEasterEggOpen(true)}
            className="pointer-events-auto absolute h-3 w-3 rounded-full bg-white/50 shadow-[0_0_18px_rgba(255,255,255,0.4)] transition hover:scale-125 hover:bg-rose-200"
            style={dot}
            aria-label="Reveal hidden message"
          />
        ))}
      </div>

      {easterEggOpen ? (
        <div className="fixed inset-x-4 top-5 z-[60] mx-auto max-w-xl rounded-[24px] border border-rose-200/20 bg-black/65 p-5 text-sm leading-7 text-white/80 backdrop-blur-xl sm:inset-x-0">
          <div className="flex items-start justify-between gap-4">
            <p>{hiddenMessage}</p>
            <button
              type="button"
              onClick={() => setEasterEggOpen(false)}
              className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/70"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
