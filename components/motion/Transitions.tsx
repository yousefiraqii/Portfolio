"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Scroll-driven parallax wrapper.
 * The child drifts on its own y (and optionally x) axis, scales from slightly
 * large to slightly small, and can add a subtle blur + fade as it exits.
 * Slow, controlled and independent from the surrounding page content.
 */
export function Parallax({
  children,
  className = "",
  yAmt = 56,
  xAmt = 0,
  scaleFrom = 1.05,
  scaleTo = 0.96,
}: {
  children: ReactNode;
  className?: string;
  yAmt?: number;
  xAmt?: number;
  scaleFrom?: number;
  scaleTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [yAmt, -yAmt]);
  const x = xAmt ? useTransform(scrollYProgress, [0, 1], [xAmt, -xAmt]) : undefined;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom, 1, scaleTo]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [1, 1, 1, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, x, scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * One-shot masked entrance reveal.
 * The child starts hidden behind a rectangular mask that expands upward while
 * the content simultaneously settles from a slightly larger scale and a small
 * vertical offset. Used for photos and hero blocks.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  scaleFrom = 1.05,
  duration = 1.3,
  margin = "-12% 0px",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scaleFrom?: number;
  duration?: number;
  margin?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        clipPath: "inset(100% 0 0 0)",
        opacity: 0,
        y,
        scale: scaleFrom,
      }}
      whileInView={{
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
