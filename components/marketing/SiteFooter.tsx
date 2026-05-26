import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-surface-container-low border-t border-primary/5 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-12 py-12 max-w-[1920px] mx-auto gap-12">

        <div>
          <div className="font-headline italic text-lg text-primary">KaiGui Ornament</div>
          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mt-2">
            Precision in Every Detail
          </div>
          <p className="font-label text-[10px] text-on-surface-variant/60 mt-4 uppercase tracking-widest leading-relaxed max-w-[220px]">
            Kunshan Industrial Sector<br />
            31° 23′ N / 120° 57′ E<br />
            Est. 1992
          </p>
        </div>

        <div className="flex flex-wrap gap-16">
          <div>
            <h5 className="font-label text-xs uppercase tracking-widest text-secondary mb-6">Products</h5>
            <ul className="space-y-3">
              {[
                { href: "/hard-enamel", label: "Hard Enamel" },
                { href: "/soft-enamel", label: "Soft Enamel" },
                { href: "/die-struck", label: "Die Struck" },
                { href: "/3d-mold", label: "3D Mold" },
                { href: "/laser-cut", label: "Laser-Cut" },
                { href: "/acrylic", label: "Acrylic" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-label text-xs uppercase tracking-widest text-primary/60 hover:text-secondary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-label text-xs uppercase tracking-widest text-secondary mb-6">Company</h5>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/about/history", label: "Our History" },
                { href: "/about/founders", label: "Our Founders" },
                { href: "/about/second-generation", label: "Second Generation" },
                { href: "/licensing", label: "Licensing" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-label text-xs uppercase tracking-widest text-primary/60 hover:text-secondary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-[1920px] mx-auto px-12 pb-12 pt-6 border-t border-primary/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-[10px] text-primary/40 tracking-widest uppercase">
            © {new Date().getFullYear()} KaiGui Ornament Co., Ltd. — KunShan, China. All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            {["Privacy Policy", "Terms of Service", "Sustainability", "Global Support"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-label text-xs uppercase tracking-widest text-primary/60 hover:text-secondary transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
