"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Camera,
  ShieldCheck,
  Sparkles,
  Flame,
  Clock,
  Heart,
  Flower2,
  Sun,
  Trees,
  Mountain,
  Home,
  CheckCircle2,
} from "lucide-react";
import { CategoryPractice } from "./AstraLiveSessionModal";
import { astraVoice } from "./AstraVoiceMentor";
import { AstraAchievementModal, SessionSummaryStats } from "./AstraAchievementModal";

interface AstraLiveStudioProps {
  sessionData: CategoryPractice;
  onEndSession: () => void;
}

type AmbientEnv = "studio" | "sunset" | "forest" | "mountain";

const ENV_STYLES: Record<
  AmbientEnv,
  { name: string; bg: string; icon: React.ReactNode }
> = {
  studio: {
    name: "Studio Lounge",
    bg: "from-[#F3EEE6] via-[#FBF8F3] to-[#EFECE1] dark:from-[#121413] dark:via-[#1c1f1d] dark:to-[#121413]",
    icon: <Home className="h-4 w-4" />,
  },
  sunset: {
    name: "Sunset Beach",
    bg: "from-[#2A1B2D] via-[#4A2637] to-[#8C4B43]",
    icon: <Sun className="h-4 w-4 text-amber-400" />,
  },
  forest: {
    name: "Forest Sanctuary",
    bg: "from-[#12231A] via-[#1E382B] to-[#2E543D]",
    icon: <Trees className="h-4 w-4 text-emerald-400" />,
  },
  mountain: {
    name: "Himalayan Zen",
    bg: "from-[#171E2D] via-[#2A3750] to-[#46597A]",
    icon: <Mountain className="h-4 w-4 text-indigo-400" />,
  },
};

