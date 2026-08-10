"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  layer: number;
};

/**
 * Floating node network — each node drifts independently; lines and nodes
 * glow brighter as the pointer approaches.
 */
export default function NodeNetwork() {
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
    let nodes: Node[] = [];
    let mx = -9999;
    let my = -9999;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.min(72, Math.floor((w * h) / 18000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6,
        layer: Math.random(),
      }));
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    const LINK = 130;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      // links — glow brighter near the pointer
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const base = (1 - Math.sqrt(d2) / LINK) * 0.35;
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const near = Math.hypot(midX - mx, midY - my);
            const boost = near < 150 ? 1 - near / 150 : 0;
            const alpha = Math.min(0.95, base + boost * 0.7);

            ctx.strokeStyle = `rgba(198,255,0,${alpha.toFixed(3)})`;
            ctx.lineWidth = boost > 0 ? 1.4 : 0.7;
            if (boost > 0) {
              ctx.shadowColor = "rgba(198,255,0,0.6)";
              ctx.shadowBlur = 12;
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const depth = n.layer;
        const near = Math.hypot(n.x - mx, n.y - my);
        const glow = near < 60 ? 1 - near / 60 : 0;
        const r = n.r + glow * 1.6;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.66
            ? "#c6ff00"
            : depth > 0.33
              ? "rgba(198,255,0,0.6)"
              : "rgba(255,255,255,0.35)";
        if (glow > 0) {
          ctx.shadowColor = "rgba(198,255,0,0.9)";
          ctx.shadowBlur = 16;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    ro.observe(canvas);

    if (reduceMotion) draw();
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={ref}
        className="block h-[520px] w-full"
        aria-label="Animated network of connected nodes"
        role="img"
      />
    </div>
  );
}
