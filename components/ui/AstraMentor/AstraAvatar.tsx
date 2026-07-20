"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flower2, X } from "lucide-react";

interface AstraAvatarProps {
  isOpen: boolean;
  isThinking?: boolean;
  onClick: () => void;
  processedAvatarUrl?: string;
}

export function AstraAvatar({
  isOpen,
  isThinking = false,
  onClick,
  processedAvatarUrl = "/chatbot-avatar.png",
}: AstraAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center pointer-events-auto">
      {/* Floating Action Button Avatar */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={
          isOpen
            ? { scale: 1, y: 0 }
            : isThinking
            ? { y: [0, -3, 0], scale: [1, 1.05, 1] }
            : { y: [0, -6, 0] }
        }
        transition={
          isOpen
            ? { duration: 0.3 }
            : isThinking
            ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative group h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-white/85 dark:bg-[#1c1f1d]/90 backdrop-blur-md border border-[#5D7253]/30 dark:border-white/15 shadow-2xl flex items-center justify-center cursor-pointer focus:outline-none transition-shadow duration-300"
        aria-label="Toggle Astra AI Yoga Mentor"
      >
        {/* Soft Glowing Ring around Avatar */}
        <span
          className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#5D7253] via-[#C98D62] to-[#5D7253] opacity-30 blur-sm transition-all duration-500 ${
            isThinking
              ? "animate-spin opacity-70"
              : isHovered
              ? "opacity-60 scale-105"
              : "animate-pulse"
          }`}
        />

        {/* Outer Ring Border */}
        <div className="absolute inset-0.5 rounded-full border border-[#5D7253]/20 dark:border-white/10" />

        {/* Content Inside FAB */}
        {isOpen ? (
          <div className="relative z-10 h-full w-full rounded-full bg-[#5D7253] text-white flex items-center justify-center shadow-inner">
            <X className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />
          </div>
        ) : (
          <div className="relative z-10 h-full w-full rounded-full overflow-hidden flex items-center justify-center p-1 bg-gradient-to-b from-[#FBF8F3] to-[#F3EEE6] dark:from-[#1c1f1d] dark:to-[#121413]">
            {/* Astra Avatar Image / Graphic */}
            <motion.div
              animate={
                isHovered
                  ? { rotate: [0, -8, 8, -4, 0] }
                  : { scale: [1, 1.03, 1] }
              }
              transition={
                isHovered
                  ? { duration: 0.6 }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
            >
              <img
                src={processedAvatarUrl}
                alt="Astra AI Mentor Avatar"
                className="w-full h-full object-contain p-0.5"
              />
            </motion.div>

            {/* Breathing particles indicator when thinking */}
            {isThinking && (
              <span className="absolute inset-0 rounded-full border-2 border-[#5D7253] animate-ping opacity-40" />
            )}

            {/* Lotus Flower Tiny Badge */}
            <div className="absolute top-0 right-0 h-5 w-5 rounded-full bg-[#5D7253] text-white flex items-center justify-center shadow-md border border-white dark:border-[#121413]">
              <Flower2 className="h-3 w-3 animate-spin-slow" />
            </div>

            {/* Online Status Indicator */}
            <div className="absolute bottom-0 right-1.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#121413] shadow-sm">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
          </div>
        )}

        {/* Hover Tooltip Preview */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
            <div className="bg-[#1D2530] text-white text-xs py-1.5 px-3 rounded-xl shadow-xl flex items-center gap-1.5 border border-white/10 font-medium">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Talk to Astra AI Mentor</span>
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
}