export function AstraLiveStudio({ sessionData, onEndSession }: AstraLiveStudioProps) {
  const [poseIndex, setPoseIndex] = useState(0);
  const [secondsLeftInPose, setSecondsLeftInPose] = useState(sessionData.poses[0].durationSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [currentEnv, setCurrentEnv] = useState<AmbientEnv>("studio");
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState(94);
  const [postureFeedback, setPostureFeedback] = useState("Excellent alignment! Keep spine long.");
  const [postureStatus, setPostureStatus] = useState<"excellent" | "adjust" | "correct">("excellent");

  // Summary Report state
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryStats, setSummaryStats] = useState<SessionSummaryStats | null>(null);

  // Breathing Coach state inside Studio
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [breathTimer, setBreathTimer] = useState(4);

  // Video & Canvas Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentPose = sessionData.poses[poseIndex];
  const totalPoses = sessionData.poses.length;

  // Initialize Camera Stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log("Webcam access error:", err);
      }
    }
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Voice greeting on pose change
  useEffect(() => {
    setSecondsLeftInPose(currentPose.durationSeconds);
    const text = `Namaste. Now moving into ${currentPose.name}. ${currentPose.instruction}`;
    astraVoice.speak(text);
  }, [poseIndex, currentPose]);

  // Pose Timer countdown & simulated pose evaluation
  useEffect(() => {
    if (isPaused || isSummaryOpen) return;

    const interval = setInterval(() => {
      setSecondsLeftInPose((prev) => {
        if (prev > 1) {
          // Simulate live computer vision accuracy variations & posture advice
          if (prev % 5 === 0) {
            const randAcc = Math.floor(88 + Math.random() * 10);
            setAccuracyScore(randAcc);
            if (randAcc > 92) {
              setPostureStatus("excellent");
              setPostureFeedback("Excellent posture! Keep your shoulders relaxed.");
            } else if (randAcc > 85) {
              setPostureStatus("adjust");
              setPostureFeedback("Adjust alignment slightly: lift chest & extend spine.");
            } else {
              setPostureStatus("correct");
              setPostureFeedback("Let's correct position: relax neck and align knees.");
            }
          }
          return prev - 1;
        }

        // Move to next pose or complete session
        if (poseIndex < totalPoses - 1) {
          setPoseIndex((p) => p + 1);
          return sessionData.poses[poseIndex + 1].durationSeconds;
        } else {
          // Session Completed!
          completeSession();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, poseIndex, totalPoses, isSummaryOpen, sessionData]);

  // Breathing Coach cycle
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev > 1) return prev - 1;
        if (breathPhase === "Inhale") {
          setBreathPhase("Hold");
          return 2;
        } else if (breathPhase === "Hold") {
          setBreathPhase("Exhale");
          return 6;
        } else {
          setBreathPhase("Inhale");
          return 4;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breathPhase, isPaused]);

  // Canvas Skeleton Tracking Animation Loop
  useEffect(() => {
    let animFrame: number;
    function drawSkeleton() {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video && video.readyState === 4) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw skeleton keypoints overlay simulating MediaPipe tracking
          const time = Date.now() * 0.003;
          const cx = canvas.width / 2;
          const cy = canvas.height / 2.2;

          const headY = cy - 100 + Math.sin(time) * 4;
          const neckY = cy - 60;
          const lShoulder = { x: cx - 60, y: neckY };
          const rShoulder = { x: cx + 60, y: neckY };
          const lElbow = { x: cx - 90 + Math.sin(time * 1.5) * 8, y: neckY + 70 };
          const rElbow = { x: cx + 90 - Math.sin(time * 1.5) * 8, y: neckY + 70 };
          const lWrist = { x: cx - 110, y: neckY + 130 };
          const rWrist = { x: cx + 110, y: neckY + 130 };

          const spineY = cy + 40;
          const lHip = { x: cx - 40, y: spineY };
          const rHip = { x: cx + 40, y: spineY };
          const lKnee = { x: cx - 45, y: spineY + 110 };
          const rKnee = { x: cx + 45, y: spineY + 110 };
          const lAnkle = { x: cx - 50, y: spineY + 200 };
          const rAnkle = { x: cx + 50, y: spineY + 200 };

          const strokeColor =
            postureStatus === "excellent"
              ? "#10B981"
              : postureStatus === "adjust"
              ? "#F59E0B"
              : "#EF4444";

          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";

          // Head Circle
          ctx.beginPath();
          ctx.arc(cx, headY, 24, 0, Math.PI * 2);
          ctx.stroke();

          // Connections
          const lines = [
            [ { x: cx, y: headY + 24 }, { x: cx, y: neckY } ],
            [ lShoulder, rShoulder ],
            [ lShoulder, lElbow ],
            [ lElbow, lWrist ],
            [ rShoulder, rElbow ],
            [ rElbow, rWrist ],
            [ { x: cx, y: neckY }, { x: cx, y: spineY } ],
            [ lHip, rHip ],
            [ lHip, lKnee ],
            [ lKnee, lAnkle ],
            [ rHip, rKnee ],
            [ rKnee, rAnkle ],
          ];

          lines.forEach(([p1, p2]) => {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          });

          // Keypoint Joint Dots
          [lShoulder, rShoulder, lElbow, rElbow, lWrist, rWrist, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle].forEach(
            (pt) => {
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.fill();
              ctx.strokeStyle = strokeColor;
              ctx.stroke();
            }
          );
        }
      }
      animFrame = requestAnimationFrame(drawSkeleton);
    }
    animFrame = requestAnimationFrame(drawSkeleton);
    return () => cancelAnimationFrame(animFrame);
  }, [postureStatus]);

  const completeSession = () => {
    astraVoice.speak("Session complete! Wonderful dedication to your practice today.");
    setSummaryStats({
      categoryTitle: sessionData.title,
      durationMinutes: Math.ceil(
        sessionData.poses.reduce((a, b) => a + b.durationSeconds, 0) / 60
      ),
      caloriesBurned: parseInt(sessionData.calories),
      avgAccuracy: accuracyScore,
      bestPose: currentPose.name,
      mindfulnessScore: 92,
      streakDays: 6,
    });
    setIsSummaryOpen(true);
  };

  const handleNextPose = () => {
    if (poseIndex < totalPoses - 1) {
      setPoseIndex((p) => p + 1);
    } else {
      completeSession();
    }
  };

  const handlePrevPose = () => {
    if (poseIndex > 0) {
      setPoseIndex((p) => p - 1);
    }
  };

  const toggleMuteVoice = () => {
    const muted = astraVoice.toggleMute();
    setIsVoiceMuted(muted);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-gradient-to-br ${ENV_STYLES[currentEnv].bg} text-white transition-all duration-700 overflow-hidden`}
    >
      {/* Top Floating Glass Status Header */}
      <div className="w-full px-6 py-4 flex items-center justify-between z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#5D7253] text-white flex items-center justify-center font-bold">
            <Flower2 className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="font-bold text-base font-display">{sessionData.title}</h2>
            <p className="text-xs text-gray-300">
              Pose {poseIndex + 1} of {totalPoses} &bull; {sessionData.difficulty}
            </p>
          </div>
        </div>

        {/* Ambient Environment Switcher */}
        <div className="hidden md:flex items-center gap-2 bg-white/10 p-1 rounded-full border border-white/15">
          {(["studio", "sunset", "forest", "mountain"] as AmbientEnv[]).map((envKey) => (
            <button
              key={envKey}
              onClick={() => setCurrentEnv(envKey)}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentEnv === envKey
                  ? "bg-white text-[#1D2530] shadow-md"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {ENV_STYLES[envKey].icon}
              <span>{ENV_STYLES[envKey].name}</span>
            </button>
          ))}
        </div>

        {/* Top Stats */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold px-4 py-2 rounded-full bg-white/10 border border-white/15">
            <span className="flex items-center gap-1 text-amber-300">
              <Flame className="h-4 w-4 fill-amber-300" /> {sessionData.calories}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> {accuracyScore}% Accuracy
            </span>
          </div>

          <button
            onClick={onEndSession}
            className="p-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 hover:text-white transition-colors cursor-pointer border border-rose-500/30"
            title="End Session"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Split Screen Interface */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 overflow-hidden">
        {/* LEFT COLUMN: Live Webcam Video & Computer Vision Skeleton Tracker */}
        <div className="lg:col-span-6 relative rounded-[28px] overflow-hidden bg-black/40 border border-white/15 shadow-2xl flex items-center justify-center">
          {/* Video Stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />

          {/* HTML5 Canvas Computer Vision Skeleton Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transform -scale-x-100"
          />

          {/* Accuracy Status Badge Overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold">
            <span
              className={`h-2.5 w-2.5 rounded-full animate-ping ${
                postureStatus === "excellent"
                  ? "bg-emerald-400"
                  : postureStatus === "adjust"
                  ? "bg-amber-400"
                  : "bg-rose-400"
              }`}
            />
            <span>Pose Accuracy: {accuracyScore}%</span>
          </div>

          {/* Live Posture Guidance Floating Pill */}
          <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
              <span>{postureFeedback}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 font-bold shrink-0">
              Live AI Detector
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Astra Guide Avatar, Pose Comparison & Instructions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4 bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/15 rounded-[28px] p-6 shadow-2xl overflow-y-auto custom-scrollbar">
          {/* Top Pose Info Header & Timer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Current Posture
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white mt-0.5">
                {currentPose.name}
              </h3>
            </div>

            {/* Countdown Timer Circle */}
            <div className="relative h-16 w-16 rounded-full bg-white/10 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-lg">
              <span className="text-xl font-extrabold font-display">
                {secondsLeftInPose}
              </span>
              <span className="text-[9px] uppercase font-bold text-gray-300">Sec</span>
            </div>
          </div>

          {/* Side-by-Side Lifelike Astra Pose Demonstration Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            {/* Astra 3D/Vector Instructor Graphic */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="relative h-40 w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#5D7253]/20 to-black/30 flex items-center justify-center">
                <img
                  src={currentPose.illustration || "/yoga-pose-hero.png"}
                  alt={currentPose.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/yoga-pose-hero.png";
                  }}
                  className="h-full object-contain transform hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[11px] font-bold text-gray-300 mt-2 uppercase tracking-wider">
                Astra Demonstration
              </span>
            </div>

            {/* Instructions & Benefit */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Technique Guidance
                </p>
                <p className="text-xs leading-relaxed text-gray-200">
                  {currentPose.instruction}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[11px] text-amber-300 font-semibold block">
                  Benefit: {currentPose.benefit}
                </span>
              </div>
            </div>
          </div>

          {/* Integrated Breathing Coach Circle */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#5D7253]/20 to-emerald-500/10 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={
                  breathPhase === "Inhale"
                    ? { scale: [1, 1.25] }
                    : breathPhase === "Hold"
                    ? { scale: 1.25 }
                    : { scale: [1.25, 1] }
                }
                transition={{
                  duration: breathPhase === "Inhale" ? 4 : breathPhase === "Hold" ? 2 : 6,
                  ease: "easeInOut",
                }}
                className="h-10 w-10 rounded-full bg-[#5D7253] text-white font-bold text-xs flex items-center justify-center shadow-md border border-white/30"
              >
                {breathTimer}s
              </motion.div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Breathing Coach: {breathPhase}...
                </p>
                <p className="text-[11px] text-gray-300">
                  Link breath rhythm to posture movement
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15">
              Sync Breath
            </span>
          </div>

          {/* Bottom Session Control Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPose}
                disabled={poseIndex === 0}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white transition-colors cursor-pointer"
                title="Previous Pose"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-6 py-3 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
              >
                {isPaused ? <Play className="h-4.5 w-4.5 fill-white" /> : <Pause className="h-4.5 w-4.5 fill-white" />}
                <span>{isPaused ? "Resume" : "Pause"}</span>
              </button>

              <button
                onClick={handleNextPose}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Next Pose"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={toggleMuteVoice}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isVoiceMuted ? "Unmute Voice Guidance" : "Mute Voice Guidance"}
            >
              {isVoiceMuted ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Achievement Report Summary Modal */}
      {summaryStats && (
        <AstraAchievementModal
          isOpen={isSummaryOpen}
          stats={summaryStats}
          onRestart={() => {
            setIsSummaryOpen(false);
            setPoseIndex(0);
            setSecondsLeftInPose(sessionData.poses[0].durationSeconds);
          }}
          onClose={onEndSession}
        />
      )}
    </div>
  );
}
