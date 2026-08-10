"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Lightbox from "@/components/ui/Lightbox";
import { sports } from "@/lib/data";

export default function Sports() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="sports" className="relative py-[20vh]">
      <div className="mx-auto max-w-5xl px-6">
        <Kicker index="07" label="The Lab of Play" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          SPORTS. <span className="text-acid">EQUALLY SERIOUS.</span>
        </h2>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {sports.map((s) => (
            <motion.article
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 34 },
                show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
              }}
              className="group flex flex-col border border-white/8 bg-ink transition-all duration-500 hover:-translate-y-1 hover:border-acid/40 hover:shadow-[0_0_36px_-10px_rgba(198,255,0,0.18)]"
            >
              <button
                onClick={() => setLightbox(s.image)}
                className="group/img relative block aspect-[3/4] cursor-zoom-in overflow-hidden"
                aria-label={`Enlarge ${s.title}`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_30%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-black/10 to-transparent" />
                <span className="absolute bottom-5 left-5 font-display text-4xl font-[500] italic text-acid/90 drop-shadow-[0_0_12px_rgba(198,255,0,0.4)]">
                  {s.title}
                </span>
              </button>

              <p className="px-6 pb-6 pt-5 text-center text-xs font-light leading-relaxed text-silver">
                {s.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
