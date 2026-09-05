"use client";

import { getPortfolioContent } from "@/lib/content";
import { getShowcaseContent } from "@/lib/showcaseI18n";
import { languageOptions } from "@/lib/portfolioI18n";
import { useEffect, useMemo, useState } from "react";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import LearningTimeline from "@/components/LearningTimeline";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import ServicesSection from "@/components/ServicesSection";
import TechStackSection from "@/components/TechStackSection";

export default function PortfolioPage() {
  const [language, setLanguage] = useState("en");
  const content = useMemo(() => getPortfolioContent(language), [language]);
  const showcase = useMemo(() => getShowcaseContent(language), [language]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-language");
      if (languageOptions.some((item) => item.code === saved)) {
        setLanguage(saved);
        return;
      }
      const browserLocale = window.navigator.language.toLowerCase();
      const detected = browserLocale.startsWith("fr") ? "fr" : browserLocale.startsWith("pt") ? "pt" : browserLocale.startsWith("it") ? "it" : browserLocale.startsWith("de") ? "de" : "en";
      setLanguage(detected);
    } catch { /* The English default remains available without localStorage. */ }
  }, []);

  useEffect(() => {
    const option = languageOptions.find((item) => item.code === language);
    document.documentElement.lang = option?.htmlLang ?? "en";
    try { window.localStorage.setItem("portfolio-language", language); } catch { /* optional */ }
  }, [language]);

  return (
    <main className="portfolio-editorial relative min-h-screen text-pearl">
      <ScrollProgress />
      <Header content={content.header} language={language} onLanguageChange={setLanguage} />
      <HeroSection content={content.hero} />
      <AboutSection content={content.about} />
      <SelectedWorkSection content={showcase.work} />
      <LearningTimeline content={content.learning} />
      <ServicesSection content={content.services} />
      <TechStackSection content={content.technologies} />
      <ContactSection content={content.contact} />
      <CommandPalette content={showcase.command} />
    </main>
  );
}
