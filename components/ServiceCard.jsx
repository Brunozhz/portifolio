"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  Bot,
  Database,
  MonitorSmartphone,
  MousePointerClick,
  Route,
  Sparkles,
  Webhook
} from "lucide-react";
import TiltCard from "@/components/TiltCard";

const iconMap = {
  mouse: MousePointerClick,
  screen: MonitorSmartphone,
  pipeline: Route,
  workflow: Sparkles,
  bot: Bot,
  webhook: Webhook,
  database: Database,
  blocks: Blocks
};

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] ?? Sparkles;
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard
        intensity={9}
        className="glass-surface premium-border group relative h-full min-h-[19rem] overflow-hidden rounded-2xl p-7"
      >
        {/* Animated corner ornament */}
        <span
          aria-hidden="true"
          className="absolute right-5 top-5 font-display text-xs font-bold tracking-tight text-inkMute"
        >
          /{numberLabel}
        </span>

        {/* Inner texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 transition group-hover:opacity-60"
          style={{
            background:
              "radial-gradient(circle at 12% 8%, rgba(216,199,154,0.10), transparent 38%), radial-gradient(circle at 90% 18%, rgba(99,102,241,0.10), transparent 36%)"
          }}
        />

        {/* Icon orb */}
        <div className="relative">
          <div className="relative mb-7 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-pearl shadow-innerTop">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(216,199,154,0.32), transparent 60%)"
              }}
            />
            <Icon className="relative h-5 w-5 text-champagne transition group-hover:scale-110" aria-hidden="true" />
          </div>

          <h3 className="font-display text-2xl font-bold leading-[1.1] tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-4 text-sm font-medium leading-7 text-inkSoft">{service.description}</p>

          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-inkMute opacity-0 transition group-hover:opacity-100">
            <span className="h-px w-8 bg-champagne" />
            <span className="text-champagne">Discover</span>
          </div>
        </div>

        {/* Bottom edge gradient hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-champagne/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
        />
      </TiltCard>
    </motion.article>
  );
}
