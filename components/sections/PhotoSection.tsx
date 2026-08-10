"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const PHOTO_SRC = "images/about/profile.png";

const HEADING_LINES = ["DIRTY WATER,", "CLEAN *FUTURE*."];
const TAGS = ["STEM", "RESEARCH", "ISEF", "INNOVATION", "WATER"];

/**
 * The critical visual moment — a full-bleed, dark desaturated photo with a
 * slow Ken Burns drift, staggered serif word reveal, a self-drawing neon
 * progress line, then tags appearing one by one.
 *
 * Every layer (image + overlays) is pointer-events-none so the custom cursor
 * is never captured, dimmed, or blocked here.
 */
export default function PhotoSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // extremely slow Ken Burns: gentle zoom + slight pan across the scroll
  const kbScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.3]);
  const kbX = useTransform(scrollYProgress, [0, 1], ["-1.5%", "1.5%"]);

  // sequence timing — words → line → tags
  const totalWords = HEADING_LINES.join(" ").split(" ").length;
  const wordStagger = 0.055;
  const wordDuration = 0.85;
  const wordsEnd = 0.4 + (totalWords - 1) * wordStagger + wordDuration;
  const lineDelay = wordsEnd + 0.25;
  const lineDuration = 1.7;
  const tagsDelay = lineDelay + lineDuration + 0.3;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* photo — never captures the cursor */}
      <motion.img
        src={PHOTO_SRC}
        alt=""
        draggable={false}
        style={{ scale: kbScale, x: kbX }}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[50%_18%] [filter:grayscale(0.92)_contrast(1.06)_brightness(0.82)]"
      />

      {/* soft tint + vignette so the text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-void/45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_92%_at_50%_50%,transparent_38%,rgba(0,0,0,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-void to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />

      {/* content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[10px] font-semibold uppercase tracking-[0.55em] text-acid/80"
        >
          Profile — The Scientist
        </motion.p>

        {/* word-by-word reveal */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: wordStagger, delayChildren: 0.2 },
            },
          }}
          className="mt-8 font-display text-[clamp(2.6rem,7vw,6rem)] font-[500] leading-[1.05] tracking-tight text-bone"
        >
          {HEADING_LINES.map((line, li) => {
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
                          ? "text-acid [text-shadow:0_0_34px_rgba(198,255,0,0.45)]"
                          : ""
                      }`}
                      variants={{
                        hidden: { opacity: 0, y: 16, scale: 0.98 },
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
        </motion.h2>

        {/* self-drawing neon progress line */}
        <div className="mt-10 h-px w-56 overflow-hidden md:w-72">
          <motion.div
            className="h-full w-full origin-left bg-acid shadow-[0_0_16px_rgba(198,255,0,0.9)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: lineDuration, ease: EASE, delay: lineDelay }}
          />
        </div>

        {/* tags slide up one by one after the line finishes */}
        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1, delayChildren: tagsDelay },
            },
          }}
        >
          {TAGS.map((t) => (
            <motion.span
              key={t}
              className="border border-acid/40 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-acid backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* corner plate — pointer-events-none so the cursor stays free */}
      <span className="pointer-events-none absolute bottom-6 right-6 text-[9px] uppercase tracking-[0.5em] text-silver/50">
        Fig. 01 — Placeholder
      </span>
    </section>
  );
}
