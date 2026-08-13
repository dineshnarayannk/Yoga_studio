"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  ShieldCheck,
  Sparkles,
  Clock,
  Flame,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Video,
} from "lucide-react";

export interface CategoryPractice {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  calories: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  image: string;
  poses: {
    name: string;
    durationSeconds: number;
    instruction: string;
    benefit: string;
    illustration: string;
  }[];
}

export const CATEGORIES: CategoryPractice[] = [
  {
    id: "sun-salutation",
    title: "Sun Salutation (Surya Namaskar)",
    subtitle: "Classic 12-pose energizing flow to awaken breath & vitality.",
    duration: "12 mins",
    calories: "85 kcal",
    difficulty: "All Levels",
    image: "/class-vinyasa.png",
    poses: [
      {
        name: "Mountain Pose (Tadasana)",
        durationSeconds: 15,
        instruction: "Stand tall with feet together, extend spine upward, relax shoulders.",
        benefit: "Establishes posture foundation & balance",
        illustration: "/yoga-pose-hero.png",
      },
      {
        name: "Raised Arms Pose (Urdhva Hastasana)",
        durationSeconds: 20,
        instruction: "Inhale, sweep arms overhead, palms facing each other, gaze upward.",
        benefit: "Stretches belly & opens shoulders",
        illustration: "/class-vinyasa.png",
      },
      {
        name: "Standing Forward Bend (Uttanasana)",
        durationSeconds: 20,
        instruction: "Exhale, hinge from hips, fold forward, let head hang heavy toward knees.",
        benefit: "Lengthens hamstrings & releases spine",
        illustration: "/class-hatha.png",
      },
      {
        name: "Plank Pose (Phalakasana)",
        durationSeconds: 25,
        instruction: "Step feet back into strong straight line, engage core, push floor away.",
        benefit: "Builds arm, shoulder & core strength",
        illustration: "/class-vinyasa.png",
      },
      {
        name: "Cobra Pose (Bhujangasana)",
        durationSeconds: 20,
        instruction: "Lower hips, press tops of feet down, inhale and lift chest softly.",
        benefit: "Opens chest & strengthens lower back",
        illustration: "/class-yin.png",
      },
      {
        name: "Downward-Facing Dog (Adho Mukha Svanasana)",
        durationSeconds: 25,
        instruction: "Tuck toes, lift hips up and back into inverted V shape, press heels down.",
        benefit: "Full-body stretch & circulation boost",
        illustration: "/class-hatha.png",
      },
    ],
  },
  {
    id: "morning-stretch",
    title: "Beginner Morning Stretch",
    subtitle: "Gentle spinal awakenings and gentle shoulder openers.",
    duration: "10 mins",
    calories: "60 kcal",
    difficulty: "Beginner",
    image: "/class-hatha.png",
    poses: [
      {
        name: "Mountain Pose (Tadasana)",
        durationSeconds: 15,
        instruction: "Stand tall, root feet into the earth, take 3 deep breaths.",
        benefit: "Centers mind & posture",
        illustration: "/yoga-pose-hero.png",
      },
      {
        name: "Cat-Cow Stretch (Marjaryasana-Bitilasana)",
        durationSeconds: 30,
        instruction: "On hands & knees, arch back on inhale, round spine on exhale.",
        benefit: "Mobilizes full spine",
        illustration: "/class-hatha.png",
      },
      {
        name: "Child's Pose (Balasana)",
        durationSeconds: 25,
        instruction: "Sit hips back to heels, extend arms forward, rest forehead on mat.",
        benefit: "Calms nervous system & stretches lower back",
        illustration: "/class-yin.png",
      },
    ],
  },
  {
    id: "stress-relief",
    title: "Stress Relief Yoga",
    subtitle: "Passive restorative poses to dissolve tension & anxiety.",
    duration: "15 mins",
    calories: "70 kcal",
    difficulty: "All Levels",
    image: "/class-gentle-sound.png",
    poses: [
      {
        name: "Child's Pose (Balasana)",
        durationSeconds: 30,
        instruction: "Rest hips on heels, breathe deeply into back ribs.",
        benefit: "Soothes anxiety & racing thoughts",
        illustration: "/class-yin.png",
      },
      {
        name: "Legs-Up-The-Wall (Viparita Karani)",
        durationSeconds: 40,
        instruction: "Lie on back, extend legs straight up against wall or air.",
        benefit: "Improves lymphatic drainage & relaxation",
        illustration: "/class-gentle-sound.png",
      },
      {
        name: "Reclined Bound Angle (Supta Baddha Konasana)",
        durationSeconds: 35,
        instruction: "Soles of feet together, knees open wide, hands on abdomen.",
        benefit: "Opens hips & lowers stress hormones",
        illustration: "/class-yin.png",
      },
    ],
  },
  {
    id: "back-pain",
    title: "Back Pain Relief",
    subtitle: "Targeted lumbar decompression and spinal mobility.",
    duration: "12 mins",
    calories: "65 kcal",
    difficulty: "Beginner",
    image: "/class-yin.png",
    poses: [
      {
        name: "Cat-Cow Stretch",
        durationSeconds: 25,
        instruction: "Flow smoothly between arching and rounding spine.",
        benefit: "Decompresses vertebral discs",
        illustration: "/class-hatha.png",
      },
      {
        name: "Sphinx Pose",
        durationSeconds: 25,
        instruction: "Lie on belly, rest on forearms, gently lift chest forward.",
        benefit: "Restores natural lumbar curve",
        illustration: "/class-yin.png",
      },
      {
        name: "Supine Spinal Twist",
        durationSeconds: 30,
        instruction: "Draw knees to chest, lower knees to left, extend right arm.",
        benefit: "Releases thoracic & lumbar tightness",
        illustration: "/class-gentle-sound.png",
      },
    ],
  },
  {
    id: "neck-shoulder",
    title: "Neck & Shoulder Relaxation",
    subtitle: "Release desk fatigue, upper back tightness, and neck tension.",
    duration: "10 mins",
    calories: "50 kcal",
    difficulty: "Beginner",
    image: "/class-hatha.png",
    poses: [
      {
        name: "Seated Eagle Arms (Garudasana Arms)",
        durationSeconds: 25,
        instruction: "Cross right elbow over left, intertwine forearms, lift elbows level with shoulders.",
        benefit: "Opens rhomboids & upper back",
        illustration: "/class-hatha.png",
      },
      {
        name: "Puppy Dog Pose (Uttana Shishosana)",
        durationSeconds: 30,
        instruction: "Keep hips over knees, walk hands forward, melt chest to floor.",
        benefit: "Deep chest & shoulder opener",
        illustration: "/class-yin.png",
      },
    ],
  },
  {
    id: "balance-training",
    title: "Balance & Core Stability",
    subtitle: "Single-leg postures to strengthen ankle, knee & core focus.",
    duration: "15 mins",
    calories: "90 kcal",
    difficulty: "Intermediate",
    image: "/yoga-pose-hero.png",
    poses: [
      {
        name: "Tree Pose (Vrksasana)",
        durationSeconds: 30,
        instruction: "Place sole of right foot against left inner thigh or calf, bring hands to heart.",
        benefit: "Strengthens standing leg & sharpens focus",
        illustration: "/yoga-pose-hero.png",
      },
      {
        name: "Warrior III (Virabhadrasana III)",
        durationSeconds: 25,
        instruction: "Hinge forward from hips, extend right leg back parallel to floor.",
        benefit: "Builds hamstring & posterior chain strength",
        illustration: "/class-vinyasa.png",
      },
    ],
  },
];

