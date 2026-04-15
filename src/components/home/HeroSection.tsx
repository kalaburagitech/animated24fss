"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { registerGsap } from "@/lib/gsap-register";
import { SparksParticles } from "@/components/particles/SparksParticles";
import { FloatingSparksImages } from "@/components/particles/FloatingSparksImages";
import { SmokeLayer } from "@/components/particles/SmokeLayer";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const intensityRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const sparksBoostRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const bg = bgRef.current;
    const intensity = intensityRef.current;
    const smoke = smokeRef.current;
    const sparks = sparksRef.current;
    const sparksBoost = sparksBoostRef.current;
    const fg = fgRef.current;
    const heading = headingRef.current;
    const cta = ctaRef.current;
    if (!section || !pin || !bg || !intensity || !smoke || !sparks || !sparksBoost || !fg || !heading || !cta) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=72%",
          pin,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(bg, { scale: 1, y: "0%" }, { scale: 1.12, y: "-6%", ease: "none" }, 0)
        .fromTo(intensity, { opacity: 0.1 }, { opacity: 0.42, ease: "none" }, 0)
        .fromTo(smoke, { y: "0%", opacity: 0.16 }, { y: "26%", opacity: 0.4, ease: "none" }, 0)
        .fromTo(sparks, { y: "0%", opacity: 0.22 }, { y: "55%", opacity: 0.6, ease: "none" }, 0)
        .fromTo(sparksBoost, { opacity: 0 }, { opacity: 0.35, ease: "none" }, 0.3)
        .fromTo(fg, { y: 0, opacity: 1 }, { y: "80%", opacity: 0.1, ease: "none" }, 0)
        .fromTo(heading, { opacity: 1, y: 0 }, { opacity: 0, y: -44, ease: "none" }, 0.45)
        .fromTo(cta, { opacity: 1, y: 0 }, { opacity: 0, y: 24, ease: "none" }, 0.45);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-30 min-h-[180svh] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
        >
          <Image
            src={ASSETS.fireHero}
            alt="Fire safety hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-red-950/30" />
          <div
            ref={intensityRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.45),_rgba(234,88,12,0.22),_transparent_70%)] will-change-transform"
          />
        </div>

        <div ref={smokeRef} className="absolute inset-0 will-change-transform">
          <SmokeLayer opacity={0.3} animated={false} />
        </div>

        <div ref={sparksRef} className="absolute inset-0 will-change-transform">
          <FloatingSparksImages />
          <SparksParticles className="absolute inset-0 z-[1]" />
        </div>

        <div ref={sparksBoostRef} className="pointer-events-none absolute inset-0 opacity-0 will-change-transform">
          <FloatingSparksImages />
        </div>

        <div
          ref={fgRef}
          className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-black/35 px-4 py-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-6 sm:py-10"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="font-display text-xs uppercase tracking-[0.4em] text-orange-200/80 sm:text-sm">
            24 FSS — Fire Safety Training
          </p>
          <h1
            ref={headingRef}
            className="mt-6 font-display text-4xl font-semibold leading-tight text-white text-glow sm:text-6xl md:text-7xl"
          >
            Fire Can Destroy in Seconds
          </h1>
          <p className="mt-6 text-lg text-zinc-200/90 sm:text-2xl">
            Be Prepared. Stay Protected.
          </p>
          <Link
            ref={ctaRef}
            href="/contact"
            className="glow-orange mt-10 inline-flex rounded-full bg-gradient-to-r from-red-700 via-red-600 to-orange-500 px-10 py-4 text-base font-semibold text-white shadow-[0_0_48px_rgba(234,88,12,0.55)] transition duration-300 ease-in-out hover:brightness-110 hover:shadow-[0_0_74px_rgba(234,88,12,0.8)]"
            style={{ willChange: "transform, opacity" }}
          >
            Get Training Now
          </Link>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-orange-500/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
