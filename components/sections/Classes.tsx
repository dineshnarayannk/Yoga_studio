"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles, Activity, Moon } from "lucide-react";

export default function Classes() {
  const classesList = [
    {
      title: "Vinyasa Flow",
      level: "All Levels",
      duration: "60 mins",
      description: "A fluid, dynamic practice connecting breath with creative movement. Build strength, flexibility, and mindfulness in this flow.",
      icon: <Activity className="h-6 w-6 text-astrian-sage" />,
      tag: "Dynamic"
    },
    {
      title: "Hatha Harmony",
      level: "Beginner Friendly",
      duration: "75 mins",
      description: "Focus on classical postures, proper alignment, and pranayama (breathwork). Perfect for establishing a strong, mindful foundation.",
      icon: <Sparkles className="h-6 w-6 text-astrian-sage" />,
      tag: "Alignment"
    },
    {
      title: "Restorative Yin",
      level: "All Levels",
      duration: "60 mins",
      description: "Deep passive stretches held for longer periods to target connective tissues, promote relaxation, and quiet the mind.",
      icon: <Moon className="h-6 w-6 text-astrian-sage" />,
      tag: "Restorative"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="classes" className="py-28 bg-[#EEF5EA] dark:bg-[#162019] relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-radial from-[#8DA97B]/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-radial from-[#5D7555]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#2D4632] dark:text-[#8DA97B] uppercase bg-[#C9D7C3]/40 dark:bg-[#8DA97B]/20 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Curated Practices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-4">
            Customized for Your Flow
          </h2>
          <p className="text-lg text-[#52625A] dark:text-[#C9D7C3] font-light leading-relaxed">
            Whether seeking dynamic vitality or quiet mindfulness, explore AI-tailored and expert-guided practices designed for your inner balance.
          </p>
        </div>

        {/* Classes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {classesList.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="glass-card-luxury h-full p-8 rounded-[2rem] flex flex-col justify-between border border-[#C9D7C3]/60 dark:border-[#8DA97B]/25 bg-[#F8FBF6]/90 dark:bg-[#0F1611]/80 shadow-lg shadow-[#2D4632]/4">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2D4632] to-[#5D7555] flex items-center justify-center text-[#F8F7F2] shadow-md">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D4632] dark:text-[#8DA97B] bg-[#EEF5EA] dark:bg-[#162019] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/30 px-3.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#233228] dark:text-[#F4F8F2] mb-2 font-display">
                    {item.title}
                  </h3>
                  <div className="flex gap-3 text-xs font-semibold text-[#7A867F] dark:text-[#C9D7C3] mb-4">
                    <span>{item.level}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                  <p className="text-[#52625A] dark:text-[#C9D7C3] leading-relaxed font-light text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#C9D7C3]/40 dark:border-[#8DA97B]/20 flex justify-between items-center text-xs font-bold text-[#2D4632] dark:text-[#8DA97B]">
                  <span>AI Guided Posture Sync</span>
                  <span className="h-2 w-2 rounded-full bg-[#8DA97B] animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
