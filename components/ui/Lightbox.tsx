"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Lightbox({
  src,
  onClose,
}: {
  src: string | null;
  onClose: () => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={onClose}
        >
          <motion.img
            src={src}
            alt="Enlarged view"
            className="max-h-[88vh] max-w-[92vw] object-contain"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-white/10 text-lg text-silver transition-colors duration-300 hover:border-acid hover:text-acid"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
