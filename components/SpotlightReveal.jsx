"use client";

import { useEffect, useRef } from "react";

/**
 * "Treasure in the dark" reveal layer — but the treasure is PLANETS.
 *
 * Hidden across the page (in document coordinates) are dozens of planets,
 * each with its own palette, atmosphere, optional ring, and surface
 * banding. As the cursor moves, a radial reveal mask uncovers whichever
 * planets fall under its glow — like discovering worlds with a flashlight
 * in deep space.
 */

const PLANET_PRESETS = [
  // Saturn-like — pale yellow with rings
  {
    base: [216, 199, 154],
    band: [232, 216, 168],
    shadow: [56, 48, 28],
    atmosphere: [216, 199, 154],
    rings: { count: 3, tilt: 0.32, baseColor: [216, 199, 154] }
  },
  // Earth-like
  {
    base: [60, 110, 180],
    band: [80, 150, 100],
    shadow: [10, 28, 52],
    atmosphere: [120, 180, 240],
    rings: null
  },
  // Mars-like — rusty red
  {
    base: [180, 90, 60],
    band: [210, 130, 90],
    shadow: [56, 28, 18],
    atmosphere: [220, 130, 80],
    rings: null
  },
  // Neptune-like — deep blue
  {
    base: [60, 90, 180],
    band: [90, 140, 220],
    shadow: [16, 22, 56],
    atmosphere: [120, 160, 240],
    rings: null
  },
  // Jupiter-like — banded amber
  {
    base: [200, 160, 110],
    band: [230, 200, 150],
    shadow: [80, 56, 28],
    atmosphere: [240, 210, 160],
    rings: null
  },
  // Pearl moon — white/grey
  {
    base: [220, 218, 210],
    band: [180, 178, 170],
    shadow: [40, 40, 44],
    atmosphere: [255, 252, 245],
    rings: null
  },
  // Violet exoplanet with rings
  {
    base: [120, 90, 200],
    band: [160, 130, 230],
    shadow: [40, 24, 80],
    atmosphere: [180, 150, 240],
    rings: { count: 2, tilt: -0.22, baseColor: [180, 160, 230] }
  },
  // Teal ice giant
  {
    base: [60, 160, 170],
    band: [110, 200, 200],
    shadow: [16, 50, 56],
    atmosphere: [140, 220, 220],
    rings: null
  }
];

