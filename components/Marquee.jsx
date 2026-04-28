"use client";

import { Children } from "react";

/**
 * Infinite marquee. Pass items as children.
 * `reverse` flips direction. Pauses on hover.
 */
export default function Marquee({ children, reverse = false, className = "" }) {
  const items = Children.toArray(children);
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""} ${className}`}>
      <div className="marquee-track">{items}</div>
      <div className="marquee-track" aria-hidden="true">
        {items}
      </div>
    </div>
  );
}
