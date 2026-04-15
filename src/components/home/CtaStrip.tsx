"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CtaStrip() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-red-950/80 via-black to-orange-950/60 py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.18),_transparent_60%)]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:flex-row sm:text-left sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">
            Ready when it counts
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Protect Your Workplace Today
          </h2>
        </div>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-gradient-to-r from-orange-600 to-red-700 px-10 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(234,88,12,0.45)] transition duration-300 ease-in-out hover:brightness-110 hover:shadow-[0_0_74px_rgba(234,88,12,0.85)]"
            style={{ willChange: "transform" }}
          >
            Book Training
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
