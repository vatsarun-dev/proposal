import { useState } from "react";
import { useExperience } from "../../app/context/ExperienceContext";
import { Button } from "./Button";

const PASSWORD_HASH = "a2be3213e1e7041cd2e0a0a3a9e02226e92932feced74f26f973548252a1a4d0";

async function sha256(value) {
  const encoder = new TextEncoder();
  const buffer = await window.crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function PasswordGate() {
  const { accessGranted, setAccessGranted, setMusicEnabled } = useExperience();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  if (accessGranted) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsChecking(true);
    setError("");

    const hashedInput = await sha256(password.trim());

    if (hashedInput === PASSWORD_HASH) {
      setAccessGranted(true);
      setMusicEnabled(true);
      setPassword("");
      setIsChecking(false);
      return;
    }

    setError("That passcode is not quite right. Try the special date again.");
    setIsChecking(false);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[linear-gradient(180deg,rgba(248,183,196,0.97),rgba(244,163,176,0.97))] px-5 py-10 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 romance-dots opacity-45" />
      <div className="pointer-events-none absolute left-[12%] top-[14%] h-28 w-28 rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[15%] right-[12%] h-36 w-36 rounded-full bg-[#ffd9e3]/60 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl rounded-[38px] border border-[rgba(126,36,56,0.18)] bg-[rgba(255,248,244,0.88)] p-8 shadow-[0_24px_70px_rgba(173,49,78,0.18)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9d5468]">Private entry</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] text-[#5b2130] sm:text-6xl">
          A little passcode
          <br />
          before the love story.
        </h1>
        <p className="mt-5 text-base leading-8 text-[#7f4458]">
          This space was made for one heart in particular. Enter the special code to step inside.
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.35em] text-[#9d5468]" htmlFor="proposal-password">
            Passcode
          </label>
          <input
            id="proposal-password"
            type="password"
            inputMode="numeric"
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[24px] border border-[rgba(126,36,56,0.16)] bg-white/90 px-5 py-4 text-lg tracking-[0.3em] text-[#5b2130] outline-none transition focus:border-[rgba(126,36,56,0.32)]"
            placeholder="••••"
          />
          {error ? <p className="mt-3 text-sm text-[#9b2743]">{error}</p> : null}
          <div className="mt-6">
            <Button type="submit" className="w-full justify-center px-8 py-4" disabled={isChecking}>
              {isChecking ? "Checking..." : "Unlock Our Story"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
