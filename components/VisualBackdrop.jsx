"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VisualBackdrop() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.045]);

  return (
    <div ref={ref} className="hero-visual-backdrop" aria-hidden="true">
      <motion.div
        className="hero-visual-image"
        style={shouldReduceMotion ? undefined : { y, scale }}
      >
        <Image
          src="/images/ai-studio-hero-v1.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="hero-visual-wash" />
      <div className="hero-visual-grain" />
    </div>
  );
}
