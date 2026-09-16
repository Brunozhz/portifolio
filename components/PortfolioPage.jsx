"use client";

import { getPortfolioContent } from "@/lib/content";
import { getShowcaseContent } from "@/lib/showcaseI18n";
import { getStoryContent } from "@/lib/storyI18n";
import { languageOptions } from "@/lib/portfolioI18n";
import { useEffect, useMemo, useState } from "react";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import CommandPalette from "@/components/CommandPalette";
import DebugMode from "@/components/DebugMode";
import ScrollProgress from "@/components/ScrollProgress";
import StorySection from "@/components/StorySection";
import TechStackSection from "@/components/TechStackSection";

export default function PortfolioPage() {
  const [language, setLanguage] = useState("en");
  const content = useMemo(() => getPortfolioContent(language), [language]);
  const showcase = useMemo(() => getShowcaseContent(language), [language]);
  const story = useMemo(() => getStoryContent(language), [language]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-language");
      if (languageOptions.some((item) => item.code === saved)) {
        setLanguage(saved);
      }
    } catch { /* The English default remains available without localStorage. */ }
  }, []);

  useEffect(() => {
    const option = languageOptions.find((item) => item.code === language);
    document.documentElement.lang = option?.htmlLang ?? "en";
    try { window.localStorage.setItem("portfolio-language", language); } catch { /* optional */ }
  }, [language]);

  return (
    <main className="portfolio-engineering relative min-h-screen text-pearl">
      <ScrollProgress />
      <Header content={content.header} language={language} onLanguageChange={setLanguage} />
      <HeroSection content={content.hero} />
      <StorySection content={story} />
      <SelectedWorkSection content={showcase.work} />
      <TechStackSection content={content.technologies} />
      <ContactSection content={content.contact} />
      <CommandPalette content={showcase.command} />
      <DebugMode />
    </main>
  );
}
