import { ExperienceProvider } from "../context/ExperienceContext";

export function AppProvider({ children }) {
  return <ExperienceProvider>{children}</ExperienceProvider>;
}
