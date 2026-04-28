"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlowButton from "@/components/GlowButton";
import HeroNebula3D from "@/components/HeroNebula3D";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/SplitText";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
  }
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
};

export default function HeroSection({ content }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <HeroNebula3D />

      {/* Floating signals */}
      {content.floatingSignals.map((signal, index) => {
        const positions = [
          "left-[3%] top-[36%]",
          "right-[3%] top-[32%]",
          "left-[5%] bottom-[18%]",
          "right-[5%] bottom-[16%]"
        ];
        return (
          <motion.div
            key={signal}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.0 + index * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-none absolute z-[3] hidden lg:block ${positions[index]}`}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
              transition={{
                duration: 6 + index,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.4
              }}
              className="glass-pill premium-border flex items-center gap-3 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-pearl/90"
            >
              <span className="signal-dot" />
              {signal}
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        style={{ y, opacity, scale }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-3">
          <span className="aurora-divider h-px w-10" />
          <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-champagne">
            {content.name} · {content.role}
          </span>
          <span className="aurora-divider h-px w-10" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mx-auto max-w-5xl break-words font-display text-[2.2rem] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
        >
          <SplitText
            text={content.headline}
            className="text-aurora"
            staggerWords={0.05}
            delay={0.25}
            startY={42}
            startBlur={12}
          />
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-7 max-w-2xl text-base font-medium leading-7 text-pearl/85 sm:text-lg sm:leading-8"
        >
          {content.subheadline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-2.5">
          {content.badges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.06, duration: 0.45 }}
              whileHover={{ y: -2, scale: 1.04 }}
              className="glass-pill rounded-full px-4 py-2 text-xs font-bold tracking-tight text-pearl"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {content.actions.map((action) => (
            <Magnetic key={action.label} strength={0.22}>
              <GlowButton href={action.href} variant={action.variant} className="w-full sm:w-auto">
                {action.label}
              </GlowButton>
            </Magnetic>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.36em] text-inkMute"
        >
          <span>scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-3 animate-[floatY_2.4s_ease-in-out_infinite] bg-gradient-to-b from-champagne to-transparent" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
