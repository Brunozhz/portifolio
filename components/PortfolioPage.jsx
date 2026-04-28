"use client";

import { useEffect, useMemo, useState } from "react";
import { getPortfolioContent } from "@/lib/content";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import GalaxyBackground from "@/components/GalaxyBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollProgress from "@/components/ScrollProgress";
import ServicesSection from "@/components/ServicesSection";
import SpotlightReveal from "@/components/SpotlightReveal";
import TechStackSection from "@/components/TechStackSection";

export default function PortfolioPage() {
  const [language, setLanguage] = useState("en");
  const content = useMemo(() => getPortfolioContent(language), [language]);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");

    if (savedLanguage) {
      setLanguage(savedLanguage);
      return;
    }

    const browserLanguage = window.navigator.language.slice(0, 2).toLowerCase();
    if (["en", "de", "fr", "it", "pt"].includes(browserLanguage)) {
      setLanguage(browserLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  return (
    <main className="relative min-h-screen bg-night text-pearl">
      <ScrollProgress />
      <GalaxyBackground />
      <SpotlightReveal />
      <Header content={content.header} language={language} onLanguageChange={setLanguage} />
      <HeroSection content={content.hero} />
      <AboutSection content={content.about} />
      <ServicesSection content={content.services} />
      <ProcessSection />
      <TechStackSection content={content.technologies} />
      <ContactSection content={content.contact} />
    </main>
  );
}
