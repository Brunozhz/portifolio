"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, ChevronRight, Database, Gauge, Layers3, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import SectionReveal from "@/components/SectionReveal";
import { automationFlow, commercialFlows, klumifyConceptFlows, klumifyModules, prospectingFlow, vfxResponsibilities } from "@/data/projects";

const TOUR_ICONS = [Layers3, Gauge, Bot, Radio, Database];

function Flow({ nodes, compact = false, interactive = true }) {
  const [activeNode, setActiveNode] = useState(null);
  return (
    <div className={`flex ${compact ? "flex-wrap" : "overflow-x-auto"} items-center gap-2`}>
      {nodes.map((node, index) => (
        <div key={node} className="flex shrink-0 items-center gap-2">
          {interactive ? (
            <button type="button" aria-pressed={activeNode === index} onClick={() => setActiveNode(activeNode === index ? null : index)} className={`${compact ? "px-2.5 py-1.5 text-[9px]" : "px-4 py-2.5 text-[10px]"} rounded-lg border bg-black/40 font-bold uppercase tracking-[0.16em] transition ${activeNode === index ? "border-champagne bg-champagne/10 text-champagne" : "border-white/10 text-pearl hover:border-champagne/35"}`}>
              {node}
            </button>
          ) : <span className={`${compact ? "px-2.5 py-1.5 text-[9px]" : "px-4 py-2.5 text-[10px]"} rounded-lg border border-white/10 bg-black/40 font-bold uppercase tracking-[0.16em] text-pearl`}>{node}</span>}
          {index < nodes.length - 1 ? <ChevronRight className="h-3 w-3 text-champagne/60" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function SelectedWorkSection({ content }) {
  const [activeTour, setActiveTour] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [agentReply, setAgentReply] = useState(content.agentHello);
  const [systemOpen, setSystemOpen] = useState(false);
  const [commercialMode, setCommercialMode] = useState("inbound");
  const localizedTours = content.tours.map(([label, title, text, nodes], index) => ({ label, title, text, nodes, icon: TOUR_ICONS[index] }));
  const localizedProjects = content.projects.map(([title, kicker, description, flow], index) => ({ title, kicker, description, flow, number: String(index + 2).padStart(2, "0") }));
  const ActiveIcon = localizedTours[activeTour].icon;

  useEffect(() => setAgentReply(content.agentHello), [content.agentHello]);

  return (
    <section id="work" className="relative px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="section-eyebrow">{content.eyebrow}</span>
            <h2 className="mt-2 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-[6rem]">
              {content.title}
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-inkSoft lg:pb-2">
            {content.intro}
          </p>
        </SectionReveal>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flagship-card relative overflow-hidden rounded-[2rem] border border-champagne/25 bg-[#070706] p-5 sm:p-8 lg:p-12"
        >
          <div className="flagship-grid" aria-hidden="true" />
          <div className="relative grid min-w-0 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-champagne">
                <span className="rounded-full border border-champagne/30 bg-champagne/10 px-3 py-2">{content.flagship}</span>
                <span>{content.status}</span>
              </div>
              <p className="mt-12 font-display text-sm font-bold uppercase tracking-[0.35em] text-inkMute">{content.projectLabel}</p>
              <h3 className="mt-3 font-display text-6xl font-bold tracking-[-0.06em] text-white sm:text-8xl lg:text-[7.5rem]">Klumify</h3>
              <p className="mt-6 max-w-xl text-xl font-medium leading-8 text-pearl sm:text-2xl sm:leading-9">
                {content.klumify}
              </p>
              <p className="mt-6 max-w-xl leading-7 text-inkSoft">
                {content.klumifyText}
              </p>

              <div className="mt-9 flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-inkSoft">{tag}</span>
                ))}
              </div>
            </div>

            <div className="min-w-0 rounded-3xl border border-white/10 bg-black/60 p-4 shadow-2xl sm:p-6">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f0c254]" /><span className="h-2.5 w-2.5 rounded-full bg-[#58c974]" /></div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inkMute">{content.explorer}</span>
              </div>
              <button type="button" onClick={() => setSystemOpen(true)} className="mb-5 flex w-full items-center justify-between rounded-xl border border-champagne/25 bg-champagne/10 px-4 py-3 text-left font-mono text-[10px] font-bold tracking-[0.16em] text-champagne">
                <span>{systemOpen ? content.initializing : content.initialize}</span><span>{systemOpen ? "●" : "→"}</span>
              </button>
              <AnimatePresence>
                {systemOpen ? <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-5 grid overflow-hidden sm:grid-cols-2"><div className="col-span-full grid grid-cols-2 gap-2 pb-5 sm:grid-cols-4">{klumifyModules.map((module, index) => <motion.div key={module.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5"><span className="text-[10px] text-champagne">{module.marker}</span><p className="mt-2 font-mono text-[8px] leading-4 tracking-[0.1em] text-inkSoft">{module.label}</p></motion.div>)}</div></motion.div> : null}
              </AnimatePresence>
              <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {localizedTours.map((tour, index) => {
                  const Icon = tour.icon;
                  return (
                    <button key={tour.label} type="button" onClick={() => setActiveTour(index)} className={`rounded-xl border p-3 text-left transition ${activeTour === index ? "border-champagne/45 bg-champagne/10 text-champagne" : "border-white/8 bg-white/[0.02] text-inkMute hover:border-white/20 hover:text-pearl"}`}>
                      <Icon className="mb-3 h-4 w-4" />
                      <span className="block text-[9px] font-bold uppercase leading-4 tracking-[0.12em]">{tour.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeTour} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="min-h-[16rem] rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 sm:p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-champagne/30 bg-champagne/10 text-champagne"><ActiveIcon className="h-4 w-4" /></div>
                  <h4 className="mt-5 max-w-lg font-display text-2xl font-bold leading-tight text-white">{localizedTours[activeTour].title}</h4>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-inkSoft">{localizedTours[activeTour].text}</p>
                  <div className="mt-7"><Flow nodes={localizedTours[activeTour].nodes} /></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative mt-12 grid gap-4 border-t border-white/10 pt-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">{content.problem}</p>
              <p className="mt-3 text-sm leading-6 text-inkSoft">{content.problemText}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">{content.system}</p>
              <div className="mt-4 space-y-3">{klumifyConceptFlows.map((flow) => <Flow key={flow.join("-")} nodes={flow} compact />)}</div>
              <p className="mt-4 font-mono text-[9px] leading-5 text-inkMute">{content.conceptual}</p>
            </div>
          </div>

          <div className="relative mt-5 grid gap-2 font-mono text-[10px] leading-5 text-inkMute sm:grid-cols-2"><p className="rounded-lg border border-white/10 p-3">🔒 {content.privateNote}</p><p className="rounded-lg border border-white/10 p-3">↗ {content.launchNote}</p></div>

          <div className="relative mt-8 border-t border-white/10 pt-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-inkMute">{content.worked}</p>
            <p className="mt-4 max-w-5xl text-sm leading-7 text-inkSoft">{content.workedText}</p>
          </div>
        </motion.article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {localizedProjects.map((project, index) => {
            const isOpen = openProject === index;
            return (
              <motion.article key={project.number} layout className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition hover:border-white/20 hover:bg-white/[0.04]">
                <button type="button" onClick={() => setOpenProject(isOpen ? null : index)} className="w-full p-6 text-left sm:p-8" aria-expanded={isOpen}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-champagne">{project.number} — {project.kicker}</p>
                      <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">{project.title}</h3>
                    </div>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${isOpen ? "rotate-45 border-champagne/40 bg-champagne/10 text-champagne" : "border-white/10 text-inkSoft group-hover:border-champagne/30 group-hover:text-champagne"}`}><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                  <p className="mt-5 max-w-xl leading-7 text-inkSoft">{project.description}</p>
                  <div className="mt-7"><Flow nodes={project.flow} compact interactive={false} /></div>
                </button>
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mx-6 mb-6 border-t border-white/10 pt-6 sm:mx-8 sm:mb-8">
                        {index === 0 ? (
                          <div className="space-y-5">
                            <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 font-mono text-[10px] leading-6 text-inkSoft">🔒 {content.proprietary}</div>
                            <div><p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-champagne">{content.contribution}</p><div className="flex flex-wrap gap-2">{vfxResponsibilities.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] text-inkSoft">{item}</span>)}</div></div>
                          </div>
                        ) : index === 1 ? (
                          <div className="space-y-5">
                            <Flow nodes={prospectingFlow} compact />
                            <p className="rounded-xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-inkSoft">{content.icp}</p>
                            <div className="flex gap-2">{["inbound", "outbound"].map((mode) => <button key={mode} onClick={() => setCommercialMode(mode)} className={`rounded-full border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] ${commercialMode === mode ? "border-champagne bg-champagne/10 text-champagne" : "border-white/10 text-inkMute"}`}>{content[mode]}</button>)}</div>
                            <Flow nodes={commercialFlows[commercialMode]} compact />
                          </div>
                        ) : index === 2 ? (
                          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                            <div className="flex items-center gap-3"><span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-champagne/10 text-champagne"><Bot className="h-4 w-4" /><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" /></span><div><p className="text-sm font-bold text-white">{content.agentTitle}</p><p className="text-[10px] uppercase tracking-[0.16em] text-inkMute">{content.agentLabel}</p></div></div>
                            <motion.p key={agentReply} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-white/8 bg-white/[0.035] p-4 text-sm leading-6 text-inkSoft">{agentReply}</motion.p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button type="button" onClick={() => setAgentReply(content.agentA1)} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-pearl hover:border-champagne/35">{content.agentQ1}</button>
                              <button type="button" onClick={() => setAgentReply(content.agentA2)} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-pearl hover:border-champagne/35">{content.agentQ2}</button>
                            </div>
                          </div>
                        ) : index === 4 ? (
                          <div className="rounded-xl border border-white/10 bg-black/20 p-5"><Flow nodes={automationFlow} compact /></div>
                        ) : (
                          <div className="grid gap-4 sm:grid-cols-3">
                            {content.details.map((label, i) => <div key={label} className="rounded-xl border border-white/8 bg-black/30 p-4"><span className="font-mono text-[9px] text-champagne">0{i + 1}</span><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-pearl">{label}</p></div>)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
