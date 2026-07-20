"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { HeroCarousel } from "@/components/ui/HeroCarousel";

const QUOTES = [
  { line1: "Move. Connect.", line2: "Transform." },
  { line1: "Breathe. Balance.", line2: "Bloom." },
  { line1: "Flow. Focus.", line2: "Flourish." },
  { line1: "Calm. Strength.", line2: "Harmony." },
];

function AutoTypingHeading() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentQuote = QUOTES[quoteIndex];
  const totalLength = currentQuote.line1.length + currentQuote.line2.length;

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(pauseTimer);
    }

    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < totalLength) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, totalLength]);

  const line1Len = currentQuote.line1.length;
  const typedLine1 = currentQuote.line1.slice(0, Math.min(charIndex, line1Len));
  const typedLine2 =
    charIndex > line1Len
      ? currentQuote.line2.slice(0, charIndex - line1Len)
      : "";

  const isCursorOnLine1 = charIndex <= line1Len;

  return (
    <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[175px] flex flex-col justify-start">
      <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-astrian-charcoal dark:text-gray-100 leading-[1.08] text-balance">
        <span>
          {typedLine1}
          {isCursorOnLine1 && (
            <span className="inline-block w-[3px] md:w-[5px] h-[0.75em] bg-astrian-sage dark:bg-astrian-leaf ml-1.5 align-middle animate-pulse rounded-full" />
          )}
        </span>
        <br />
        <span className="text-astrian-sage dark:text-astrian-leaf">
          {typedLine2}
          {!isCursorOnLine1 && (
            <span className="inline-block w-[3px] md:w-[5px] h-[0.75em] bg-astrian-sage dark:bg-astrian-leaf ml-1.5 align-middle animate-pulse rounded-full" />
          )}
        </span>
      </h1>
    </div>
  );
}

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };



  return (
    <section className="relative min-h-[92vh] pt-36 pb-20 flex items-center overflow-hidden bg-[#F4F8F2] dark:bg-[#0F1611] transition-colors duration-300">
      {/* Layered Nature Ambient Lighting & Floating Botanical Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Soft Radial Botanical Lights */}
        <div className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full bg-radial from-[#8DA97B]/20 via-[#C9D7C3]/10 to-transparent blur-3xl opacity-80 animate-pulse-slow" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-radial from-[#5D7555]/15 via-[#AFC4A3]/10 to-transparent blur-3xl opacity-70" />
        
        {/* Warm Sunlight Ambient Glow */}
        <div className="absolute top-[10%] left-[25%] w-[350px] h-[350px] rounded-full bg-radial from-[#F8F7F2]/60 to-transparent blur-2xl opacity-90" />

        {/* Abstract Leaf SVG Silhouettes */}
        <svg className="absolute top-12 right-12 opacity-15 dark:opacity-10 text-[#5D7555] w-72 h-72 animate-float" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C60 30, 90 40, 100 50 C70 60, 60 90, 50 100 C40 70, 10 60, 0 50 C30 40, 40 10, 50 0 Z" />
        </svg>
        <svg className="absolute bottom-12 left-8 opacity-10 text-[#2D4632] w-56 h-56 animate-float" style={{ animationDelay: '3s' }} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C70 20, 80 50, 90 90 C50 80, 20 70, 10 50 C20 30, 30 20, 50 10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text & Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
        >
          {/* Accent Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EEF5EA] dark:bg-[#162019] border border-[#C9D7C3]/60 dark:border-[#8DA97B]/30 text-[#2D4632] dark:text-[#C9D7C3] text-xs font-semibold mb-6 tracking-wide shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#8DA97B] animate-ping" />
            <span className="font-semibold text-[#2D4632] dark:text-[#8DA97B]">Astrion Sanctuary</span>
            <span className="text-[#7A867F]">•</span>
            <span>AI-Powered Personal Yoga & Mindfulness</span>
          </motion.div>

          {/* Auto-typing Headline */}
          <motion.div variants={itemVariants} className="mb-6 w-full">
            <AutoTypingHeading />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#52625A] dark:text-[#C9D7C3] mb-9 max-w-xl leading-relaxed text-pretty font-light"
          >
            Step into a serene digital sanctuary where artificial intelligence meets ancient mindfulness. Personal guided practice tailored dynamically to your body, energy, and breath.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-10"
          >
            <Link href="/schedule">
              <Button
                variant="primary"
                size="lg"
                className="flex items-center gap-2 bg.gradient-to-r from-[#2D4632] to-[#5D7555] bg-[#2D4632] hover:bg-[#1F2E23] text-white rounded-full px-7 py-3.5 text-sm font-semibold shadow-xl shadow-[#2D4632]/20 hover:scale-[1.02] transition-all duration-300"
              >
                Explore Sessions <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link href="/classes">
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#F8FBF6]/90 dark:bg-[#162019]/90 backdrop-blur-md border border-[#C9D7C3]/70 dark:border-[#8DA97B]/30 text-[#2D4632] dark:text-[#F4F8F2] hover:bg-[#EEF5EA] dark:hover:bg-[#1F2E23] rounded-full px-7 py-3.5 text-sm font-semibold shadow-sm transition-all duration-300"
              >
                View Practices
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof Stack */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 border-t border-[#C9D7C3]/50 dark:border-[#8DA97B]/20 pt-8 w-full"
          >
            <div className="flex -space-x-3">
              <div className="h-10 w-10 rounded-full border-2 border-[#F4F8F2] dark:border-[#0F1611] overflow-hidden bg-[#EEF5EA] relative shadow-sm">
                <Image
                  src="/instructor-1.png"
                  alt="Member Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-[#F4F8F2] dark:border-[#0F1611] overflow-hidden bg-[#EEF5EA] relative shadow-sm">
                <Image
                  src="/instructor-2.png"
                  alt="Member Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-[#F4F8F2] dark:border-[#0F1611] overflow-hidden bg-[#EEF5EA] relative shadow-sm">
                <Image
                  src="/instructor-3.png"
                  alt="Member Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1 text-[#5D7555] dark:text-[#8DA97B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#5D7555] dark:fill-[#8DA97B] text-[#5D7555] dark:text-[#8DA97B]" />
                ))}
                <span className="text-xs font-bold text-[#233228] dark:text-[#F4F8F2] ml-1.5">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs text-[#52625A] dark:text-[#C9D7C3] mt-0.5">
                Join over <span className="font-semibold text-[#2D4632] dark:text-white">1,200+ mindful practitioners</span> worldwide.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center items-center w-full"
        >
          {/* Framed Image Carousel */}
          <HeroCarousel />

          {/* Floating Philosophy badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="absolute bottom-6 left-[-10px] sm:left-4 glass-card-luxury py-3.5 px-5 rounded-2xl flex items-center gap-3.5 shadow-xl border border-[#C9D7C3]/80 dark:border-[#8DA97B]/30"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#2D4632] to-[#5D7555] flex items-center justify-center text-[#F8F7F2] font-bold text-lg shadow-sm">
              ॐ
            </div>
            <div>
              <p className="text-[10px] text-[#7A867F] dark:text-[#C9D7C3] uppercase tracking-wider font-bold">Nature AI Balance</p>
              <p className="text-xs font-semibold text-[#233228] dark:text-white">Mind-Body AI Studio</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
