"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function CountUp({ to = 100, duration = 1.6, className = "", suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px", once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </motion.span>
  );
}
