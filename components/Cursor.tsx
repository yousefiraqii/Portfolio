"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Custom cursor — small glowing dot with a soft spring trail and a ring.
 * pointer-events-none + z-index 10000 everywhere, so it stays fully visible
 * and interactive over every section (including the profile photo).
 * Glow increases when hovering interactive elements.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 340, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 340, damping: 30, mass: 0.5 });
  const trailX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.8 });
  const trailY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest?.("a, button, [data-cursor]"));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* soft trail */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: trailX, y: trailY }}
        aria-hidden
      >
        <motion.span
          className="block h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/[0.07]"
          animate={{ scale: active ? 1.7 : 1, opacity: active ? 0.5 : 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </motion.div>

      {/* ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.span
          className="block h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid/50"
          animate={{
            scale: down ? 0.8 : active ? 1.8 : 1,
            opacity: active ? 0.95 : 0.55,
            borderColor: active
              ? "rgba(198,255,0,0.95)"
              : "rgba(198,255,0,0.5)",
            boxShadow: active
              ? "0 0 24px 2px rgba(198,255,0,0.35)"
              : "0 0 0px 0px rgba(198,255,0,0)",
          }}
          transition={{ duration: 0.35, ease: EASE }}
        />
      </motion.div>

      {/* core dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x, y }}
        aria-hidden
      >
        <motion.span
          className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid"
          animate={{ scale: active ? 0.6 : 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ boxShadow: "0 0 12px 2px rgba(198,255,0,0.85)" }}
        />
      </motion.div>
    </>
  );
}
