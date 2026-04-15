"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { registerGsap } from "@/lib/gsap-register";

const cards = [
  {
    title: "Fire Safety Training",
    body: "Hands-on drills, evacuation protocols, and real-world scenarios tailored to your site.",
    href: "/contact",
  },
  {
    title: "ERT Training",
    body: "Build a confident Emergency Response Team with scenario simulations and leadership cues.",
    href: "/contact",
  },
  {
    title: "Fire Audit",
    body: "Compliance-ready assessments, gap analysis, and actionable remediation roadmaps.",
    href: "/contact",
  },
];

export function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bgSlowRef = useRef<HTMLDivElement>(null);
  const bgMidRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const pin = pinRef.current;
    const bgSlow = bgSlowRef.current;
    const bgMid = bgMidRef.current;
    const sparks = sparksRef.current;
    const cardRoot = cardsRef.current;
    if (!section || !pin || !bgSlow || !bgMid || !sparks || !cardRoot) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=125%",
          pin,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(bgSlow, { y: "0%" }, { y: "20%", ease: "none" }, 0)
        .fromTo(bgMid, { y: "0%" }, { y: "40%", ease: "none" }, 0)
        .fromTo(sparks, { y: "0%", opacity: 0.3 }, { y: "80%", opacity: 0.85, ease: "none" }, 0);

      const items = cardRoot.querySelectorAll("[data-card]");
      gsap.fromTo(
        items,
        { y: 56, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=95%",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="training"
      className="relative z-10 min-h-[230svh] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-[100svh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" />

        <div
          ref={bgSlowRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "50% 50%" }}
        >
          <Image
            src={ASSETS.training1}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            loading="lazy"
          />
        </div>
        <div
          ref={bgMidRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={ASSETS.training2}
            alt=""
            fill
            className="object-cover mix-blend-screen opacity-35"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        </div>
        <div ref={sparksRef} className="pointer-events-none absolute inset-0 will-change-transform">
          <Image src={ASSETS.sparks} alt="" fill className="object-cover opacity-45 mix-blend-screen" sizes="100vw" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8">
          <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-black/35 px-6 py-5 text-center shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-300/80">
              Training Programs
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-5xl">
              Built for teams that refuse to gamble with safety
            </h2>
          </div>

          <div
            ref={cardsRef}
            className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3"
          >
            {cards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                data-card
                className="glass-panel group flex flex-col p-8 transition duration-500 ease-in-out hover:border-orange-500/30 hover:bg-white/[0.09] hover:scale-[1.02] hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)]"
                style={{ willChange: "transform, opacity" }}
              >
                <h3 className="font-display text-xl font-semibold text-white transition-transform group-hover:-translate-y-0.5 group-hover:text-orange-200">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                  {c.body}
                </p>
                <span className="mt-6 text-sm font-medium text-orange-400">
                  Enquire →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
