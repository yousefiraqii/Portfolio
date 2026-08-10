"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/lib/smooth-scroll";

const LINKS = [
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "certificates", label: "CERTIFICATES" },
  { id: "isef", label: "ISEF JOURNEY" },
  { id: "sports", label: "SPORTS" },
  { id: "volunteer", label: "VOLUNTEER" },
  { id: "research", label: "RESEARCH" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-700 ${
        scrolled
          ? "border-b border-white/5 bg-void/60 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] flex-col justify-between gap-3 px-6 py-4 md:px-10 lg:flex-row lg:items-center">
        {/* top row: logo + contact on mobile */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToId("hero")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_10px_rgba(198,255,0,0.9)] transition-transform duration-500 group-hover:scale-125" />
            <span className="font-display text-lg tracking-[0.3em] text-bone">AL IRAQI</span>
          </button>

          <button
            onClick={() => scrollToId("epilogue")}
            className="rounded-full border border-acid/40 px-5 py-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-acid transition-all duration-500 hover:border-acid hover:bg-acid hover:text-black hover:shadow-[0_0_24px_rgba(198,255,0,0.3)] lg:hidden"
          >
            Contact
          </button>
        </div>

        {/* shortcuts — horizontal scroll bar on phones, static on desktop */}
        <ul className="flex items-center gap-5 overflow-x-auto lg:flex-1 lg:justify-center lg:overflow-visible xl:gap-7 [&::-webkit-scrollbar]:hidden">
          {LINKS.map((l) => (
            <li key={l.id} className="shrink-0">
              <button
                onClick={() => scrollToId(l.id)}
                className="group relative text-[10px] font-medium uppercase tracking-[0.35em] text-silver transition-colors duration-500 hover:text-acid"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-acid transition-all duration-500 ease-out group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* contact — desktop only */}
        <button
          onClick={() => scrollToId("epilogue")}
          className="hidden rounded-full border border-acid/40 px-5 py-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-acid transition-all duration-500 hover:border-acid hover:bg-acid hover:text-black hover:shadow-[0_0_24px_rgba(198,255,0,0.3)] lg:block"
        >
          Contact
        </button>
      </nav>
    </motion.header>
  );
}
