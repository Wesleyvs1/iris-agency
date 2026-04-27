"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY, isHidden]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        {/* Main Cursor Dot */}
        <motion.div
          animate={{
            scale: isHovered ? 2 : 1,
            backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(217, 119, 47, 1)",
          }}
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_15px_rgba(217,119,47,0.5)] z-10"
          style={{
            mixBlendMode: isHovered ? "difference" : "normal",
          }}
        />
        
        {/* Outer Ring */}
        <motion.div
          animate={{
            scale: isHovered ? 2 : 0,
            opacity: isHovered ? 0.5 : 0,
          }}
          className="absolute w-12 h-12 rounded-full border border-iris-orange"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300
          }}
        />

        {/* Trail effect (optional but cool) */}
        <motion.div
          animate={{
            scale: isHovered ? 4 : 1.5,
            opacity: isHovered ? 0.1 : 0.05,
          }}
          className="absolute w-8 h-8 rounded-full bg-iris-orange blur-xl"
        />
      </motion.div>
    </div>
  );
}
