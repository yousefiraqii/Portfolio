"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  duration = 1.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({
  index,
  label,
  center = false,
}: {
  index: string;
  label: string;
  center?: boolean;
}) {
  return (
    <Reveal
      delay={0}
      y={14}
      duration={1}
      className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}
    >
      <span className="h-px w-8 bg-acid/70" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-acid">
        {label}
      </span>
      <span className="text-[10px] tracking-[0.35em] text-silver/70">{index}</span>
    </Reveal>
  );
}

/**
 * Staggered word reveal. Words wrapped in "*" are highlighted in acid green
 * and scale up slightly as they appear.
 */
export function SplitLines({
  lines,
  className = "",
  lineClass = "",
  delay = 0,
  stagger = 0.06,
}: {
  lines: string[];
  className?: string;
  lineClass?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${lineClass}`}>
          {line.split(" ").map((raw, wi) => {
            const hl = raw.includes("*");
            const word = raw.replaceAll("*", "");
            return (
              <span
                key={wi}
                className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
              >
                <motion.span
                  className={`inline-block will-change-transform ${
                    hl ? "text-acid [text-shadow:0_0_26px_rgba(198,255,0,0.35)]" : ""
                  }`}
                  variants={{
                    hidden: { y: "115%", opacity: 0, scale: hl ? 0.9 : 1 },
                    show: {
                      y: "0%",
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 1.1, ease: EASE },
                    },
                  }}
                >
                  {word}
                  {li === lines.length - 1 && wi === line.split(" ").length - 1
                    ? ""
                    : "\u00A0"}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}
