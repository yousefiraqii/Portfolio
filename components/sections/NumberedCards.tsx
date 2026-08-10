"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";

const CARDS = [
  {
    num: "01",
    title: "FOUNDATIONS",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    num: "02",
    title: "SYSTEMS",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  },
  {
    num: "03",
    title: "DETAILS",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function NumberedCards() {
  return (
    <section id="series" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-center">
          <Kicker index="08" label="Series" />
        </div>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {CARDS.map((c) => (
            <motion.article
              key={c.num}
              variants={{
                hidden: { opacity: 0, y: 34 },
                show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
              }}
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-white/8 bg-ink p-9 transition-all duration-500 hover:-translate-y-1 hover:border-acid/40 hover:shadow-[0_0_36px_-10px_rgba(198,255,0,0.18)]"
            >
              <motion.span
                className="absolute left-0 top-0 h-px w-full origin-left bg-acid"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              />
              <span className="absolute left-0 top-0 h-0 w-px bg-acid/60 transition-all duration-500 group-hover:h-full" />

              <span className="font-display text-5xl font-[500] text-white/10 transition-colors duration-500 group-hover:text-acid/30">
                {c.num}
              </span>

              <div>
                <h4 className="font-display text-2xl tracking-wide text-bone">
                  {c.title}
                </h4>
                <p className="mt-4 text-sm font-light leading-relaxed text-silver">
                  {c.body}
                </p>
                <span className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-acid opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="h-px w-6 bg-acid" />
                  OPEN
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
