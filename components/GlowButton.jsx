"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Mail, MessageCircle } from "lucide-react";

const iconMap = {
  arrow: ArrowUpRight,
  whatsapp: MessageCircle,
  email: Mail,
  download: ArrowDownToLine
};

export default function GlowButton({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  download = false,
  target,
  rel,
  className = ""
}) {
  const Icon = iconMap[icon] ?? ArrowUpRight;
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      download={download || undefined}
      target={target}
      rel={rel}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`button-shine group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold tracking-tight transition focus:outline-none focus:ring-2 focus:ring-champagne/60 focus:ring-offset-2 focus:ring-offset-night sm:text-base ${
        isPrimary
          ? "bg-gradient-to-r from-pearl via-pearl to-champagne text-night shadow-[0_0_50px_rgba(216,199,154,0.25)] hover:shadow-[0_0_70px_rgba(216,199,154,0.4)]"
          : "border border-white/15 bg-white/[0.035] text-pearl shadow-innerTop backdrop-blur-xl hover:border-champagne/40 hover:bg-white/[0.07]"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <Icon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </motion.a>
  );
}
