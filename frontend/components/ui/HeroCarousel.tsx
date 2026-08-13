"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroImages = [
  "/1.png",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (shouldReduceMotion) return; // Pause if reduced motion preferred

    // Auto slide
    let timer: NodeJS.Timeout;
    if (!isHovered) {
      timer = setInterval(() => {
        nextSlide();
      }, 3500); // 3.5 seconds
    }

    return () => clearInterval(timer);
  }, [isHovered, nextSlide, shouldReduceMotion]);

  // Preload next image to avoid flickering
  useEffect(() => {
    const nextIndex = currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1;
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.src = heroImages[nextIndex];
    }
  }, [currentIndex]);

  const handleMouseEnter = () => {
    // Only pause on devices that support hover (desktops)
    if (window.matchMedia("(hover: hover)").matches) {
      setIsHovered(true);
    }
  };

  const slideVariants = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  };

  return (
    <div
      className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-[#C9D7C3]/60 dark:border-[#8DA97B]/30 shadow-2xl shadow-[#2D4632]/12 bg-[#F8FBF6] dark:bg-[#162019] transition-all duration-300 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          variants={shouldReduceMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } } : slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            alt={`Yoga Studio Feature ${currentIndex + 1}`}
            fill
            className="object-cover object-center"
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#2D4632]/40 via-transparent to-transparent pointer-events-none" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40 z-10 hidden md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40 z-10 hidden md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
              ? "w-6 bg-white shadow-md"
              : "w-2 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
