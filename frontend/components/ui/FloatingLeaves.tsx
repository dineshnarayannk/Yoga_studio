"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

const LEAF_COLORS = ["text-[#8DA97B]", "text-[#5D7555]", "text-[#C9D7C3]"];
const ANIMATIONS = ["floatLeaf1", "floatLeaf2", "floatUpAndDown"];

export function FloatingLeaves() {
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
  }, []);

  if (!isMounted || prefersReducedMotion) return null;

  // Generate 15 leaves (maximum for desktop). Responsive display handled via CSS classes.
  const leaves = Array.from({ length: 15 }).map((_, i) => {
    const sizeCategory = Math.random();
    let size = 20;
    let layerOpacity = 0.30;
    let zIndex = -3;
    let duration = 25 + Math.random() * 15;

    if (sizeCategory > 0.7) { 
      // Layer 3: Large, closest to viewer
      size = 50;
      layerOpacity = 0.60;
      zIndex = -1;
      duration = 20 + Math.random() * 10;
    } else if (sizeCategory > 0.3) { 
      // Layer 2: Medium
      size = 35;
      layerOpacity = 0.45;
      zIndex = -2;
      duration = 22 + Math.random() * 12;
    }

    const type = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
    const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    const delay = Math.random() * -40; 
    const startX = Math.random() * 100;
    
    // Hide extra leaves on smaller devices to preserve performance
    let displayClass = "block";
    if (i >= 8) displayClass = "hidden lg:block";
    else if (i >= 5) displayClass = "hidden md:block";

    return { id: i, size, layerOpacity, zIndex, duration, delay, startX, type, color, displayClass };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatLeaf1 {
          0% { transform: translate3d(0, -10vh, 0) rotate(-15deg); opacity: 0; }
          10% { opacity: var(--leaf-opacity); }
          90% { opacity: var(--leaf-opacity); }
          100% { transform: translate3d(30vw, 110vh, 0) rotate(45deg); opacity: 0; }
        }
        @keyframes floatLeaf2 {
          0% { transform: translate3d(0, -10vh, 0) rotate(15deg); opacity: 0; }
          10% { opacity: var(--leaf-opacity); }
          90% { opacity: var(--leaf-opacity); }
          100% { transform: translate3d(-30vw, 110vh, 0) rotate(-45deg); opacity: 0; }
        }
        @keyframes floatUpAndDown {
          0% { transform: translate3d(0, 110vh, 0) rotate(0deg); opacity: 0; }
          20% { opacity: var(--leaf-opacity); }
          50% { transform: translate3d(15vw, 40vh, 0) rotate(35deg); opacity: var(--leaf-opacity); }
          80% { opacity: var(--leaf-opacity); }
          100% { transform: translate3d(30vw, 110vh, 0) rotate(90deg); opacity: 0; }
        }
        @keyframes foregroundFloat {
          0% { transform: translate3d(-20vw, 20vh, 0) scale(1) rotate(-30deg); opacity: 0; }
          10% { opacity: 0.65; }
          80% { opacity: 0.65; }
          100% { transform: translate3d(120vw, 80vh, 0) scale(1) rotate(60deg); opacity: 0; }
        }
      `}} />

      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`absolute ${leaf.type === 'floatUpAndDown' ? 'bottom-0' : 'top-0'} ${leaf.displayClass}`}
          style={{
            left: `${leaf.startX}%`,
            opacity: 0, // Handled by keyframes
            animation: `${leaf.type} ${leaf.duration}s linear ${leaf.delay}s infinite`,
            '--leaf-opacity': leaf.layerOpacity
          } as React.CSSProperties}
        >
          <Leaf 
            width={leaf.size} 
            height={leaf.size} 
            className={`${leaf.color}`} 
            fill="currentColor"
            strokeWidth={1}
          />
        </div>
      ))}

      {/* Bonus: Occasional Foreground Leaf */}
      <div
         className="absolute top-0 left-0 pointer-events-none"
         style={{
            animation: `foregroundFloat 35s linear 5s infinite`,
            opacity: 0
         }}
      >
        <Leaf 
          width={80} 
          height={80} 
          className="text-[#5D7555]" 
          fill="currentColor"
          strokeWidth={1}
        />
      </div>
    </div>
  );
}
