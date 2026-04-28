"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/SectionReveal";
import TiltCard from "@/components/TiltCard";
import SplitText from "@/components/SplitText";

export default function AboutSection({ content }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} id="about" className="relative px-5 py-32 sm:px-6 lg:px-8">

      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div style={{ y: yTitle }}>
          <SectionReveal>
            <span className="section-eyebrow">{content.eyebrow}</span>
            <h2 className="mt-2 max-w-xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
              <SplitText text={content.title} className="text-aurora" staggerWords={0.06} startY={28} />
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <span className="aurora-divider h-px w-24" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-champagne">Brazilian craftsman, global mind</span>
            </div>

            <div className="mt-10 hidden lg:block">
              <div className="space-y-5 border-l border-white/10 pl-6">
                {[
                  { label: "Discipline", value: "Technical & Creative" },
                  { label: "Method", value: "Iterative · Measurable" },
                  { label: "Reach", value: "Remote · Worldwide" }
                ].map((item) => (
                  <div key={item.label} className="text-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-inkMute">
                      {item.label}
                    </p>
                    <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-pearl">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </motion.div>

        <div className="space-y-10">
          <SectionReveal className="space-y-6 text-base font-medium leading-8 text-inkSoft sm:text-lg">
            {content.paragraphs.map((paragraph, idx) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={idx === 0 ? "first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:text-champagne first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:mt-1" : ""}
              >
                {paragraph}
              </motion.p>
            ))}
          </SectionReveal>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {content.highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, y: 18, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard
                  intensity={6}
                  className="glass-surface premium-border relative overflow-hidden rounded-2xl px-5 py-5 text-sm font-bold text-inkSoft"
                >
                  <span className="mb-3 block h-px w-10 bg-gradient-to-r from-champagne to-transparent" />
                  <span className="text-pearl">{highlight}</span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 font-display text-xs font-bold tracking-tight text-inkMute"
                  >
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
