"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  Wind,
  Timer,
  Music,
  Award,
  Flower2,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  Heart,
  Calendar,
  Video,
} from "lucide-react";
import Link from "next/link";
import { AstraAvatar } from "./AstraMentor/AstraAvatar";
import { AstraBreathingOverlay } from "./AstraMentor/AstraBreathingOverlay";
import { AstraMeditationTimer } from "./AstraMentor/AstraMeditationTimer";
import { AstraPlaylists } from "./AstraMentor/AstraPlaylists";
import { AstraDashboard } from "./AstraMentor/AstraDashboard";
import { AstraLiveSessionModal, CategoryPractice } from "./AstraMentor/AstraLiveSessionModal";
import { AstraLiveStudio } from "./AstraMentor/AstraLiveStudio";

// Types
interface MoodCard {
  id: string;
  emoji: string;
  label: string;
  description: string;
  accentColor: string;
}

interface ClassCardData {
  title: string;
  duration: string;
  difficulty: string;
  image: string;
  link: string;
}

interface Message {
  id: string;
  sender: "user" | "astra";
  text: string;
  timestamp: Date;
  recommendationData?: {
    poses: string[];
    classCard: ClassCardData;
    showBreathingMini?: boolean;
    showFollowUpPrompt?: boolean;
  };
}

const MOODS: MoodCard[] = [
  { id: "happy", emoji: "😊", label: "Happy", description: "Joyful energy & flow", accentColor: "border-amber-400/40 bg-amber-500/5" },
  { id: "calm", emoji: "😌", label: "Calm", description: "Sustain peaceful presence", accentColor: "border-emerald-400/40 bg-emerald-500/5" },
  { id: "tired", emoji: "😴", label: "Tired", description: "Gentle restoration & rest", accentColor: "border-indigo-400/40 bg-indigo-500/5" },
  { id: "stressed", emoji: "😟", label: "Stressed", description: "Deep tension & stress release", accentColor: "border-rose-400/40 bg-rose-500/5" },
  { id: "anxious", emoji: "😥", label: "Anxious", description: "Nervous system grounding", accentColor: "border-purple-400/40 bg-purple-500/5" },
  { id: "busy", emoji: "💼", label: "Busy", description: "Quick 10-minute desk reset", accentColor: "border-[#C98D62]/40 bg-[#C98D62]/5" },
  { id: "focus", emoji: "🧘", label: "Need Focus", description: "Mindfulness & concentration", accentColor: "border-teal-400/40 bg-teal-500/5" },
  { id: "sleep", emoji: "❤️", label: "Better Sleep", description: "Evening wind-down & folds", accentColor: "border-sky-400/40 bg-sky-500/5" },
  { id: "flexibility", emoji: "🏃", label: "Improve Flexibility", description: "Passive hip & hamstring stretches", accentColor: "border-emerald-500/40 bg-emerald-500/5" },
  { id: "strength", emoji: "💪", label: "Build Strength", description: "Core power & alignment", accentColor: "border-amber-600/40 bg-amber-600/5" },
];

