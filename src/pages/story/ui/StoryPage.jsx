import { StorySections } from "../../../features/memoriesTimeline/ui/StorySections";
import { useRouteScrollReset } from "../../../shared/hooks/useRouteScrollReset";
import { PageShell } from "../../../shared/ui/PageShell";

export function StoryPage() {
  useRouteScrollReset();

  return (
    <PageShell>
      <StorySections />
    </PageShell>
  );
}
