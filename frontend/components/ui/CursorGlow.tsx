"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -1000, y: -1000 });
  const current = useRef({ x: -1000, y: -1000 });
  const isHovering = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports hover and prefers motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    let animationFrameId: number;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      
      if (!hasMoved) {
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        hasMoved = true;
      }
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("button, a, [role='button'], input, select, textarea, .hover-interactive")) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleHoverStart, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;

      if (glowRef.current) {
        const dx = target.current.x - current.current.x;
        const dy = target.current.y - current.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const movingScale = Math.min(1 + distance * 0.003, 1.08); 
        const hoverScale = isHovering.current ? 1.15 : 1;
        const finalScale = isHovering.current ? hoverScale : movingScale;
        
        const currentOpacity = isHovering.current ? "0.15" : "0.1";

        glowRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%) scale(${finalScale})`;
        glowRef.current.style.opacity = currentOpacity;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 rounded-full transition-opacity duration-700 ease-in-out will-change-transform"
        style={{
          width: "250px",
          height: "250px",
          backgroundColor: "#7A8F67",
          opacity: isVisible ? 0.1 : 0,
          filter: "blur(100px)",
        }}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          .will-change-transform {
            width: 175px !important;
            height: 175px !important;
            filter: blur(80px) !important;
          }
        }
      `}} />
    </div>
  );
}