const MOOD_RESPONSES: Record<string, { astraText: string; poses: string[]; classCard: ClassCardData }> = {
  happy: {
    astraText: "Namaste 🙏 I love celebrating your joyful energy! Let's channeling this fresh vitality into a uplifting practice.",
    poses: ["10 mins Sun Salutations (Surya Namaskar)", "Warrior II Pose for stability", "Dancer Pose balance", "5-minute heart-opening meditation"],
    classCard: { title: "Vinyasa Flow Harmony", duration: "45 mins", difficulty: "All Levels", image: "/class-vinyasa.jpg", link: "/classes" },
  },
  calm: {
    astraText: "Namaste 🙏 Peace is a sanctuary within you. Let's sustain this gentle quietude together.",
    poses: ["Seated Forward Fold (Paschimottanasana)", "Alternate Nostril Breathing (Nadi Shodhana)", "Gentle Cat-Cow stretches", "10-minute Silent Sitting"],
    classCard: { title: "Hatha Alignment & Peace", duration: "60 mins", difficulty: "Beginner Friendly", image: "/class-hatha.jpg", link: "/classes" },
  },
  tired: {
    astraText: "Namaste 🙏 Honor your body's wisdom. Rest is not laziness; it is essential restoration.",
    poses: ["Legs-Up-The-Wall (Viparita Karani)", "Supta Baddha Konasana (Reclined Bound Angle)", "Supported Child's Pose with bolster", "Deep Savasana relaxation"],
    classCard: { title: "Restorative Yin & Sound Bath", duration: "60 mins", difficulty: "All Levels (Passive)", image: "/class-yin.jpg", link: "/classes" },
  },
  stressed: {
    astraText: "Namaste 🙏 I understand. Let's slow everything down together and release all accumulated tension.",
    poses: ["10 minutes of Anulom Vilom breathing", "Wide-Knee Child's Pose", "Legs-Up-The-Wall", "5-minute Guided Body Scan Meditation"],
    classCard: { title: "Stress Relief & Deep Release", duration: "50 mins", difficulty: "All Levels", image: "/class-restorative.jpg", link: "/classes" },
  },
  anxious: {
    astraText: "Namaste 🙏 Place one hand on your heart and one on your belly. You are safe, grounded, and supported right here.",
    poses: ["Box Breathing (4-4-4-4 pattern)", "Standing Forward Bend (Uttanasana)", "Reclined Spinal Twist", "Grounding Root Chakra Meditation"],
    classCard: { title: "Pranayama & Nervous Reset", duration: "40 mins", difficulty: "Beginner Friendly", image: "/class-meditation.jpg", link: "/classes" },
  },
  busy: {
    astraText: "Namaste 🙏 Even 10 minutes can completely transform your nervous system. Let's do a quick desk refresh.",
    poses: ["Seated Chair Cat-Cow", "Neck & Shoulder Rolls", "Seated Spinal Twist", "3-minute Box Breathing"],
    classCard: { title: "Express 15-Minute Desk Reset", duration: "15 mins", difficulty: "Express", image: "/class-hatha.jpg", link: "/classes" },
  },
  focus: {
    astraText: "Namaste 🙏 Mental clarity comes when breath and movement merge into single-pointed awareness.",
    poses: ["Tree Pose (Vrksasana) for focus", "Eagle Pose (Garudasana)", "Trataka Candle Gazing / Focus", "Alternate Nostril Breathing"],
    classCard: { title: "Mindfulness & Concentration", duration: "45 mins", difficulty: "Intermediate", image: "/class-meditation.jpg", link: "/classes" },
  },
  sleep: {
    astraText: "Namaste 🙏 Let's prepare your body and mind for a peaceful night of deep, restorative sleep.",
    poses: ["Reclined Goddess Pose", "Puppy Pose shoulder melt", "Supported Bridge Pose", "10-minute Yoga Nidra Sleep Meditation"],
    classCard: { title: "Evening Bedtime Wind-Down", duration: "30 mins", difficulty: "Gentle", image: "/class-yin.jpg", link: "/classes" },
  },
  flexibility: {
    astraText: "Namaste 🙏 Flexibility is moving with ease without judgment. Let's open up hips and hamstrings gently.",
    poses: ["Dragon Pose (Low Lunge)", "Sleeping Pigeon Pose", "Half Splits (Ardha Hanumanasana)", "Butterfly Pose (Baddha Konasana)"],
    classCard: { title: "Deep Hip & Hamstring Opening", duration: "60 mins", difficulty: "All Levels", image: "/class-yin.jpg", link: "/classes" },
  },
  strength: {
    astraText: "Namaste 🙏 True strength is silent and centered. Let's build core stability and inner power.",
    poses: ["Plank to Chaturanga transitions", "Warrior III Balance", "Boat Pose (Navasana)", "Crow Pose (Bakasana) practice"],
    classCard: { title: "Core Power & Structural Alignment", duration: "60 mins", difficulty: "Intermediate / Advanced", image: "/class-vinyasa.jpg", link: "/classes" },
  },
};

