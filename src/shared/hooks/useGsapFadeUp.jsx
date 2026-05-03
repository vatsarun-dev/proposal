import { useEffect } from "react";
import { gsap } from "../lib/gsap";

export function useGsapFadeUp(scopeRef, selector, options = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        opacity: 0,
        y: options.y ?? 34,
        duration: options.duration ?? 0.9,
        stagger: options.stagger ?? 0.14,
        ease: options.ease ?? "power3.out",
        scrollTrigger: options.scrollTrigger,
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [options.duration, options.ease, options.scrollTrigger, options.stagger, options.y, scopeRef, selector]);
}
