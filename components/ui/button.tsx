"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-astrian-sage/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary: "bg-astrian-sage text-white hover:bg-astrian-moss shadow-sm shadow-astrian-sage/10",
      secondary:
        "border border-astrian-charcoal/20 text-astrian-charcoal hover:border-astrian-charcoal hover:bg-astrian-charcoal hover:text-white",
      white: "bg-white text-astrian-charcoal hover:bg-astrian-cream shadow-sm",
      ghost: "text-astrian-sage hover:bg-astrian-cream/60",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
