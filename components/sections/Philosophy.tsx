"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker, SplitLines } from "@/components/Shared";

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden py-[24vh]">
      <div className="pointer-events-none absolute right-0 top-0 h-[50vh] w-[40vw] bg-[radial-gradient(circle_at_center,rgba(198,255,0,0.04),transparent_70%)] blur-2xl" />

      <div className="mx-auto max-w-6xl px-6 md:ml-[10%]">
        <Kicker index="04" label="Philosophy" />

        <h2 className="mt-14 font-display text-[clamp(2.4rem,6vw,5.6rem)] font-[400] leading-[1.12] tracking-tight text-bone md:max-w-4xl">
          <SplitLines
            lines={[
              "STILLNESS IS NOT",
              "THE ABSENCE OF *MOTION*",
              "BUT ITS HIGHEST *DISCIPLINE*.",
            ]}
            stagger={0.08}
            delay={0.1}
          />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
          className="mt-16 flex max-w-md items-start gap-6"
        >
          <span className="mt-2 h-px w-12 flex-shrink-0 bg-acid/50" />
          <p className="text-sm font-light leading-[1.9] text-silver">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
