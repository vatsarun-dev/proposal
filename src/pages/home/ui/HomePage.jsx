import { ProposalEntryCard } from "../../../features/proposalButtons/ui/ProposalEntryCard";
import { useRouteScrollReset } from "../../../shared/hooks/useRouteScrollReset";
import { PageShell } from "../../../shared/ui/PageShell";

export function HomePage() {
  useRouteScrollReset();

  return (
    <PageShell>
      <ProposalEntryCard />
    </PageShell>
  );
}
