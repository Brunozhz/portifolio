"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import LiveAge from "@/components/LiveAge";
import SectionReveal from "@/components/SectionReveal";

export default function StorySection({ content }) {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-34, 34]);

  return (
    <section id="story" className="story-section relative px-5 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-end">
          <div>
            <span className="section-eyebrow">{content.eyebrow}</span>
            <h2 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.038em] text-white sm:text-5xl lg:text-[3.55rem]">
              {content.title}
            </h2>
          </div>
          <div className="story-intro pb-1 lg:border-l lg:border-white/10 lg:pl-8">
            <p className="text-base leading-8 text-inkSoft sm:text-lg">{content.lead}</p>
            <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">
              {content.ageLabel} · <LiveAge suffix={content.ageSuffix} />
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-16">
          <figure ref={imageRef} className="story-photograph relative overflow-hidden">
            <motion.div style={{ y: imageY }} className="absolute -inset-y-10 inset-x-0">
              <Image
                src="/images/learning-workbench.webp"
                alt={content.imageAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
            </motion.div>
            <figcaption className="absolute bottom-0 left-0 z-10 max-w-xl p-5 text-sm leading-6 text-pearl/85 sm:p-7">
              {content.imageCaption}
            </figcaption>
          </figure>
        </SectionReveal>

        <div className="mt-20 border-b border-white/10">
          {content.chapters.map((chapter, index) => (
            <motion.article
              key={chapter.marker}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
              className="story-chapter grid gap-5 border-t border-white/10 py-10 sm:py-12 lg:grid-cols-[9rem_minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:gap-10"
            >
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">
                {String(index + 1).padStart(2, "0")} / {chapter.marker}
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[1.75rem]">
                {chapter.title}
              </h3>
              <p className="max-w-2xl text-[15px] leading-8 text-inkSoft sm:text-base">{chapter.text}</p>
            </motion.article>
          ))}
        </div>

        <SectionReveal className="story-ending mt-20 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-20">
          <div>
            <span aria-hidden="true" className="font-display text-7xl leading-none text-champagne/30">“</span>
            <blockquote className="-mt-6 max-w-4xl font-display text-3xl font-semibold leading-[1.16] tracking-[-0.03em] text-white sm:text-4xl">
              {content.quote}
            </blockquote>
            <p className="mt-8 max-w-2xl text-base leading-8 text-inkSoft">{content.closing}</p>
          </div>
          <aside className="border-t border-champagne/35 pt-6 lg:mt-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">{content.outsideLabel}</p>
            <p className="mt-5 text-base leading-8 text-inkSoft">{content.outside}</p>
          </aside>
        </SectionReveal>
      </div>
    </section>
  );
}
