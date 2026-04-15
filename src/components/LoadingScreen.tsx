"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0">
            <Image
              src={ASSETS.fireHero}
              alt=""
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-red-950/40" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative h-24 w-24 overflow-hidden rounded-2xl border border-orange-500/40 shadow-[0_0_60px_rgba(234,88,12,0.5)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <Image
                src={ASSETS.sparks}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
              <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold text-white">
                24
              </span>
            </motion.div>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-orange-500"
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <p className="font-display text-sm tracking-[0.35em] text-orange-200/90">
              IGNITING SAFETY
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
