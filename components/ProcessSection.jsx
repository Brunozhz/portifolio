"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Layers3, Rocket, Wrench } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import SplitText from "@/components/SplitText";

const STEPS = [
  {
    icon: Compass,
    label: "01 — Discovery",
    title: "Listen, scope, align",
    body: "We map the goal, the audience and the operational context. Every premium build starts with sharp discovery — not assumptions."
  },
  {
    icon: Layers3,
    label: "02 — Architecture",
    title: "Design the system",
    body: "Information design, flows, integrations, edge cases. A blueprint that holds, before a single component is shipped."
  },
  {
    icon: Wrench,
    label: "03 — Craft",
    title: "Build with intent",
    body: "Hand-tuned interfaces, clean back-ends, automations that survive scale. Every layer reviewed against intent, not template."
  },
  {
    icon: Rocket,
    label: "04 — Launch & evolve",
    title: "Ship, measure, refine",
    body: "Deployment is a milestone, not a finish line. We instrument what matters and iterate the moment data starts speaking."
  }
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export default function ProcessSection() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <DesktopProcess /> : <MobileProcess />;
}

function DesktopProcess() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-72%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} id="process" className="relative h-[380vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="px-5 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="max-w-3xl">
              <span className="section-eyebrow">Process</span>
              <h2 className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-[4.5rem]">
                <SplitText text="A craft, not a service" className="text-aurora-cool" staggerWords={0.06} startY={28} />
              </h2>
              <p className="mt-5 max-w-xl text-lg font-medium text-inkSoft">
                How a project moves from a first conversation to a system that earns its keep.
              </p>
            </SectionReveal>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-inkMute">step</span>
              <span className="relative h-px flex-1 overflow-hidden bg-white/10">
                <motion.span
                  style={{ width: progress }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-champagne via-violet to-cyan"
                />
              </span>
              <span className="font-display text-xs font-bold uppercase tracking-[0.32em] text-inkMute">scroll →</span>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <motion.div
            style={{ x }}
            className="absolute left-0 top-1/2 flex -translate-y-1/2 items-stretch gap-8 px-[6vw] will-change-transform"
          >
            {STEPS.map((step, idx) => (
              <ProcessCard key={step.label} step={step} index={idx} />
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-night to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-night to-transparent" />
        </div>
      </div>
    </section>
  );
}

function MobileProcess() {
  return (
    <section id="process" className="relative px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <span className="section-eyebrow">Process</span>
          <h2 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            <SplitText text="A craft, not a service" className="text-aurora-cool" staggerWords={0.06} startY={28} />
          </h2>
          <p className="mt-5 text-lg font-medium text-inkSoft">
            How a project moves from a first conversation to a system that earns its keep.
          </p>
        </SectionReveal>

        <div className="mt-12 space-y-5">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProcessCard step={step} index={idx} compact />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, index, compact = false }) {
  const Icon = step.icon;
  return (
    <article
      className={`relative flex shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl shadow-card ${
        compact ? "w-full p-7" : "w-[78vw] max-w-[32rem] p-8 sm:w-[40vw]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-6 -top-6 select-none font-display font-bold leading-none tracking-[-0.05em] text-white/[0.04] ${
          compact ? "text-[8rem]" : "text-[14rem]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-champagne/30 bg-champagne/10 text-champagne">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.32em] text-champagne">
          {step.label}
        </p>
        <h3 className={`mt-3 font-display font-bold leading-[1.1] tracking-tight text-white ${compact ? "text-2xl" : "text-3xl"}`}>
          {step.title}
        </h3>
      </div>

      <p className={`relative mt-6 max-w-md font-medium leading-7 text-inkSoft ${compact ? "text-base" : "mt-8 text-base leading-7 sm:text-lg sm:leading-8"}`}>
        {step.body}
      </p>

      <div className="relative mt-6 flex items-center gap-3">
        <span className="aurora-divider h-px w-12" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-inkMute">
          phase {index + 1} of {STEPS.length}
        </span>
      </div>
    </article>
  );
}
