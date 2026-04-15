"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/gsap-register";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "control", label: "Control" },
  { id: "training", label: "Training" },
  { id: "transition", label: "Safety" },
  { id: "contact", label: "Contact" },
];

export function ScrollStoryProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    const triggers: ScrollTrigger[] = [];

    SECTIONS.forEach((section, index) => {
      const target = document.getElementById(section.id);
      if (!target) return;
      const trigger = ScrollTrigger.create({
        trigger: target,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <aside className="fixed right-4 top-1/2 z-[95] hidden -translate-y-1/2 md:block">
      <div className="glass-panel flex flex-col gap-2 p-3">
        {SECTIONS.map((section, idx) => {
          const isActive = idx === active;
          return (
            <a key={section.id} href={`#${section.id}`} className="group relative block" aria-label={section.label}>
              <span
                className={`block h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "scale-125 border-orange-300 bg-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.9)]"
                    : "border-white/40 bg-white/20"
                }`}
              />
              <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 rounded bg-black/85 px-2 py-1 text-xs text-zinc-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
