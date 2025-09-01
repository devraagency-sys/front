"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export const CustomCursor = () => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Theme changed:", theme);
    
  },[theme])
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const followerX = useSpring(cursorX, { damping: 30, stiffness: 150 });
  const followerY = useSpring(cursorY, { damping: 30, stiffness: 150 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button']")) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, [role='button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [cursorX, cursorY]);

  // Цвета для dark и light тем — rgba, чтобы точно было видно
  const colors =
    theme === "dark"
      ? {
          gradientFrom: "rgba(255, 191, 64, 0.6)", // amber-400 translucent
          gradientVia: "rgba(255, 206, 84, 0.4)", // yellow-400 translucent
          gradientTo: "rgba(255, 191, 64, 0.3)", // amber-400 translucent
          mainBg: "rgba(255, 255, 255, 0.9)", // светлый круг
          mainBorder: "rgba(255, 200, 50, 0.9)", // яркая обводка
          boxShadowHover:
            "0 0 24px 6px rgba(255, 200, 50, 0.8), 0 0 40px 12px rgba(255, 200, 50, 0.4)",
          boxShadowNormal: "0 0 10px 2px rgba(255, 200, 50, 0.5)",
        }
      : {
          // светлая тема — темный курсор
          gradientFrom: "rgba(50, 50, 50, 0.6)",
          gradientVia: "rgba(20, 20, 20, 0.5)",
          gradientTo: "rgba(0, 0, 0, 0.4)",
          mainBg: "rgba(30, 30, 30, 0.85)", // темный круг
          mainBorder: "rgba(70, 70, 70, 0.9)", // тёмная обводка
          boxShadowHover:
            "0 0 24px 6px rgba(50, 50, 50, 0.8), 0 0 40px 12px rgba(50, 50, 50, 0.4)",
          boxShadowNormal: "0 0 10px 2px rgba(50, 50, 50, 0.5)",
        };

  const dots = [
    { size: 20, opacity: 0.3, blur: 2, delay: 0 },
    { size: 14, opacity: 0.2, blur: 4, delay: 0.15 },
    { size: 8, opacity: 0.1, blur: 6, delay: 0.3 },
  ];

  return (
    <>
      {/* Хвост */}
      {dots.map(({ size, opacity, blur, delay }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed top-0 left-0 rounded-full"
          style={{
            translateX: followerX,
            translateY: followerY,
            x: "-50%",
            y: "-50%",
            width: size,
            height: size,
            opacity,
            filter: `blur(${blur}px) drop-shadow(0 0 6px rgba(0,0,0,${opacity}))`,
            zIndex: 9998,
            background: `radial-gradient(circle at center, ${colors.gradientFrom} 0%, ${colors.gradientVia} 70%, ${colors.gradientTo} 100%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [opacity, opacity * 1.2, opacity],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            delay,
          }}
        />
      ))}

      {/* Основной курсор */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          background: colors.mainBg,
          border: `2px solid ${colors.mainBorder}`,
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          boxShadow: isHovering ? colors.boxShadowHover : colors.boxShadowNormal,
          transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease",
        }}
        animate={{
          scale: isHovering ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: isHovering ? [1, 0.9, 1] : [1, 0.8, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: "easeInOut",
        }}
      />
    </>
  );
};
