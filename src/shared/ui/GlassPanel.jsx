import { cn } from "../utils/cn";

export function GlassPanel({ className, children }) {
  return (
    <div className={cn("glass-card rounded-[28px]", className)}>
      {children}
    </div>
  );
}
