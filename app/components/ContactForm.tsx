"use client";

import toast from "react-hot-toast";
import React, { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useTranslations } from "next-intl";

export const ContactForm: React.FC = () => {
  const { theme } = useTheme();
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });

  const [contactMethod, setContactMethod] = useState<"email" | "telegram">(
    "telegram"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.contact ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error(t("errorFillAll"));
      return;
    }

    try {
      const response = await fetch(
        "https://back-production-fe07.up.railway.app/form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            contact: formData.contact,
            method: contactMethod,
            theme: formData.subject,
            message: formData.message,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success(t("success"));
        setFormData({ name: "", contact: "", subject: "", message: "" });
      } else {
        toast.error("Error: " + result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("submitError"));
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
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

      {/* Form Content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={clsx(
            "text-4xl md:text-6xl font-light mb-16 leading-tight",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}
        >
          {t("title")}
        </motion.h2>

        {/* Method Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setContactMethod("telegram")}
            className={clsx(
              "px-4 py-2 rounded-full border cursor-pointer transition-all duration-200 ease-in-out hover:bg-amber-500",
              contactMethod === "telegram"
                ? "bg-amber-400 text-white"
                : "bg-transparent",
              theme === "dark"
                ? "border-white/10 text-white"
                : "border-gray-300/40 text-gray-700"
            )}
          >
            Telegram
          </button>

          <button
            type="button"
            onClick={() => setContactMethod("email")}
            className={clsx(
              "px-4 py-2 rounded-full border cursor-pointer transition-all duration-200 ease-in-out hover:bg-amber-500",
              contactMethod === "email"
                ? "bg-amber-400 text-white"
                : "bg-transparent",
              theme === "dark"
                ? "border-white/10 text-white"
                : "border-gray-300/40 text-gray-700"
            )}
          >
            Email
          </button>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder={t("name")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className={clsx(
              "w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400 transition backdrop-blur-sm",
              theme === "dark"
                ? "bg-gray-900/50 border-gray-700 text-white placeholder:text-white/60"
                : "bg-white/70 border-gray-200 text-gray-900 placeholder:text-gray-500"
            )}
          />

          <input
            type="text"
            placeholder={contactMethod === "email" ? t("email") : t("telegram")}
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
            required
            className={clsx(
              "w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400 transition backdrop-blur-sm",
              theme === "dark"
                ? "bg-gray-900/50 border-gray-700 text-white placeholder:text-white/60"
                : "bg-white/70 border-gray-200 text-gray-900 placeholder:text-gray-500"
            )}
          />

          <input
            type="text"
            placeholder={t("subject")}
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
            className={clsx(
              "w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400 transition backdrop-blur-sm",
              theme === "dark"
                ? "bg-gray-900/50 border-gray-700 text-white placeholder:text-white/60"
                : "bg-white/70 border-gray-200 text-gray-900 placeholder:text-gray-500"
            )}
          />

          <textarea
            placeholder={t("message")}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            rows={6}
            className={clsx(
              "w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none backdrop-blur-sm",
              theme === "dark"
                ? "bg-gray-900/50 border-gray-700 text-white placeholder:text-white/60"
                : "bg-white/70 border-gray-200 text-gray-900 placeholder:text-gray-500"
            )}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              "px-8 py-4 rounded-full cursor-pointer font-medium transition-colors",
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-50"
                : "bg-gray-900 text-white hover:bg-gray-800"
            )}
          >
            {t("send")}
          </motion.button>

          <div>
            <motion.a
              href="https://t.me/your_bot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full cursor-pointer text-white font-medium transition-colors bg-amber-400"
            >
              {t("writeToBot")}
            </motion.a>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
