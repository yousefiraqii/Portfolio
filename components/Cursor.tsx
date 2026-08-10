"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 240, damping: 24, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 240, damping: 24, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest?.("a, button, [data-cursor]"));
    };
    const leave = () => setActive(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x, y }}
        aria-hidden
      >
        <motion.span
          className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid shadow-[0_0_12px_2px_rgba(198,255,0,0.85)]"
          animate={{ opacity: active ? 0.5 : 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199]"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.span
          className="block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid/50"
          animate={{
            scale: active ? 1.7 : 1,
            opacity: active ? 0.9 : 0.45,
            borderColor: active ? "rgba(198,255,0,0.9)" : "rgba(198,255,0,0.45)",
          }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </motion.div>
    </>
  );
}
