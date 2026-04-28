"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic 3D nebula:
 *  - Center: shader-displaced "liquid metal" sphere with fresnel + chromatic rim
 *  - Around: shader-particle field with depth-based color & swirl flow
 *  - Two thin orbital rings with subtle dash, tilted for depth
 *  - Chromatic aberration vignette (post-feel) via radial gradient layered on top
 *  - Reactive to pointer + scroll
 */

const NOISE_GLSL = `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
`;

export default function HeroNebula3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = () => container.clientWidth || window.innerWidth;
    const height = () => container.clientHeight || window.innerHeight;
    let mobileLayout = width() < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !mobileLayout,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileLayout ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.className = "hero-3d-canvas";

    const root = new THREE.Group();
    scene.add(root);

    // ---------- Center: displaced "aurora" sphere ----------
    const sphereUniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color(0x4a4a55) }, // graphite
      uColorB: { value: new THREE.Color(0x8a7e60) }, // dim champagne
      uColorC: { value: new THREE.Color(0xd8c79a) }, // champagne highlight
      uColorD: { value: new THREE.Color(0x2a2a32) }, // deep shadow
      uIntensity: { value: 0.42 }
    };

    const sphereGeo = new THREE.IcosahedronGeometry(1.05, mobileLayout ? 4 : 5);
    const sphereMat = new THREE.ShaderMaterial({
      uniforms: sphereUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: `
        ${NOISE_GLSL}
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uIntensity;
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vDisp;
        void main(){
          vec3 p = position;
          float n1 = snoise(p * 0.7 + uTime * 0.18);
          float n2 = snoise(p * 1.6 + uTime * 0.32 + vec3(uPointer * 1.4, 0.0));
          float disp = n1 * 0.35 + n2 * 0.18;
          disp += sin(p.y * 3.2 + uTime * 0.6) * 0.04;
          p += normal * disp * uIntensity;
          vNormal = normalize(normalMatrix * normal);
          vPos = p;
          vDisp = disp;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform vec3 uColorD;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vDisp;
        void main(){
          vec3 viewDir = normalize(cameraPosition - vPos);
          float fres = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.6);
          float band = smoothstep(-0.3, 0.6, vDisp);
          vec3 col = mix(uColorA, uColorB, band);
          col = mix(col, uColorD, smoothstep(0.0, 0.4, fres * 0.8));
          col += uColorC * fres * 0.55;
          float pulse = 0.5 + 0.5 * sin(uTime * 0.6 + vDisp * 4.0);
          col *= 0.85 + pulse * 0.18;
          float alpha = 0.32 + fres * 0.55;
          gl_FragColor = vec4(col, alpha);
        }
      `,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    root.add(sphere);

    // Inner glowing core (smaller, subtle)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xf5f3ee,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), coreMat);
    root.add(core);

    // ---------- Particle field (depth-aware) ----------
    const particleCount = mobileLayout ? 420 : 850;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    const tints = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 3.2 + Math.pow(Math.random(), 1.6) * 14;
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * 5.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = elevation + Math.sin(angle * 1.3) * 0.4;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.55;
      speeds[i] = 0.12 + Math.random() * 0.5;
      sizes[i] = 0.6 + Math.random() * 2.4;
      tints[i] = Math.random();
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    particleGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute("aTint", new THREE.BufferAttribute(tints, 1));

    const particleUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uPointer: { value: new THREE.Vector2(0, 0) }
    };

    const particleMat = new THREE.ShaderMaterial({
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSpeed;
        attribute float aSize;
        attribute float aTint;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform vec2 uPointer;
        varying float vTint;
        varying float vAlpha;
        void main(){
          vec3 p = position;
          float angle = uTime * 0.04 * aSpeed;
          float c = cos(angle);
          float s = sin(angle);
          // gentle spiral around Y
          p.xz = mat2(c, -s, s, c) * p.xz;
          // subtle pointer-driven drift
          p.x += uPointer.x * 0.6 * (0.4 + aSpeed);
          p.y += uPointer.y * 0.4 * (0.4 + aSpeed);
          // breathing wave
          p.y += sin(uTime * 0.6 + aTint * 6.28) * 0.06;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * (220.0 / -mv.z) * uPixelRatio * 0.6;
          gl_Position = projectionMatrix * mv;
          vTint = aTint;
          vAlpha = clamp(1.0 - (-mv.z - 4.0) / 14.0, 0.05, 0.95);
        }
      `,
      fragmentShader: `
        varying float vTint;
        varying float vAlpha;
        void main(){
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float core = smoothstep(0.5, 0.0, d);
          float halo = smoothstep(0.5, 0.15, d) * 0.45;
          // palette interp: indigo -> teal -> champagne
          vec3 c1 = vec3(0.39, 0.40, 0.95); // indigo
          vec3 c2 = vec3(0.13, 0.83, 0.93); // teal
          vec3 c3 = vec3(0.85, 0.78, 0.60); // champagne
          vec3 col = mix(c1, c2, smoothstep(0.0, 0.55, vTint));
          col = mix(col, c3, smoothstep(0.55, 1.0, vTint));
          float a = (core + halo) * vAlpha * 0.55;
          if (a < 0.01) discard;
          gl_FragColor = vec4(col * (0.6 + core * 0.5), a);
        }
      `
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    root.add(particles);

    // ---------- Orbital rings ----------
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xc7d2fe,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xd8c79a,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.004, 8, 240), ringMat1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.003, 8, 240), ringMat2);
    ring1.rotation.set(Math.PI / 2.2, 0.4, 0.18);
    ring2.rotation.set(Math.PI / 2.6, -0.5, -0.22);
    root.add(ring1);
    root.add(ring2);

    // ---------- Camera ----------
    const applyLayout = () => {
      mobileLayout = width() < 768;
      camera.position.set(0, 0.4, mobileLayout ? 9.4 : 8.6);
      root.position.set(0, mobileLayout ? -1.4 : -1.6, 0);
      root.scale.setScalar(mobileLayout ? 0.7 : 0.85);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileLayout ? 1.25 : 1.5));
      particleUniforms.uPixelRatio.value = renderer.getPixelRatio();
    };

    applyLayout();

    // ---------- Pointer & scroll state ----------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const scrollState = { y: 0, ty: 0 };

    const resize = () => {
      applyLayout();
      const w = width();
      const h = height();
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    };

    const onScroll = () => {
      scrollState.ty = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.4);
    };

    const startedAt = performance.now();
    let frame = 0;
    let inView = true;
    let pageVisible = !document.hidden;

    const shouldAnimate = () => !prefersReducedMotion && inView && pageVisible;

    const startLoop = () => {
      if (!frame && shouldAnimate()) {
        frame = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      frame = 0;
      const t = (performance.now() - startedAt) / 1000;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      scrollState.y += (scrollState.ty - scrollState.y) * 0.06;

      sphereUniforms.uTime.value = t;
      sphereUniforms.uPointer.value.set(pointer.x, pointer.y);
      particleUniforms.uTime.value = t;
      particleUniforms.uPointer.value.set(pointer.x, pointer.y);

      // root: continuous ambient motion + scroll/pointer parallax
      root.rotation.y = t * 0.18 + pointer.x * 0.5;
      root.rotation.x = -pointer.y * 0.22 + scrollState.y * 0.22 + Math.sin(t * 0.4) * 0.05;
      root.position.y = (mobileLayout ? -1.4 : -1.6) - scrollState.y * 0.6 + Math.sin(t * 0.5) * 0.08;
      root.position.x = Math.sin(t * 0.3) * 0.12;

      sphere.rotation.y = -t * 0.28;
      sphere.rotation.x = Math.sin(t * 0.45) * 0.18;
      sphere.rotation.z = Math.cos(t * 0.3) * 0.1;
      core.rotation.y = t * 0.6;
      core.rotation.x = -t * 0.4;

      particles.rotation.y = t * 0.05;
      particles.rotation.x = Math.sin(t * 0.2) * 0.12;

      ring1.rotation.z = t * 0.18;
      ring1.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.25) * 0.15;
      ring2.rotation.z = -t * 0.14;
      ring2.rotation.x = Math.PI / 2.6 + Math.cos(t * 0.18) * 0.12;

      renderer.render(scene, camera);

      startLoop();
    };

    resize();
    onScroll();
    animate();

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) startLoop();
      },
      { rootMargin: "200px 0px" }
    );

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startLoop();
    };

    observer.observe(container);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sphereGeo.dispose();
      sphereMat.dispose();
      core.geometry.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ring1.geometry.dispose();
      ringMat1.dispose();
      ring2.geometry.dispose();
      ringMat2.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="hero-3d-field" aria-hidden="true" ref={containerRef}>
      <div className="hero-vignette" />
    </div>
  );
}
