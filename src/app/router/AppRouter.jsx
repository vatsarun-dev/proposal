import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages/home/ui/HomePage";
import { StoryPage } from "../../pages/story/ui/StoryPage";
import { GamePage } from "../../pages/game/ui/GamePage";
import { ProposalPage } from "../../pages/proposal/ui/ProposalPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/story" element={<StoryPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/proposal" element={<ProposalPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
