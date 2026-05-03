import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const move = (event) => {
      gsap.to(cursorRef.current, {
        x: event.clientX - 8,
        y: event.clientY - 8,
        duration: 0.18,
        ease: "power2.out",
      });

      gsap.to(haloRef.current, {
        x: event.clientX - 24,
        y: event.clientY - 24,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", move);

    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={haloRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-12 w-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[71] h-4 w-4 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 shadow-[0_0_24px_rgba(255,124,168,0.75)]"
      />
    </>
  );
}
