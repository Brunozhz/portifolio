"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, ChevronRight, Database, Gauge, Layers3, Radio, Workflow } from "lucide-react";
import { useState } from "react";
import SectionReveal from "@/components/SectionReveal";

const tours = [
  {
    label: "Checkout",
    icon: Layers3,
    title: "A checkout built around conversion and reliability.",
    text: "Products, buyers and payment methods converge in a focused purchase flow, designed to pass clean data into the transaction layer.",
    nodes: ["Product", "Buyer", "Checkout", "Payment"]
  },
  {
    label: "Payments",
    icon: Gauge,
    title: "The transaction is only the beginning.",
    text: "Payment states, business rules and financial operations are handled as part of one connected product—not as isolated screens.",
    nodes: ["Request", "Processing", "Status", "Balance"]
  },
  {
    label: "Members Area",
    icon: Bot,
    title: "Approval turns into access automatically.",
    text: "A successful purchase can provision the customer, unlock content and create a continuous experience from checkout to delivery.",
    nodes: ["Approved", "Access", "Library", "Content"]
  },
  {
    label: "API & Webhooks",
    icon: Radio,
    title: "Designed to connect with real operations.",
    text: "APIs expose product capabilities while event-driven webhooks keep external systems synchronized with transaction changes.",
    nodes: ["Company", "API", "Klumify", "Webhook"]
  },
  {
    label: "Data & Operations",
    icon: Database,
    title: "One operational view of the business.",
    text: "Product, customer and financial data come together in dashboards built for decisions, reconciliation and day-to-day control.",
    nodes: ["Products", "Customers", "Finance", "Insights"]
  }
];

const projects = [
  {
    number: "02",
    title: "AI Prospecting Engine",
    kicker: "Applied AI · Sales Operations",
    description: "A prospecting system that finds, validates and qualifies opportunities before sending them into human conversations and CRM workflows.",
    flow: ["Search", "Data", "AI validation", "Qualification", "WhatsApp", "CRM"]
  },
  {
    number: "03",
    title: "CRM / Sales Accelerator",
    kicker: "Automation · Revenue Systems",
    description: "A connected sales operation where actions trigger messages, qualification, pipeline updates and follow-ups without losing human context.",
    flow: ["New lead", "Contact", "Qualified", "Proposal", "Customer"]
  },
  {
    number: "04",
    title: "AI Agents",
    kicker: "LLMs · Conversational Systems",
    description: "Purpose-built agents for qualification, service and support—designed around a business process instead of a generic chatbot wrapper.",
    flow: ["Context", "Reasoning", "Action", "Handoff"]
  },
  {
    number: "05",
    title: "Marketing Infrastructure",
    kicker: "Meta · WhatsApp · CRM",
    description: "The engineering behind acquisition: turning ad responses into tracked leads, automated conversations and measurable sales activity.",
    flow: ["Meta ad", "Lead", "API", "CRM", "Automation", "Sale"]
  },
  {
    number: "06",
    title: "Web Experiences",
    kicker: "Frontend · Conversion · UX",
    description: "Responsive websites and product interfaces built to communicate clearly, feel deliberate and work across real devices.",
    flow: ["Strategy", "Interface", "Build", "Ship"]
  }
];

function Flow({ nodes, compact = false }) {
  return (
    <div className={`flex ${compact ? "flex-wrap" : "overflow-x-auto"} items-center gap-2`}>
      {nodes.map((node, index) => (
        <div key={node} className="flex shrink-0 items-center gap-2">
          <span className={`${compact ? "px-2.5 py-1.5 text-[9px]" : "px-4 py-2.5 text-[10px]"} rounded-lg border border-white/10 bg-black/40 font-bold uppercase tracking-[0.16em] text-pearl`}>
            {node}
          </span>
          {index < nodes.length - 1 ? <ChevronRight className="h-3 w-3 text-champagne/60" /> : null}
        </div>
      ))}
    </div>
  );
}

