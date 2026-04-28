"use client";

import { useCallback, useRef } from "react";

/**
 * Magnetic wrapper: child translates toward pointer with smooth ease.
 */
export default function Magnetic({ as: Tag = "span", strength = 0.32, className = "", children, ...rest }) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  }, []);

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)", display: "inline-block" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
