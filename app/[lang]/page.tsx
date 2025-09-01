"use client";

import React from "react";
import clsx from "clsx";
import {  useTheme } from "../components/ThemeProvider";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Cases } from "../components/Cases";
import { Reviews } from "../components/Reviews";
import { ContactForm } from "../components/ContactForm";
import { AchievementsAndTeam } from "../components/AchievementsAndTeam";
import { PartnersMedia } from "../components/PartnersMedia";
import { Footer } from "../components/Footer";

export default function Home() {
  const { theme } = useTheme();

  return (
        <div
          className={clsx(
            "min-h-screen",
            theme === "dark"
              ? "bg-black text-white"
              : "bg-gray-50 text-gray-900"
          )}
        >
          <Header />
          <main>
            <Hero />
            <About />
            <Services />
            <AchievementsAndTeam />
            <Cases />
            <Reviews />
            <PartnersMedia />

            <ContactForm />
          </main>
         <Footer />
        </div>
  );
}
