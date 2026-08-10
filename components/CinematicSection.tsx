"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Global cinematic cut system.
 *
 * Every section sits inside this wrapper. The transition is layered:
 *  - the section rises from below with a soft reveal as it enters,
 *  - as it leaves, it drifts upward with parallax, slowly fades and scales
 *    down slightly.
 *
 * Only transform + opacity are animated (all compositor-friendly — no blur,
 * no clip-path, no main-thread raster). This keeps the whole page silky on
 * laptops and phones alike.
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

  const y = useTransform(
    scrollYProgress,
    hero ? [0.72, 1] : [0, 0.28, 0.72, 1],
    hero ? [0, -64] : [56, 0, 0, -56]
  );

  const opacity = useTransform(
    scrollYProgress,
    hero ? [0.68, 1] : [0, 0.24, 0.78, 1],
    hero ? [1, 0] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    hero ? [0.72, 1] : [0, 0.3, 0.7, 1],
    hero ? [1, 0.98] : [0.99, 1, 1, 0.99]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={`relative ${className}`}
    >
      {children}
      {sweep && <SweepLine />}
    </motion.div>
  );
}

/**
 * A thin neon-green light line that sweeps across the screen once,
 * used on the most important transitions (photo → robot, robot → text).
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
