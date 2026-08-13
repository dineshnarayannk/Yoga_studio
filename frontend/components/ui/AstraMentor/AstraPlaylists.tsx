"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, Sparkles, Square } from "lucide-react";

interface Playlist {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  freq: number;
  bgGradient: string;
  icon: string;
}

const PLAYLISTS: Playlist[] = [
  {
    id: "morning",
    title: "Morning Energy",
    tagline: "Awaken body & spirit",
    duration: "18 mins",
    freq: 528, // 528 Hz transformation frequency
    bgGradient: "from-amber-500/20 to-orange-500/10",
    icon: "🌿",
  },
  {
    id: "ocean",
    title: "Ocean Meditation",
    tagline: "Deep rhythmic waves",
    duration: "25 mins",
    freq: 174, // 174 Hz pain/tension release
    bgGradient: "from-cyan-500/20 to-blue-500/10",
    icon: "🌊",
  },
  {
    id: "forest",
    title: "Forest Calm",
    tagline: "Nature harmony",
    duration: "30 mins",
    freq: 396, // 396 Hz grounding & peace
    bgGradient: "from-emerald-500/20 to-teal-500/10",
    icon: "🍃",
  },
  {
    id: "sleep",
    title: "Deep Sleep",
    tagline: "Delta brainwave release",
    duration: "45 mins",
    freq: 285, // 285 Hz cellular rest
    bgGradient: "from-indigo-500/20 to-purple-500/10",
    icon: "🌙",
  },
  {
    id: "focus",
    title: "Zen Focus",
    tagline: "Clarity & presence",
    duration: "20 mins",
    freq: 432, // 432 Hz mental balance
    bgGradient: "from-amber-700/20 to-[#5D7253]/20",
    icon: "🎋",
  },
];

export function AstraPlaylists() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
      oscRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
  };

  const togglePlay = (pl: Playlist) => {
    if (activeId === pl.id) {
      stopAudio();
      setActiveId(null);
      return;
    }

    stopAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pl.freq, ctx.currentTime);

      // Gentle gain to create background ambient tone
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setActiveId(pl.id);
    } catch (e) {
      console.log("Audio creation error:", e);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handleStopAll = () => {
    stopAudio();
    setActiveId(null);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-1 mb-2">
        <div className="flex items-center gap-2">
          <Music className="h-4.5 w-4.5 text-[#5D7253] dark:text-astrian-leaf" />
          <h4 className="font-bold text-sm text-[#1D2530] dark:text-gray-100 font-display">
            Astra Ambient Soundscapes
          </h4>
        </div>
        {activeId ? (
          <button
            onClick={handleStopAll}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/25 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Square className="h-3 w-3 fill-current" /> Stop Music
          </button>
        ) : (
          <span className="text-xs text-[#5D7253] dark:text-astrian-leaf font-semibold">
            Harmonic Frequencies
          </span>
        )}
      </div>

      {activeId && (
        <div className="p-3 rounded-xl bg-[#5D7253]/15 border border-[#5D7253]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#5D7253] dark:text-astrian-leaf font-semibold">
            <span className="h-2 w-2 rounded-full bg-[#5D7253] dark:bg-astrian-leaf animate-ping" />
            <span>Currently playing ambient frequency...</span>
          </div>
          <button
            onClick={handleStopAll}
            className="font-bold text-rose-600 dark:text-rose-400 underline hover:no-underline cursor-pointer"
          >
            Stop
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLAYLISTS.map((pl) => {
          const isPlaying = activeId === pl.id;
          return (
            <div
              key={pl.id}
              onClick={() => togglePlay(pl)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isPlaying
                  ? "bg-[#5D7253] text-white border-[#5D7253] shadow-md scale-[1.02]"
                  : "bg-[#FBF8F3] dark:bg-[#121413] border-astrian-clay dark:border-white/10 hover:border-[#5D7253]/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-11 w-11 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${pl.bgGradient} border border-white/20`}
                >
                  {pl.icon}
                </div>
                <div>
                  <p
                    className={`font-bold text-sm ${
                      isPlaying ? "text-white" : "text-[#1D2530] dark:text-gray-100"
                    }`}
                  >
                    {pl.title}
                  </p>
                  <p
                    className={`text-xs ${
                      isPlaying ? "text-white/80" : "text-[#333333]/60 dark:text-gray-400"
                    }`}
                  >
                    {pl.tagline} &bull; {pl.duration}
                  </p>
                </div>
              </div>

              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors ${
                  isPlaying
                    ? "bg-white text-[#5D7253]"
                    : "bg-[#5D7253]/10 text-[#5D7253] dark:text-astrian-leaf"
                }`}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
