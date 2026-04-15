"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function StickyCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="pointer-events-none fixed bottom-6 right-4 z-[90] md:bottom-8 md:right-8"
    >
      <Link
        href="/contact"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-gradient-to-r from-red-900/90 to-orange-700/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_40px_rgba(234,88,12,0.45)] backdrop-blur-md transition hover:brightness-110 will-change-transform"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
        </span>
        Get Training
      </Link>
    </motion.div>
  );
}
