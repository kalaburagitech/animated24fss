"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/gsap-register";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    registerGsap();

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchMultiplier: 1.25,
      touchInertiaExponent: 1.65,
      lerp: 0.09,
      wheelMultiplier: 1,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
