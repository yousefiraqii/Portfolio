"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Lightbox from "@/components/ui/Lightbox";
import { volunteerItems } from "@/lib/data";

export default function Volunteer() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const v = volunteerItems[0];
  if (!v) return null;

  return (
    <section id="volunteer" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <Kicker index="08" label="Service" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          GIVING BACK <span className="text-acid">FORWARD.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mt-16 grid overflow-hidden border border-white/8 bg-ink md:grid-cols-2"
        >
          {/* main photo */}
          <button
            onClick={() => setLightbox(v.photos[0])}
            className="group/img relative block aspect-[4/3] cursor-zoom-in overflow-hidden md:aspect-auto"
            aria-label="Enlarge photo"
          >
            <img
              src={v.photos[0]}
              alt={v.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
          </button>

          {/* details */}
          <div className="flex flex-col p-7 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-acid">
              {v.organization}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-snug tracking-wide text-bone md:text-3xl">
              {v.title}
            </h3>

            <dl className="mt-7 space-y-3 text-xs font-light text-silver">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 uppercase tracking-[0.25em] text-bone/50">
                  Where
                </dt>
                <dd>{v.location}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 uppercase tracking-[0.25em] text-bone/50">
                  When
                </dt>
                <dd>
                  {v.start} — {v.end}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 uppercase tracking-[0.25em] text-bone/50">
                  Hours
                </dt>
                <dd>{v.hours} hours logged</dd>
              </div>
            </dl>

            <p className="mt-7 text-sm font-light leading-[1.9] text-silver">
              {v.description}
            </p>

            {/* gallery */}
            {v.photos.length > 1 && (
              <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
                {v.photos.map((ph) => (
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
            )}
          </div>
        </motion.div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
