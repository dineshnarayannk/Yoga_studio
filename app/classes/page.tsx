"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Activity, Moon, Compass, Heart, Flame } from "lucide-react";

export default function ClassesPage() {
  const classesExtended = [
    {
      title: "Vinyasa Flow",
      level: "All Levels",
      duration: "60 mins",
      intensity: "Moderate to High",
      description: "Vinyasa connects individual poses ('asanas') with deep diaphragmatic breath. This flow builds cardiovascular endurance, full-body muscular tone, and core stability, leaving you energized and mentally centered.",
      icon: <Activity className="h-6 w-6 text-astrian-sage" />,
      benefits: ["Cardiovascular health", "Muscle toning", "Stress release"],
      focus: "Fluidity & Breath Link"
    },
    {
      title: "Hatha Harmony",
      level: "Beginner Friendly",
      duration: "75 mins",
      intensity: "Low to Moderate",
      description: "Classical, alignment-focused Hatha yoga. This class breaks down postures systematically, focusing on deep structural holds, safety adjustments, and respiratory coordination. Perfect for building confidence and flexibility.",
      icon: <Sparkles className="h-6 w-6 text-astrian-sage" />,
      benefits: ["Structural alignment", "Core foundation", "Flexibility"],
      focus: "Posture & Mechanics"
    },
    {
      title: "Restorative Yin",
      level: "All Levels",
      duration: "60 mins",
      intensity: "Very Low",
      description: "Yin yoga targets the deep connective tissues—fascia, ligaments, and joints. Postures are held passively for 3-5 minutes, allowing gravity to release deep-seated physical tension while calming the parasympathetic nervous system.",
      icon: <Moon className="h-6 w-6 text-astrian-sage" />,
      benefits: ["Joint health", "Deep relaxation", "Fascia release"],
      focus: "Stillness & Deep Tissue"
    },
    {
      title: "Pranayama & Meditation",
      level: "All Levels",
      duration: "45 mins",
      intensity: "Gentle",
      description: "Explore the ancient science of breath control (Pranayama) combined with guided silent meditation. Learn tools to regulate stress, increase vital capacity, and cultivate a quiet, focused headspace for daily life.",
      icon: <Compass className="h-6 w-6 text-astrian-sage" />,
      benefits: ["Lung capacity", "Mental clarity", "Nerve regulation"],
      focus: "Breath Control & Mind"
    },
    {
      title: "Gentle Flow & Sound",
      level: "Beginner / Intermediate",
      duration: "75 mins",
      intensity: "Low",
      description: "A slow-paced, soothing Vinyasa flow that prepares the body and mind to absorb the deep therapeutic vibrations of a live crystal singing bowl and gong sound bath in the final extended Savasana.",
      icon: <Heart className="h-6 w-6 text-astrian-sage" />,
      benefits: ["Vibrational recovery", "Sound therapy", "Gentle stretching"],
      focus: "Sound & Nervous System"
    },
    {
      title: "Core Power Elements",
      level: "Intermediate / Advanced",
      duration: "60 mins",
      intensity: "High",
      description: "An intense practice combining athletic yoga transitions, core-specific conditioning, and arm balance drills. Designed to build functional upper body strength, deep core engagement, and physical heat.",
      icon: <Flame className="h-6 w-6 text-astrian-sage" />,
      benefits: ["Core conditioning", "Functional strength", "Arm balance drills"],
      focus: "Power & Balance"
    }
  ];

  return (
    <div className="min-h-screen bg-astrian-oat dark:bg-[#121413] pt-32 pb-24 text-astrian-charcoal dark:text-gray-100 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage dark:text-astrian-leaf uppercase bg-astrian-sage/10 dark:bg-astrian-sage/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Curriculum
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-astrian-charcoal dark:text-gray-100 mb-6 leading-tight">
            Our Signature Classes
          </h1>
          <p className="text-lg text-astrian-charcoal/70 dark:text-gray-300 font-light leading-relaxed">
            From active, high-intensity flows to gentle sound meditation and restorative yin, our curriculum supports all aspects of your mental and physical wellness.
          </p>
        </div>

        {/* Classes Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classesExtended.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full flex flex-col justify-between hover:border-astrian-sage/20 hover:shadow-lg transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-astrian-cream dark:bg-[#1c1f1d] border border-astrian-clay dark:border-white/10 flex items-center justify-center transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-astrian-sage dark:text-astrian-leaf bg-astrian-sage/10 dark:bg-astrian-sage/20 px-3 py-1 rounded-full">
                      {item.focus}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100 font-display mb-2">{item.title}</h3>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-astrian-charcoal/60 dark:text-gray-400 mb-4 uppercase tracking-wider">
                    <span>{item.level}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span>{item.intensity} Intensity</span>
                  </div>
                  
                  <p className="text-astrian-charcoal/70 dark:text-gray-300 leading-relaxed font-light mb-6 text-sm">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 border-t border-astrian-clay/60 dark:border-white/5 pt-4 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-astrian-charcoal/40 dark:text-gray-500">Core Benefits</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs font-semibold text-astrian-charcoal/80 dark:text-gray-200 bg-astrian-cream dark:bg-[#1c1f1d] px-2.5 py-1 rounded-md border border-astrian-clay/50 dark:border-white/10 transition-colors duration-300">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Link href="/enquiry" className="w-full">
                    <Button variant="secondary" className="w-full text-sm">
                      Book Free Trial Space
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
