"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker, SplitLines } from "@/components/Shared";

export default function Closing() {
  return (
    <section
      id="epilogue"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden py-[18vh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_55%,rgba(198,255,0,0.05),transparent_70%)]" />

      <div className="relative px-6 text-center">
        <div className="flex justify-center">
          <Kicker index="11" label="Epilogue" center />
        </div>

        <h2 className="mt-14 font-display text-[clamp(2.8rem,9vw,7.5rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          <SplitLines
            lines={["THE FINAL FRAME", "IS A *BEGINNING*."]}
            stagger={0.09}
            delay={0.1}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
          className="mx-auto mt-12 max-w-md text-sm font-light leading-relaxed text-silver"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
          style={{ transformOrigin: "center" }}
          className="mx-auto mt-14 h-px w-48 bg-acid/70 shadow-[0_0_16px_rgba(198,255,0,0.5)]"
        />
      </div>
    </section>
  );
}
