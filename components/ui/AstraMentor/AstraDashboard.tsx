"use client";

import React from "react";
import { Flame, Award, Clock, Heart, TrendingUp } from "lucide-react";

interface AstraDashboardProps {
  streakDays?: number;
  mindfulnessPoints?: number;
  meditationMinutes?: number;
  calmScore?: number;
}

export function AstraDashboard({
  streakDays = 5,
  mindfulnessPoints = 285,
  meditationMinutes = 45,
  calmScore = 92,
}: AstraDashboardProps) {
  return (
    <div className="w-full bg-[#FBF8F3] dark:bg-[#121413] border border-[#5D7253]/20 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#5D7253] dark:text-astrian-leaf" />
          <h3 className="font-bold text-base text-[#1D2530] dark:text-gray-100 font-display">
            Mindfulness Dashboard
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          Level: Zen Practitioner
        </span>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Streak */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
          <div className="h-9 w-9 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-1.5">
            <Flame className="h-5 w-5 fill-amber-500" />
          </div>
          <span className="text-xl font-extrabold text-[#1D2530] dark:text-gray-100 font-display">
            {streakDays} Days
          </span>
          <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">
            Daily Streak
          </span>
        </div>

        {/* Points */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
          <div className="h-9 w-9 rounded-full bg-[#5D7253]/10 text-[#5D7253] dark:text-astrian-leaf flex items-center justify-center mb-1.5">
            <Award className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold text-[#1D2530] dark:text-gray-100 font-display">
            {mindfulnessPoints}
          </span>
          <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">
            Zen Points
          </span>
        </div>

        {/* Minutes */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
          <div className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1.5">
            <Clock className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold text-[#1D2530] dark:text-gray-100 font-display">
            {meditationMinutes}m
          </span>
          <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">
            Mindful Mins
          </span>
        </div>

        {/* Calm Score */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/5 flex flex-col items-center text-center">
          <div className="h-9 w-9 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-1.5">
            <Heart className="h-5 w-5 fill-rose-500" />
          </div>
          <span className="text-xl font-extrabold text-[#1D2530] dark:text-gray-100 font-display">
            {calmScore}%
          </span>
          <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium">
            Calm Score
          </span>
        </div>
      </div>

      {/* Progress Ring Visual */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/5 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold text-[#1D2530] dark:text-gray-100">
            Weekly Wellness Goal
          </p>
          <p className="text-xs text-[#333333]/60 dark:text-gray-400">
            4 of 5 recommended sessions complete
          </p>
        </div>

        <div className="relative h-12 w-12 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-astrian-clay dark:text-white/10"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#5D7253] dark:text-astrian-leaf"
              strokeDasharray="80, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[11px] font-bold text-[#1D2530] dark:text-gray-100">
            80%
          </span>
        </div>
      </div>
    </div>
  );
}
