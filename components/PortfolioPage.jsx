"use client";

import dynamic from "next/dynamic";
import { getPortfolioContent } from "@/lib/content";
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

const GalaxyBackground = dynamic(() => import("@/components/GalaxyBackground"), { ssr: false });
const SpotlightReveal = dynamic(() => import("@/components/SpotlightReveal"), { ssr: false });
export default function PortfolioPage() {
  const content = getPortfolioContent("en");

  return (
    <main className="relative min-h-screen bg-night text-pearl">
      <ScrollProgress />
      <GalaxyBackground />
      <SpotlightReveal />
      <Header content={content.header} />
      <HeroSection content={content.hero} />
      <AboutSection content={content.about} />
      <SelectedWorkSection />
      <LearningTimeline />
      <ServicesSection content={content.services} />
      <TechStackSection content={content.technologies} />
      <ContactSection content={content.contact} />
      <CommandPalette />
    </main>
  );
}
