"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { getPortfolioContent } from "@/lib/content";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollProgress from "@/components/ScrollProgress";
import ServicesSection from "@/components/ServicesSection";
import TechStackSection from "@/components/TechStackSection";

const GalaxyBackground = dynamic(() => import("@/components/GalaxyBackground"), { ssr: false });
const SpotlightReveal = dynamic(() => import("@/components/SpotlightReveal"), { ssr: false });
const SUPPORTED_LANGUAGES = ["en", "de", "fr", "it", "pt"];

export default function PortfolioPage() {
  const [language, setLanguage] = useState("en");
  const content = useMemo(() => getPortfolioContent(language), [language]);

  useEffect(() => {
    let savedLanguage = null;
    try {
      savedLanguage = window.localStorage.getItem("portfolio-language");
    } catch {
      savedLanguage = null;
    }

    if (SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      setLanguage(savedLanguage);
      return;
    }

    const browserLanguage = window.navigator.language.slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
      setLanguage(browserLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {
      // Some privacy modes disable localStorage; language still works for the session.
    }
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
      <ProcessSection content={content.process} />
      <TechStackSection content={content.technologies} />
      <ContactSection content={content.contact} />
    </main>
  );
}
