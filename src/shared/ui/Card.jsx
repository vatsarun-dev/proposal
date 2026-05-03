import { forwardRef } from "react";
import { cn } from "../utils/cn";

export const Card = forwardRef(function Card({ className, children }, ref) {
  return (
    <div ref={ref} className={cn("romance-card rounded-[30px]", className)}>
      {children}
    </div>
  );
});
