"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bug, X } from "lucide-react";
import { useState } from "react";

export default function DebugMode() {
  const [open, setOpen] = useState(false);
  return (
    <div className="debug-mode fixed bottom-5 left-5 z-40 hidden md:block">
      <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-3 font-mono text-[9px] tracking-[0.16em] text-inkMute backdrop-blur-xl transition hover:text-pearl"><Bug className="h-3.5 w-3.5" />Try breaking this site.</button>
      <AnimatePresence>{open ? <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="absolute bottom-14 left-0 w-80 rounded-2xl border border-white/10 bg-[#0a1014] p-5 shadow-2xl"><button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-inkMute" aria-label="Close debug mode"><X className="h-4 w-4" /></button><p className="font-mono text-xs font-bold text-champagne">BRUNO_SYSTEM</p><div className="mt-5 space-y-2 font-mono text-[11px] text-inkSoft"><p>status: <b>learning</b></p><p>curiosity: <b>HIGH</b></p><p>problem_solving: <b>ACTIVE</b></p><p>production_errors: <b>inevitable</b></p><p>learning_loop: <b>RUNNING</b></p></div><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-pearl">No system is perfect. I just enjoy finding out why.</p></motion.div> : null}</AnimatePresence>
    </div>
  );
}
