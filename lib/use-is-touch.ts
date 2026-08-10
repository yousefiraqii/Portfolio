"use client";

import { useEffect, useState } from "react";

/**
 * True on touch devices (phones/tablets). Used to strip expensive
 * visual effects (blur filters, clip-path reveals) that tank the
 * frame rate on mobile GPUs.
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mq.matches);
    const onChange = () => setIsTouch(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return isTouch;
}
