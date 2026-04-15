"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ASSETS } from "@/lib/assets";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/#training", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const homeHref = pathname === "/" ? "#hero" : "/#hero";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background,backdrop-filter,border-color] duration-500 ease-in-out ${
        scrolled
          ? "border-b border-white/10 bg-black/55 backdrop-blur-xl"
          : "border-b border-transparent bg-black/20 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={homeHref} className="group flex items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-red-900/80 to-black shadow-[0_0_24px_rgba(220,38,38,0.35)]">
            <Image
              src={ASSETS.sparks}
              alt=""
              fill
              className="object-cover opacity-80 mix-blend-screen"
              sizes="40px"
              priority
            />
            <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold tracking-tight text-white">
              24
            </span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            FSS
          </span>
        </Link>

        <ul className="hidden flex-wrap items-center justify-end gap-1 md:flex">
          {links.map((l) => {
            const isPage =
              l.href.startsWith("/#") === false && l.href !== "/";
            const active =
              l.href === "/"
                ? pathname === "/" && !l.href.includes("#")
                : isPage
                  ? pathname === l.href
                  : false;
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out lg:px-4 ${
                    active
                      ? "text-orange-300"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-orange-500/30"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-gradient-to-r from-red-700 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(234,88,12,0.4)] transition hover:brightness-110 md:inline-flex"
        >
          Book Training
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 rounded-full bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 rounded-full bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 rounded-full bg-white"
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="border-t border-white/10 bg-black/90 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => {
                const isPage =
                  l.href.startsWith("/#") === false && l.href !== "/";
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : isPage
                      ? pathname === l.href
                      : false;
                return (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={`block rounded-xl px-4 py-3 text-base font-medium ${
                        active ? "bg-white/10 text-orange-200" : "text-zinc-300"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 block rounded-xl bg-gradient-to-r from-red-700 to-orange-600 py-3 text-center text-base font-semibold text-white"
              >
                Book Training
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
