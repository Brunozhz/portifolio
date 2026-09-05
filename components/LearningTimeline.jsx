"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/SectionReveal";

export default function LearningTimeline({ content }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 70%"] });
  const rawHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const height = useSpring(rawHeight, { stiffness: 90, damping: 24 });

  return (
    <section ref={ref} id="learning" className="relative px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionReveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2 className="mt-2 font-display text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">{content.title}</h2>
          <p className="mt-7 max-w-md text-lg leading-8 text-inkSoft">{content.text}</p>
        </SectionReveal>

        <div className="relative pl-10 sm:pl-16">
          <span className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 sm:left-[15px]" />
          <motion.span style={{ height }} className="absolute left-[6px] top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-champagne via-violet to-cyan shadow-[0_0_18px_rgba(216,199,154,0.45)] sm:left-[14px]" />
          {content.steps.map((step, index) => (
            <motion.div key={step} initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: 0.03 * index }} className="relative border-b border-white/8 py-7 sm:py-9">
              <span className="absolute -left-[2.55rem] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-night bg-champagne shadow-[0_0_16px_rgba(216,199,154,0.6)] sm:-left-[3.45rem]" />
              <div className="flex items-baseline gap-5"><span className="font-mono text-[10px] text-inkMute">{String(index + 1).padStart(2, "0")}</span><h3 className="font-display text-2xl font-bold tracking-tight text-pearl sm:text-4xl">{step}</h3></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
