"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden bg-astrian-oat">
      {/* Background organic shape */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-astrian-cream blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-astrian-clay/40 blur-3xl -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text & Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Accent Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-astrian-sage/10 text-astrian-sage text-sm font-semibold mb-6 tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-astrian-sage animate-pulse" />
            Serene Studio in the Heart of the Community
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold font-display tracking-tight text-astrian-charcoal mb-6 leading-[1.08] text-balance"
          >
            Move. Connect.<br />
            <span className="text-astrian-sage">Transform.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-astrian-charcoal/70 mb-8 max-w-xl leading-relaxed text-pretty font-light"
          >
            Find your balance, strength, and inner peace in our light-filled, serene community space. Whether you are stepping onto the mat for the first time or deepening your practice, our expert-led classes will guide your journey.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-10"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("#schedule")}
              className="flex items-center gap-2"
            >
              View Schedule <ArrowRight className="h-4.5 w-4.5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("#gallery")}
            >
              Explore Classes
            </Button>
          </motion.div>

          {/* Social Proof Stack */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 border-t border-astrian-clay/70 pt-8 w-full"
          >
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-astrian-oat overflow-hidden bg-astrian-clay relative">
                <Image
                  src="/instructor-1.png"
                  alt="Member Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-astrian-oat overflow-hidden bg-astrian-clay relative">
                <Image
                  src="/instructor-2.png"
                  alt="Member Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-2 border-astrian-oat overflow-hidden bg-astrian-clay relative">
                <Image
                  src="/instructor-3.png"
                  alt="Member Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-sm font-semibold text-astrian-charcoal ml-1.5">4.9 / 5.0</span>
              </div>
              <p className="text-sm text-astrian-charcoal/60 mt-0.5">
                Join over <span className="font-semibold text-astrian-charcoal">400+ active members</span> this week.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center items-center w-full"
        >
          {/* Framed Image Container */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_24px_50px_rgba(17,24,39,0.06)] bg-astrian-cream">
            <Image
              src="/yoga-pose-hero.png"
              alt="Serene Yoga Pose"
              fill
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute bottom-6 left-[-10px] sm:left-4 glass-panel py-3 px-5 rounded-2xl flex items-center gap-3 shadow-md"
          >
            <div className="h-10 w-10 rounded-full bg-astrian-sage/10 flex items-center justify-center text-astrian-sage font-bold">
              ॐ
            </div>
            <div>
              <p className="text-xs text-astrian-charcoal/50 uppercase tracking-wider font-semibold">Our Philosophy</p>
              <p className="text-sm font-medium text-astrian-charcoal">Mind-Body Unity</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
