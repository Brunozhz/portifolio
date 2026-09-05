"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

const commandHrefs = ["#work", "#work", "#work", "#work", "#work", "#about", "#about", "#contact"];

export default function CommandPalette({ content }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen((value) => !value); }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const normalized = query.trim().toLowerCase();
  const commands = content.items.map((label, index) => ({ label, href: commandHrefs[index] }));
  const filtered = commands.filter((item) => item.label.toLowerCase().includes(normalized));
  const hire = normalized === "hire bruno";
  const go = (href) => { setOpen(false); setQuery(""); window.location.hash = href; };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-inkMute backdrop-blur-xl transition hover:border-champagne/35 hover:text-pearl md:flex"><span>{content.curious}</span><kbd className="rounded border border-white/10 bg-white/[0.05] px-2 py-1 text-champagne">Ctrl K</kbd></button>
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 px-4 pt-[14vh] backdrop-blur-md" onMouseDown={() => setOpen(false)}>
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0b] shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-3 border-b border-white/10 p-4"><Command className="h-4 w-4 text-champagne" /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={content.placeholder} className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-inkMute" /><button onClick={() => setOpen(false)} aria-label="Close"><X className="h-4 w-4 text-inkMute" /></button></div>
              <div className="p-2">
                {hire ? <div className="rounded-xl border border-champagne/25 bg-champagne/10 p-5"><p className="font-display text-xl font-bold text-white">{content.hire}</p><p className="mt-2 text-sm text-inkSoft">{content.talk}</p><a href="mailto:brunoeliassantos097@gmail.com" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-champagne"><Mail className="h-4 w-4" /> {content.email}</a></div> : filtered.map((command) => <button key={command.label} onClick={() => go(command.href)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-inkSoft transition hover:bg-white/[0.06] hover:text-white"><span>&gt; {command.label}</span><ArrowRight className="h-4 w-4 text-champagne" /></button>)}
                {!hire && !filtered.length ? <p className="p-5 text-sm text-inkMute">{content.none}</p> : null}
              </div>
              <div className="border-t border-white/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-inkMute">{content.tip}</div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
