"use client";

import { useEffect, useRef } from "react";

/**
 * Deep-space starfield. Pure black canvas, white/pearl/champagne stars.
 * No nebula tints, no neon glows — just stars and the occasional meteor.
 */
export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colors = [
      "rgba(245, 243, 238, 1)",   // pearl
      "rgba(255, 255, 255, 1)",   // pure white
      "rgba(216, 199, 154, 1)",   // champagne
      "rgba(230, 226, 218, 1)",   // soft white
      "rgba(255, 245, 220, 1)"    // warm white
    ];

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let meteors = [];
    let scrollY = 0;
    let raf = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };

    const setup = () => {
      const isMobile = window.innerWidth < 768;
      const starCount = isMobile ? 280 : 580;
      stars = Array.from({ length: starCount }, () => {
        const depth = Math.pow(Math.random(), 2.4) * 1.0 + 0.05;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.25 + Math.random() * 1.4 * depth,
          depth,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.4 + Math.random() * 1.6
        };
      });
      meteors = Array.from({ length: isMobile ? 0 : 2 }, () => spawnMeteor());
    };

    const spawnMeteor = () => ({
      x: Math.random() * width * 1.4 - width * 0.2,
      y: Math.random() * height * 0.6,
      vx: 4 + Math.random() * 5,
      vy: 1.2 + Math.random() * 1.6,
      length: 90 + Math.random() * 140,
      life: 0,
      max: 90 + Math.random() * 110,
      delay: Math.random() * 600
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setup();
    };

    const drawStars = (t) => {
      const parX = (mouse.x - width / 2) * 0.04;
      const parY = (mouse.y - height / 2) * 0.03;
      stars.forEach((s) => {
        const x = (s.x + parX * s.depth + width) % width;
        const y = (s.y + parY * s.depth - scrollY * s.depth * 0.55 + height * 2) % height;
        const tw = 0.55 + Math.sin(t * 0.001 * s.twinkleSpeed + s.twinkle) * 0.45;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(/, 1\)$/, `, ${Math.max(0.18, tw * (0.4 + s.depth * 0.6))})`);
        ctx.fill();
        if (s.r > 1.0) {
          ctx.beginPath();
          ctx.arc(x, y, s.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = s.color.replace(/, 1\)$/, `, ${0.07 * tw})`);
          ctx.fill();
        }
      });
    };

    const drawMeteors = () => {
      meteors.forEach((m, idx) => {
        if (m.delay > 0) {
          m.delay -= 1;
          return;
        }
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const fade = Math.min(1, m.life / 14) * Math.max(0, 1 - m.life / m.max);
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.length, m.y - m.length * 0.32);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.85 * fade})`);
        grad.addColorStop(0.4, `rgba(216, 199, 154, ${0.36 * fade})`);
        grad.addColorStop(1, "rgba(216, 199, 154, 0)");
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.length, m.y - m.length * 0.32);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`;
        ctx.fill();
        if (m.life > m.max || m.x > width + m.length || m.y > height + 50) {
          meteors[idx] = spawnMeteor();
          meteors[idx].delay = 200 + Math.random() * 800;
        }
      });
    };

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      drawStars(t);
      if (!prefersReducedMotion) drawMeteors();
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.tx = width / 2;
      mouse.ty = height / 2;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="galaxy-shell fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="noise-texture" />
    </div>
  );
}
