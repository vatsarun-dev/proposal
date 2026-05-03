/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ExperienceContext = createContext(null);
const ACCESS_KEY = "proposal-access-granted";

function getSavedAccessState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(ACCESS_KEY) === "true";
}

export function ExperienceProvider({ children }) {
  const [accessGranted, setAccessGranted] = useState(getSavedAccessState);
  const [musicEnabled, setMusicEnabled] = useState(getSavedAccessState);
  const [storyProgress, setStoryProgress] = useState(0);
  const [entryAccepted, setEntryAccepted] = useState(false);
  const [noButtonDodges, setNoButtonDodges] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [proposalCelebrated, setProposalCelebrated] = useState(false);
  const [heartTapCount, setHeartTapCount] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem(ACCESS_KEY, String(accessGranted));
  }, [accessGranted]);

  const value = useMemo(
    () => ({
      accessGranted,
      setAccessGranted,
      musicEnabled,
      setMusicEnabled,
      storyProgress,
      setStoryProgress,
      entryAccepted,
      setEntryAccepted,
      noButtonDodges,
      setNoButtonDodges,
      gameCompleted,
      setGameCompleted,
      proposalCelebrated,
      setProposalCelebrated,
      heartTapCount,
      setHeartTapCount,
      secretUnlocked,
      setSecretUnlocked,
    }),
    [
      accessGranted,
      musicEnabled,
      storyProgress,
      entryAccepted,
      noButtonDodges,
      gameCompleted,
      proposalCelebrated,
      heartTapCount,
      secretUnlocked,
    ]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }

  return context;
}
