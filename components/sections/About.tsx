"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker, Reveal } from "@/components/Shared";
import Lightbox from "@/components/ui/Lightbox";

const BIO = [
  "I'm an Ismailia STEM High School student trying to save the world, one water molecule at a time. Growing up in a rural village in Dakahlia, I couldn't ignore the water crisis even if I tried, and trust me, I tried. That experience fuels my work today, along with a solid plate of makarona bshamil, which may or may not be my true source of innovation.",
  "My journey has earned national recognition: a patent-pending wastewater treatment system (Egyptian Patent Office, No. 1784/2023), 1st Place at the Cairo International Exhibition for Innovation (2023), 3rd Place at Mansoura University (2022), and Finalist for the State Award for Young Innovator (2021). Most recently, I took 2nd Place at Tech Innovation '26 (still thinking about that missing 1st place) and became a Finalist at ESEF 2026, proof that I'm either very committed or just stubborn.",
  "I've competed in ISEF-affiliated fairs for six years straight, failing, learning, and coming back stronger each time. My research on the AquaPure filtration system was published in the International Journal of Scientific and Research Publications (IJSRP, Vol. 16, Issue 06, 2026), demonstrating 97%+ purification efficiency using locally sourced materials. I also volunteer at the 57357 Children's Cancer Hospital Foundation, where I've logged over 37 hours supporting children and their families.",
  "When I'm not innovating, you'll find me on the paddle court playing like it's the Olympics, at the gym convincing myself that lifting weights counts as \"research on human energy systems,\" or building websites for fun (and because I like seeing my ideas come to life on a screen). I'm a self-taught frontend developer who enjoys turning designs into something real, probably because I've spent too much time turning dirty water into clean water, and apparently, I have a thing for transformations.",
  "My long-term goal? Scale sustainable solutions for communities in Egypt and beyond, ideally while staying well-fed and occasionally winning first place. I'm always open to connecting with fellow researchers, innovators, developers, and anyone with a great makarona bshamil recipe.",
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

          <motion.h3
            initial={{ opacity: 0, x: 44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, ease: EASE }}
            className="mt-8 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-[500] leading-[1.05] tracking-tight text-bone"
          >
            ONE WATER
            <br />
            MOLECULE AT <span className="text-acid">A TIME.</span>
          </motion.h3>

          <Reveal
            delay={0.15}
            className="mt-8 max-w-xl space-y-5 text-sm font-light leading-[1.9] text-silver"
          >
            {BIO.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

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
