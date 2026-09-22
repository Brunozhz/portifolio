"use client";

import { getPortfolioContent } from "@/lib/content";
import { getShowcaseContent } from "@/lib/showcaseI18n";
import { getStoryContent } from "@/lib/storyI18n";
import { languageOptions } from "@/lib/portfolioI18n";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import SectionSkeleton from "@/components/SectionSkeleton";
import WebVitals from "@/components/WebVitals";

const StorySection = dynamic(() => import("@/components/StorySection"), {
  loading: () => <SectionSkeleton id="story" label="Loading Bruno's story" />
});
const SelectedWorkSection = dynamic(() => import("@/components/SelectedWorkSection"), {
  loading: () => <SectionSkeleton id="work" label="Loading selected projects" />
});
const TechStackSection = dynamic(() => import("@/components/TechStackSection"), {
  loading: () => <SectionSkeleton id="technologies" label="Loading technologies" />
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <SectionSkeleton id="contact" label="Loading contact details" />
});
const SystemScrollSection = dynamic(() => import("@/components/SystemScrollSection"), {
  loading: () => <SectionSkeleton id="system-map" label="Loading system map" />
});

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
      <WebVitals />
      <ScrollProgress />
      <Header content={content.header} language={language} onLanguageChange={setLanguage} />
      <HeroSection content={content.hero} />
      <SystemScrollSection content={content.systemMap} />
      <StorySection content={story} />
      <SelectedWorkSection content={showcase.work} />
      <TechStackSection content={content.technologies} />
      <ContactSection content={content.contact} />
    </main>
  );
}
