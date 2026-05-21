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

const SERVICE_SCOPE = [
  {
    title: "Design Consultation",
    detail:
      "No production drawing yet? We refine logos, sketches, references, and rough concepts into artwork the factory can build.",
    icon: "draw",
  },
  {
    title: "Precision Mold Making",
    detail:
      "Custom molds translate your design into sharp physical detail for pins, coins, keychains, bookmarks, name tags, and ornaments.",
    icon: "precision_manufacturing",
  },
  {
    title: "Plating and Enamel",
    detail:
      "In-house finishing gives your piece the right look: polished metal, hard enamel, soft enamel, color fill, and premium plating.",
    icon: "format_paint",
  },
  {
    title: "Quality Control",
    detail:
      "Every run is checked through production so the final shipment looks consistent, professional, and ready for your customer.",
    icon: "fact_check",
  },
];

const CUSTOM_DESIGN_STEPS = [
  {
    step: "01",
    title: "Graphic Design Approval",
    detail:
      "We turn your concept into clear production artwork and confirm the design with you before tooling begins.",
  },
  {
    step: "02",
    title: "Prototype Review",
    detail:
      "Review a physical sample or detailed production photos so you can approve the look before full production.",
  },
  {
    step: "03",
    title: "Mass Production",
    detail:
      "Once the prototype is approved, we move into the full run with the accepted sample as the production standard.",
  },
  {
    step: "04",
    title: "Assembly",
    detail:
      "Pins, keychains, coins, bookmarks, name tags, and mixed-material pieces move through finishing and assembly.",
  },
  {
    step: "05",
    title: "Packing and Shipping",
    detail:
      "Completed goods are packed and shipped through FedEx, UPS, or DHL with tracking numbers for delivery visibility.",
  },
  {
    step: "06",
    title: "Follow-Up Service",
    detail:
      "After delivery, KaiGui stays available for reorders, future adjustments, and support for your next design.",
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
            Manufacturing Services
          </div>
          <h1 className="font-headline text-6xl md:text-8xl leading-tight text-primary font-bold tracking-tight">
            Products and<br />
            <em className="italic font-normal">Custom Design.</em>
          </h1>
        </div>
        <div className="col-span-12 md:col-span-5 pb-4">
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
            Bring finished artwork, a rough sketch, or only a product idea. KaiGui
            turns it into manufacturable pins, coins, keychains, bookmarks, name
            tags, and ornaments with factory production managed under one roof.
          </p>
        </div>
      </header>

      {/* ── Product Services ── */}
      <main className="max-w-[1920px] mx-auto px-12 pb-28">
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="font-label text-secondary text-xs uppercase tracking-[0.2em]">
              From Your Design to Production
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary mt-4">
              Choose the product style. We build it for real.
            </h2>
          </div>
          <p className="lg:col-span-5 text-on-surface-variant text-sm md:text-base leading-relaxed">
            Start with the format that fits your brand, event, collection, or
            retail program. KaiGui turns approved artwork into tooling, finished
            color, plated metal, inspected goods, and shipment-ready packaging.
          </p>
        </div>

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

                  <div className="mt-auto pt-8">
                    <Link
                      href={`/product/${style.slug}`}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-outline-variant px-5 py-3 text-center font-label text-[11px] uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
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

      {/* ── Custom Design Services ── */}
      <section
        id="custom-design"
        className="bg-surface-container-low py-24 md:py-32"
      >
        <div className="max-w-[1920px] mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.2em]">
                Have an Idea Only?
              </span>
              <h2 className="font-headline text-5xl md:text-7xl text-primary leading-tight mt-5">
                No worries, we cover the rest.
              </h2>
              <p className="mt-8 text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Send a logo, sketch, reference photo, or simple concept. Our team
                develops the design, prepares artwork for production, confirms the
                prototype, manages manufacturing, and delivers finished pieces with
                tracking and follow-up support.
              </p>
              <Link
                href="/contact"
                className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-8 py-4 font-label text-xs uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
              >
                Start a Custom Project
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>

              <div className="mt-14 max-w-xl">
                <div className="relative aspect-[1331/433] overflow-hidden bg-surface-container-lowest border border-outline-variant/20">
                  <img
                    src="/images/deisgn_booth.avif"
                    alt="KaiGui custom design booth display"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Concept review, design translation, and production planning in one workflow.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20">
                {SERVICE_SCOPE.map(({ title, detail, icon }) => (
                  <article
                    key={title}
                    className="bg-surface-container-lowest p-8 min-h-[230px] flex flex-col justify-between"
                  >
                    <span className="material-symbols-outlined text-secondary text-3xl">
                      {icon}
                    </span>
                    <div className="mt-8">
                      <h3 className="font-headline text-2xl text-primary">
                        {title}
                      </h3>
                      <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="bg-primary text-on-primary p-8 md:p-10">
                <span className="font-label text-secondary text-xs uppercase tracking-[0.2em]">
                  Process Flow
                </span>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {CUSTOM_DESIGN_STEPS.map(({ step, title, detail }) => (
                    <div key={title} className="border-t border-on-primary/20 pt-5">
                      <span className="font-label text-secondary text-[10px] uppercase tracking-widest">
                        {step}
                      </span>
                      <h3 className="mt-3 font-headline text-2xl">{title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-on-primary/75">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
