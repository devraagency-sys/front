"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useTranslations } from "next-intl";
import { Megaphone, FileText, BarChart, Brain } from "lucide-react";

const icons = [Megaphone, FileText, BarChart, Brain];

export const Services: React.FC = () => {
  const { theme } = useTheme();
  const t = useTranslations("services");

  const serviceItems = t.raw("items") as {
    label: string;
    title: string;
    description: string;
  }[];

  return (
    <section
      id="services"
      className={clsx(
        "relative  py-24 overflow-hidden",
        theme === "dark" ? "" : ""
      )}
    >
      {/* Background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={clsx(
            "text-4xl md:text-5xl font-light mb-12 text-center leading-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          {t("title")}
        </motion.h2>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((service, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={clsx(
                  "group p-6 rounded-2xl border shadow-sm transition-all duration-300 cursor-default",
                  theme === "dark"
                    ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md"
                )}
              >
                <div className="flex flex-col items-start space-y-4">
                  <div
                    className={clsx(
                      "w-12 h-12 flex items-center justify-center rounded-full transition-colors",
                      theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-gray-50 text-gray-800",
                      "group-hover:scale-105"
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span
                      className={clsx(
                        "text-xs font-semibold uppercase tracking-wide",
                        theme === "dark" ? "text-amber-400" : "text-amber-600"
                      )}
                    >
                      {service.label}
                    </span>
                    <h3
                      className={clsx(
                        "text-lg font-bold mt-1",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <p
                    className={clsx(
                      "text-sm leading-relaxed",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
