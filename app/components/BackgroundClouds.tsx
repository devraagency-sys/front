"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export const BackgroundClouds = () => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false); // ✨

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cloudX = useSpring(cursorX, { damping: 25, stiffness: 100 });
  const cloudY = useSpring(cursorY, { damping: 25, stiffness: 100 });

  // Проверка мобильности
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Отложенная активация фона
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1500); // ⏱️ отложим запуск на 1.5 сек

    return () => clearTimeout(timeout);
  }, []);

  // Движение курсора
  useEffect(() => {
    if (isMobile) return;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, isMobile]);

  const colors = theme === "dark"
    ? {
        primary: "#ff6b35",
        secondary: "#f7931e",
        accent: "#ffcd3c",
      }
    : {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#a8edea",
      };

  // ⛔ Пока не готов — не рендерим
  if (!isReady) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Главное облако */}
      <motion.div
        className="absolute w-[600px] h-[600px]"
        style={{
          borderRadius: "50%",
          filter: "blur(60px)", // 🔽 снизим с 120
          willChange: "transform, background",
        }}
        animate={{
          x: ["10vw", "70vw", "30vw", "50vw", "10vw"],
          y: ["15vh", "70vh", "40vh", "80vh", "15vh"],
          background: [
            `radial-gradient(circle, ${colors.primary}90 0%, ${colors.secondary}60 50%, transparent 100%)`,
            `radial-gradient(circle, ${colors.secondary}90 0%, ${colors.accent}60 50%, transparent 100%)`,
            `radial-gradient(circle, ${colors.accent}90 0%, ${colors.primary}60 50%, transparent 100%)`,
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      {/* Маленькое облачко с курсором */}
      {!isMobile && (
        <motion.div
          className="absolute w-[400px] h-[400px]"
          style={{
            left: cloudX,
            top: cloudY,
            x: "-50%",
            y: "-50%",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
          animate={{
            background: [
              `radial-gradient(circle, ${colors.primary}80 0%, ${colors.secondary}50%, transparent 100%)`,
              `radial-gradient(circle, ${colors.secondary}80 0%, ${colors.accent}50%, transparent 100%)`,
              `radial-gradient(circle, ${colors.accent}80 0%, ${colors.primary}50%, transparent 100%)`,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};
