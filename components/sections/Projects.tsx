"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import Modal from "@/components/ui/Modal";
import Lightbox from "@/components/ui/Lightbox";
import { projects } from "@/lib/data";

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const proj = selected !== null ? projects.find((p) => p.id === selected) : null;

  return (
    <section id="projects" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <Kicker index="03" label="Projects" />

        <h2 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] font-[500] leading-[1.02] tracking-tight text-bone">
          MY <span className="text-acid">PROJECTS.</span>
        </h2>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
        >
          {projects.map((p) => (
            <motion.article
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 34 },
                show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
              }}
              className="group relative flex flex-col overflow-hidden border border-white/8 bg-ink transition-all duration-500 hover:-translate-y-1 hover:border-acid/40 hover:shadow-[0_0_36px_-10px_rgba(198,255,0,0.18)]"
            >
              <button
                onClick={() => setSelected(p.id)}
                className="relative block aspect-[4/3] overflow-hidden text-left"
                aria-label={`View ${p.title}`}
              >
                <img
                  src={p.poster}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
                <span className="absolute left-5 top-5 font-display text-2xl text-acid drop-shadow-[0_0_10px_rgba(198,255,0,0.5)]">
                  {String(p.id).padStart(2, "0")}
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="font-display text-xl leading-snug tracking-wide text-bone">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-silver">
                  {p.description}
                </p>
                <button
                  onClick={() => setSelected(p.id)}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-acid transition-colors duration-300 hover:text-acid-bright"
                >
                  <span className="h-px w-6 bg-acid/60 transition-all duration-500 group-hover:w-10" />
                  View Details →
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* project modal */}
      <Modal open={!!proj} onClose={() => setSelected(null)}>
        {proj && (
          <div>
            <h3 className="font-display text-2xl tracking-wide text-bone md:text-3xl">
              {proj.title}
            </h3>

            <div
              className="group relative mt-6 aspect-[4/3] cursor-zoom-in overflow-hidden border border-white/5 bg-ash"
              onClick={() => setLightbox(proj.poster)}
            >
              <img
                src={proj.poster}
                alt={proj.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/30 group-hover:opacity-100">
                <span className="border border-acid/60 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-acid">
                  Zoom
                </span>
              </span>
            </div>

            {proj.additionalPhotos.length > 0 && (
              <div className="mt-6">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-silver">
                  Additional Photos
                </h4>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {proj.additionalPhotos.map((ph) => (
                    <button
                      key={ph}
                      onClick={() => setLightbox(ph)}
                      className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden border border-white/5"
                      aria-label="Enlarge photo"
                    >
                      <img
                        src={ph}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 border border-white/5 bg-ash p-5">
              <p className="text-sm font-light leading-[1.85] text-bone/90">
                {proj.description}
              </p>
            </div>

            <a
              href={proj.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-acid/50 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-acid transition-all duration-500 hover:border-acid hover:bg-acid hover:text-black hover:shadow-[0_0_28px_rgba(198,255,0,0.3)]"
            >
              📄 View PDF Poster
            </a>
          </div>
        )}
      </Modal>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
