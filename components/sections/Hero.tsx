"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

const PHOTO_SRC = "images/about/1.jpg";
const NAME_LINES = ["YOUSEF", "AL *IRAQI*"];
const TAGS = ["STEM", "RESEARCH", "ISEF", "INNOVATION", "WATER"];
const TAGLINE =
  "Student Innovator — Patent-Pending Wastewater Treatment — ESEF 2026 Finalist";

/**
 * Full-bleed photo hero.
 *
 * Entrance — the photo starts slightly zoomed in and softly blurred, then
 * settles into sharp focus while scaling down to its natural size with a
 * subtle upward drift and a smooth opacity fade.
 *
 * Exit — the image moves independently from the content with a slow scroll
 * parallax (Ken Burns continues), scaling down and drifting upward while a
 * whisper of blur and a dark overlay ease in toward the end of the cut.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // image scroll parallax — independent from the page content
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  // exit blur — animates the blur amount, not opacity, so it can never leave a
  // ghost blur behind in browsers that mis-handle backdrop-filter at opacity 0
  const exitBlur = useTransform(scrollYProgress, [0.55, 1], [
    "blur(0px)",
    "blur(5px)",
  ]);

  // sequence — words → line → tags
  const totalWords = NAME_LINES.join(" ").split(" ").length;
  const wordStagger = 0.06;
  const wordDuration = 1;
  const wordsEnd = 0.35 + (totalWords - 1) * wordStagger + wordDuration;
  const lineDelay = wordsEnd + 0.25;
  const lineDuration = 1.7;
  const tagsDelay = lineDelay + lineDuration + 0.3;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex h-[100svh] min-h-[680px] items-center justify-center overflow-hidden"
    >
      {/* photo — scroll parallax wrapper */}
      <motion.div
        style={{ scale: imgScale, y: imgY, willChange: "transform" }}
        className="pointer-events-none absolute inset-0"
      >
        {/* mobile zoom: the source photo is a tall portrait (9:16). On phones the
            hero is nearly the same ratio, so without this it would show the whole
            body. Scaling around the head band (60% height) crops to the same
            head/shoulders framing the desktop gets. */}
        <div className="h-full w-full origin-[52%_60%] scale-[1.9] md:scale-100">
          <motion.img
            src={PHOTO_SRC}
            alt=""
            draggable={false}
            initial={{ opacity: 0, scale: 1.06, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.4, ease: EASE, delay: 0.1 }}
            className="absolute inset-0 h-full w-full select-none object-cover object-[52%_60%] [filter:grayscale(0.9)_contrast(1.05)_brightness(0.8)]"
          />
        </div>
      </motion.div>

      {/* entrance blur — animates the blur amount down to zero as the photo focuses */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ backdropFilter: "blur(12px)" }}
        animate={{ backdropFilter: "blur(0px)" }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.1 }}
      />

      {/* exit blur — breathes in as the hero scrolls away */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backdropFilter: exitBlur }}
      />

      {/* tint + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-void/45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_92%_at_50%_50%,transparent_38%,rgba(0,0,0,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-void to-transparent" />

      {/* ambient neon ring — draws itself then stays */}
      <motion.svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(82vw,600px)] -translate-x-1/2 -translate-y-1/2 opacity-50"
      >
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
            pathLength: { delay: 0.9, duration: 1.9, ease: EASE },
            opacity: { delay: 0.9, duration: 1 },
          }}
        />
      </motion.svg>

      {/* content */}
      <div className="relative flex flex-col items-center px-6 text-center">
        {/* serif name — staggered word reveal */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: wordStagger, delayChildren: 0.35 },
            },
          }}
          className="font-display text-[clamp(3rem,11vw,8rem)] font-[600] leading-[0.95] tracking-tight text-bone"
        >
          {NAME_LINES.map((line, li) => {
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
                          ? "text-acid [text-shadow:0_0_40px_rgba(198,255,0,0.45)]"
                          : ""
                      }`}
                      variants={{
                        hidden: { opacity: 0, y: 14, scale: 0.96 },
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
        </motion.h1>

        {/* neon line draws left → right under the name */}
        <div className="mt-9 h-px w-56 overflow-hidden md:w-72">
          <motion.div
            className="h-full w-full origin-left bg-acid shadow-[0_0_16px_rgba(198,255,0,0.9)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: lineDuration, ease: EASE, delay: lineDelay }}
          />
        </div>

        {/* tags slide up one by one */}
        <motion.div
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
          initial="hidden"
          animate="show"
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
                hidden: { opacity: 0, y: 12 },
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

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: tagsDelay + 0.5, duration: 1.1, ease: EASE }}
          className="mt-10 max-w-xl text-[10px] font-light uppercase leading-relaxed tracking-[0.3em] text-silver"
        >
          {TAGLINE}
        </motion.p>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: tagsDelay + 1, duration: 1.2 }}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.5em] text-silver/80">
          Scroll
        </span>
        <div className="relative h-14 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute left-0 top-0 h-5 w-px bg-acid"
            animate={{ y: [-24, 56] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
