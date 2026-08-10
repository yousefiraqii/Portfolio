"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import { stats } from "@/lib/data";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => String(Math.floor(v)).padStart(2, "0"));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 2.4, ease: EASE });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span ref={ref}>
      <motion.span className="tabular-nums">{text}</motion.span>
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative py-[18vh]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-center">
          <Kicker index="01" label="By The Numbers" />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-y-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
              className="flex flex-col items-center"
            >
              <span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-[500] leading-none text-bone [text-shadow:0_0_30px_rgba(198,255,0,0.25)]">
                <Counter value={s.value} />
              </span>
              <span className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-silver">
                <span className="h-px w-5 bg-acid/60" />
                {s.label}
                <span className="h-px w-5 bg-acid/60" />
              </span>
              <span className="mt-6 h-1 w-24 bg-[radial-gradient(ellipse_at_center,rgba(198,255,0,0.4),transparent_70%)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
