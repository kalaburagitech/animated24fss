"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ASSETS } from "@/lib/assets";

const services = [
  "Fire Safety Training",
  "ERT Training",
  "Fire Audit",
  "Custom Workshop",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
  }

  const wa = "https://wa.me/919999999999?text=Hi%2024%20FSS%20—%20";

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden py-16">
      <div className="absolute inset-0">
        <Image
          src={ASSETS.gradient}
          alt=""
          fill
          className="object-cover opacity-80"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="absolute inset-0 opacity-30">
        <Image
          src={ASSETS.smoke}
          alt=""
          fill
          className="object-cover mix-blend-screen"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300/90">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
            Let&apos;s plan your next drill
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Share your site context — we&apos;ll respond with a training outline
            and audit checklist aligned to your risk profile.
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-6 py-3 text-sm font-semibold text-emerald-200 backdrop-blur-md transition hover:bg-emerald-900/50"
          >
            WhatsApp us
          </a>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="glass-panel space-y-5 p-8 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-500">
              Service
            </label>
            <select
              name="service"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-orange-500/50"
              defaultValue={services[0]}
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-zinc-500">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/50"
              placeholder="Site location, team size, timelines…"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-gradient-to-r from-orange-600 to-red-700 py-3.5 text-sm font-semibold text-white shadow-[0_0_36px_rgba(234,88,12,0.45)] transition hover:brightness-110"
            style={{ willChange: "transform" }}
          >
            Submit
          </motion.button>

          <AnimatePresence>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-center text-sm font-medium text-emerald-400"
              >
                Received — we&apos;ll ignite the conversation shortly.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500/50"
      />
    </div>
  );
}
