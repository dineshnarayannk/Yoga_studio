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
    <section id="classes" className="py-24 bg-astrian-cream dark:bg-[#1c1f1d] relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-astrian-clay blur-3xl -z-10 opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-astrian-sage/5 blur-3xl -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-astrian-sage dark:text-astrian-leaf uppercase bg-astrian-sage/10 dark:bg-astrian-sage/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-astrian-charcoal dark:text-gray-100 mb-4">
            Curated Classes for Your Journey
          </h2>
          <p className="text-lg text-astrian-charcoal/70 dark:text-gray-300 font-light leading-relaxed">
            Whether you seek a high-energy practice or quiet restoration, find the perfect class tailored to your mind and body.
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
              <Card className="h-full flex flex-col justify-between hover:border-astrian-sage/30 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-astrian-cream dark:bg-[#1c1f1d] border border-astrian-clay/80 dark:border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-astrian-sage dark:text-astrian-leaf bg-astrian-sage/10 dark:bg-astrian-sage/20 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-astrian-charcoal dark:text-gray-100 mb-2 font-display">
                    {item.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-astrian-charcoal/60 dark:text-gray-400 mb-4 font-medium">
                    <span>{item.level}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                  <p className="text-astrian-charcoal/70 dark:text-gray-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-astrian-clay/50 dark:border-white/5 flex justify-between items-center">
                  <span className="text-sm font-semibold text-astrian-charcoal/80 dark:text-gray-200">Book class</span>
                  <div className="h-8 w-8 rounded-full border border-astrian-clay dark:border-white/10 text-astrian-charcoal dark:text-gray-300 flex items-center justify-center hover:bg-astrian-sage hover:text-white hover:border-astrian-sage transition-all duration-300 cursor-pointer">
                    →
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
