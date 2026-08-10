"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Kicker } from "@/components/Shared";

const STEPS = [
  { num: "01", label: "CONCEPT" },
  { num: "02", label: "PROTOTYPE" },
  { num: "03", label: "REFINEMENT" },
  { num: "04", label: "RELEASE" },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const [active, setActive] = useState(-1);

  useEffect(
    () =>
      scrollYProgress.on("change", (v) =>
        setActive(
          Math.min(STEPS.length - 1, Math.max(-1, Math.floor(v * STEPS.length)))
        )
      ),
    [scrollYProgress]
  );

  return (
    <section id="process" ref={ref} className="relative py-[22vh]">
      <div className="mx-auto">
        <div className="flex justify-center">
          <Kicker index="07" label="Process" />
        </div>

        <div className="mt-16 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative mx-auto w-max min-w-full px-6">
            <div className="relative flex items-start justify-between gap-10 md:gap-6">
              {/* track */}
              <div className="absolute left-6 right-6 top-7 h-px bg-white/10" />
              {/* fill */}
              <motion.div
                className="absolute left-6 top-7 h-px bg-acid shadow-[0_0_14px_rgba(198,255,0,0.6)]"
                style={{
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                  width: "calc(100% - 3rem)",
                }}
              />

              {STEPS.map((s, i) => (
                <div
                  key={s.label}
                  className="relative flex w-36 flex-col items-center md:w-44"
                >
                  <motion.div className="relative flex h-14 w-14 items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: "rgba(198,255,0,0.6)" }}
                      animate={{
                        scale: active >= i ? [1, 1.42, 1] : 1,
                        opacity: active >= i ? [0.6, 0.12, 0.6] : 0.25,
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: active >= i ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.span
                      className="relative h-3 w-3 rounded-full"
                      animate={{
                        scale: active >= i ? 1 : 0.6,
                        opacity: active >= i ? 1 : 0.3,
                        backgroundColor: active >= i ? "#c6ff00" : "#ffffff",
                        boxShadow:
                          active >= i
                            ? "0 0 16px 4px rgba(198,255,0,0.7)"
                            : "none",
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.div>

                  <span
                    className={`mt-7 font-display text-xl tracking-[0.2em] transition-colors duration-700 ${
                      active >= i ? "text-acid" : "text-white/25"
                    }`}
                  >
                    {s.num}
                  </span>
                  <span
                    className={`mt-2 text-[10px] font-medium uppercase tracking-[0.35em] transition-colors duration-700 ${
                      active >= i ? "text-bone" : "text-silver/50"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
