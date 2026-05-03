import { useExperience } from "../../app/context/ExperienceContext";

export function HeartEasterEgg() {
  const { heartTapCount, setHeartTapCount, secretUnlocked, setSecretUnlocked } = useExperience();

  const handleTap = () => {
    const nextCount = heartTapCount + 1;
    setHeartTapCount(nextCount);

    if (nextCount >= 5) {
      setSecretUnlocked(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleTap}
        className="fixed left-4 top-4 z-50 rounded-full border border-[rgba(126,36,56,0.18)] bg-[rgba(255,248,244,0.72)] px-4 py-2 text-sm text-[#9b2743] backdrop-blur-xl transition hover:scale-105"
        aria-label="Hidden heart"
      >
        ♡
      </button>

      {secretUnlocked ? (
        <div className="fixed inset-x-4 top-16 z-50 mx-auto max-w-md rounded-[24px] border border-[rgba(126,36,56,0.18)] bg-[rgba(255,249,245,0.92)] p-5 text-sm leading-7 text-[#6d2236] shadow-[0_16px_40px_rgba(173,49,78,0.18)] backdrop-blur-xl">
          Secret unlocked: if I could bookmark one chapter of life forever, it would be every ordinary day that became special because of you.
        </div>
      ) : null}
    </>
  );
}
