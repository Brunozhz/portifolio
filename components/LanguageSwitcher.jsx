"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { languageOptions } from "@/lib/content";

export default function LanguageSwitcher({ language, onChange, align = "right", ariaLabel = "Select language" }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const currentLanguage = languageOptions.find((item) => item.code === language) ?? languageOptions[0];

  useEffect(() => {
    const handleClick = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-pearl transition hover:border-champagne/40 hover:bg-white/[0.08]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe2 className="h-4 w-4 text-champagne" aria-hidden="true" />
        <span>{currentLanguage.short}</span>
        <ChevronDown className={`h-4 w-4 text-inkMute transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute top-[3.25rem] z-50 w-52 rounded-2xl border border-white/10 bg-night/95 p-2 shadow-card backdrop-blur-2xl ${
              align === "left" ? "left-0" : "right-0"
            }`}
            role="listbox"
            aria-label={ariaLabel}
          >
            {languageOptions.map((item) => {
              const isSelected = item.code === language;

              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(item.code);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-inkSoft transition hover:bg-white/[0.05] hover:text-pearl"
                >
                  <span>{item.label}</span>
                  {isSelected ? <Check className="h-4 w-4 text-champagne" aria-hidden="true" /> : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
