"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Send, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({ content, language, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Floating pill nav (desktop) */}
      <div className="pointer-events-none mx-auto flex w-full max-w-7xl items-start justify-between gap-3 px-4 pt-5 sm:px-6 lg:px-8">
        {/* Brand pill */}
        <motion.a
          href="#home"
          aria-label={content.aria.home}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className="pointer-events-auto group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-2xl transition hover:border-champagne/40 hover:bg-white/[0.08]"
        >
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight text-pearl">Bruno Elias</span>
            <span className="font-display text-[10px] font-medium uppercase tracking-[0.22em] text-inkMute">Atelier</span>
          </span>
        </motion.a>

        {/* Center floating pill nav */}
        <motion.nav
          aria-label={content.aria.primary}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto hidden items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-2xl transition-all duration-500 lg:flex ${
            scrolled
              ? "border-white/15 bg-night/65 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
              : "border-white/8 bg-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
          }`}
        >
          {content.navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-tight text-inkSoft transition hover:text-pearl"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 -z-0 rounded-full bg-white/[0.08] opacity-0 transition group-hover:opacity-100" />
            </a>
          ))}
        </motion.nav>

        {/* Right side: language + contact pill */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center gap-2"
        >
          <div className="hidden lg:block">
            <LanguageSwitcher language={language} onChange={onLanguageChange} ariaLabel={content.aria.language} />
          </div>

          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-5 py-2.5 text-[13px] font-bold tracking-tight text-champagne backdrop-blur-2xl transition hover:border-champagne/60 hover:bg-champagne/20 hover:shadow-[0_0_30px_rgba(216,199,154,0.35)] lg:inline-flex"
          >
            <Send className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            {content.contact}
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-pearl backdrop-blur-2xl transition hover:border-champagne/40 hover:bg-white/[0.10] lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? content.aria.close : content.aria.open}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto mx-4 mt-3 rounded-3xl border border-white/10 bg-night/95 p-4 shadow-card backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label={content.aria.mobile}>
              {content.navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-base font-bold text-pearl"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <LanguageSwitcher
                  language={language}
                  onChange={onLanguageChange}
                  align="left"
                  ariaLabel={content.aria.language}
                />
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-pearl px-5 py-3 text-sm font-bold text-night"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {content.contact}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
