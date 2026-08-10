"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";
import { Kicker } from "@/components/Shared";
import { Words, Body } from "@/components/Text";
import Lightbox from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Transitions";

const BIO = [
  "I'm an Ismailia STEM High School student trying to *saving the world, one water molecule at a time*. Growing up in a rural village in Dakahlia, I couldn't ignore the water crisis even if I tried, and trust me, I tried.",
  "My journey has earned national recognition: a *patent-pending wastewater treatment system* (Egyptian Patent Office, No. 1784/2023), 1st Place at the Cairo International Exhibition for Innovation (2023), and most recently 2nd Place at Tech Innovation '26 and *Finalist at ESEF 2026*.",
  "I've competed in *ISEF-affiliated fairs* for six years straight, failing, learning, and coming back stronger each time. My research on the AquaPure filtration system was published in IJSRP (Vol. 16, Issue 06, 2026), demonstrating *97%+ purification efficiency* using locally sourced materials.",
  "When I'm not innovating, you'll find me on the paddle court, at the gym, or building websites for fun. I enjoy turning designs into something real, probably because I've spent too much time turning dirty water into clean water — and apparently, I have a thing for *transformations*.",
  "My long-term goal? *Scale sustainable solutions* for communities in Egypt and beyond. I'm always open to connecting with fellow researchers, innovators, and developers.",
];

/**
 * The About section holds the special square / glow treatment:
 * a desaturated side photo with a soft neon-green glowing rounded-square
 * light on the lower part of the person. The glow has blurred edges, a slow
 * breathing pulse, and fades in after the photo appears. The photo never
 * captures the custom cursor.
 */
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
        {/* portrait — masked reveal, with the green square glow */}
        <Reveal
          y={30}
          scaleFrom={1.06}
          duration={1.5}
          className="relative aspect-[4/5] overflow-hidden bg-ash"
        >
          {/* desaturated photo, slow zoom */}
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <img
              src="images/about/profile.jpg"
              alt="Profile"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_18%] [filter:grayscale(0.9)_contrast(1.05)_brightness(0.85)]"
            />
          </motion.div>

          {/* THE green square glow — lower body, soft light leak, breathing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.8, delay: 0.65, ease: EASE }}
            className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[58%] items-end justify-center overflow-hidden"
          >
            <motion.div
              className="relative mb-[3%] aspect-square w-[64%]"
              animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity }}
            >
              {/* wide soft light leak */}
              <div className="absolute inset-0 rounded-[20%] bg-acid/20 blur-2xl" />
              {/* inner brighter core */}
              <div className="absolute inset-[16%] rounded-[20%] bg-acid/[0.12] blur-xl" />
              {/* crisp glowing frame */}
              <div className="absolute inset-0 rounded-[20%] border border-acid/45 shadow-[0_0_46px_6px_rgba(198,255,0,0.4),inset_0_0_36px_rgba(198,255,0,0.22)]" />
            </motion.div>
          </motion.div>

          {/* vignette keeps the portrait moody */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_42%,transparent_52%,rgba(0,0,0,0.55)_100%)]" />

          {/* frame accents */}
          <div className="pointer-events-none absolute inset-4 border border-white/10" />
          <span className="pointer-events-none absolute left-7 top-7 h-px w-10 bg-acid/60" />
          <span className="pointer-events-none absolute bottom-7 right-7 text-[10px] tracking-[0.4em] text-silver/60">
            FIG. 01
          </span>

          <button
            onClick={() => setLightbox("images/about/profile.jpg")}
            aria-label="Enlarge profile photo"
            className="absolute inset-0 cursor-zoom-in"
          />
        </Reveal>

        {/* bio */}
        <div className="md:pl-4">
          <Kicker index="02" label="About" />

          <h3 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.6rem)] font-[500] leading-[1.05] tracking-tight text-bone">
            <Words
              text={"ONE WATER\nMOLECULE AT A *TIME.*"}
              stagger={0.06}
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
