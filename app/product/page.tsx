import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { PIN_STYLES } from "@/lib/pinConfig";
import { PRODUCT_DETAILS } from "@/lib/productCatalog";

const LAB_METRICS = [
  {
    label: "Tolerance",
    value: "±0.05mm",
    detail: "Calibrated machining for all die-struck processes ensuring surgical precision.",
  },
  {
    label: "Material",
    value: "99.9% Zinc",
    detail: "High-grade alloy selection for superior plating adhesion and longevity.",
  },
  {
    label: "Color Fidelity",
    value: "Pantone+",
    detail: "Digital spectrometer verification for 1:1 color reproduction accuracy.",
  },
  {
    label: "Lead Time",
    value: "14–21 Days",
    detail: "Optimized workshop scheduling from digital proof to physical delivery.",
  },
];

export default function ProductPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body antialiased">
      <SiteNav />

      {/* ── Editorial Header ── */}
      <header className="max-w-[1920px] mx-auto px-12 pt-36 pb-16 grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 md:col-span-7">
          <div className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4">
            The Atelier Selection
          </div>
          <h1 className="font-headline text-6xl md:text-8xl leading-tight text-primary font-bold tracking-tight">
            Precision Crafted<br />
            <em className="italic font-normal">Ornaments.</em>
          </h1>
        </div>
        <div className="col-span-12 md:col-span-5 pb-4">
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
            KaiGui Ornament merges traditional craftsmanship with industrial excellence. Select
            your base medium to begin the workshop process.
          </p>
        </div>
      </header>

      {/* ── Product Grid ── */}
      <main className="max-w-[1920px] mx-auto px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {PIN_STYLES.map((style) => {
            const detail = PRODUCT_DETAILS[style.id];

            return (
              <article
                key={style.id}
                className="group h-full min-h-[560px] bg-surface-container-lowest border border-outline-variant/10 overflow-hidden flex flex-col transition-colors hover:bg-surface-bright"
              >
                <Link
                  href={`/product/${style.slug}`}
                  className="relative aspect-[4/3] bg-surface-container-low overflow-hidden block"
                  aria-label={`View ${style.label} details`}
                >
                  <img
                    src={detail.imageSrc}
                    alt={detail.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.25] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </Link>

                <div className="p-8 flex flex-1 flex-col">
                  <h3 className="font-headline text-3xl text-primary">{style.label}</h3>
                  <p className="mt-4 text-on-surface-variant text-sm leading-relaxed">
                    {detail.summary}
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-3 text-xs text-on-surface-variant">
                    {detail.bestFor.slice(0, 2).map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-base leading-none">
                          check
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href={`/${style.slug}`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 text-center font-label text-[11px] uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
                    >
                      Start designing
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                    <Link
                      href={`/product/${style.slug}`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 border border-outline-variant px-5 py-3 text-center font-label text-[11px] uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
                    >
                      See detail
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* ── Lab Metrics ── */}
      <section className="max-w-[1920px] mx-auto px-12 mb-32">
        <div className="border-t border-outline-variant/20 pt-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {LAB_METRICS.map(({ label, value, detail }) => (
            <div key={label} className="flex flex-col">
              <span className="font-label text-xs text-secondary uppercase tracking-[0.2em]">
                {label}
              </span>
              <span className="font-headline text-3xl mt-2">{value}</span>
              <p className="text-xs text-on-surface-variant mt-4 leading-relaxed uppercase tracking-wider">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
