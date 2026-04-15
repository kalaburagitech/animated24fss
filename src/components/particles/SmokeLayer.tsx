"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS } from "@/lib/assets";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SmokeLayer({
  className,
  opacity = 0.3,
  parallaxY = 0,
  animated = true,
}: {
  className?: string;
  opacity?: number;
  parallaxY?: number;
  animated?: boolean;
}) {
  const reduced = useReducedMotion();
  const float = animated && !reduced;

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{
        opacity,
        y: parallaxY,
        filter: reduced ? undefined : "blur(0px)",
        willChange: "transform, opacity, filter",
      }}
      animate={
        float
          ? {
              y: [0, -12, 4, 0],
              x: [0, 6, -4, 0],
              opacity: [opacity, opacity * 0.85, opacity],
              filter: ["blur(0px)", "blur(1.5px)", "blur(0.5px)", "blur(0px)"],
            }
          : undefined
      }
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Image
        src={ASSETS.smoke}
        alt=""
        fill
        className="object-cover mix-blend-screen"
        sizes="100vw"
        priority={false}
      />
    </motion.div>
  );
}
