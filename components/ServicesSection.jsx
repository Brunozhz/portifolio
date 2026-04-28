"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import SectionReveal from "@/components/SectionReveal";
import ServiceCard from "@/components/ServiceCard";
import SplitText from "@/components/SplitText";

export default function ServicesSection({ content }) {
  const ref = useRef(null);

  return (
    <section ref={ref} id="services" className="relative px-5 py-32 sm:px-6 lg:px-8">

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2 className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
            <SplitText text={content.title} className="text-aurora-cool" staggerWords={0.06} startY={28} />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-inkSoft">
            {content.subtitle}
          </p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-champagne to-transparent" />
        </SectionReveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {content.items.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Number row callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-3"
        >
          {[
            { v: "08", l: "Service Verticals" },
            { v: "100%", l: "Remote Delivery" },
            { v: "5", l: "Languages Spoken" }
          ].map((s) => (
            <div
              key={s.l}
              className="relative bg-night/40 px-8 py-10 text-center backdrop-blur-xl"
            >
              <p className="font-display text-5xl font-bold tracking-[-0.04em] text-pearl">{s.v}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.28em] text-inkMute">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
