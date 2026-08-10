"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Lightbox from "@/components/ui/Lightbox";
import { achievements } from "@/lib/data";

export default function Achievements() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="achievements" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <Kicker index="04" label="Achievements" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          ACROSS THE <span className="text-acid">ARENA.</span>
        </h2>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          {achievements.map((a, idx) => (
            <motion.article
              key={a.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
              }}
              className="group flex flex-col border border-white/8 bg-ink p-6 transition-all duration-500 hover:-translate-y-1 hover:border-acid/40 hover:shadow-[0_0_36px_-10px_rgba(198,255,0,0.18)] md:p-7"
            >
              <span className="font-display text-4xl font-[500] text-white/10 transition-colors duration-500 group-hover:text-acid/30">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div
                className="group/img relative mt-5 aspect-[16/9] cursor-zoom-in overflow-hidden"
                onClick={() => setLightbox(a.photos[0])}
              >
                <img
                  src={a.photos[0]}
                  alt={a.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
              </div>

              <h3 className="mt-6 font-display text-lg leading-snug tracking-wide text-bone">
                {a.title}
              </h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-silver">
                {a.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/5 pt-5">
                {a.photos.map((ph) => (
                  <button
                    key={ph}
                    onClick={() => setLightbox(ph)}
                    aria-label="Enlarge photo"
                    className="group/thumb relative h-16 w-16 cursor-zoom-in overflow-hidden border border-white/10 transition-all duration-300 hover:border-acid"
                  >
                    <img
                      src={ph}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                    />
                  </button>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
