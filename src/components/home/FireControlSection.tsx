"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { FireControlCard3D } from "@/components/home/FireControlCard3D";
import { registerGsap } from "@/lib/gsap-register";

export function FireControlSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);
  const sprayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const bg = bgRef.current;
    const smoke = smokeRef.current;
    const sparks = sparksRef.current;
    const cardStage = cardStageRef.current;
    const fire = fireRef.current;
    const spray = sprayRef.current;
    if (!section || !pin || !bg || !smoke || !sparks || !cardStage || !fire || !spray) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(bg, { y: "0%" }, { y: "14%", ease: "none" }, 0)
        .fromTo(smoke, { y: "0%", opacity: 0.2 }, { y: "28%", opacity: 0.45, ease: "none" }, 0)
        .fromTo(sparks, { y: "0%", opacity: 0.24 }, { y: "58%", opacity: 0.6, ease: "none" }, 0)
        .fromTo(fire, { opacity: 0.85 }, { opacity: 0.9, ease: "none" }, 0.05)
        .fromTo(
          cardStage,
          { rotateY: -8, rotateX: 2, scale: 0.95, y: 20 },
          { rotateY: 14, rotateX: 8, scale: 1.08, y: -6, transformPerspective: 1500, ease: "none" },
          0.25,
        )
        .fromTo(spray, { autoAlpha: 0, y: 40, scale: 0.82 }, { autoAlpha: 1, y: -40, scale: 1, ease: "none" }, 0.48)
        .to(spray, { autoAlpha: 0, y: -120, ease: "none" }, 0.66)
        .to(fire, { opacity: 0.06, filter: "saturate(0.65) blur(1px)", ease: "none" }, 0.72);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="control"
      className="relative z-20 -mt-px min-h-[220svh] overflow-hidden bg-black"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" />
        <div ref={bgRef} className="absolute inset-0 opacity-90 will-change-transform">
          <Image
            src={ASSETS.gradient}
            alt=""
            fill
            className="object-cover opacity-72 mix-blend-screen"
            sizes="100vw"
          />
        </div>
        <div ref={smokeRef} className="pointer-events-none absolute inset-0 will-change-transform">
          <Image src={ASSETS.smoke} alt="" fill className="object-cover opacity-35 mix-blend-screen" sizes="100vw" />
        </div>
        <div ref={sparksRef} className="pointer-events-none absolute inset-0 will-change-transform">
          <Image src={ASSETS.sparks} alt="" fill className="object-cover opacity-50 mix-blend-screen" sizes="100vw" />
        </div>

        <div ref={fireRef} className="pointer-events-none absolute inset-0 will-change-transform">
          <Image src={ASSETS.fireHero} alt="" fill className="object-cover opacity-70" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-red-900/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-black/35 px-6 py-6 text-center shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">
              Fire Control
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Master the extinguisher. Own the moment.
            </h2>
            <p className="mt-4 text-zinc-300">
              Step through the response: identify hazard, orient, spray, and suppress.
            </p>
          </div>

          <div ref={cardStageRef} className="perspective-scene relative mt-4 will-change-transform sm:mt-6">
            <FireControlCard3D sectionRef={sectionRef} />
          </div>

          <div
            ref={sprayRef}
            className="pointer-events-none absolute inset-x-0 bottom-[26%] z-20 mx-auto h-56 w-full max-w-xl opacity-0"
            aria-hidden
          >
            {Array.from({ length: 34 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${2 + (i % 3)}px`,
                  height: `${2 + (i % 3)}px`,
                  left: `${12 + ((i * 11) % 72)}%`,
                  bottom: `${(i * 7) % 22}%`,
                  opacity: 0.7 - (i % 5) * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
