"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const locales = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "ua", label: "UA" },
];

export const LanguageSwitcher: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLocale = pathname.split("/")[1] || "en";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (code: string) => {
    setIsOpen(false);
    if (code === currentLocale) return;
    const segments = pathname.split("/");
    segments[1] = code;
    const newPathname = segments.join("/");

    const search = searchParams.toString();
    const url = search ? `${newPathname}?${search}` : newPathname;

    router.push(url);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={clsx(
        "relative inline-block text-left select-none",
        theme === "dark" ? "text-white" : "text-gray-900"
      )}
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        type="button"
        className={clsx(
          "inline-flex justify-center items-center w-16 px-3 py-1 rounded-md shadow-sm focus:outline-none transition-colors duration-200",
          theme === "dark"
            ? "bg-black hover:bg-amber-600"
            : "bg-white hover:bg-amber-400"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {locales.find((l) => l.code === currentLocale)?.label}
        <svg
          className={clsx(
            "ml-2 h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className={clsx(
            "absolute mt-1 w-16 rounded-md shadow-lg z-20",
            theme === "dark" ? "bg-black" : "bg-white"
          )}
        >
          {locales.map(({ code, label }) => (
            <li key={code}>
              <button
                onClick={() => handleSelect(code)}
                className={clsx(
                  "w-full text-left px-3 py-2 text-sm hover:bg-amber-400 hover:text-white transition-colors duration-150",
                  code === currentLocale
                    ? theme === "dark"
                      ? "bg-amber-600 text-white cursor-default"
                      : "bg-amber-400 text-white cursor-default"
                    : ""
                )}
                disabled={code === currentLocale}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
