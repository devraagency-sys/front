"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export const CustomCursor = () => {
  const { theme } = useTheme();

  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cloudX = useSpring(cursorX, { damping: 25, stiffness: 100 });
  const cloudY = useSpring(cursorY, { damping: 25, stiffness: 100 });

  const followerX = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const followerY = useSpring(cursorY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  const colors = theme === "dark" 
    ? {
        primary: "#ff6b35",
        secondary: "#f7931e", 
        accent: "#ffcd3c",
        gradient1: "#ff8a65",
        gradient2: "#ffb74d",
        gradient3: "#ffd54f",
        ringColor: "#ff6b35",
        innerDot: "#ffffff"
      }
    : {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#a8edea", 
        gradient1: "#f093fb",
        gradient2: "#f5576c",
        gradient3: "#4facfe",
        ringColor: "#667eea",
        innerDot: "#ffffff"
      };

  return (
    <>
      {/* Большое облако */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[0]"
        style={{
          translateX: cloudX,
          translateY: cloudY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? "700px" : "600px",
          height: isHovering ? "700px" : "600px",
          borderRadius: "50%",
          filter: "blur(90px)",
          opacity: 0.9,
          transition: "width 0.4s ease, height 0.4s ease",
        }}
        animate={{
          background: [
            `radial-gradient(circle at center, ${colors.primary}80 0%, ${colors.secondary}60 30%, ${colors.accent}40 70%)`,
            `radial-gradient(circle at center, ${colors.secondary}80 0%, ${colors.accent}60 30%, ${colors.gradient1}40 70%)`,
            `radial-gradient(circle at center, ${colors.accent}80 0%, ${colors.gradient1}60 30%, ${colors.gradient2}40 70%)`,
            `radial-gradient(circle at center, ${colors.gradient1}80 0%, ${colors.gradient2}60 30%, ${colors.gradient3}40 70%)`,
            `radial-gradient(circle at center, ${colors.primary}80 0%, ${colors.secondary}60 30%, ${colors.accent}40 70%)`
          ],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
      />

      {/* Среднее облако */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[0]"
        style={{
          translateX: cloudX,
          translateY: cloudY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? "450px" : "400px",
          height: isHovering ? "450px" : "400px",
          borderRadius: "50%",
          filter: "blur(50px)",
          opacity: 0.9,
          transition: "width 0.3s ease, height 0.3s ease",
        }}
        animate={{
          background: [
            `radial-gradient(circle at center, ${colors.secondary}70 0%, ${colors.accent}50 60%, transparent 85%)`,
            `radial-gradient(circle at center, ${colors.accent}70 0%, ${colors.gradient1}50 60%, transparent 85%)`,
            `radial-gradient(circle at center, ${colors.gradient1}70 0%, ${colors.gradient2}50 60%, transparent 85%)`,
            `radial-gradient(circle at center, ${colors.gradient2}70 0%, ${colors.primary}50 60%, transparent 85%)`,
            `radial-gradient(circle at center, ${colors.secondary}70 0%, ${colors.accent}50 60%, transparent 85%)`
          ],
          opacity: [0.8, 0.9, 0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />

      {/* Малое облако */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[0]"
        style={{
          translateX: followerX,
          translateY: followerY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? "250px" : "200px",
          height: isHovering ? "250px" : "200px",
          borderRadius: "50%",
          filter: "blur(30px)",
          opacity: 0.9,
          transition: "width 0.2s ease, height 0.2s ease",
        }}
        animate={{
          background: [
            `radial-gradient(circle at center, ${colors.accent}75 0%, ${colors.gradient1}55 70%, transparent 90%)`,
            `radial-gradient(circle at center, ${colors.gradient1}75 0%, ${colors.gradient2}55 70%, transparent 90%)`,
            `radial-gradient(circle at center, ${colors.gradient2}75 0%, ${colors.gradient3}55 70%, transparent 90%)`,
            `radial-gradient(circle at center, ${colors.gradient3}75 0%, ${colors.primary}55 70%, transparent 90%)`,
            `radial-gradient(circle at center, ${colors.accent}75 0%, ${colors.gradient1}55 70%, transparent 90%)`
          ],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />

      {/* Светящееся кольцо */}
      {/* <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[1]"
        style={{
          translateX: followerX,
          translateY: followerY,
          x: "-50%",
          y: "-50%",
          width: isHovering ? "48px" : "32px",
          height: isHovering ? "48px" : "32px",
          borderRadius: "50%",
          border: `2px solid ${colors.ringColor}`,
          background: "transparent",
          boxShadow: `0 0 20px ${colors.primary}, inset 0 0 20px ${colors.primary}`,
          transition: "all 0.3s ease",
        }}
        animate={{
          borderColor: [colors.primary, colors.secondary, colors.accent, colors.gradient1, colors.primary],
          boxShadow: [
            `0 0 20px ${colors.primary}, inset 0 0 20px ${colors.primary}`,
            `0 0 20px ${colors.secondary}, inset 0 0 20px ${colors.secondary}`,
            `0 0 20px ${colors.accent}, inset 0 0 20px ${colors.accent}`,
            `0 0 20px ${colors.gradient1}, inset 0 0 20px ${colors.gradient1}`,
            `0 0 20px ${colors.primary}, inset 0 0 20px ${colors.primary}`
          ],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      /> */}

      {/* Центральная точка */}
      {/* <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[2]"
        style={{
          translateX: followerX,
          translateY: followerY,
          x: "-50%",
          y: "-50%",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: colors.innerDot,
          boxShadow: `0 0 8px ${colors.primary}`,
        }}
        animate={{
          boxShadow: [
            `0 0 8px ${colors.primary}`,
            `0 0 12px ${colors.secondary}`,
            `0 0 8px ${colors.accent}`,
            `0 0 10px ${colors.gradient1}`,
            `0 0 8px ${colors.primary}`
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }} */}
      {/* /> */}
    </>
  );
};