"use client";

import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const icons = { email: Mail, whatsapp: MessageCircle };

export default function ContactSection({ content }) {
  return (
    <section id="contact" className="relative px-5 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionReveal className="contact-editorial grid gap-14 border-y border-white/10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <span className="section-eyebrow">{content.eyebrow}</span>
            <h2 className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[0.96] tracking-[-0.05em] text-white sm:text-7xl">{content.title}</h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-inkSoft">{content.text}</p>
            <p className="mt-9 font-mono text-[10px] uppercase tracking-[0.24em] text-champagne">{content.signature}</p>
          </div>

          <div className="self-end">
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-inkMute">{content.coordinates}</p>
            <div className="border-t border-white/10">
              {content.actions.map((action) => {
                const Icon = icons[action.type] ?? Mail;
                return (
                  <a key={action.label} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined} className="contact-link group flex items-center justify-between border-b border-white/10 py-5 text-pearl transition hover:text-champagne">
                    <span className="flex items-center gap-4"><Icon className="h-4 w-4" aria-hidden="true" /><span className="font-display text-xl font-bold">{action.label}</span></span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <p className="mt-7 max-w-md text-sm leading-6 text-inkMute">{content.responseNote}</p>
          </div>
        </SectionReveal>

        <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.22em] text-inkMute">© {new Date().getFullYear()} Bruno Steiger · {content.footer}</p>
      </div>
    </section>
  );
}
