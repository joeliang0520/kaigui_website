"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/licensing", label: "Licensing" },
  { href: "/hard-enamel", label: "Design Your Self" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background transition-colors duration-300">
      <div className="flex justify-between items-center w-full px-12 py-6 max-w-[1920px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-headline tracking-tight text-primary">
            KaiGui Ornament
          </span>
          <span className="text-xs font-label tracking-widest text-on-surface-variant">
            開貴飾品電鍍有限公司
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`font-label text-sm transition-all ${
                  isActive
                    ? "text-secondary border-b-2 border-secondary pb-1"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/hard-enamel"
          className="bg-primary text-on-primary px-6 py-2.5 text-xs font-label uppercase tracking-widest hover:opacity-90 active:scale-[0.99] transition-transform"
        >
          Contact Sales
        </Link>
      </div>
    </nav>
  );
}
