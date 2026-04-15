"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { FireControlCard3D } from "@/components/home/FireControlCard3D";
import { registerGsap } from "@/lib/gsap-register";

const MOBILE_MQ = "(max-width: 767px)";

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
      const isMobile = window.matchMedia(MOBILE_MQ).matches;

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
        .fromTo(fire, { opacity: 0.85 }, { opacity: 0.9, ease: "none" }, 0.05);

      if (isMobile) {
        tl.fromTo(
          cardStage,
          { y: 18, opacity: 0.92, filter: "brightness(0.95)" },
          { y: 0, opacity: 1, filter: "brightness(1)", ease: "none" },
          0.25,
        );
      } else {
        tl.fromTo(
          cardStage,
          { rotateY: -8, rotateX: 2, scale: 0.95, y: 20 },
          {
            rotateY: 14,
            rotateX: 8,
            scale: 1.08,
            y: -6,
            transformPerspective: 1500,
            ease: "none",
          },
          0.25,
        );
      }

      tl.fromTo(spray, { autoAlpha: 0, y: 40, scale: 0.82 }, { autoAlpha: 1, y: -40, scale: 1, ease: "none" }, 0.48)
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

        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-6 px-4 pb-10 pt-8 sm:px-6 lg:flex-row lg:items-stretch lg:gap-10 lg:px-8">
          <aside className="hidden w-[min(100%,220px)] shrink-0 flex-col justify-center gap-5 border-l-2 border-orange-500/55 pl-5 lg:flex">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-orange-400/90">
                Response module
              </p>
              <p className="mt-2 font-display text-4xl font-bold tabular-nums text-white/95">
                02
              </p>
            </div>
            <ul className="space-y-2.5 border-t border-white/10 pt-4 font-mono text-[11px] leading-relaxed text-zinc-500">
              <li className="text-orange-300">◆ Scan hazard</li>
              <li>○ Orient nozzle</li>
              <li>○ Sweep base</li>
              <li>○ Confirm out</li>
            </ul>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="relative overflow-hidden border-2 border-orange-500/55 bg-zinc-950/80 shadow-[0_28px_100px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.1),0_0_40px_rgba(249,115,22,0.18)] backdrop-blur-md">
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -18deg,
                    transparent,
                    transparent 13px,
                    rgba(6, 182, 212, 0.35) 13px,
                    rgba(6, 182, 212, 0.35) 14px
                  )`,
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(249,115,22,0.2),transparent_55%)]"
                aria-hidden
              />
              <div className="relative z-[1] flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/55 px-4 py-2.5 sm:px-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-orange-400/95">
                    Fire control // protocol
                  </span>
                  <span className="hidden font-mono text-[10px] text-zinc-600 sm:inline">
                    |
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-orange-300/80 sm:tracking-[0.2em]">
                    Assets · studio + thermal
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 lg:hidden">
                    Mod 02
                  </span>
                </div>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400/95">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  </span>
                  Live sync
                </span>
              </div>

              <div className="relative z-[1] h-[2px] w-full overflow-hidden bg-gradient-to-r from-orange-500/30 via-white/25 to-cyan-500/30">
                <div
                  className="h-full w-[min(48%,260px)] min-w-[120px] bg-gradient-to-r from-transparent via-white to-cyan-200/90 fss-hud-sweep shadow-[0_0_16px_rgba(255,255,255,0.45)]"
                  aria-hidden
                />
              </div>

              <div className="relative z-[1] lg:grid lg:min-h-[min(52vh,520px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,400px)] lg:items-stretch">
                <div className="relative border-b border-dashed border-orange-500/15 px-5 py-6 text-left sm:px-7 sm:py-8 lg:border-b-0 lg:border-r lg:border-dashed lg:border-orange-500/15">
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                    aria-hidden
                  >
                    <Image
                      src={ASSETS.extinguisherFire}
                      alt=""
                      fill
                      className="object-cover object-[58%_center] opacity-[0.06] blur-[2px] mix-blend-screen sm:object-[55%_40%] lg:object-[50%_35%]"
                      sizes="(max-width:1024px) 100vw, 480px"
                    />
                    <Image
                      src={ASSETS.extinguisher}
                      alt=""
                      fill
                      className="object-cover object-[72%_center] opacity-[0.11] blur-[1.5px] saturate-0 sm:object-[68%_42%] lg:object-[62%_38%]"
                      sizes="(max-width:1024px) 100vw, 480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-950/88 to-zinc-950/75 lg:bg-gradient-to-r lg:from-zinc-950 lg:via-zinc-950/82 lg:to-zinc-950/25" />
                    <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-orange-500/[0.06] to-transparent lg:block" />
                  </div>

                  <div className="relative z-[1]">
                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-400/75">
                      Linked view
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold leading-[1.15] text-white sm:text-4xl md:text-[2.35rem]">
                      Master the extinguisher.
                    </h2>
                    <p className="mt-2 font-display text-lg font-medium text-orange-200/95 sm:text-2xl">
                      Own the moment.
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                      Step through the response: identify hazard, orient, spray, and suppress —
                      with muscle memory, not panic.
                    </p>
                  </div>
                </div>

                <div
                  ref={cardStageRef}
                  className="relative flex min-h-[280px] items-stretch will-change-transform bg-black/20 md:[perspective:1000px] md:[transform-style:preserve-3d] lg:min-h-0"
                >
                  <div className="pointer-events-none absolute left-0 top-1/2 z-[2] hidden h-24 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent lg:block" aria-hidden />
                  <FireControlCard3D sectionRef={sectionRef} merged />
                </div>
              </div>
            </div>
          </div>
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
    </section>
  );
}
