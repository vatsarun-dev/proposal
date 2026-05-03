import { useEffect, useRef, useState } from "react";
import { useExperience } from "../../app/context/ExperienceContext";

const playlist = ["/audio/track-1.mp3", "/audio/track-2.mp3"];

export function FloatingMusicToggle() {
  const { accessGranted, musicEnabled, setMusicEnabled } = useExperience();
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.45;

    if (!accessGranted || !musicEnabled) {
      audio.pause();
      return;
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [accessGranted, currentTrackIndex, musicEnabled]);

  if (!accessGranted) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={() => setCurrentTrackIndex((index) => (index + 1) % playlist.length)}
        preload="auto"
      />

      <button
        type="button"
        onClick={() => setMusicEnabled((current) => !current)}
        className="fixed bottom-5 right-5 z-50 rounded-full border border-[rgba(126,36,56,0.18)] bg-[rgba(255,248,244,0.72)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8f2740] backdrop-blur-xl transition hover:border-[rgba(126,36,56,0.3)] hover:bg-white/80"
      >
        {musicEnabled ? "Music On" : "Music Off"}
      </button>
    </>
  );
}
