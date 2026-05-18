import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { PIN_STYLES } from "@/lib/pinConfig";

const STYLE_META: Record<
  string,
  { typeNum: string; typeName: string; desc: string; imgAlt?: string; imgSrc?: string }
> = {
  hard_enamel: {
    typeNum: "01",
    typeName: "Premium",
    desc: "The pinnacle of durability and elegance. Polished to a smooth, jewelry-like finish with vibrant, kiln-fired glass pigments.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGuy9jqBPL7uRilmgE9YxTVcakja1WfY3RR1lKDuEJsLe_uKC4pSkXME12Wm42qaB2TgEucri9p_h17QRQoGnK0kvu85WwlITd0_WekN3TXRJ9RHfvgfU82tbwq5bC2ixeRifWljpqpnlpPvqwjOb5sxxpql4LN6Chx31YW74t5VBJaJ5Zv7yxlSnJRWwOCPNrC0rIuqNJLi94W8K6PXBUaU7RwkIfdonqnomvCAzU7ezdKUXpOFYFv2U0qLA2sCrwbEbw_VNiH0M",
    imgAlt: "Close up of a luxury gold-plated hard enamel pin with deep navy and gold details",
  },
  soft_enamel: {
    typeNum: "02",
    typeName: "Textured",
    desc: "Classic dimensional texture with raised metal lines and recessed color. The quintessential collector's choice.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCboWZlRgm2d5l1UKrY8pRs0ivpOFKbEJAZXCnFHAtnchpLIVZStPOtXjJGpJsxrPPQYRAnutvyg2rHnf04uPjUz9hFyQPB2E1UIkvYVyDwGXcPBO3cLkMFK5I5b5lxPGNSrGr5j1VrjWdsgECxfsm_x5flyuWXrxiMZ4ZqM7OHvXJGg7K7omy7C1A8kclxrcNr2IzkfXYwU7JmrRhgE_lTWSBZddNxlGi2B7beXtiiAzBvt3NKH7HaWftdOqQsANbQTWKRVw8_rc",
    imgAlt: "Detailed macro view of soft enamel pin with recessed color panels and raised metal borders",
  },
  die_struck: {
    typeNum: "03",
    typeName: "Minimalist",
    desc: "Pure metallic sophistication. No color—just high-polish and sandblasted contrasts in gold, silver, or bronze.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbRvuwFoKHg_7WL34UgM8B7NaTOQwr9WhyhoCW8IoXDYxn3i58FfEFHgpTi5QNcMRMYw1l8f6ibPNEv_mQ8q7Plq8wkWClcCG7R5rfhUw394ky6GJ3xKd6VE8YR5lBpIEkr1ZPMPLJiFTnbgpxFsZdfEi3cGdRNEZQAc3X9Y5qaIiKodEqGTwW2Tt10b_tQU_lDe8M5aR7W6lIujwrWhR-V6z6m3I4J0WVkIsXIZ28RTXFN_oquIZN8SX4pbQ_2Dkdja_IjpQLP20",
    imgAlt: "Minimalist antique silver die struck metal pin on clean white linen background",
  },
  "3d_mold": {
    typeNum: "04",
    typeName: "Sculptural",
    desc: "Architectural depth through custom zinc alloy casting. Ideal for intricate shapes and relief sculptures.",
  },
  laser_cut: {
    typeNum: "05",
    typeName: "Technical",
    desc: "Precision edge geometry using advanced industrial lasers. Sharp profiles for contemporary designs.",
  },
  acrylic: {
    typeNum: "06",
    typeName: "Modern Medium",
    desc: "A lightweight, high-gloss alternative. Direct digital printing on premium acrylic allows for infinite color gradients and complex transparency effects.",
    imgSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlv6YpRCCtJFPsBlRlXukRv98ZVSn5ik3FE6IRnlPmcdywe31uA3tys3hA6yAmK0dlvQ2x1z0FvkJ0DiaT1zK8XJLN5xbnC_Wth0c68NLQ0c1FvI2LbU-fU7pWha2yKvrqFwwiQMVEkomYE-iHKic5mKq6ukruwVFAQEAAoq8Cu6-HsA6Xvr-jbBleHKVCghk2ZwWFcwQP10YnRKhGFEV73kPyRwY6IDQSsivqjSxDZ0HBwqIWv2wTlOstWnmNRGQ2E_3OG2Y17M0",
    imgAlt: "Abstract translucent colorful acrylic shapes catching light with sharp clean edges",
  },
};

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
  const featured = PIN_STYLES.find((s) => s.id === "hard_enamel")!;
  const softEnamel = PIN_STYLES.find((s) => s.id === "soft_enamel")!;
  const mid = PIN_STYLES.filter((s) => ["die_struck", "3d_mold", "laser_cut"].includes(s.id));
  const acrylic = PIN_STYLES.find((s) => s.id === "acrylic")!;

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

      {/* ── Product Bento Grid ── */}
      <main className="max-w-[1920px] mx-auto px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Hard Enamel — large feature card */}
          <Link
            href={`/${featured.slug}`}
            className="md:col-span-8 bg-surface-container-lowest group relative overflow-hidden flex flex-col md:flex-row min-h-[400px]"
          >
            <div className="md:w-1/2 p-12 flex flex-col justify-between z-10">
              <div>
                <span className="font-label text-[10px] text-secondary uppercase tracking-widest">
                  Type {STYLE_META[featured.id].typeNum} / {STYLE_META[featured.id].typeName}
                </span>
                <h3 className="font-headline text-3xl mt-4 text-primary">{featured.label}</h3>
                <p className="mt-4 text-on-surface-variant leading-relaxed">
                  {STYLE_META[featured.id].desc}
                </p>
              </div>
              <div className="mt-8 flex items-center text-primary font-label group-hover:text-secondary transition-colors">
                Start designing{" "}
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
            <div className="md:w-1/2 relative bg-surface-container-low overflow-hidden min-h-[280px]">
              {STYLE_META[featured.id].imgSrc && (
                <img
                  src={STYLE_META[featured.id].imgSrc}
                  alt={STYLE_META[featured.id].imgAlt}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              )}
            </div>
          </Link>

          {/* Soft Enamel — tall small card */}
          <Link
            href={`/${softEnamel.slug}`}
            className="md:col-span-4 bg-surface-container-lowest group p-10 flex flex-col justify-between"
          >
            <div>
              <span className="font-label text-[10px] text-secondary uppercase tracking-widest">
                Type {STYLE_META[softEnamel.id].typeNum} / {STYLE_META[softEnamel.id].typeName}
              </span>
              <div className="mt-4 aspect-square bg-surface-container-low mb-8 overflow-hidden">
                {STYLE_META[softEnamel.id].imgSrc && (
                  <img
                    src={STYLE_META[softEnamel.id].imgSrc}
                    alt={STYLE_META[softEnamel.id].imgAlt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="font-headline text-2xl text-primary">{softEnamel.label}</h3>
              <p className="mt-2 text-on-surface-variant text-sm">{STYLE_META[softEnamel.id].desc}</p>
            </div>
            <div className="mt-12 flex items-center text-primary font-label group-hover:text-secondary transition-colors">
              Start designing{" "}
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* Die Struck, 3D Mold, Laser-Cut — 3 medium cards */}
          {mid.map((style, i) => (
            <Link
              key={style.id}
              href={`/${style.slug}`}
              className={`md:col-span-4 group p-10 flex flex-col justify-between ${
                i === 0 ? "bg-surface-container-low" : "bg-surface-container-lowest"
              }`}
            >
              <div>
                <span className="font-label text-[10px] text-secondary uppercase tracking-widest">
                  Type {STYLE_META[style.id].typeNum} / {STYLE_META[style.id].typeName}
                </span>
                <h3 className="font-headline text-2xl mt-4 text-primary">{style.label}</h3>
                <p className="mt-2 text-on-surface-variant text-sm">{STYLE_META[style.id].desc}</p>
              </div>
              {STYLE_META[style.id].imgSrc && (
                <div className="mt-8 relative h-32 overflow-hidden">
                  <img
                    src={STYLE_META[style.id].imgSrc}
                    alt={STYLE_META[style.id].imgAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="mt-8 flex items-center text-primary font-label group-hover:text-secondary transition-colors">
                Start designing{" "}
                <span className="material-symbols-outlined ml-2">arrow_forward</span>
              </div>
            </Link>
          ))}

          {/* Acrylic — full-width dark banner */}
          <Link
            href={`/${acrylic.slug}`}
            className="md:col-span-12 bg-primary text-on-primary group relative overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-2/3 p-12 z-10">
              <span className="font-label text-[10px] text-secondary-fixed uppercase tracking-widest">
                Type {STYLE_META[acrylic.id].typeNum} / {STYLE_META[acrylic.id].typeName}
              </span>
              <h3 className="font-headline text-4xl mt-4 italic">{acrylic.label}</h3>
              <p className="mt-4 text-on-primary-container max-w-xl">
                {STYLE_META[acrylic.id].desc}
              </p>
              <div className="mt-8 inline-block px-8 py-3 bg-secondary text-on-secondary font-label uppercase tracking-widest text-xs hover:opacity-90 active:scale-[0.98] transition-all">
                Start designing →
              </div>
            </div>
            <div className="md:w-1/3 relative min-h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10" />
              {STYLE_META[acrylic.id].imgSrc && (
                <img
                  src={STYLE_META[acrylic.id].imgSrc}
                  alt={STYLE_META[acrylic.id].imgAlt}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-lighten opacity-60"
                />
              )}
            </div>
          </Link>
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
