import Link from "next/link";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

const PROCESS_IMAGES = [
  {
    src: "/images/factory-tour-quality-control.png",
    alt: "KaiGui quality process display from the factory tour",
    title: "Quality Control",
    body: "Inspection discipline, controlled production records, and batch-level review keep custom work aligned with approved samples.",
  },
  {
    src: "/images/factory-tour-environmental-control.png",
    alt: "KaiGui environmental control display from the factory tour",
    title: "Environmental Control",
    body: "Licensed plating operations depend on wastewater treatment, emission control, and documented environmental management.",
  },
  {
    src: "/images/factory-tour-leadership-floor.jpg",
    alt: "KaiGui leadership on the production floor",
    title: "Factory Floor Oversight",
    body: "Senior production leadership stays close to tooling, finishing, and assembly details for time-sensitive bespoke programs.",
  },
  {
    src: "/images/factory-tour-production-detail.jpg",
    alt: "KaiGui production detail from the factory tour",
    title: "Detail Manufacturing",
    body: "Metal finishing, enamel work, and hand checks are coordinated inside one vertically integrated Kunshan facility.",
  },
];

const CLIENT_LOGOS = [
  {
    src: "/images/factory-tour-client-psa-bdp.jpg",
    alt: "PSA BDP",
    name: "PSA BDP",
  },
  {
    src: "/images/factory-tour-client-elgin.jpeg",
    alt: "Elgin Military Museum",
    name: "Elgin Military Museum",
  },
  {
    src: "/images/factory-tour-client-aga-khan.png",
    alt: "Aga Khan Museum",
    name: "Aga Khan Museum",
  },
  {
    src: "/images/factory-tour-client-mark.png",
    alt: "Eagle Emblems",
    name: "Eagle Emblems",
  },
  {
    src: "/images/factory-tour-client-foxconn.png",
    alt: "Foxconn",
    name: "Foxconn",
  },
];

const TOUR_POINTS = [
  {
    icon: "factory",
    label: "Vertically Integrated",
    value: "Stamping, plating, enamel, finishing",
  },
  {
    icon: "verified",
    label: "Licensed Plating",
    value: "Environmental and operation controls",
  },
  {
    icon: "schedule",
    label: "Production Control",
    value: "Scheduling, QC, and delivery coordination",
  },
];

export default function FactoryTourPage() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body antialiased overflow-x-hidden">
      <SiteNav />

      <main className="pt-24">
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5">
              <Link
                href="/about"
                className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                Back to About
              </Link>
              <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mt-10 mb-5">
                Factory Tour
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8">
                See Us <span className="italic text-secondary">Live.</span>
              </h1>
              <p className="font-headline text-2xl md:text-3xl text-primary italic mb-8 leading-snug">
                Finding Inspiration in Every Metal
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Take a virtual tour of KaiGui Ornament and step inside our Kunshan facility to see
                the precision, technology, and quality control behind our ornament and custom pin
                production.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-video bg-primary overflow-hidden shadow-2xl">
                <video
                  className="h-full w-full object-cover"
                  controls
                  poster="/images/factory-tour-video-poster.jpg"
                  preload="metadata"
                >
                  <source src="/videos/factory-tour.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12">
              <h2 className="font-headline text-3xl md:text-5xl text-primary mb-8">
                Precision from the Factory Floor
              </h2>
              <div className="space-y-6 text-on-surface-variant leading-loose">
                <p>
                  KaiGui Ornament Co., Ltd. is a leading Taiwanese manufacturer of high-quality
                  ornaments, established in 1992 and based in Kunshan City, Jiangsu Province, China.
                  As a fully licensed and compliant producer, we operate a state-of-the-art,
                  vertically integrated facility.
                </p>
                <p>
                  This structure lets us control quality, scheduling, and market positioning from
                  tooling through final finish, while supporting the technical review process that
                  bespoke and licensed brand programs require.
                </p>
                <p>
                  As a holder of one of China&apos;s most rigorous plating licenses, KaiGui demonstrates
                  an uncompromising commitment to environmental compliance and product quality.
                  Advanced wastewater treatment and emission controls support plating that is
                  durable, consistent, and responsibly produced.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[420px] overflow-hidden bg-surface-container-low">
              <img
                src="/images/factory-tour-facility-exterior.jpg"
                alt="KaiGui factory exterior from the factory tour"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/15" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-primary/80 to-transparent">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/70 mb-3">
                  Kunshan Facility
                </p>
                <p className="font-headline text-3xl text-white italic">
                  Licensed production, plating, finishing, and quality control in one controlled
                  campus.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
              <div className="lg:col-span-5">
                <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-5">
                  Manufacturing Process
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight">
                  The Controls Behind the Finish
                </h2>
              </div>
              <p className="lg:col-span-7 text-on-surface-variant text-lg leading-relaxed">
                The original tour highlights the systems that matter most to customers: quality
                discipline, environmental control, floor-level production visibility, and precise
                finishing work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {PROCESS_IMAGES.map(({ src, alt, title, body }) => (
                <article
                  key={title}
                  className="bg-surface-container-lowest border border-outline-variant/10 min-h-[560px] flex flex-col"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container">
                    <img src={src} alt={alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-headline text-2xl text-primary mb-4">{title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-outline-variant/20 mb-20">
              {TOUR_POINTS.map(({ icon, label, value }) => (
                <div key={label} className="bg-surface-bright p-8 md:p-10">
                  <span className="material-symbols-outlined text-secondary text-3xl block mb-8">
                    {icon}
                  </span>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-3">
                    {label}
                  </p>
                  <p className="font-headline text-2xl text-primary leading-snug">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <div>
                <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-5">
                  Our Clients
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary">
                  Trusted Production Programs
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex justify-center bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Contact Sales
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-outline-variant/20">
              {CLIENT_LOGOS.map(({ src, alt, name }) => (
                <div
                  key={src}
                  className="bg-surface-container-lowest min-h-[150px] flex flex-col items-center justify-center p-6"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <span className="mt-5 text-center font-label text-[10px] uppercase tracking-wider text-on-surface-variant">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
