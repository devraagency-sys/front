/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useTranslations, useLocale } from "next-intl";

type Review = {
  id: number;
  projectLogo: string;
  projectName_ua: string;
  projectName_ru: string;
  projectName_en: string;
  authorName: string;
  authorRole_ua: string;
  authorRole_ru: string;
  authorRole_en: string;
  text_ua: string;
  text_ru: string;
  text_en: string;
  createdAt: string;
};

export const Reviews: React.FC = () => {
  const { theme } = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("reviews");
  const locale = useLocale(); // 'ua' | 'ru' | 'en'

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          "https://back-production-fe07.up.railway.app/reviews"
        );
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const skeletonArray = Array(3).fill(null);

  // Вспомогательная функция
  const getLocalized = (item: any, key: string) => {
    const field = `${key}_${locale}`;
    return item[field] || item[`${key}_en`] || "";
  };

  return (
    <section
      id="reviews"
      className={clsx(
        "relative py-24 overflow-hidden",
        theme === "dark" ? "" : ""
      )}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? skeletonArray.map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center h-full animate-pulse",
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  )}
                >
                  <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 mb-4" />
                  <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-500 rounded mb-4" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-500 rounded mb-1" />
                  <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-500 rounded" />
                </div>
              ))
            : reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={clsx(
                    "p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center h-full transition-all",
                    theme === "dark"
                      ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                      : "bg-white border-gray-200 hover:shadow-md"
                  )}
                >
                  <img
                    src={review.projectLogo}
                    alt={getLocalized(review, "projectName")}
                    className="w-16 h-16 rounded-full mb-4 object-cover"
                  />
                  <h3
                    className={clsx(
                      "text-lg font-semibold mb-1",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    {review.authorName}
                  </h3>
                  <p
                    className={clsx(
                      "text-sm mb-2",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    {getLocalized(review, "authorRole")} @{" "}
                    {getLocalized(review, "projectName")}
                  </p>
                  <p
                    className={clsx(
                      "text-sm leading-relaxed italic",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}
                  >
                    “{getLocalized(review, "text")}”
                  </p>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};
