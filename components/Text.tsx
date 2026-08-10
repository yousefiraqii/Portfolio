"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Style A — Large display text.
 * Words fade + rise 16px + scale 0.96 → 1, staggered 40–70ms apart.
 * Use "\n" for line breaks and "*word*" for neon accents.
 */
export function Words({
  text,
  className = "",
  stagger = 0.06,
  delay = 0,
  wordDuration = 1,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  wordDuration?: number;
}) {
  const lines = text.split("\n");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((raw, wi) => {
              const hl = raw.startsWith("*") && raw.endsWith("*");
              return (
                <motion.span
                  key={wi}
                  className={`inline-block will-change-transform ${
                    hl
                      ? "text-acid [text-shadow:0_0_28px_rgba(198,255,0,0.35)]"
                      : ""
                  }`}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.96 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: wordDuration, ease: EASE },
                    },
                  }}
                >
                  {raw.replaceAll("*", "")}
                  {wi < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.span>
  );
}

/**
 * Style B — Body / philosophy text.
 * Paragraphs split on "\n\n". Lines fade + rise; keywords wrapped in
 * "*...*" get a neon color and a tiny scale pop (1 → 1.04 → 1).
 */
export function Body({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
    >
      {text.split("\n\n").map((para, pi) => (
        <motion.p
          key={pi}
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
          }}
        >
          {parseKeywords(para)}
        </motion.p>
      ))}
    </motion.div>
  );
}

function parseKeywords(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <motion.span
          key={i}
          className="text-acid [text-shadow:0_0_18px_rgba(198,255,0,0.35)]"
          variants={{
            hidden: { scale: 1 },
            show: {
              scale: [1, 1.05, 1],
              transition: { duration: 1.1, ease: EASE },
            },
          }}
        >
          {part.slice(1, -1)}
        </motion.span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Style C — Labels & small text. Simple fade + 8px rise, 0.55s.
 */
export function Label({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}
