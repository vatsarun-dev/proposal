import { LoveQuizGame } from "../../../features/loveGame/ui/LoveQuizGame";
import { useRouteScrollReset } from "../../../shared/hooks/useRouteScrollReset";
import { PageShell } from "../../../shared/ui/PageShell";

export function GamePage() {
  useRouteScrollReset();

  return (
    <PageShell>
      <LoveQuizGame />
    </PageShell>
  );
}
