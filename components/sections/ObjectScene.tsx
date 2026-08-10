"use client";

import { useEffect, useRef } from "react";
import { Parallax } from "@/components/motion/Transitions";

/**
 * 3D wireframe object — a molecular cage built from points on a sphere.
 * Fades in with a soft scale, then idles with a slow Y-rotation and a tiny
 * floating bob. Edges glow brighter toward the viewer.
 */
export default function ObjectScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const touch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    const DPR = touch ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    const start = performance.now();

    // fibonacci sphere — even distribution of nodes
    const N = touch ? 40 : 64;
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      });
    }

    // connect near neighbours into a wireframe cage
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = pts[i];
        const b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (d < 0.42) edges.push([i, j]);
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      const t = reduce ? 1.4 : (now - start) / 1000;
      const rotY = t * 0.22;
      const rotX = 0.42 + Math.sin(t * 0.18) * 0.06;
      const float = reduce ? 0 : Math.sin(t * 0.6) * 10;

      const cx = w / 2;
      const cy = h / 2 + float;
      const R = Math.min(w, h) * 0.3;
      const fov = 340;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const proj = pts.map((p) => {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        const y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const s = fov / (fov + z * R);
        return { px: cx + x * R * s, py: cy + y * R * s, z };
      });

      // edges — glow fades with depth
      for (const [i, j] of edges) {
        const a = proj[i];
        const b = proj[j];
        const depth = (a.z + b.z) / 2;
        const alpha = 0.06 + 0.5 * (1 - (depth + 1) / 2);
        ctx.strokeStyle = `rgba(198,255,0,${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      }

      // nodes — painter's order so nearer ones sit on top
      const order = proj.map((p, i) => ({ p, i })).sort((a, b) => b.p.z - a.p.z);
      for (const { p } of order) {
        const r = Math.max(0.4, (p.z > 0 ? 1.25 : 0.85) * 1.1);
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.z > 0.3
            ? "rgba(198,255,0,0.9)"
            : p.z > -0.3
              ? "rgba(198,255,0,0.5)"
              : "rgba(255,255,255,0.25)";
        ctx.fill();
      }

      // core glow
      ctx.beginPath();
      ctx.arc(cx, cy + float, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#c6ff00";
      ctx.shadowColor = "rgba(198,255,0,0.9)";
      ctx.shadowBlur = 26;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <Parallax
      xAmt={26}
      yAmt={42}
      scaleFrom={1.06}
      scaleTo={0.96}
      className="relative"
    >
      <canvas
        ref={ref}
        className="block h-[520px] w-full"
        aria-label="3D wireframe object in motion"
        role="img"
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] uppercase tracking-[0.5em] text-silver/40">
        Structure in Motion
      </span>
    </Parallax>
  );
}
