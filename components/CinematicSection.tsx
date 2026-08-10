"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { useIsTouch } from "@/lib/use-is-touch";

/**
 * Global cinematic cut system.
 *
 * Every section sits inside this wrapper. The transition is layered:
 *  - the section rises from below through a soft vertical mask as it enters,
 *  - content settles with a subtle scale (1.05 → 1) and eases into place,
 *  - as it leaves, it drifts upward with parallax, slowly fades, scales down
 *    slightly and picks up a whisper of blur,
 *  - a dark overlay breathes in during the exit so the next section emerges
 *    underneath with depth rather than a hard cut.
 *
 * Background stays pure black and sections stay transparent, so consecutive
 * wrappers visibly overlap during the swap — the cut never feels like a page
 * change.
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
  const isTouch = useIsTouch();

  // vertical mask: hero starts open, other sections reveal from the bottom
  const clip = hero
    ? undefined
    : useTransform(
        scrollYProgress,
        [0, 0.22],
        ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
      );

  const y = useTransform(
    scrollYProgress,
    hero ? [0.72, 1] : [0, 0.28, 0.72, 1],
    hero ? [0, -72] : [64, 0, 0, -64]
  );

  const scale = useTransform(
    scrollYProgress,
    hero ? [0.72, 1] : [0, 0.28, 0.72, 1],
    hero ? [1, 0.97] : [0.985, 1, 1, 0.98]
  );

  const opacity = useTransform(
    scrollYProgress,
    hero ? [0.68, 1] : [0, 0.24, 0.78, 1],
    hero ? [1, 0] : [0, 1, 1, 0]
  );

  // exit blur — a soft cinematic defocus as the section leaves
  const filter = useTransform(
    scrollYProgress,
    hero ? [0.55, 1] : [0, 0.3, 0.76, 1],
    hero
      ? ["blur(0px)", "blur(4px)"]
      : ["blur(0px)", "blur(0px)", "blur(0px)", "blur(3px)"]
  );

  // dark overlay breathes in during the exit for depth
  const overlay = useTransform(
    scrollYProgress,
    hero ? [0.55, 0.95] : [0.62, 0.92],
    hero ? [0, 0.2] : [0, 0.16]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        clipPath: isTouch ? undefined : clip,
        y,
        scale,
        opacity,
        // blur + clip-path are GPU hogs on phones — drop them on touch
        filter: isTouch ? "none" : filter,
        willChange: isTouch
          ? "transform, opacity"
          : "transform, opacity, filter",
      }}
      className={`relative ${className}`}
    >
      <div className="relative">
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-void"
          style={{ opacity: overlay }}
        />
      </div>
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
