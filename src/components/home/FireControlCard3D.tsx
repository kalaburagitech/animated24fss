"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "@/lib/assets";
import { registerGsap } from "@/lib/gsap-register";
import { useIsMobile } from "@/lib/useIsMobile";
import { useReducedMotion } from "@/lib/useReducedMotion";

type FireControlCard3DProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

function useTouchOnly(): boolean {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const sync = () => setTouch(mq.matches || "ontouchstart" in window);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return touch;
}

const SPARK_BITS = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
  id: i,
  left: `${8 + (i * 11) % 72}%`,
  delay: (i * 0.35) % 2.5,
  duration: 3.2 + (i % 4) * 0.45,
  src: i % 2 === 0 ? ASSETS.sparks : ASSETS.sparks1,
  size: 22 + (i % 3) * 10,
}));

function CardSparkLayer({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] overflow-hidden rounded-[inherit]"
      aria-hidden
    >
      {SPARK_BITS.map((b) => (
        <span
          key={b.id}
          className="fss-spark-bit absolute mix-blend-screen opacity-0"
          style={{
            left: b.left,
            bottom: "-12%",
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <Image
            src={b.src}
            alt=""
            width={b.size}
            height={b.size}
            className="h-full w-full object-contain opacity-90"
            sizes="40px"
          />
        </span>
      ))}
    </div>
  );
}

export function FireControlCard3D({ sectionRef }: FireControlCard3DProps) {
  const mobile = useIsMobile();
  const touchOnly = useTouchOnly();
  const reducedMotion = useReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);

  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseSmooth = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ rx: 0, ry: 0, s: 1, ty: 0 });
  const hoverRef = useRef(false);

  const rotMul = mobile ? 0.48 : 1;
  const mouseMul = mobile ? 0.35 : 1;
  const floatAmp = reducedMotion ? 0 : mobile ? 5 : 10;

  const setPointerFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const wrap = wrapRef.current;
      if (!wrap || touchOnly) return;
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (clientX - cx) / (rect.width / 2);
      const ny = (clientY - cy) / (rect.height / 2);
      mouseTarget.current.x = gsap.utils.clamp(-1, 1, nx);
      mouseTarget.current.y = gsap.utils.clamp(-1, 1, ny);
    },
    [touchOnly],
  );

  useLayoutEffect(() => {
    if (reducedMotion) return;

    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    scrollRef.current = { rx: 0, ry: 0, s: 1, ty: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          scrollRef.current.ry = p * 25 * rotMul;
          scrollRef.current.rx = p * 10 * rotMul;
          scrollRef.current.s = 1 + p * 0.2;
          scrollRef.current.ty = -p * 32;
        },
      });
    }, section);

    const LERP = 0.14;

    const tick = () => {
      const card = cardRef.current;
      const glow = glowRef.current;
      const rim = rimRef.current;
      if (!card || !glow || !rim) return;

      mouseSmooth.current.x +=
        (mouseTarget.current.x - mouseSmooth.current.x) * LERP;
      mouseSmooth.current.y +=
        (mouseTarget.current.y - mouseSmooth.current.y) * LERP;

      const sx = scrollRef.current;
      const t = gsap.ticker.time;

      const floatY = Math.sin(t * 0.85) * floatAmp;
      const pointerActive = !touchOnly;
      const mrx = pointerActive ? -mouseSmooth.current.y * 14 * mouseMul : 0;
      const mry = pointerActive ? mouseSmooth.current.x * 14 * mouseMul : 0;

      const hoverBoost = hoverRef.current ? 1.045 : 1;

      gsap.set(card, {
        force3D: true,
        transformPerspective: 1400,
        transformOrigin: "50% 50%",
        rotationX: sx.rx + mrx,
        rotationY: sx.ry + mry,
        scale: sx.s * hoverBoost,
        y: sx.ty + floatY,
      });

      const glowBoost = hoverRef.current ? 1.18 : 1;
      gsap.set(glow, {
        opacity: Math.min(0.95, 0.42 + (sx.s - 1) * 1.1) * glowBoost,
        scale: 0.92 + (sx.s - 1) * 0.55,
      });

      gsap.set(rim, {
        opacity: 0.32 + (hoverRef.current ? 0.22 : 0),
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, [sectionRef, rotMul, mouseMul, floatAmp, touchOnly, reducedMotion]);

  useLayoutEffect(() => {
    if (!reducedMotion) return;

    const card = cardRef.current;
    const glow = glowRef.current;
    const rim = rimRef.current;
    if (!card || !glow || !rim) return;

    gsap.set(card, {
      force3D: true,
      transformPerspective: 1400,
      rotationX: 4 * rotMul,
      rotationY: 12 * rotMul,
      scale: 1.08,
      y: 0,
    });
    gsap.set(glow, { opacity: 0.65, scale: 1 });
    gsap.set(rim, { opacity: 0.45 });
  }, [reducedMotion, rotMul]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (e: PointerEvent) => {
      if (touchOnly || reducedMotion) return;
      setPointerFromEvent(e.clientX, e.clientY);
    };

    const onLeave = () => {
      mouseTarget.current.x = 0;
      mouseTarget.current.y = 0;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [setPointerFromEvent, touchOnly, reducedMotion]);

  return (
    <div
      className="mx-auto mt-6 flex w-full max-w-lg justify-center px-2 sm:mt-8"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={wrapRef}
        className="relative w-full max-w-[420px] pb-10 pt-4"
        onPointerEnter={() => {
          hoverRef.current = true;
        }}
        onPointerLeave={() => {
          hoverRef.current = false;
        }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-500/50 via-red-600/40 to-transparent blur-[96px] will-change-[opacity,transform]"
          aria-hidden
        />

        <div
          ref={cardRef}
          className="relative origin-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/40 shadow-[0_56px_120px_rgba(0,0,0,0.88),0_28px_70px_rgba(220,38,38,0.42)] backdrop-blur-lg will-change-transform"
          style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] bg-gradient-to-br from-white/[0.16] via-transparent to-transparent"
            aria-hidden
          />
          <div
            ref={rimRef}
            className="pointer-events-none absolute inset-px z-[6] rounded-[inherit] ring-1 ring-inset ring-white/18"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[inherit] bg-black/55 blur-3xl"
            aria-hidden
          />

          <div className="relative aspect-[4/5] w-full">
            <Image
              src={ASSETS.extinguisherFire}
              alt="Fire extinguisher"
              fill
              className="object-contain object-center drop-shadow-[0_36px_70px_rgba(0,0,0,0.82)]"
              sizes="(max-width:768px) 90vw, 420px"
              priority
            />

            <div
              className="pointer-events-none absolute inset-0 z-[8] mix-blend-screen opacity-[0.2]"
              aria-hidden
            >
              <Image
                src={ASSETS.smoke}
                alt=""
                fill
                className="object-cover opacity-80"
                sizes="100vw"
              />
            </div>

            <div
              className={`pointer-events-none absolute inset-0 z-[9] opacity-40 mix-blend-screen ${reducedMotion ? "" : "fss-smoke-drift"}`}
              aria-hidden
            >
              <Image
                src={ASSETS.smoke}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <CardSparkLayer reduced={reducedMotion} />

            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[12] h-[38%] rounded-t-[inherit] bg-gradient-to-b from-white/30 via-white/8 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-[26%] rounded-b-[inherit] bg-gradient-to-t from-black/55 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
