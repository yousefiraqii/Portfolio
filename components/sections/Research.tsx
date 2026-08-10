"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Lightbox from "@/components/ui/Lightbox";
import { researchPapers } from "@/lib/data";

export default function Research() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const r = researchPapers[0];
  if (!r) return null;

  return (
    <section id="research" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <Kicker index="09" label="Peer-Reviewed" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          RESEARCH <span className="text-acid">PUBLISHED.</span>
        </h2>

        <motion.article
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mt-16 grid overflow-hidden border border-white/8 bg-ink md:grid-cols-5"
        >
          {/* paper cover */}
          <button
            onClick={() => setLightbox(r.image)}
            className="group/img relative block aspect-[3/4] cursor-zoom-in overflow-hidden md:col-span-2 md:aspect-auto"
            aria-label="Enlarge paper cover"
          >
            <img
              src={r.image}
              alt="Research paper cover"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
          </button>

          {/* details */}
          <div className="flex flex-col p-7 md:col-span-3 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-acid">
              IJSRP — Vol. 16, No. 06
            </p>
            <h3 className="mt-4 font-display text-xl leading-snug tracking-wide text-bone md:text-2xl">
              {r.title}
            </h3>

            <p className="mt-5 text-sm font-light leading-relaxed text-silver">
              <span className="text-bone/60">Authors:</span> {r.authors}
            </p>

            <dl className="mt-7 space-y-2.5 text-xs font-light text-silver">
              <div className="flex flex-wrap gap-2">
                <dt className="uppercase tracking-[0.25em] text-bone/50">Journal</dt>
                <dd>{r.journal}</dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="uppercase tracking-[0.25em] text-bone/50">Volume</dt>
                <dd>{r.volume}</dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="uppercase tracking-[0.25em] text-bone/50">Publisher</dt>
                <dd>{r.publisher} — {r.date}</dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="uppercase tracking-[0.25em] text-bone/50">DOI</dt>
                <dd className="break-all text-acid">{r.doi}</dd>
              </div>
            </dl>

            <p className="mt-7 flex-1 text-sm font-light leading-[1.9] text-silver">
              {r.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={r.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-acid px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-black transition-all duration-500 hover:bg-acid-bright hover:shadow-[0_0_28px_rgba(198,255,0,0.4)]"
              >
                View on DOI ↗
              </a>
            </div>
          </div>
        </motion.article>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
