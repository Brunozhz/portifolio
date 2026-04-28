"use client";

import { motion } from "framer-motion";
import { Download, Mail, MapPin, MessageCircle, UserRound } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import Magnetic from "@/components/Magnetic";
import SectionReveal from "@/components/SectionReveal";
import SplitText from "@/components/SplitText";

const actionIconMap = {
  whatsapp: "whatsapp",
  email: "email",
  download: "download",
  linkedin: "arrow"
};

const detailIconMap = {
  name: UserRound,
  location: MapPin,
  work: MessageCircle,
  availability: Download
};

export default function ContactSection({ content }) {
  return (
    <section id="contact" className="relative px-5 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-panel/95 via-panelSoft/85 to-night/95 px-6 py-16 shadow-depth backdrop-blur-2xl sm:px-12 lg:px-16 lg:py-20">
          {/* Pulsing orb backdrop */}
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
            className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-violet/20 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 2 }}
            className="pointer-events-none absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-cyan/15 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.35, 0.18] }}
            transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 4 }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/10 blur-3xl"
          />

          {/* Grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }}
          />

          <div className="relative grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <SectionReveal>
              <span className="section-eyebrow">{content.eyebrow}</span>
              <h2 className="mt-2 font-display text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
                <SplitText text={content.title} className="text-aurora" staggerWords={0.05} startY={28} />
              </h2>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-inkSoft">
                {content.text}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {content.actions.map((action, index) => (
                  <Magnetic key={action.label} strength={0.18}>
                    <GlowButton
                      href={action.href}
                      variant={index === 0 ? "primary" : "secondary"}
                      icon={actionIconMap[action.type]}
                      download={action.type === "download"}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noreferrer" : undefined}
                      className="w-full sm:w-auto"
                    >
                      {action.label}
                    </GlowButton>
                  </Magnetic>
                ))}
              </div>

              {/* Signature ornament */}
              <div className="mt-12 flex items-center gap-4">
                <span className="aurora-divider h-px w-32" />
                <span className="text-sm font-bold uppercase tracking-[0.28em] text-champagne">— Bruno</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="grid gap-3">
              {content.details.map((detail, idx) => {
                const Icon = detailIconMap[detail.key] ?? Mail;

                return (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 4 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-champagne/30 bg-champagne/5 text-champagne shadow-innerTop">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-inkMute">
                          {detail.label}
                        </p>
                        <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-pearl">{detail.value}</p>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-5 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-champagne/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </motion.div>
                );
              })}
            </SectionReveal>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <span className="aurora-divider h-px w-40" />
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-inkMute">
            © {new Date().getFullYear()} Bruno Elias — Crafted by hand, end-to-end.
          </p>
        </div>
      </div>
    </section>
  );
}
