"use client";

import { motion } from "framer-motion";
import LiveAge from "@/components/LiveAge";
import SectionReveal from "@/components/SectionReveal";

const nodes = ["AI", "BUSINESS", "AUTOMATION", "APIs", "PRODUCT", "DATA", "MARKETING"];

export default function PersonalSection({ content, ageSuffix }) {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionReveal className="portrait-stage group relative min-h-[32rem] overflow-hidden rounded-3xl border border-white/10">
          <div className="portrait-placeholder absolute inset-8 grid place-items-center border border-dashed border-white/15">
            <div className="text-center"><span className="font-display text-7xl font-bold text-white/10">BS</span><p className="mt-3 font-mono text-[9px] tracking-[0.24em] text-inkMute">{content.photo}</p></div>
          </div>
          {nodes.map((node, index) => <motion.span key={node} className={`portrait-node portrait-node-${index + 1}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.15 + index * 0.05 }}>{node}</motion.span>)}
        </SectionReveal>
        <SectionReveal>
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2 className="mt-3 font-display text-5xl font-bold leading-[0.98] text-white sm:text-7xl">{content.title}</h2>
          <div className="mt-7 inline-flex rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-champagne"><LiveAge suffix={ageSuffix} /> · Navegantes / SC / Brazil</div>
          <p className="mt-7 text-lg leading-8 text-inkSoft">{content.text}</p>
          <blockquote className="mt-8 border-l-2 border-champagne pl-5 font-display text-xl font-semibold leading-8 text-pearl">“{content.quote}”</blockquote>
          <div className="mt-8 flex flex-wrap gap-2">{content.values.map((value) => <span key={value} className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-inkSoft">{value}</span>)}</div>
        </SectionReveal>
      </div>
    </section>
  );
}
