"use client";

import { motion } from "framer-motion";

/**
 * Word-by-word reveal with subtle blur + 3D tilt.
 * The `className` is applied to each word span (so background-clip:text
 * gradients render correctly on inline-block children).
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  staggerWords = 0.06,
  startY = 28,
  startBlur = 8,
  ariaLabel
}) {
  const words = text.split(" ");

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
            initial={{ opacity: 0, y: startY, filter: `blur(${startBlur}px)`, rotateX: -28 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
            transition={{
              delay: delay + i * staggerWords,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
