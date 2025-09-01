"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useTranslations } from "next-intl";

export const About: React.FC = () => {
  const { theme } = useTheme();
  const t = useTranslations("about");

  const lines = t.raw("lines") as string[];

  return (
    <section
      id="about"
      className={clsx(
        "relative py-24 overflow-hidden",
        theme === "dark" ? "" : ""
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={clsx(
            "text-4xl md:text-5xl font-light mb-4 leading-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          {t("title")}
        </motion.h2>

        {/* Divider */}
        <div
          className={clsx(
            "mx-auto mb-10 h-1 w-20 rounded-full",
            theme === "dark" ? "bg-amber-500" : "bg-amber-600"
          )}
        />

        {/* Description Lines */}
        <div className="space-y-5 text-lg leading-relaxed">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={clsx(
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};
