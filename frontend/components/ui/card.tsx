import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-[#121413] rounded-[2rem] border border-astrian-clay/60 dark:border-white/10 p-8 shadow-[0_8px_30px_rgb(17,24,39,0.02)] transition-colors duration-300",
        hoverEffect && "hover:shadow-[0_16px_40px_rgb(17,24,39,0.05)] transition-all duration-500 hover:-translate-y-1",
        className
      )}
      {...props}
    />
  );
}
