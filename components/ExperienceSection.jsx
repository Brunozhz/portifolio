"use client";

import { motion } from "framer-motion";
import { Factory, ShieldCheck, TerminalSquare } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

export default function ExperienceSection({ content }) {
  const items = [
    { label: "CURRENT · TECHNOLOGY", title: content.current, text: content.currentText, Icon: TerminalSquare },
    { label: "EARLIER · INDUSTRIAL", title: content.earlier, text: content.earlierText, Icon: Factory }
  ];
  return (
    <section id="experience" className="relative px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><span className="section-eyebrow">{content.eyebrow}</span><h2 className="mt-3 font-display text-5xl font-bold leading-[0.98] text-white sm:text-7xl">{content.title}</h2></div>
          <p className="max-w-xl text-lg leading-8 text-inkSoft">{content.intro}</p>
        </SectionReveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {items.map(({ label, title, text, Icon }, index) => (
            <motion.article key={label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="engineering-card rounded-2xl p-7 sm:p-9">
              <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-champagne" /><span className="font-mono text-[9px] tracking-[0.2em] text-inkMute">0{index + 1}</span></div>
              <p className="mt-8 font-mono text-[9px] font-bold tracking-[0.22em] text-champagne">{label}</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">{title}</h3>
              <p className="mt-5 leading-7 text-inkSoft">{text}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-inkSoft"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />{content.contribution}</div>
      </div>
    </section>
  );
}
