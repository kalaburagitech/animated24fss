"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { useReducedMotion } from "@/lib/useReducedMotion";

const spots = [
  { top: "8%", left: "12%", scale: 0.55, delay: 0 },
  { top: "22%", left: "72%", scale: 0.45, delay: 0.4 },
  { top: "48%", left: "8%", scale: 0.5, delay: 0.2 },
  { top: "62%", left: "58%", scale: 0.6, delay: 0.6 },
  { top: "78%", left: "32%", scale: 0.4, delay: 0.3 },
];

export function FloatingSparksImages() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {spots.map((s, i) => (
        <motion.div
          key={i}
          className="absolute h-32 w-32 sm:h-40 sm:w-40"
          style={{
            top: s.top,
            left: s.left,
            scale: s.scale,
            willChange: "transform",
          }}
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -18, 10, 0],
                  x: [0, 10, -6, 0],
                  rotate: [0, 6, -4, 0],
                  opacity: [0.35, 0.55, 0.4],
                }
          }
          transition={{
            duration: 10 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          <Image
            src={i % 2 === 0 ? ASSETS.sparks : ASSETS.sparks1}
            alt=""
            fill
            className="object-contain mix-blend-screen opacity-80"
            sizes="160px"
          />
        </motion.div>
      ))}
    </div>
  );
}
