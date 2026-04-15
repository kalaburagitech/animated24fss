"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ASSETS } from "@/lib/assets";

const items = [
  { src: ASSETS.fireHero, alt: "Fire safety training environment", tall: true },
  { src: ASSETS.training1, alt: "Hands-on training", tall: false },
  { src: ASSETS.training2, alt: "ERT simulation", tall: false },
  { src: ASSETS.extinguisher, alt: "Dry chemical extinguisher reference", tall: true },
  {
    src: ASSETS.extinguisherFire,
    alt: "Extinguisher under fire training conditions",
    tall: false,
  },
  { src: ASSETS.smoke, alt: "Smoke safety layer", tall: false },
  { src: ASSETS.sparks, alt: "Sparks", tall: false },
];

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          Moments from the floor
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Hover to preview depth. Click for a focused lightbox — tuned for
          clarity, not clutter.
        </p>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((it, i) => (
            <motion.button
              key={it.src}
              type="button"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
              className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left ${
                it.tall ? "min-h-[320px]" : "min-h-[220px]"
              }`}
              onClick={() => setActive(i)}
              style={{ willChange: "transform" }}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-110"
                sizes="(max-width:768px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                {it.alt}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={items[active].src}
                  alt={items[active].alt}
                  fill
                  className="object-contain bg-black"
                  sizes="100vw"
                />
              </div>
              <button
                type="button"
                className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
