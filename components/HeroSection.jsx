"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlowButton from "@/components/GlowButton";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/SplitText";
import LiveAge from "@/components/LiveAge";
import VisualBackdrop from "@/components/VisualBackdrop";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
  }
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } }
};

export default function HeroSection({ content }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.65]);

  return (
    <section
      ref={ref}
      id="home"
      className="hero-editorial relative flex min-h-[100svh] items-center px-5 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <VisualBackdrop />
      <motion.div
        style={shouldReduceMotion ? undefined : { y, opacity }}
        variants={container}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl text-left"
      >
        <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-3">
          <span className="text-xs font-semibold tracking-[0.08em] text-champagne">
            {content.name} · {content.role}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="max-w-4xl break-words font-display text-[2.45rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[4.7rem]"
        >
          <SplitText
            text={content.headline}
            className="text-aurora"
            staggerWords={0.025}
            delay={0.08}
            startY={24}
          />
        </motion.h1>

        {content.manifesto ? (
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl font-display text-base font-medium leading-7 tracking-[-0.01em] text-champagne/80 sm:text-lg">
            {content.manifesto}
          </motion.p>
        ) : null}

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-2xl text-base font-medium leading-7 text-pearl/85 sm:text-lg sm:leading-8"
        >
          {content.subheadline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex max-w-3xl flex-wrap justify-start gap-2.5">
          {content.badges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5 + i * 0.035, type: "spring", duration: 0.36, bounce: 0 }}
              className="glass-pill rounded-sm px-3.5 py-2 text-xs font-semibold tracking-tight text-pearl"
            >
              {i === 0 ? <LiveAge suffix={content.ageSuffix} /> : badge}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-start justify-start gap-4 sm:flex-row">
          {content.actions.map((action) => (
            <Magnetic key={action.label} strength={0.22}>
              <GlowButton href={action.href} variant={action.variant} className="w-full sm:w-auto">
                {action.label}
              </GlowButton>
            </Magnetic>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.72, duration: 0.32 }}
          className="mt-14 flex flex-row items-center gap-4 text-[10px] font-bold uppercase tracking-[0.36em] text-inkMute"
        >
          <span>{content.scroll ?? "scroll"}</span>
          <span className="relative block h-px w-16 overflow-hidden bg-white/10">
            <span className="absolute inset-y-0 left-0 w-5 animate-[floatY_2.4s_ease-in-out_infinite] bg-gradient-to-r from-champagne to-transparent" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