// Mini Breathing Component embedded inside recommendations
function MiniBreathingCircle() {
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;
        if (phase === "Inhale") {
          setPhase("Hold");
          return 2;
        } else if (phase === "Hold") {
          setPhase("Exhale");
          return 6;
        } else {
          setPhase("Inhale");
          return 4;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="my-4 p-4 rounded-2xl bg-white dark:bg-[#1c1f1d] border border-[#5D7253]/20 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 flex items-center justify-center">
          <motion.div
            animate={
              phase === "Inhale"
                ? { scale: [1, 1.3] }
                : phase === "Hold"
                ? { scale: 1.3 }
                : { scale: [1.3, 1] }
            }
            transition={{
              duration: phase === "Inhale" ? 4 : phase === "Hold" ? 2 : 6,
              ease: "easeInOut",
            }}
            className="w-10 h-10 rounded-full bg-[#5D7253]/20 border border-[#5D7253] flex items-center justify-center text-[#5D7253] font-bold text-xs"
          >
            {timer}s
          </motion.div>
        </div>
        <div>
          <p className="text-xs font-bold text-[#1D2530] dark:text-gray-100 uppercase tracking-wider">
            {phase}...
          </p>
          <p className="text-[11px] text-[#333333]/60 dark:text-gray-400">
            Take one deep breath with me right now
          </p>
        </div>
      </div>
      <span className="text-xs font-semibold text-[#5D7253] dark:text-astrian-leaf">
        Breathing Reset
      </span>
    </div>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "timer" | "playlists" | "dashboard">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isBreathingOverlayOpen, setIsBreathingOverlayOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [activeSessionData, setActiveSessionData] = useState<CategoryPractice | null>(null);

  // User Memory State
  const [streakDays, setStreakDays] = useState(5);
  const [zenPoints, setZenPoints] = useState(285);
  const [meditationMins, setMeditationMins] = useState(45);
  const [lastMood, setLastMood] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Load persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("astra_user_state");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.streakDays) setStreakDays(parsed.streakDays);
          if (parsed.zenPoints) setZenPoints(parsed.zenPoints);
          if (parsed.meditationMins) setMeditationMins(parsed.meditationMins);
          if (parsed.lastMood) setLastMood(parsed.lastMood);
        } catch (e) {}
      }
    }
  }, []);

  // Save persistence
  const saveState = (newPoints = 0, newMins = 0, mood?: string) => {
    const updatedPoints = zenPoints + newPoints;
    const updatedMins = meditationMins + newMins;
    const updatedMood = mood || lastMood;

    setZenPoints(updatedPoints);
    setMeditationMins(updatedMins);
    if (mood) setLastMood(mood);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "astra_user_state",
        JSON.stringify({
          streakDays,
          zenPoints: updatedPoints,
          meditationMins: updatedMins,
          lastMood: updatedMood,
        })
      );
    }
  };

  // Initial welcome greeting
  useEffect(() => {
    const welcomeText = lastMood
      ? `Namaste 👋 Welcome back! Last session you focused on ${lastMood}. Tell me how you're feeling today, and I'll guide you toward the perfect practice.`
      : "Namaste 👋 I'm Astra, your personal AI Yoga Mentor. Tell me how you're feeling today, or select a mood below, and I'll guide you toward the perfect practice.";

    setMessages([
      {
        id: "welcome",
        sender: "astra",
        text: welcomeText,
        timestamp: new Date(),
      },
    ]);
  }, [lastMood]);

  // Scroll to bottom whenever messages or thinking state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, activeTab]);

  const handleSelectMood = (mood: MoodCard) => {
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: `I'm feeling ${mood.label.toLowerCase()} today.`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    scrollToBottom();

    setTimeout(() => {
      setIsThinking(false);
      const resp = MOOD_RESPONSES[mood.id] || MOOD_RESPONSES["calm"];

      const astraMsg: Message = {
        id: Math.random().toString(),
        sender: "astra",
        text: resp.astraText,
        timestamp: new Date(),
        recommendationData: {
          poses: resp.poses,
          classCard: resp.classCard,
          showBreathingMini: true,
          showFollowUpPrompt: true,
        },
      };

      setMessages((prev) => [...prev, astraMsg]);
      saveState(10, 0, mood.label);
      scrollToBottom();
    }, 200);
  };

  const handleSendText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue("");
    setIsThinking(true);
    scrollToBottom();

    try {
      const apiMessages = newMessages.map(msg => ({
        role: msg.sender === "astra" ? "bot" : "user",
        content: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      
      const astraMsg: Message = {
        id: Math.random().toString(),
        sender: "astra",
        text: data.reply || "Sorry, I'm currently unavailable. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, astraMsg]);
      saveState(5, 0);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Math.random().toString(),
        sender: "astra",
        text: "Sorry, I'm currently unavailable. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Floating Astra AI Avatar Trigger */}
      <AstraAvatar
        isOpen={isOpen}
        isThinking={isThinking}
        onClick={() => setIsOpen(!isOpen)}
        processedAvatarUrl="/chatbot-avatar.png"
      />

      {/* Main Glassmorphism Panel Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-4 sm:right-6 z-40 flex items-end justify-end pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-[calc(100vw-2rem)] sm:w-[420px] md:w-[460px] h-[660px] max-h-[82vh] bg-white/90 dark:bg-[#1c1f1d]/90 backdrop-blur-xl border border-[#5D7253]/25 dark:border-white/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto transition-colors duration-300"
            >
              {/* Header */}
              <div className="bg-[#FBF8F3]/90 dark:bg-[#121413]/90 border-b border-[#5D7253]/15 dark:border-white/10 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden relative border border-[#5D7253]/30 bg-white flex items-center justify-center p-0.5">
                    <img
                      src="/chatbot-avatar.png"
                      alt="Astra Avatar"
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-[#1D2530] dark:text-gray-100 font-display">
                        Astra AI Mentor
                      </h3>
                      <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    </div>
                    <p className="text-[11px] text-[#5D7253] dark:text-astrian-leaf font-medium">
                      Zen Streak: {streakDays} Days &bull; {zenPoints} Points
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsLiveModalOpen(true);
                    }}
                    className="px-3 py-1 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    title="Launch Astra AI Live Yoga Session"
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>Live AI Session</span>
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full bg-astrian-clay/40 dark:bg-white/10 text-[#1D2530] dark:text-gray-300 flex items-center justify-center hover:bg-[#5D7253]/20 transition-colors cursor-pointer"
                    aria-label="Close Astra AI Mentor"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs Bar */}
              <div className="flex items-center justify-around bg-[#F3EEE6]/70 dark:bg-[#121413]/50 border-b border-astrian-clay dark:border-white/5 px-2 py-2 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "chat"
                      ? "bg-[#5D7253] text-white shadow-sm"
                      : "text-[#1D2530]/70 dark:text-gray-300 hover:text-[#5D7253]"
                  }`}
                >
                  <Flower2 className="h-3.5 w-3.5" />
                  <span>Mentor</span>
                </button>

                <button
                  onClick={() => setIsBreathingOverlayOpen(true)}
                  className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-[#1D2530]/70 dark:text-gray-300 hover:text-[#5D7253] cursor-pointer"
                >
                  <Wind className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Breathing</span>
                </button>

                <button
                  onClick={() => setActiveTab("timer")}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "timer"
                      ? "bg-[#5D7253] text-white shadow-sm"
                      : "text-[#1D2530]/70 dark:text-gray-300 hover:text-[#5D7253]"
                  }`}
                >
                  <Timer className="h-3.5 w-3.5" />
                  <span>Timer</span>
                </button>

                <button
                  onClick={() => setActiveTab("playlists")}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "playlists"
                      ? "bg-[#5D7253] text-white shadow-sm"
                      : "text-[#1D2530]/70 dark:text-gray-300 hover:text-[#5D7253]"
                  }`}
                >
                  <Music className="h-3.5 w-3.5" />
                  <span>Music</span>
                </button>

                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-[#5D7253] text-white shadow-sm"
                      : "text-[#1D2530]/70 dark:text-gray-300 hover:text-[#5D7253]"
                  }`}
                >
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  <span>Stats</span>
                </button>
              </div>

              {/* Body Content Area depending on Active Tab */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F3EEE6]/30 dark:bg-[#1c1f1d]/50 custom-scrollbar"
              >
                {activeTab === "chat" && (
                  <>
                    {/* Chat Messages */}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex w-full ${
                          msg.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl p-4 text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-[#5D7253] text-white rounded-br-none shadow-md"
                              : "bg-white dark:bg-[#121413] text-[#1D2530] dark:text-gray-200 rounded-bl-none border border-astrian-clay dark:border-white/5 shadow-sm"
                          }`}
                        >
                          {msg.text}

                          {/* Render Recommendation Card Data */}
                          {msg.recommendationData && (
                            <div className="mt-3 pt-3 border-t border-astrian-clay/50 dark:border-white/10 space-y-3">
                              <p className="text-xs font-bold text-[#5D7253] dark:text-astrian-leaf uppercase tracking-wider">
                                Today's Recommended Routine:
                              </p>

                              <ul className="space-y-1.5 text-xs text-[#333333] dark:text-gray-300 font-medium">
                                {msg.recommendationData.poses.map((p, idx) => (
                                  <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-[#5D7253] dark:text-astrian-leaf font-bold">&bull;</span>
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Mini Breathing Loop */}
                              {msg.recommendationData.showBreathingMini && <MiniBreathingCircle />}

                              {/* Recommended Studio Class Card */}
                              <div className="p-3 rounded-xl bg-[#FBF8F3] dark:bg-[#1c1f1d] border border-[#5D7253]/20 flex items-center justify-between">
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D7253] dark:text-astrian-leaf">
                                    Recommended Studio Class
                                  </span>
                                  <p className="font-bold text-xs text-[#1D2530] dark:text-gray-100">
                                    {msg.recommendationData.classCard.title}
                                  </p>
                                  <p className="text-[11px] text-[#333333]/60 dark:text-gray-400">
                                    {msg.recommendationData.classCard.duration} &bull; {msg.recommendationData.classCard.difficulty}
                                  </p>
                                </div>
                                <Link
                                  href={msg.recommendationData.classCard.link}
                                  onClick={() => setIsOpen(false)}
                                  className="px-3 py-1.5 rounded-lg bg-[#5D7253] text-white text-xs font-semibold flex items-center gap-1 hover:bg-[#4B5940] transition-colors"
                                >
                                  View <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>

                              {/* Smart Follow Up Prompt */}
                              {msg.recommendationData.showFollowUpPrompt && (
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-2">
                                  <p className="font-semibold">
                                    "Would you like me to guide you through a 5-cycle breathing exercise right now?"
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setIsBreathingOverlayOpen(true)}
                                      className="px-3 py-1.5 rounded-lg bg-[#5D7253] text-white font-semibold flex items-center gap-1 hover:bg-[#4B5940] transition-colors cursor-pointer"
                                    >
                                      Yes, Guide Me
                                    </button>
                                    <button
                                      onClick={() => {
                                        setMessages((prev) => [
                                          ...prev,
                                          {
                                            id: Math.random().toString(),
                                            sender: "astra",
                                            text: "Namaste 🙏 Take all the time you need. I'll be right here whenever you're ready.",
                                            timestamp: new Date(),
                                          },
                                        ]);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#121413] border border-astrian-clay dark:border-white/10 text-[#1D2530] dark:text-gray-300 font-semibold cursor-pointer"
                                    >
                                      Maybe Later
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Thinking Indicator */}
                    {isThinking && (
                      <div className="flex w-full justify-start">
                        <div className="bg-white dark:bg-[#121413] text-[#1D2530] dark:text-gray-200 rounded-2xl rounded-bl-none px-4 py-3 border border-astrian-clay dark:border-white/5 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#5D7253] animate-ping" />
                          <span className="text-xs font-medium text-[#333333]/70 dark:text-gray-400">
                            Astra is sensing your energy...
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Mood Buttons Selector Section */}
                    <div className="pt-2">
                      <p className="text-xs font-bold text-[#1D2530]/70 dark:text-gray-400 uppercase tracking-wider mb-2.5 px-1">
                        How are you feeling today?
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {MOODS.map((mood) => (
                          <button
                            key={mood.id}
                            onClick={() => handleSelectMood(mood)}
                            className={`p-2.5 rounded-xl border transition-all text-left flex items-start gap-2.5 hover:scale-[1.02] cursor-pointer ${mood.accentColor}`}
                          >
                            <span className="text-2xl">{mood.emoji}</span>
                            <div>
                              <p className="font-bold text-xs text-[#1D2530] dark:text-gray-100">
                                {mood.label}
                              </p>
                              <p className="text-[10px] text-[#333333]/60 dark:text-gray-400 leading-tight">
                                {mood.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "timer" && (
                  <AstraMeditationTimer
                    onCompleteSession={(mins) => saveState(mins * 5, mins)}
                  />
                )}

                {activeTab === "playlists" && <AstraPlaylists />}

                {activeTab === "dashboard" && (
                  <AstraDashboard
                    streakDays={streakDays}
                    mindfulnessPoints={zenPoints}
                    meditationMinutes={meditationMins}
                  />
                )}
              </div>

              {/* Chat Text Input Bar */}
              {activeTab === "chat" && (
                <form
                  onSubmit={handleSendText}
                  className="border-t border-astrian-clay dark:border-white/10 px-4 py-3 flex items-center gap-2 bg-white dark:bg-[#1c1f1d]"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Astra for advice or poses..."
                    className="flex-1 text-xs bg-[#F3EEE6]/50 dark:bg-[#121413] border border-astrian-clay dark:border-white/10 px-3.5 py-2.5 rounded-xl outline-none focus:border-[#5D7253] text-[#1D2530] dark:text-gray-100 placeholder-[#333333]/40"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="h-9 w-9 shrink-0 rounded-xl bg-[#5D7253] text-white disabled:opacity-40 flex items-center justify-center shadow-md hover:bg-[#4B5940] transition-colors cursor-pointer"
                    aria-label="Send query to Astra"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Guided Breathing Overlay */}
      <AstraBreathingOverlay
        isOpen={isBreathingOverlayOpen}
        onClose={(points) => {
          setIsBreathingOverlayOpen(false);
          if (points && points > 0) {
            saveState(points, 2);
          }
        }}
      />

      {/* Astra AI Live Session Modal & Studio Launcher */}
      <AstraLiveSessionModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        onStartSession={(data) => {
          setIsLiveModalOpen(false);
          setActiveSessionData(data);
        }}
      />

      {activeSessionData && (
        <AstraLiveStudio
          sessionData={activeSessionData}
          onEndSession={() => setActiveSessionData(null)}
        />
      )}
    </>
  );
}
