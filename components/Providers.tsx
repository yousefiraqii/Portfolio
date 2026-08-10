"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { setLenis } from "@/lib/smooth-scroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // native scroll on touch + reduced-motion: skips Lenis entirely
    const touch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    if (
      touch ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
