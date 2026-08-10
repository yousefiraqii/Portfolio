"use client";

import { useEffect, useRef } from "react";

export default function ObjectScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const CX = () => w / 2;
    const CY = () => h / 2;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      const t = reduceMotion ? 0.6 : (now - start) / 1000;

      // ---- orbit ring ----
      ctx.save();
      ctx.translate(CX(), CY());
      ctx.rotate(0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(w, h) * 0.34, Math.min(w, h) * 0.12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(198,255,0,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // orbit dot
      const ox = Math.cos(t * 0.5) * Math.min(w, h) * 0.34;
      const oy = Math.sin(t * 0.5) * Math.min(w, h) * 0.12;
      ctx.beginPath();
      ctx.arc(ox, oy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#c6ff00";
      ctx.fill();
      ctx.restore();

      // ---- core molecule: hexagon of beads around a center ----
      const R = Math.min(w, h) * 0.13;
      const rot = t * 0.3;

      const nodes = Array.from({ length: 6 }, (_, i) => {
        const a = rot + (i * Math.PI) / 3;
        return { x: CX() + Math.cos(a) * R, y: CY() + Math.sin(a) * R * 0.6 };
      });

      // bonds
      ctx.strokeStyle = "rgba(198,255,0,0.35)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const n2 = nodes[(i + 1) % nodes.length];
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
        // spoke to center
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(CX(), CY());
        ctx.stroke();
      }

      // center node
      ctx.beginPath();
      ctx.arc(CX(), CY(), 6, 0, Math.PI * 2);
      ctx.fillStyle = "#c6ff00";
      ctx.shadowColor = "rgba(198,255,0,0.9)";
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // ring nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(198,255,0,0.9)";
        ctx.fill();
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(performance.now());
    });
    ro.observe(canvas);

    if (reduceMotion) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={ref}
        className="h-[420px] w-full"
        aria-label="Animated molecular structure"
        role="img"
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[9px] uppercase tracking-[0.5em] text-silver/40">
        Structure in Motion
      </span>
    </div>
  );
}
