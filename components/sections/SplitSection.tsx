"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker, Reveal } from "@/components/Shared";

export default function SplitSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);

  return (
    <section id="split" ref={ref} className="relative overflow-hidden py-[18vh]">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-10 lg:gap-20">
        {/* abstract image side */}
        <motion.div className="relative aspect-[4/5] overflow-hidden bg-ash">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(198,255,0,0.12),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_60%)]" />
            <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_60%_70%,transparent_0deg,rgba(120,255,200,0.06)_120deg,transparent_240deg)]" />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid/15" />
          </motion.div>
          <div className="pointer-events-none absolute inset-4 border border-white/5" />
          <span className="absolute left-7 top-7 h-px w-10 bg-acid/60" />
          <span className="absolute bottom-7 right-7 text-[10px] tracking-[0.4em] text-silver/50">
            FIG. 01
          </span>
        </motion.div>

        {/* text side */}
        <div className="md:pl-4">
          <Kicker index="06" label="Symmetry" />

          <motion.h3
            initial={{ opacity: 0, x: 44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, ease: EASE }}
            className="mt-8 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-[500] leading-[1.05] tracking-tight text-bone"
          >
            TENSION &amp;
            <br />
            RELEASE.
          </motion.h3>

          <Reveal delay={0.15} className="mt-8 max-w-md space-y-5 text-sm font-light leading-[1.9] text-silver">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Reveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mt-10 h-px w-40 bg-acid shadow-[0_0_14px_rgba(198,255,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
