"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Global cinematic cut system.
 * Each section sits inside this wrapper, which drives a soft
 * fade + scale (1 → 0.97) as the section leaves and the reverse as it
 * enters. Adjacent wrappers overlap ~200–300ms so the cut never jumps.
 * Background stays pure black (sections are transparent).
 */
export default function CinematicSection({
  children,
  className = "",
  sweep = false,
  hero = false,
}: {
  children: React.ReactNode;
  className?: string;
  sweep?: boolean;
  hero?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // hero stays fully visible on load, only fades out as it leaves
  const opacity = useTransform(
    scrollYProgress,
    hero ? [0.75, 1] : [0, 0.2, 0.8, 1],
    hero ? [1, 0] : [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    hero ? [0.7, 1] : [0, 0.25, 0.75, 1],
    hero ? [1, 0.97] : [0.97, 1, 1, 0.97]
  );
  const y = useTransform(
    scrollYProgress,
    hero ? [0.75, 1] : [0, 0.25, 0.75, 1],
    hero ? [0, -56] : [44, 0, 0, -44]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, willChange: "transform, opacity" }}
      className={`relative ${className}`}
    >
      {children}
      {sweep && <SweepLine />}
    </motion.div>
  );
}

/**
 * A thin neon-green light line that sweeps across the screen once,
 * used on the most important transitions (hero → photo, photo → robot,
 * robot → text).
 */
function SweepLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/2 z-30 overflow-hidden"
    >
      <motion.div
        className="h-[2px] w-1/3 rounded-full bg-gradient-to-r from-transparent via-acid to-transparent shadow-[0_0_36px_8px_rgba(198,255,0,0.45)]"
        initial={{ x: "-160%", opacity: 0 }}
        animate={inView ? { x: "380%", opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
      />
    </div>
  );
}