interface AstraLiveSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSession: (selectedCategory: CategoryPractice) => void;
}

export function AstraLiveSessionModal({
  isOpen,
  onClose,
  onStartSession,
}: AstraLiveSessionModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryPractice | null>(null);
  const [step, setStep] = useState<"select" | "preview" | "permission">("select");

  if (!isOpen) return null;

  const handleCategoryClick = (cat: CategoryPractice) => {
    setSelectedCategory(cat);
    setStep("preview");
  };

  const handleProceedToPermission = () => {
    setStep("permission");
  };

  const handleConfirmStart = () => {
    if (selectedCategory) {
      onStartSession(selectedCategory);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-3xl bg-white dark:bg-[#1c1f1d] border border-[#5D7253]/30 dark:border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1D2530] dark:text-gray-100"
        >
          {/* Header */}
          <div className="bg-[#FBF8F3] dark:bg-[#121413] border-b border-[#5D7253]/15 dark:border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step !== "select" && (
                <button
                  onClick={() => setStep(step === "permission" ? "preview" : "select")}
                  className="p-1.5 rounded-full hover:bg-astrian-clay/50 dark:hover:bg-white/10 text-[#1D2530] dark:text-gray-200 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div className="h-9 w-9 rounded-full bg-[#5D7253] text-white flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base font-display">
                  {step === "select" && "Start Your Guided Yoga Session"}
                  {step === "preview" && "Session Pose Preview"}
                  {step === "permission" && "Enable Camera Guidance"}
                </h3>
                <p className="text-xs text-[#333333]/70 dark:text-gray-400">
                  {step === "select" && "Choose a practice and let Astra guide you step by step."}
                  {step === "preview" && `Review the ${selectedCategory?.poses.length} poses in this session.`}
                  {step === "permission" && "Real-time posture feedback & privacy protection."}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full bg-astrian-clay/40 dark:bg-white/10 text-[#1D2530] dark:text-gray-300 flex items-center justify-center hover:bg-[#5D7253]/20 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* STEP 1: Select Category Grid */}
            {step === "select" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className="p-4 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 hover:border-[#5D7253] transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#5D7253]/15 text-[#5D7253] dark:text-astrian-leaf uppercase tracking-wider">
                          {cat.difficulty}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-[#333333]/70 dark:text-gray-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {cat.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> {cat.calories}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-base text-[#1D2530] dark:text-gray-100 group-hover:text-[#5D7253] dark:group-hover:text-astrian-leaf transition-colors font-display mb-1">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-[#333333]/70 dark:text-gray-400 leading-relaxed mb-4">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-astrian-clay/50 dark:border-white/5 text-xs font-semibold text-[#5D7253] dark:text-astrian-leaf">
                      <span>{cat.poses.length} Step-by-Step Poses</span>
                      <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 2: Pose Preview Screen */}
            {step === "preview" && selectedCategory && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-[#5D7253]/10 border border-[#5D7253]/25 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-[#1D2530] dark:text-gray-100 font-display">
                      {selectedCategory.title}
                    </h4>
                    <p className="text-xs text-[#333333]/70 dark:text-gray-300">
                      {selectedCategory.duration} &bull; {selectedCategory.calories} &bull; {selectedCategory.difficulty}
                    </p>
                  </div>
                  <button
                    onClick={handleProceedToPermission}
                    className="px-6 py-2.5 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Start Session</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#5D7253] dark:text-astrian-leaf px-1">
                    Pose Sequence ({selectedCategory.poses.length} Poses)
                  </h5>

                  {selectedCategory.poses.map((p, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#FBF8F3] dark:bg-[#121413] border border-astrian-clay dark:border-white/5 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-7 w-7 rounded-full bg-[#5D7253] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1D2530] dark:text-gray-100">
                            {p.name}
                          </p>
                          <p className="text-xs text-[#333333]/80 dark:text-gray-300 mt-0.5">
                            {p.instruction}
                          </p>
                          <span className="inline-block text-[11px] text-[#5D7253] dark:text-astrian-leaf font-semibold mt-1">
                            Benefit: {p.benefit}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-astrian-clay/50 dark:bg-white/10 shrink-0">
                        {p.durationSeconds}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Camera Permission Interface */}
            {step === "permission" && (
              <div className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-6">
                <div className="h-20 w-20 rounded-full bg-[#5D7253]/15 text-[#5D7253] dark:text-astrian-leaf flex items-center justify-center border border-[#5D7253]/30 shadow-inner">
                  <Camera className="h-10 w-10 text-[#5D7253] dark:text-astrian-leaf" />
                </div>

                <div className="max-w-md space-y-2">
                  <h4 className="text-2xl font-bold font-display text-[#1D2530] dark:text-gray-100">
                    Camera Guidance Privacy
                  </h4>
                  <p className="text-sm text-[#333333]/80 dark:text-gray-300 leading-relaxed">
                    "We'll use your camera only to help guide your posture and calculate alignment in real time. No images or video recordings are stored or saved."
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Strict Local On-Device AI Processing</span>
                </div>

                <div className="flex items-center gap-4 pt-4 w-full max-w-sm">
                  <button
                    onClick={() => setStep("preview")}
                    className="flex-1 py-3.5 rounded-full border border-astrian-clay dark:border-white/10 text-[#1D2530] dark:text-gray-300 font-bold text-sm hover:bg-astrian-cream transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleConfirmStart}
                    className="flex-1 py-3.5 rounded-full bg-[#5D7253] hover:bg-[#4B5940] text-white font-bold text-sm shadow-lg transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Video className="h-4 w-4" />
                    <span>Allow Camera</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
