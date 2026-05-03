import { FinalProposalExperience } from "../../../features/finalProposal/ui/FinalProposalExperience";
import { useRouteScrollReset } from "../../../shared/hooks/useRouteScrollReset";
import { PageShell } from "../../../shared/ui/PageShell";

export function ProposalPage() {
  useRouteScrollReset();

  return (
    <PageShell accent="dark">
      <FinalProposalExperience />
    </PageShell>
  );
}
