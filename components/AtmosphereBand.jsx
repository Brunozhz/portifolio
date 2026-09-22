"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AtmosphereBand() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.08]);

  return (
    <div ref={ref} className="atmosphere-band" aria-hidden="true">
      <motion.div className="atmosphere-band-image" style={shouldReduceMotion ? undefined : { y, scale }}>
        <Image src="/images/ai-sculpture-blue-v1.png" alt="" fill sizes="100vw" />
      </motion.div>
      <div className="atmosphere-band-shade" />
      <span className="atmosphere-band-line atmosphere-band-line-a" />
      <span className="atmosphere-band-line atmosphere-band-line-b" />
    </div>
  );
}
