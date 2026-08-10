"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";

type Node = { id: number; x: number; y: number; r: number };

const NODES: Node[] = [
  { id: 0, x: 8, y: 32, r: 7 },
  { id: 1, x: 20, y: 68, r: 4 },
  { id: 2, x: 26, y: 24, r: 5 },
  { id: 3, x: 36, y: 55, r: 3 },
  { id: 4, x: 44, y: 18, r: 6 },
  { id: 5, x: 52, y: 48, r: 4 },
  { id: 6, x: 58, y: 74, r: 3 },
  { id: 7, x: 66, y: 30, r: 5 },
  { id: 8, x: 74, y: 62, r: 4 },
  { id: 9, x: 82, y: 22, r: 3 },
  { id: 10, x: 90, y: 54, r: 6 },
  { id: 11, x: 14, y: 84, r: 3 },
  { id: 12, x: 62, y: 88, r: 4 },
  { id: 13, x: 34, y: 12, r: 3 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 11],
  [1, 3],
  [2, 4],
  [2, 13],
  [3, 5],
  [4, 5],
  [4, 13],
  [5, 6],
  [6, 8],
  [6, 12],
  [7, 8],
  [7, 9],
  [8, 10],
  [9, 10],
];

function linksOf(id: number) {
  return LINKS.filter(([a, b]) => a === id || b === id).flat();
}

export default function NodeNetwork() {
  const [hover, setHover] = useState<number | null>(null);
  const connected = hover === null ? new Set<number>() : new Set(linksOf(hover));

  return (
    <section id="network" className="relative overflow-hidden py-[18vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,rgba(198,255,0,0.035),transparent_70%)]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-center">
          <Kicker index="09" label="Network" />
        </div>
      </div>

      <motion.div
        className="relative mx-auto mt-14 h-[70vh] min-h-[460px] max-w-6xl"
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 2, ease: EASE }}
      >
        {/* connecting lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {LINKS.map(([a, b], i) => {
            const n1 = NODES[a];
            const n2 = NODES[b];
            const lit = hover !== null && connected.has(a) && connected.has(b);
            return (
              <motion.line
                key={i}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={0.22}
                stroke={lit ? "#d9ff4d" : "#3c6b27"}
                initial={{ opacity: 0.18 }}
                animate={{ opacity: lit ? 0.95 : 0.18 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {NODES.map((n) => {
          const lit = hover === n.id;
          const neighbor = connected.has(n.id);
          const size = n.r * 2.2;
          return (
            <motion.button
              key={n.id}
              aria-label={`Node ${n.id}`}
              className="absolute rounded-full"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                width: size,
                height: size,
              }}
              animate={{ y: [0, -4, 0], x: [0, 2, 0] }}
              transition={{
                duration: 6 + n.id,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  backgroundColor: lit
                    ? "#c6ff00"
                    : neighbor
                      ? "rgba(140,180,90,0.6)"
                      : "rgba(110,140,80,0.5)",
                  boxShadow: lit
                    ? "0 0 18px 4px rgba(198,255,0,0.55)"
                    : neighbor
                      ? "0 0 12px 2px rgba(160,200,110,0.35)"
                      : "0 0 8px 1px rgba(150,190,120,0.22)",
                  scale: lit ? 1.28 : neighbor ? 1.1 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <span className="absolute -inset-3 rounded-full border border-acid/15" />
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}
