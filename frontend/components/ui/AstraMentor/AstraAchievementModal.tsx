"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Award,
  Flame,
  Clock,
  Heart,
  Sparkles,
  RotateCcw,
  Home,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export interface SessionSummaryStats {
  categoryTitle: string;
  durationMinutes: number;
  caloriesBurned: number;
  avgAccuracy: number;
  bestPose: string;
  mindfulnessScore: number;
  streakDays: number;
}

interface AstraAchievementModalProps {
  isOpen: boolean;
  stats: SessionSummaryStats;
  onRestart: () => void;
  onClose: () => void;
}

export function AstraAchievementModal({
  isOpen,
  stats,
  onRestart,
  onClose,
}: AstraAchievementModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-xl bg-white dark:bg-[#1c1f1d] border border-[#5D7253]/30 dark:border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 text-[#1D2530] dark:text-gray-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header Banner */}
          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="h-20 w-20 rounded-full bg-[#5D7253]/15 text-[#5D7253] dark:text-astrian-leaf flex items-center justify-center border border-[#5D7253]/30 shadow-inner"
            >
              <CheckCircle2 className="h-12 w-12 text-[#5D7253] dark:text-astrian-leaf" />
            </motion.div>

            <span className="px-4 py-1.5 rounded-full bg-[#5D7253]/15 text-[#5D7253] dark:text-astrian-leaf text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#5D7253]/25">
              <Award className="h-4 w-4" /> Badge Earned: 🏅 Morning Warrior
            </span>

            <h2 className="text-3xl font-extrabold font-display tracking-tight text-[#1D2530] dark:text-gray-100">
              Session Complete!
            </h2>
            <p className="text-sm text-[#333333]/70 dark:text-gray-300 max-w-md">
              Wonderful practice on <span className="font-semibold text-[#5D7253] dark:text-astrian-leaf">{stats.categoryTitle}</span>. Astra has analyzed your posture and alignment.
            </p>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
              <Clock className="h-5 w-5 text-[#5D7253] dark:text-astrian-leaf mb-1" />
              <span className="text-xl font-bold font-display">{stats.durationMinutes} mins</span>
              <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">Duration</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
              <Flame className="h-5 w-5 text-amber-500 mb-1 fill-amber-500" />
              <span className="text-xl font-bold font-display">{stats.caloriesBurned} kcal</span>
              <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">Calories Burned</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mb-1" />
              <span className="text-xl font-bold font-display">{stats.avgAccuracy}%</span>
              <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">Pose Accuracy</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
              <Sparkles className="h-5 w-5 text-amber-400 mb-1" />
              <span className="text-sm font-bold font-display truncate max-w-[120px]">{stats.bestPose}</span>
              <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">Best Pose</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
              <Heart className="h-5 w-5 text-rose-500 mb-1 fill-rose-500" />
              <span className="text-xl font-bold font-display">{stats.mindfulnessScore}</span>
              <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">Mindfulness Score</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
              <TrendingUp className="h-5 w-5 text-[#5D7253] dark:text-astrian-leaf mb-1" />
              <span className="text-xl font-bold font-display">{stats.streakDays} Days</span>
              <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">Active Streak</span>
            </div>
          </div>

          {/* AI Wellness Insight Box */}
          <div className="p-4 rounded-2xl bg-[#5D7253]/10 border border-[#5D7253]/25 mb-6 text-xs leading-relaxed space-y-1.5">
            <p className="font-bold text-[#5D7253] dark:text-astrian-leaf uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" /> Astra's Wellness Insight
            </p>
            <p className="text-[#333333] dark:text-gray-200">
              "Your shoulder alignment during {stats.bestPose} was outstanding. Remember to hydrate with warm herbal tea and spend 5 minutes in quiet reflection."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={onRestart}
              className="py-3.5 px-6 rounded-full bg-white dark:bg-[#121413] border-2 border-[#5D7253] text-[#5D7253] dark:text-astrian-leaf font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#5D7253]/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4.5 w-4.5" /> Start Another Session
            </button>

            <button
              onClick={onClose}
              className="py-3.5 px-6 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <Home className="h-4.5 w-4.5" /> Return to Studio
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
