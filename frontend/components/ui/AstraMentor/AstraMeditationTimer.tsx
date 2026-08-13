"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, BellRing, Sparkles } from "lucide-react";

interface AstraMeditationTimerProps {
  onCompleteSession?: (minutes: number) => void;
}

export function AstraMeditationTimer({ onCompleteSession }: AstraMeditationTimerProps) {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalSeconds = selectedMinutes * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  // Audio Singing Bowl Tone via Web Audio API
  const playSingingBowlChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(432, ctx.currentTime); // 432 Hz healing frequency

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 4.5);
    } catch (e) {
      console.log("Audio chime playback error:", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsCompleted(true);
      playSingingBowlChime();
      if (onCompleteSession) {
        onCompleteSession(selectedMinutes);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, selectedMinutes, onCompleteSession]);

  const handleSelectMinutes = (mins: number) => {
    setSelectedMinutes(mins);
    setTimeLeft(mins * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-[#FBF8F3] dark:bg-[#121413] border border-[#5D7253]/20 dark:border-white/10 rounded-2xl p-6 shadow-sm flex flex-col items-center">
      {/* Title */}
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-[#5D7253] dark:text-astrian-leaf" />
          <h3 className="font-bold text-base text-[#1D2530] dark:text-gray-100 font-display">
            Astra Meditation Timer
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#5D7253]/10 text-[#5D7253] dark:text-astrian-leaf">
          432 Hz Sound Chime
        </span>
      </div>

      {/* Minutes Preset Selector */}
      <div className="grid grid-cols-4 gap-2 w-full mb-6">
        {[5, 10, 15, 20].map((mins) => (
          <button
            key={mins}
            onClick={() => handleSelectMinutes(mins)}
            className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedMinutes === mins
                ? "bg-[#5D7253] text-white shadow-md"
                : "bg-white dark:bg-[#1c1f1d] text-[#1D2530] dark:text-gray-300 border border-astrian-clay dark:border-white/5 hover:border-[#5D7253]"
            }`}
          >
            {mins} min
          </button>
        ))}
      </div>

      {/* Circular Timer Display */}
      <div className="relative w-44 h-44 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="6"
            className="text-astrian-clay dark:text-white/10 fill-none"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={264}
            strokeDashoffset={264 - (264 * progressPercent) / 100}
            strokeLinecap="round"
            className="text-[#5D7253] dark:text-astrian-leaf transition-all duration-500 fill-none"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold font-display text-[#1D2530] dark:text-gray-100 tracking-tight">
            {formatTime(timeLeft)}
          </span>
          <span className="text-[11px] text-[#333333]/60 dark:text-gray-400 font-medium uppercase tracking-wider mt-0.5">
            {isRunning ? "Deep Focus" : isCompleted ? "Completed 🙏" : "Ready"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handleReset}
          className="p-3 rounded-full bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 text-[#1D2530] dark:text-gray-200 hover:bg-astrian-cream transition-colors cursor-pointer shadow-sm"
          aria-label="Reset meditation timer"
        >
          <RotateCcw className="h-5 w-5" />
        </button>

        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-8 py-3.5 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white font-semibold flex items-center gap-2 shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
          {isRunning ? (
            <>
              <Pause className="h-5 w-5 fill-white" /> Pause
            </>
          ) : (
            <>
              <Play className="h-5 w-5 fill-white ml-0.5" /> Start Timer
            </>
          )}
        </button>

        <button
          onClick={playSingingBowlChime}
          className="p-3 rounded-full bg-white dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 text-[#5D7253] dark:text-astrian-leaf hover:bg-astrian-cream transition-colors cursor-pointer shadow-sm"
          title="Test Singing Bowl Chime"
        >
          <Volume2 className="h-5 w-5" />
        </button>
      </div>

      {isCompleted && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span>Session Complete! +{selectedMinutes * 5} Mindfulness Points logged.</span>
        </div>
      )}
    </div>
  );
}
