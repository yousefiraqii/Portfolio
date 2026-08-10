"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker, SplitLines } from "@/components/Shared";

export default function TypographyScene() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="scenes" ref={ref} className="relative overflow-hidden py-[26vh]">
      {/* parallax backdrop */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,0,0.055),transparent_65%)] blur-2xl" />
        <div className="absolute left-[8%] top-[18%] h-[42vmin] w-[24vmin] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.035),transparent_70%)]" />
        <div className="absolute bottom-[12%] right-[6%] h-[46vmin] w-[46vmin] rounded-full bg-[radial-gradient(circle,rgba(120,255,200,0.04),transparent_70%)] blur-3xl" />
      </motion.div>

      {/* ghost word */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span className="font-display text-[18vw] leading-none tracking-tight text-white/[0.02]">
          SCENE
        </span>
      </div>

      <motion.div style={{ y: textY }} className="relative mx-auto max-w-5xl px-6">
        <Kicker index="02" label="The Typography" />

        <h2 className="mt-10 font-display text-[clamp(2.6rem,7.5vw,6.5rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          <SplitLines lines={["EVERY SCROLL", "IS A *SCENE*."]} stagger={0.07} />
        </h2>

        {/* drawn line */}
        <motion.div className="mt-14 h-px w-full overflow-hidden">
          <motion.div
            className="h-full bg-acid shadow-[0_0_18px_rgba(198,255,0,0.5)]"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
