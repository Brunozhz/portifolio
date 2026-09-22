"use client";

import dynamic from "next/dynamic";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import SectionReveal from "@/components/SectionReveal";

const SystemCanvas = dynamic(() => import("@/components/SystemCanvas"), {
  ssr: false,
  loading: () => <div className="system-canvas-skeleton" aria-hidden="true" />
});

export default function SystemScrollSection({ content }) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (shouldReduceMotion) return;
    const next = Math.min(content.steps.length - 1, Math.floor(value * content.steps.length));
    setActiveStep(next);
  });

  return (
    <section ref={sectionRef} id="system-map" className="system-map-section relative px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="system-map-heading max-w-3xl">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.6rem]">{content.title}</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-inkSoft sm:text-lg">{content.intro}</p>
        </SectionReveal>

        <div className="system-map-layout mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] lg:gap-20">
          <div className="system-visual-sticky">
            <SystemCanvas scrollProgress={scrollYProgress} reducedMotion={shouldReduceMotion} />
            <div className="system-visual-caption">
              <span>{content.caption}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-champagne">{String(activeStep + 1).padStart(2, "0")} / {String(content.steps.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="system-step-list">
            {content.steps.map((step, index) => (
              <article key={step.label} className={"system-step " + (activeStep === index ? "is-active" : "")}>
                <div className="system-step-marker" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">{step.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-inkSoft sm:text-base">{step.text}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-inkMute">
                    {step.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
