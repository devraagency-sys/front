import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useTranslations } from "next-intl";

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const t = useTranslations("");

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={clsx(
        "relative  z-50 min-h-screen flex items-center justify-center overflow-hidden",
        theme === "dark" ? "" : ""
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.6 - i * 0.1, 1, 0.6 - i * 0.1],
              scale: [1, 1.2 + i * 0.1, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i - 1,
            }}
            className={clsx(
              "absolute w-1 h-1 rounded-full",
              theme === "dark" ? "bg-white" : "bg-gray-600",
              {
                "top-1/4 left-1/4": i === 1,
                "top-1/3 right-1/3": i === 2,
                "bottom-1/3 left-1/2": i === 3,
                "top-2/3 right-1/4": i === 4,
              }
            )}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative max-w-6xl mx-auto px-6 text-center z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className={clsx(
            "inline-flex items-center space-x-2 bg-white/5 border rounded-full px-6 py-3 mb-12 backdrop-blur-sm",
            theme === "dark" ? "border-white/10" : "border-gray-200"
          )}
        >
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          <span
            className={clsx(
              "text-sm text-gray-300 font-medium tracking-wide",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}
          >
            {t("hero.tagline")}
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className={clsx(
            "text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight tracking-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          <span>{t("hero.titleLine1")}</span>
          <br /> <span>{t("hero.titleLine2")}</span>
        </motion.h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            opacity: { delay: 0.8, duration: 0.5 },
            y: { delay: 0.8, duration: 0.5 },
          }}
          onClick={scrollToContact}
          className={clsx(
            "inline-flex items-center space-x-2 px-8 cursor-pointer py-4 rounded-full font-medium group transition-colors duration-200",
            theme === "dark"
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          )}
        >
          <span>{t("hero.buttonFOC")}</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-20 left-20 hidden lg:block max-w-xs text-left"
      >
        <p
          className={clsx(
            "text-lg leading-relaxed",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}
        >
          <span>{t("hero.bottomText")}</span>
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
      >
        <div
          className={clsx(
            "text-[20rem] font-bold text-center leading-none select-none",
            theme === "dark" ? "text-white/5" : "text-gray-200"
          )}
        >
          RA AGENCY
        </div>
      </motion.div>
    </section>
  );
};
