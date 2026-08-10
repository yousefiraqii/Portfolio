"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const TITLE = ["DISPLAY", "TEXT"];

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* ambient bloom */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgba(198,255,0,0.07),transparent_70%)]" />

      {/* ring: draws itself, then rotates gently forever */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(86vw,600px)] -translate-x-1/2 -translate-y-1/2"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{
          duration: 120,
          ease: "linear",
          repeat: Infinity,
          delay: 2.6,
          opacity: { delay: 2.6, duration: 1.4 },
        }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <motion.circle
            cx="200"
            cy="200"
            r="199"
            fill="none"
            stroke="#c6ff00"
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { delay: 1.3, duration: 1.9, ease: EASE },
              opacity: { delay: 1.3, duration: 1.2 },
            }}
          />
        </svg>
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid shadow-[0_0_10px_rgba(198,255,0,0.9)]" />
        <div className="absolute inset-4 rounded-full border border-white/5" />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.6, ease: EASE }}
          className="mb-12 text-[10px] font-medium uppercase tracking-[0.5em] text-silver md:text-[11px]"
        >
          Cinematic Portfolio — MMXXVI
        </motion.p>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.7, ease: EASE, delay: 0.4 }}
            className="relative"
          >
            {TITLE.map((line, i) => (
              <motion.h1
                key={line}
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.55 + i * 0.18 }}
                className="overflow-hidden font-display text-[clamp(3.4rem,11vw,8.5rem)] font-[600] leading-[0.95] tracking-tight text-bone"
              >
                <span className="block">{line}</span>
              </motion.h1>
            ))}
          </motion.div>

          {/* light sweep */}
          <div className="pointer-events-none absolute inset-x-0 top-[52%] h-px overflow-hidden">
            <motion.div
              initial={{ x: "-160%", opacity: 0 }}
              animate={{ x: "220%", opacity: [0, 1, 0] }}
              transition={{ duration: 2.6, delay: 1.5, ease: EASE, times: [0, 0.25, 1] }}
              className="h-[2px] w-[42%] rounded-full bg-gradient-to-r from-transparent via-acid to-transparent shadow-[0_0_24px_4px_rgba(198,255,0,0.4)]"
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1.2, ease: EASE }}
          className="mt-12 max-w-sm text-sm font-light leading-relaxed text-silver"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt.
        </motion.p>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.4 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.5em] text-silver/80">
          Scroll
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-acid"
            animate={{ y: [-24, 56] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