export default function SpotlightReveal() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(hover: none)").matches) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scrollY = window.scrollY;
    let docHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight * 2);

    const mouse = {
      x: width / 2,
      y: height / 2,
      tx: width / 2,
      ty: height / 2,
      active: false
    };

    /** @type {Array<{x:number, y:number, radius:number, preset:any, rotation:number, light:number, phase:number}>} */
    const planets = [];

    const buildPlanets = () => {
      planets.length = 0;
      docHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight * 2);
      const isMobile = window.innerWidth < 768;
      const count = Math.max(18, Math.floor(docHeight / (isMobile ? 360 : 220)));

      // Poisson-ish distribution: keep planets from clustering
      const minDistance = isMobile ? 220 : 280;
      let attempts = 0;
      while (planets.length < count && attempts < count * 20) {
        attempts += 1;
        const x = 60 + Math.random() * (width - 120);
        const y = 60 + Math.random() * (docHeight - 120);
        const tooClose = planets.some((p) => {
          const dx = p.x - x;
          const dy = p.y - y;
          return Math.hypot(dx, dy) < minDistance;
        });
        if (tooClose) continue;
        planets.push({
          x,
          y,
          radius: (isMobile ? 18 : 22) + Math.random() * (isMobile ? 22 : 38),
          preset: PLANET_PRESETS[Math.floor(Math.random() * PLANET_PRESETS.length)],
          rotation: Math.random() * Math.PI * 2,
          light: -0.7 + Math.random() * 1.4, // -1..1 light direction along x
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPlanets();
    };

    const radius = 240;

    const rgba = (rgb, a) => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;

    const drawPlanet = (planet, vx, vy, alpha, t) => {
      const { preset, radius: r, light, rotation, phase } = planet;
      const baseAlpha = alpha;

      ctx.save();
      ctx.translate(vx, vy);

      // Outer atmosphere glow
      const atmoR = r * 1.5;
      const atmo = ctx.createRadialGradient(0, 0, r * 0.85, 0, 0, atmoR);
      atmo.addColorStop(0, rgba(preset.atmosphere, baseAlpha * 0.35));
      atmo.addColorStop(0.5, rgba(preset.atmosphere, baseAlpha * 0.12));
      atmo.addColorStop(1, rgba(preset.atmosphere, 0));
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(0, 0, atmoR, 0, Math.PI * 2);
      ctx.fill();

      // Back rings (behind planet body)
      if (preset.rings) {
        drawRings(ctx, planet, baseAlpha, t, true);
      }

      // Planet body — radial gradient simulating spherical lighting
      const lightX = light * r * 0.6;
      const lightY = -r * 0.25;
      const sphere = ctx.createRadialGradient(lightX, lightY, r * 0.05, 0, 0, r);
      sphere.addColorStop(0, rgba(preset.band, baseAlpha));
      sphere.addColorStop(0.45, rgba(preset.base, baseAlpha));
      sphere.addColorStop(1, rgba(preset.shadow, baseAlpha * 0.95));

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = sphere;
      ctx.fill();

      // Surface bands (subtle horizontal stripes for gas giants / textured worlds)
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.rotate(rotation + Math.sin(t * 0.0004 + phase) * 0.04);
      ctx.globalCompositeOperation = "source-over";
      const bandCount = 4;
      for (let i = 0; i < bandCount; i += 1) {
        const yOffset = -r + ((i + 0.5) * (r * 2)) / bandCount + Math.sin(t * 0.0008 + i + phase) * 2;
        const bandHeight = r * 0.18;
        const bandAlpha = baseAlpha * (0.10 + (i % 2) * 0.08);
        ctx.fillStyle = rgba(preset.band, bandAlpha);
        ctx.fillRect(-r, yOffset - bandHeight / 2, r * 2, bandHeight);
      }
      ctx.restore();

      // Limb terminator shadow (crescent darkening on opposite side from light)
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.clip();
      const term = ctx.createRadialGradient(-light * r * 1.4, 0, r * 0.2, -light * r * 1.4, 0, r * 1.6);
      term.addColorStop(0, rgba(preset.shadow, baseAlpha * 0.55));
      term.addColorStop(1, rgba(preset.shadow, 0));
      ctx.fillStyle = term;
      ctx.fillRect(-r, -r, r * 2, r * 2);
      ctx.restore();

      // Specular highlight (small bright dot)
      ctx.save();
      ctx.beginPath();
      ctx.arc(lightX, lightY, r * 0.18, 0, Math.PI * 2);
      const spec = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, r * 0.18);
      spec.addColorStop(0, `rgba(255, 255, 255, ${baseAlpha * 0.35})`);
      spec.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = spec;
      ctx.fill();
      ctx.restore();

      // Front rings (in front of planet body)
      if (preset.rings) {
        drawRings(ctx, planet, baseAlpha, t, false);
      }

      ctx.restore();
    };

    const drawRings = (ctx, planet, alpha, t, behind) => {
      const { preset, radius: r } = planet;
      const tilt = preset.rings.tilt;
      ctx.save();
      ctx.rotate(tilt);
      ctx.scale(1, 0.28); // flatten to ellipse
      const ringRadius = r * 1.65;
      // Half-clip: behind = top half, front = bottom half (after rotation/scale)
      ctx.beginPath();
      if (behind) {
        ctx.rect(-ringRadius * 1.4, -ringRadius * 1.4, ringRadius * 2.8, ringRadius * 1.4);
      } else {
        ctx.rect(-ringRadius * 1.4, 0, ringRadius * 2.8, ringRadius * 1.4);
      }
      ctx.clip();

      for (let i = 0; i < preset.rings.count; i += 1) {
        const radial = ringRadius * (1 + i * 0.08);
        const grad = ctx.createRadialGradient(0, 0, radial * 0.86, 0, 0, radial * 1.05);
        grad.addColorStop(0, rgba(preset.rings.baseColor, 0));
        grad.addColorStop(0.5, rgba(preset.rings.baseColor, alpha * (0.45 - i * 0.05)));
        grad.addColorStop(1, rgba(preset.rings.baseColor, 0));
        ctx.strokeStyle = grad;
        ctx.lineWidth = ringRadius * 0.13;
        ctx.beginPath();
        ctx.arc(0, 0, radial, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    let raf = 0;

    const tick = (t) => {
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;
      ctx.clearRect(0, 0, width, height);

      if (!mouse.active) {
        raf = requestAnimationFrame(tick);
        return;
      }

      planets.forEach((p) => {
        const vx = p.x;
        const vy = p.y - scrollY;
        // Reveal radius accounts for planet's atmosphere too
        const reach = radius + p.radius * 1.4;
        if (vy < -reach || vy > height + reach) return;
        const dx = vx - mouse.x;
        const dy = vy - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d > radius + p.radius) return;
        const reveal = 1 - Math.max(0, d - p.radius * 0.4) / radius;
        const alpha = Math.pow(Math.max(0, Math.min(1, reveal)), 1.5) * 0.95;
        if (alpha < 0.02) return;
        drawPlanet(p, vx, vy, alpha, t);
      });

      // Soft halo at cursor center
      const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius * 1.05);
      halo.addColorStop(0, "rgba(216, 199, 154, 0.04)");
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(mouse.x - radius * 1.2, mouse.y - radius * 1.2, radius * 2.4, radius * 2.4);

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    raf = requestAnimationFrame(tick);
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
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
