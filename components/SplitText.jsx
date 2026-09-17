"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-by-word reveal with restrained vertical motion.
 * The `className` is applied to each word span (so background-clip:text
 * gradients render correctly on inline-block children).
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  staggerWords = 0.06,
  startY = 28,
  ariaLabel
}) {
  const words = text.split(" ");
  const shouldReduceMotion = useReducedMotion();

  return (
    <span aria-label={ariaLabel ?? text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline pr-[0.28em] last:pr-0"
          aria-hidden="true"
        >
          <motion.span
            className={`inline-block will-change-transform ${className}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: startY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : delay + i * staggerWords,
              type: "spring",
              duration: 0.42,
              bounce: 0
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
