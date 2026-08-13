"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Heart, CheckCircle2 } from "lucide-react";

interface AstraBreathingOverlayProps {
  isOpen: boolean;
  onClose: (pointsEarned?: number) => void;
}

type BreathingPhase = "inhale" | "hold" | "exhale" | "complete";

export function AstraBreathingOverlay({
  isOpen,
  onClose,
}: AstraBreathingOverlayProps) {
  const [cycle, setCycle] = useState(1);
  const [phase, setPhase] = useState<BreathingPhase>("inhale");
  const [secondsLeftInPhase, setSecondsLeftInPhase] = useState(4);
  const maxCycles = 5;

  useEffect(() => {
    if (!isOpen) {
      setCycle(1);
      setPhase("inhale");
      setSecondsLeftInPhase(4);
      return;
    }

    if (phase === "complete") return;

    const interval = setInterval(() => {
      setSecondsLeftInPhase((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phase
        if (phase === "inhale") {
          setPhase("hold");
          return 2;
        } else if (phase === "hold") {
          setPhase("exhale");
          return 6;
        } else if (phase === "exhale") {
          if (cycle < maxCycles) {
            setCycle((c) => c + 1);
            setPhase("inhale");
            return 4;
          } else {
            setPhase("complete");
            return 0;
          }
        }
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, phase, cycle]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-br from-[#121413] via-[#1D2530] to-[#2A3326] text-white backdrop-blur-2xl overflow-hidden"
      >
        {/* Floating Particles in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-[#5D7253]/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-[#C98D62]/20 blur-3xl animate-pulse" />
        </div>

        {/* Top Header */}
        <div className="w-full max-w-2xl flex items-center justify-between z-10 pt-4">
          <div className="flex items-center gap-2 text-astrian-leaf font-medium">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <span className="text-sm tracking-wider uppercase font-semibold">Guided Pranayama</span>
          </div>

          <button
            onClick={() => onClose(0)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-gray-300 hover:text-white cursor-pointer"
            aria-label="Close breathing session"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Content Area */}
        {phase !== "complete" ? (
          <div className="flex flex-col items-center justify-center z-10 my-auto text-center">
            {/* Cycle Progress Pill */}
            <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-gray-300 mb-8 tracking-wide">
              Cycle {cycle} of {maxCycles}
            </div>

            {/* Breathing Animated Orb */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Pulsing Aura */}
              <motion.div
                animate={
                  phase === "inhale"
                    ? { scale: [1, 1.4], opacity: [0.3, 0.8] }
                    : phase === "hold"
                    ? { scale: 1.4, opacity: 0.8 }
                    : { scale: [1.4, 1], opacity: [0.8, 0.3] }
                }
                transition={{
                  duration: phase === "inhale" ? 4 : phase === "hold" ? 2 : 6,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5D7253] via-[#8FA382] to-[#C98D62] blur-xl opacity-50"
              />

              {/* Core Breathing Orb */}
              <motion.div
                animate={
                  phase === "inhale"
                    ? { scale: [1, 1.3] }
                    : phase === "hold"
                    ? { scale: 1.3 }
                    : { scale: [1.3, 1] }
                }
                transition={{
                  duration: phase === "inhale" ? 4 : phase === "hold" ? 2 : 6,
                  ease: "easeInOut",
                }}
                className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#5D7253] to-[#2A3326] border-2 border-white/30 shadow-2xl flex flex-col items-center justify-center p-6 text-center"
              >
                <span className="text-4xl font-extrabold font-display">
                  {secondsLeftInPhase}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-300 mt-1 font-semibold">
                  Seconds
                </span>
              </motion.div>
            </div>

            {/* Voice Guidance Text */}
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <h2 className="text-3xl font-display font-bold text-white tracking-wide">
                {phase === "inhale" && "Inhale deeply..."}
                {phase === "hold" && "Hold calmly..."}
                {phase === "exhale" && "Exhale slowly..."}
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-sm">
                {phase === "inhale" && "Fill your lungs with fresh vitality and warmth."}
                {phase === "hold" && "Rest quietly in the space between breaths."}
                {phase === "exhale" && "Release all tension, stress, and noise."}
              </p>
            </motion.div>
          </div>
        ) : (
          /* Completion State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center z-10 my-auto text-center max-w-md p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl"
          >
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h2 className="text-3xl font-bold font-display text-white mb-3">
              Wonderful Session
            </h2>

            <p className="text-gray-300 leading-relaxed text-sm mb-6">
              "Notice how your body feels. Carry this quiet stillness and balance into the rest of your day."
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5D7253]/30 border border-[#5D7253]/50 text-amber-300 text-xs font-bold mb-8">
              <Heart className="h-4 w-4 fill-amber-300" />
              <span>+25 Mindfulness Points Earned!</span>
            </div>

            <button
              onClick={() => onClose(25)}
              className="w-full py-4 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white font-semibold transition-colors shadow-lg cursor-pointer"
            >
              Complete & Return
            </button>
          </motion.div>
        )}

        {/* Bottom Bar */}
        <div className="w-full max-w-2xl flex items-center justify-center z-10 pb-4 text-xs text-gray-400">
          <span>Astra AI Guided Mindfulness &bull; 5-Cycle Reset</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
