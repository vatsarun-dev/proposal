import { IntroSection } from "../../../features/intro/ui/IntroSection";
import { MeetingSection } from "../../../features/meeting/ui/MeetingSection";
import { JourneyTimelineSection } from "../../../features/timeline/ui/JourneyTimelineSection";
import { EmotionalHighlightsSection } from "../../../features/highlights/ui/EmotionalHighlightsSection";
import { PersonalMessageSection } from "../../../features/message/ui/PersonalMessageSection";
import { UnlockSection } from "../../../features/unlock/ui/UnlockSection";
import { FinalProposalSection } from "../../../features/proposal/ui/FinalProposalSection";
import { AmbientBackdrop } from "../../../shared/ui/AmbientBackdrop";
import { CustomCursor } from "../../../shared/ui/CustomCursor";
import { EasterEgg } from "../../../shared/ui/EasterEgg";
import { FloatingMusicToggle } from "../../../shared/ui/FloatingMusicToggle";

export function ProposalExperiencePage() {
  return (
    <main className="relative isolate">
      <AmbientBackdrop />
      <CustomCursor />
      <FloatingMusicToggle />
      <EasterEgg />

      <div className="relative z-10">
        <IntroSection />
        <MeetingSection />
        <JourneyTimelineSection />
        <EmotionalHighlightsSection />
        <PersonalMessageSection />
        <UnlockSection />
        <FinalProposalSection />
      </div>
    </main>
  );
}
