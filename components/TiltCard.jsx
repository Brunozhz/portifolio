"use client";

import { useCallback, useRef } from "react";

/**
 * Premium tilt card: 3D rotation + spotlight that follows pointer.
 * Uses CSS variables for low-cost updates (no React state per move).
 */
export default function TiltCard({
  as: Tag = "div",
  className = "",
  intensity = 8,
  glare = true,
  spotlight = true,
  children,
  ...rest
}) {
  const ref = useRef(null);

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * intensity;
      const ry = (px - 0.5) * intensity;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${spotlight ? "spotlight-card" : ""} ${className}`}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)"
      }}
      {...rest}
    >
      {children}
      {glare && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 55%)",
            mixBlendMode: "overlay",
            opacity: 0.7
          }}
        />
      )}
    </Tag>
  );
}