export default function SelectedWorkSection() {
  const [activeTour, setActiveTour] = useState(0);
  const [openProject, setOpenProject] = useState(null);
  const [agentReply, setAgentReply] = useState("Hi — I’m a controlled demo agent. Ask me what I can do.");
  const ActiveIcon = tours[activeTour].icon;

  return (
    <section id="work" className="relative px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="section-eyebrow">Selected work</span>
            <h2 className="mt-2 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-[6rem]">
              Things I’ve actually built.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-inkSoft lg:pb-2">
            Real systems, explored through the problems, flows and technical decisions behind them.
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
          <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-champagne">
                <span className="rounded-full border border-champagne/30 bg-champagne/10 px-3 py-2">Flagship project</span>
                <span>In development · 2026</span>
              </div>
              <p className="mt-12 font-display text-sm font-bold uppercase tracking-[0.35em] text-inkMute">01 / Klumify</p>
              <h3 className="mt-3 font-display text-6xl font-bold tracking-[-0.06em] text-white sm:text-8xl lg:text-[7.5rem]">Klumify</h3>
              <p className="mt-6 max-w-xl text-xl font-medium leading-8 text-pearl sm:text-2xl sm:leading-9">
                Building payment and digital commerce infrastructure from the ground up.
              </p>
              <p className="mt-6 max-w-xl leading-7 text-inkSoft">
                A connected product for checkout, transaction processing, seller operations, digital delivery and business integrations.
              </p>

              <div className="mt-9 flex flex-wrap gap-2">
                {["Payments", "Checkout", "API", "Webhooks", "Members area", "PostgreSQL", "Automation"].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-inkSoft">{tag}</span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/60 p-4 shadow-2xl sm:p-6">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f0c254]" /><span className="h-2.5 w-2.5 rounded-full bg-[#58c974]" /></div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inkMute">system_explorer / live</span>
              </div>
              <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {tours.map((tour, index) => {
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
                  <h4 className="mt-5 max-w-lg font-display text-2xl font-bold leading-tight text-white">{tours[activeTour].title}</h4>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-inkSoft">{tours[activeTour].text}</p>
                  <div className="mt-7"><Flow nodes={tours[activeTour].nodes} /></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative mt-12 grid gap-4 border-t border-white/10 pt-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">The problem</p>
              <p className="mt-3 text-sm leading-6 text-inkSoft">Digital commerce often fragments checkout, payment status, customer access and seller operations across disconnected tools. Klumify is being built as one coherent infrastructure.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">The system</p>
              <div className="mt-4"><Flow nodes={["Checkout", "Processing", "Dashboard", "Operations"]} compact /></div>
              <div className="mt-3"><Flow nodes={["Approved", "Webhook", "Access", "Content"]} compact /></div>
            </div>
          </div>

          <div className="relative mt-8 border-t border-white/10 pt-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-inkMute">What I worked on</p>
            <p className="mt-4 max-w-5xl text-sm leading-7 text-inkSoft">Product architecture · Front-End · Back-End · PostgreSQL · APIs · Webhooks · Payment integrations · Authentication · Business logic · CRM · Automation · Infrastructure · AI-assisted development · UX/UI</p>
          </div>
        </motion.article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => {
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
                  <div className="mt-7"><Flow nodes={project.flow} compact /></div>
                </button>
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mx-6 mb-6 border-t border-white/10 pt-6 sm:mx-8 sm:mb-8">
                        {index === 2 ? (
                          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                            <div className="flex items-center gap-3"><span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-champagne/10 text-champagne"><Bot className="h-4 w-4" /><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" /></span><div><p className="text-sm font-bold text-white">Talk to one of my agents</p><p className="text-[10px] uppercase tracking-[0.16em] text-inkMute">Controlled portfolio demo</p></div></div>
                            <motion.p key={agentReply} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-white/8 bg-white/[0.035] p-4 text-sm leading-6 text-inkSoft">{agentReply}</motion.p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button type="button" onClick={() => setAgentReply("I qualify intent, collect structured context, trigger tools and hand the conversation to a person when judgment matters.")} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-pearl hover:border-champagne/35">What can you do?</button>
                              <button type="button" onClick={() => setAgentReply("Bruno designs me around the operation first: goals, data, edge cases, actions and human handoff—then the conversational layer.")} className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-pearl hover:border-champagne/35">How were you built?</button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-4 sm:grid-cols-3">
                            {["Business context", "System logic", "Execution"].map((label, i) => <div key={label} className="rounded-xl border border-white/8 bg-black/30 p-4"><span className="font-mono text-[9px] text-champagne">0{i + 1}</span><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-pearl">{label}</p></div>)}
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
