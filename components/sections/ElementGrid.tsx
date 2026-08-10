"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";

const TOOLS = [
  { t: "MODULE", d: "Lorem ipsum dolor sit amet.", on: [1, 0, 0] },
  { t: "SYSTEM", d: "Consectetur adipiscing elit.", on: [1, 1, 0] },
  { t: "CORE", d: "Sed do eiusmod tempor.", on: [1, 0, 0] },
  { t: "FIELD", d: "Incididunt ut labore et.", on: [1, 1, 0] },
  { t: "DATA", d: "Dolore magna aliqua.", on: [1, 1, 1] },
  { t: "UNIT", d: "Ut enim ad minim veniam.", on: [1, 0, 0] },
];

function Icon({ i }: { i: number }) {
  const shapes = [
    <polygon key="hex" points="12,3 20.5,8.5 20.5,18.5 12,24 3.5,18.5 3.5,8.5" />,
    <circle key="circle" cx="12" cy="12" r="8.5" />,
    <path key="square" d="M4 4h16v16H4z" />,
    <path key="diamond" d="M12 3l9 9-9 9-9-9z" />,
    <path key="cross" d="M12 4v16M4 12h16" />,
    <path key="bars" d="M4 19h16M4 12h10M4 5h7" />,
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    >
      {shapes[i % shapes.length]}
    </svg>
  );
}

export default function ElementGrid() {
  return (
    <section id="grid" className="relative py-[20vh]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-center">
          <Kicker index="10" label="Elements" />
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {TOOLS.map((tool, i) => (
            <motion.article
              key={tool.t}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
              }}
              className="group relative flex flex-col gap-6 border border-white/8 bg-ink p-7 transition-all duration-500 hover:-translate-y-1 hover:border-acid/40 hover:shadow-[0_0_32px_-8px_rgba(198,255,0,0.18)]"
            >
              <div className="flex items-start justify-between">
                <span className="text-acid/70 transition-all duration-500 group-hover:text-acid group-hover:drop-shadow-[0_0_10px_rgba(198,255,0,0.6)]">
                  <Icon i={i} />
                </span>
                <span className="flex items-center gap-1.5 pt-1">
                  {tool.on.map((v, d) => (
                    <span
                      key={d}
                      className={`h-1 w-1 rounded-full transition-all duration-500 ${
                        v
                          ? "bg-acid shadow-[0_0_6px_rgba(198,255,0,0.8)]"
                          : "bg-white/15"
                      }`}
                    />
                  ))}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-[0.3em] text-bone">
                  {tool.t}
                </h4>
                <p className="mt-2 text-xs font-light leading-relaxed text-silver">
                  {tool.d}
                </p>
              </div>

              <span className="mt-auto h-px w-8 bg-acid/40 transition-all duration-500 group-hover:w-full group-hover:bg-acid" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
