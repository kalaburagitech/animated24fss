import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold text-white">24 FSS</p>
          <p className="mt-2 max-w-md text-sm text-zinc-500">
            Premium fire safety training and emergency readiness for workplaces
            across India.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-orange-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} 24 FSS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
