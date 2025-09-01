"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Partner = {
  id: number;
  logo: string;
  link: string;
};

type Media = {
  id: number;
  logo: string;
  link: string;
};

export const PartnersMedia: React.FC = () => {
  const { theme } = useTheme();
  const t = useTranslations("partnersMedia");

  const [partners, setPartners] = useState<Partner[]>([]);
  const [visiblePartners, setVisiblePartners] = useState<Partner[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoadingPartners, setIsLoadingPartners] = useState(true);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("https://back-production-fe07.up.railway.app/partners");
        const data: Partner[] = await res.json();
        setPartners(data);
      } catch (error) {
        console.error("Ошибка при загрузке партнеров:", error);
      } finally {
        setIsLoadingPartners(false);
      }
    };

    const fetchMedia = async () => {
      try {
        const res = await fetch("https://back-production-fe07.up.railway.app/media");
        const data: Media[] = await res.json();
        setMedia(data);
      } catch (error) {
        console.error("Ошибка при загрузке медиа:", error);
      } finally {
        setIsLoadingMedia(false);
      }
    };

    fetchPartners();
    fetchMedia();
  }, []);

  useEffect(() => {
    const updateVisiblePartners = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisiblePartners(partners.slice(0, 15));
      } else {
        setVisiblePartners(partners.slice(0, 30));
      }
    };

    updateVisiblePartners();
    window.addEventListener("resize", updateVisiblePartners);
    return () => window.removeEventListener("resize", updateVisiblePartners);
  }, [partners]);

  const skeletonCount = 20;

  return (
    <section
      className={clsx(
        "max-w-7xl mx-auto px-6 py-20",
        theme === "dark" ? " text-white" : " text-gray-900"
      )}
    >
      {/* PARTNERS */}
      <h2 className="text-3xl font-semibold mb-12 text-center">
        {t("partnersTitle")}
      </h2>

      <div className="flex gap-6 items-center justify-center flex-wrap">
        {isLoadingPartners
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "w-16 h-16 rounded-full animate-pulse",
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                )}
              />
            ))
          : visiblePartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                className="flex items-center justify-center"
              >
                <a href={partner.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={partner.logo}
                    alt={`Partner ${i + 1}`}
                    className="w-16 h-16 hover:scale-110 object-cover rounded-full transition duration-300"
                  />
                </a>
              </motion.div>
            ))}
      </div>

      {/* MEDIA */}
      <h2 className="text-3xl font-semibold mt-20 mb-12 text-center">
        {t("mediaTitle")}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
        {isLoadingMedia
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "w-24 h-12 rounded animate-pulse",
                  theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                )}
              />
            ))
          : media.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    width={96}
                    height={96}
                    src={item.logo}
                    alt={`Media ${i + 1}`}
                    className="max-h-12 object-contain filter grayscale hover:filter-none transition duration-300"
                  />
                </a>
              </motion.div>
            ))}
      </div>
    </section>
  );
};
