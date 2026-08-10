"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Modal from "@/components/ui/Modal";
import Lightbox from "@/components/ui/Lightbox";
import { certificates } from "@/lib/data";

export default function Certificates() {
  const [selected, setSelected] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const cert =
    selected !== null
      ? certificates.find((c) => c.id === selected)
      : null;

  return (
    <section id="certificates" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <Kicker index="05" label="Certificates" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          CERTIFICATES <span className="text-acid">&amp; RECOGNITION.</span>
        </h2>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
        >
          {certificates.map((c) => (
            <motion.article
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
              }}
            >
              <button
                onClick={() => setSelected(c.id)}
                className="group flex h-full w-full flex-col border border-white/8 bg-ink p-4 text-left transition-all duration-500 hover:-translate-y-1 hover:border-acid/40 hover:shadow-[0_0_32px_-10px_rgba(198,255,0,0.2)]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>

                <span className="mt-4 line-clamp-2 text-sm font-semibold leading-snug text-bone">
                  {c.title}
                </span>
                <span className="mt-2 line-clamp-2 text-[11px] font-light leading-relaxed text-silver">
                  {c.issuer}
                </span>
                <span className="mt-4 inline-block w-fit border border-acid/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-acid">
                  {c.badge}
                </span>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* certificate modal */}
      <Modal open={!!cert} onClose={() => setSelected(null)}>
        {cert && (
          <div>
            <h3 className="font-display text-xl tracking-wide text-bone md:text-2xl">
              {cert.title}
            </h3>

            <div
              className="group relative mt-6 cursor-zoom-in overflow-hidden border border-white/5 bg-ash"
              onClick={() => setLightbox(cert.image)}
            >
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                decoding="async"
                className="max-h-[60vh] w-full object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/30 group-hover:opacity-100">
                <span className="border border-acid/60 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-acid">
                  Zoom
                </span>
              </span>
            </div>

            <div className="mt-6 border border-white/5 bg-ash p-5">
              <p className="text-sm font-light leading-[1.85] text-bone/90">
                {cert.description}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-acid">
                {cert.issuer}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
