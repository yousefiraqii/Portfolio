"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Lightbox from "@/components/ui/Lightbox";
import { isefJourney } from "@/lib/data";

/**
 * The ISEF timeline. A neon rail draws itself from top to bottom as you
 * scroll, and each node lights up with a glowing pulse one by one.
 */
export default function IsefJourney() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="isef" className="relative py-[20vh]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[40rem] w-[40rem] rounded-full bg-acid/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <Kicker index="06" label="The ISEF Journey" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.05] tracking-tight text-bone">
          SEVEN YEARS, <span className="text-acid">ONE QUESTION.</span>
        </h2>

        <div ref={listRef} className="relative mt-20">
          {/* static rail */}
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10" />
          {/* self-drawing neon rail */}
          <motion.span
            style={{ scaleY: railScale }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-acid shadow-[0_0_10px_rgba(198,255,0,0.7)]"
          />

          <div className="space-y-14">
            {isefJourney.map((e) => (
              <motion.div
                key={e.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 1.2, ease: EASE }}
                className="group relative pl-10"
              >
                {/* glowing node */}
                <span className="absolute left-[7px] top-2 flex h-[15px] w-[15px] -translate-x-1/2 items-center justify-center">
                  <motion.span
                    className="block h-[7px] w-[7px] rounded-full bg-acid"
                    initial={{ scale: 0.4, boxShadow: "0 0 0 0 rgba(198,255,0,0)" }}
                    whileInView={{
                      scale: 1,
                      boxShadow: [
                        "0 0 0 0 rgba(198,255,0,0.9)",
                        "0 0 18px 7px rgba(198,255,0,0)",
                      ],
                    }}
                    viewport={{ once: true, margin: "-20% 0px" }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
                  />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="font-display text-5xl font-[500] italic leading-none text-acid/90">
                    {e.year}
                  </span>
                  <h3 className="font-display text-lg tracking-wide text-bone">
                    {e.title}
                  </h3>
                </div>

                <p className="mt-4 text-sm font-light leading-[1.85] text-silver">
                  {e.desc}
                </p>

                {e.photos.length > 0 && (
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {e.photos.map((ph) => (
                      <button
                        key={ph}
                        onClick={() => setLightbox(ph)}
                        aria-label="Enlarge photo"
                        className="group/photo relative aspect-[4/3] cursor-zoom-in overflow-hidden border border-white/5 transition-colors duration-300 hover:border-acid/50"
                      >
                        <img
                          src={ph}
                          alt={e.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/photo:scale-[1.06]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/photo:bg-black/30" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
