"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { EASE } from "@/lib/motion";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <div className="h-64 w-64" />,
});

export default function ObjectScene() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section
      id="object"
      ref={ref}
      className="relative flex min-h-[110vh] items-center justify-center overflow-hidden py-[18vh]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_42%_at_50%_60%,rgba(93,255,217,0.05),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.8, ease: EASE }}
        className="relative flex aspect-square w-[min(78vw,540px)] items-center justify-center"
      >
        {inView ? <Scene3D /> : null}

        {/* ground reflection glow */}
        <div className="pointer-events-none absolute bottom-[4%] left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[100%] bg-acid/10 blur-2xl" />
        <div className="pointer-events-none absolute bottom-[0%] left-1/2 h-px w-[46%] -translate-x-1/2 bg-gradient-to-r from-transparent via-acid/50 to-transparent" />
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.6 }}
        className="absolute left-6 top-24 text-[9px] uppercase tracking-[0.45em] text-silver/60 md:left-12"
      >
        Section 03 — Object
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.8 }}
        className="absolute bottom-12 right-6 text-[9px] uppercase tracking-[0.45em] text-silver/60 md:right-12"
      >
        Wireframe Study
      </motion.span>
    </section>
  );
}
