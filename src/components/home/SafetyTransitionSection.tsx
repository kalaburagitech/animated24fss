"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { registerGsap } from "@/lib/gsap-register";
import { SmokeLayer } from "@/components/particles/SmokeLayer";

export function SafetyTransitionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const veil = veilRef.current;
    const smoke = smokeRef.current;
    const fire = fireRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    if (!section || !pin || !veil || !smoke || !fire || !text || !glow) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=130%",
        pin,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(veil, { opacity: 0.88 }, { opacity: 0.06, ease: "none" }, 0)
      .fromTo(smoke, { opacity: 0.55 }, { opacity: 0.08, y: "18%", ease: "none" }, 0)
      .fromTo(fire, { opacity: 0.45 }, { opacity: 0.02, ease: "none" }, 0)
      .fromTo(
        text,
        { opacity: 0.2, y: 48, filter: "brightness(0.45)" },
        { opacity: 1, y: 0, filter: "brightness(1.15)", ease: "none" },
        0,
      )
      .fromTo(
        glow,
        { opacity: 0.12, scale: 0.8 },
        { opacity: 0.95, scale: 1.25, ease: "none" },
        0,
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transition"
      className="relative min-h-[220svh] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={ASSETS.gradient}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div ref={fireRef} className="absolute inset-0">
          <Image src={ASSETS.fireHero} alt="" fill className="object-cover opacity-45" sizes="100vw" />
        </div>

        <div ref={veilRef} className="absolute inset-0 bg-black will-change-[opacity]" />

        <div ref={smokeRef} className="absolute inset-0 opacity-25 will-change-transform">
          <SmokeLayer opacity={0.35} animated />
        </div>

        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-300/40 via-white/20 to-transparent blur-[100px] will-change-transform"
          aria-hidden
        />

        <div
          ref={textRef}
          className="relative z-10 mx-auto flex h-full max-w-4xl items-center justify-center px-4 text-center sm:px-6"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <h2 className="font-display text-4xl font-semibold text-white text-glow sm:text-6xl">
            Safety Starts With Training
          </h2>
        </div>
      </div>
    </section>
  );
}
