"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import SplitText from "@/components/SplitText";
import { stackUsage } from "@/data/projects";

export default function TechStackSection({ content }) {
  const [active, setActive] = useState(0);
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <section id="technologies" className="relative px-5 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">{content.eyebrow}</span>
          <h2 className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
            <SplitText text={content.title} className="text-aurora" staggerWords={0.06} startY={28} />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-inkSoft">
            {content.subtitle}
          </p>
        </SectionReveal>

        {/* Group selector + active tools */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
          <div className="space-y-2">
            {content.groups.map((group, idx) => (
              <button
                key={group.title}
                type="button"
                onClick={() => { setActive(idx); setSelectedTool(null); }}
                className={`group relative w-full overflow-hidden rounded-xl border px-5 py-4 text-left transition ${
                  active === idx
                    ? "border-champagne/50 bg-transparent"
                    : "border-white/10 bg-transparent hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.28em] transition ${
                        active === idx ? "text-champagne" : "text-inkMute"
                      }`}
                    >
                      /{String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold tracking-tight text-white">{group.title}</p>
                  </div>
                  <motion.span
                    initial={false}
                    animate={{ rotate: active === idx ? 90 : 0, opacity: active === idx ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-champagne"
                  >
                    →
                  </motion.span>
                </div>
                {active === idx && (
                  <motion.span
                    layoutId="techPanelGlow"
                    aria-hidden="true"
                    transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-gradient-to-b from-champagne via-champagne/60 to-transparent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="tech-sheet relative min-h-[20rem] border-y border-white/10 py-8 lg:px-8">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-pearl">
                    {content.groups[active].title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-inkMute">
                    {content.groups[active].tools.length} {content.toolsLabel}
                  </span>
                </div>
                <span className="mt-4 block h-px w-full bg-gradient-to-r from-champagne/50 via-white/10 to-transparent" />

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {content.groups[active].tools.map((tool, i) => (
                    <motion.button
                      key={tool}
                      type="button"
                      onClick={() => setSelectedTool(tool)}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -3, scale: 1.05 }}
                      className={`glass-pill rounded-full px-4 py-2 text-sm font-bold tracking-tight text-pearl ${selectedTool === tool ? "is-selected" : ""}`}
                    >
                      {tool}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {selectedTool ? (
                    <motion.div key={selectedTool} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="tech-context mt-8 rounded-xl border border-white/10 p-5">
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-champagne">{content.usedIn}</p>
                      <p className="mt-2 font-display text-xl font-bold text-white">{selectedTool}</p>
                      <p className="mt-2 text-sm leading-6 text-inkSoft">{(stackUsage[selectedTool] ?? [content.contextFallback]).join(" · ")}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
          </div>
          </div>
        </div>
    </section>
  );
}
