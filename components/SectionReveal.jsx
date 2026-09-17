"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionReveal({ children, className = "", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", duration: 0.45, bounce: 0, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
