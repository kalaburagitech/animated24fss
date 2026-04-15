"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ASSETS } from "@/lib/assets";
import { registerGsap } from "@/lib/gsap-register";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

const team = [
  { name: "Aarav Mehta", role: "Lead Instructor", tag: "NFPA-aligned drills" },
  { name: "Neha Kapoor", role: "ERT Program Head", tag: "Crisis simulations" },
  { name: "Rahul Verma", role: "Audit Director", tag: "Compliance & audits" },
];

export function AboutContent() {
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    registerGsap();
    const root = statsRef.current;
    if (!root) return;

    const nums = root.querySelectorAll("[data-count]");
    const ctx = gsap.context(() => {
      nums.forEach((el) => {
        const target = Number((el as HTMLElement).dataset.count ?? 0);
        const obj = { val: 0 };
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              (el as HTMLElement).textContent = `${Math.round(obj.val)}+`;
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative min-h-[55svh] overflow-hidden">
        <Image
          src={ASSETS.fireHero}
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-red-950/40" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.35em] text-orange-300/90"
          >
            About 24 FSS
          </motion.p>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-semibold text-white sm:text-6xl"
          >
            Training that feels like a film. Delivers like a protocol.
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.p
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-lg leading-relaxed text-zinc-300"
        >
          <span className="font-semibold text-white">24 FSS</span> partners with
          organizations that refuse to treat safety as paperwork. We combine
          cinematic learning experiences with field-tested protocols so your
          teams respond — not panic — when seconds matter.
        </motion.p>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              title: "Mission",
              body: "Make fire readiness intuitive, memorable, and measurable for every workplace.",
            },
            {
              title: "Vision",
              body: "A world where every team knows exactly what to do before the alarm sounds.",
            },
            {
              title: "Values",
              body: "Precision, empathy, and zero theatre without substance.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="glass-panel p-8"
            >
              <h2 className="font-display text-xl font-semibold text-white">
                {b.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-semibold text-white sm:text-4xl"
        >
          Impact in numbers
        </motion.h2>
        <div
          ref={statsRef}
          className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: "Organizations trained", count: 420 },
            { label: "Sessions delivered", count: 1800 },
            { label: "Cities covered", count: 36 },
            { label: "ERT teams upskilled", count: 950 },
          ].map((s) => (
            <div key={s.label} className="glass-panel p-8 text-center">
              <p
                data-count={s.count}
                className="font-display text-4xl font-semibold text-orange-300"
              >
                0+
              </p>
              <p className="mt-2 text-sm text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl font-semibold text-white sm:text-4xl"
        >
          Team
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass-panel overflow-hidden p-0"
            >
              <div className="relative h-40 bg-gradient-to-br from-red-900/60 to-black">
                <Image
                  src={ASSETS.training1}
                  alt=""
                  fill
                  className="object-cover opacity-40 mix-blend-screen"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="font-display text-lg font-semibold text-white">
                  {m.name}
                </p>
                <p className="text-sm text-orange-300/90">{m.role}</p>
                <p className="mt-2 text-xs text-zinc-500">{m.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:border-orange-500/40 hover:bg-white/10"
          >
            Work with us
          </Link>
        </div>
      </section>
    </>
  );
}
