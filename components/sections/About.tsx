"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import { Words, Body } from "@/components/Text";
import Lightbox from "@/components/ui/Lightbox";

const BIO = [
  "I'm an Ismailia STEM High School student trying to *saving the world, one water molecule at a time*. Growing up in a rural village in Dakahlia, I couldn't ignore the water crisis even if I tried, and trust me, I tried.",
  "My journey has earned national recognition: a *patent-pending wastewater treatment system* (Egyptian Patent Office, No. 1784/2023), 1st Place at the Cairo International Exhibition for Innovation (2023), and most recently 2nd Place at Tech Innovation '26 and *Finalist at ESEF 2026*.",
  "I've competed in *ISEF-affiliated fairs* for six years straight, failing, learning, and coming back stronger each time. My research on the AquaPure filtration system was published in IJSRP (Vol. 16, Issue 06, 2026), demonstrating *97%+ purification efficiency* using locally sourced materials.",
  "When I'm not innovating, you'll find me on the paddle court, at the gym, or building websites for fun. I enjoy turning designs into something real, probably because I've spent too much time turning dirty water into clean water — and apparently, I have a thing for *transformations*.",
  "My long-term goal? *Scale sustainable solutions* for communities in Egypt and beyond. I'm always open to connecting with fellow researchers, innovators, and developers.",
];

export default function About() {
  const ref = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-[18vh]">
      <div className="pointer-events-none absolute left-0 top-0 h-[40vh] w-[40vw] bg-[radial-gradient(circle_at_center,rgba(198,255,0,0.04),transparent_70%)] blur-2xl" />

      <div className="mx-auto grid max-w-6xl items-start gap-14 px-6 md:grid-cols-2 md:gap-10 lg:gap-20">
        {/* portrait */}
        <motion.div className="relative aspect-[4/5] overflow-hidden bg-ash">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <img
              src="images/about/profile.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(198,255,0,0.08),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-4 border border-white/10" />
          <span className="absolute left-7 top-7 h-px w-10 bg-acid/60" />
          <span className="absolute bottom-7 right-7 text-[10px] tracking-[0.4em] text-silver/60">
            FIG. 01
          </span>
          <button
            onClick={() => setLightbox("images/about/profile.png")}
            aria-label="Enlarge profile photo"
            className="absolute inset-0 cursor-zoom-in"
          />
        </motion.div>

        {/* bio */}
        <div className="md:pl-4">
          <Kicker index="02" label="About" />

          <h3 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-[500] leading-[1.05] tracking-tight text-bone">
            <Words
              text={"ONE WATER\nMOLECULE AT A *TIME.*"}
              stagger={0.045}
              delay={0.1}
            />
          </h3>

          <Body
            text={BIO.join("\n\n")}
            delay={0.2}
            className="mt-8 max-w-xl space-y-5 text-sm font-light leading-[1.9] text-bone/80"
          />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="mt-10 h-px w-40 bg-acid shadow-[0_0_14px_rgba(198,255,0,0.5)]"
          />
        </div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
