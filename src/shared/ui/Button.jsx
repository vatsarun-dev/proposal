import { forwardRef } from "react";
import { cn } from "../utils/cn";

export const Button = forwardRef(function Button({ className, variant = "primary", children, ...props }, ref) {
  const variants = {
    primary:
      "button-sheen rounded-full bg-[#ad314e] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#fff6f3] shadow-[0_10px_24px_rgba(173,49,78,0.24)] transition hover:scale-[1.02] hover:bg-[#972741]",
    secondary:
      "rounded-full border border-[rgba(126,36,56,0.18)] bg-[rgba(255,255,255,0.62)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#7a2237] transition hover:border-[rgba(126,36,56,0.34)] hover:bg-white",
    ghost:
      "rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#8b2942] transition hover:bg-white/40",
  };

  return (
    <button ref={ref} className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
});
