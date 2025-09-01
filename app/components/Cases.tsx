/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslations, useLocale } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";

export const Cases: React.FC = () => {
  const { theme } = useTheme();
  const swiperRef = useRef<any>(null);
  const t = useTranslations("cases");
  const locale = useLocale(); // Получаем текущую локаль: 'en', 'ua', 'ru'

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("https://back-production-fe07.up.railway.app/cases");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("❌ Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Вспомогательная функция для получения текста по локали
  const getLocalized = (item: any, key: string) => {
    const localizedKey = `${key}_${locale}`;
    return item[localizedKey] || item[`${key}_en`] || "";
  };

  return (
    <section
      id="cases"
      className={clsx("relative py-24 overflow-hidden", theme === "dark" ? "" : "")}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
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

        {loading ? (
          <div className="text-center text-gray-500">Завантаження...</div>
        ) : (
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            loop={true}
            spaceBetween={30}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="max-w-3xl mx-auto"
          >
            {projects.map((project: any, index: number) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={clsx(
                    "p-8 rounded-2xl border shadow-xl backdrop-blur-sm",
                    theme === "dark"
                      ? "bg-gray-900/70 border-gray-700"
                      : "bg-white/80 border-gray-200"
                  )}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <img
                      width={80}
                      height={80}
                      src={project.img}
                      alt={getLocalized(project, "title")}
                      className="w-20 h-20 object-contain rounded-full"
                      />
                    <h3
                      className={clsx(
                        "text-2xl font-bold",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}
                    >
                      {getLocalized(project, "title")}
                    </h3>
                    <div
                      className={clsx(
                        "text-base max-w-xl space-y-2 text-center",
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}
                    >
                      <p>{getLocalized(project, "budget")}</p>
                      <p>{getLocalized(project, "users")}</p>
                      <p>{getLocalized(project, "geo")}</p>
                      <p>{getLocalized(project, "cpi")}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex justify-between mt-6 max-w-3xl mx-auto">
          <button
            onClick={goPrev}
            className={clsx(
              "px-4 py-2 cursor-pointer rounded-full transition-colors duration-200",
              theme === "dark"
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            )}
          >
            {t("prev", { default: "← Попередній" })}
          </button>
          <button
            onClick={goNext}
            className={clsx(
              "px-4 py-2 cursor-pointer rounded-full transition-colors duration-200",
              theme === "dark"
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            )}
          >
            {t("next", { default: "Наступний →" })}
          </button>
        </div>
      </div>
    </section>
  );
};
