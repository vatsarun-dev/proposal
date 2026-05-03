import { FloatingMusicToggle } from "./FloatingMusicToggle";
import { HeartEasterEgg } from "./HeartEasterEgg";
import { PasswordGate } from "./PasswordGate";

export function PageShell({ children, accent = "soft" }) {
  const accentClass =
    accent === "dark"
      ? "bg-[radial-gradient(circle_at_top,rgba(255,198,212,0.18),transparent_18%),linear-gradient(180deg,#531524_0%,#6b1a30_38%,#f0a1b4_100%)] text-[#fff5f2]"
      : "bg-transparent text-[var(--text)]";

  return (
    <main className={`relative min-h-screen overflow-hidden ${accentClass}`}>
      <div className="pointer-events-none absolute inset-0 romance-dots opacity-45" />
      <PasswordGate />
      <HeartEasterEgg />
      <FloatingMusicToggle />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
