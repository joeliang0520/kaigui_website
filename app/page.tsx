import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const KUNSHAN_METRICS = [
  { value: "RMB 560B", label: "Estimated 2025 GDP" },
  { value: "RMB 1.3T+", label: "Industrial output above designated size" },
  { value: "RMB 824.8B", label: "Total import and export volume" },
  { value: "10,000", label: "Foreign-invested projects" },
  { value: "USD 120B+", label: "Total foreign investment" },
  { value: "48", label: "Fortune Global 500 companies attracted" },
];

export default function Home() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body">
      <SiteNav />

      <main className="pt-24">

        {/* ── Hero ── */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-surface">
          {/* Cinematic background image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 z-10" />
            <img
              alt="Precision metal manufacturing facility"
              src="/images/kaigui_logo_factory.avif"
              className="absolute inset-0 h-full w-full object-cover object-center grayscale opacity-35"
            />
          </div>

          <div className="container mx-auto px-6 md:px-12 py-28 md:py-36 relative z-20">
            <div className="max-w-4xl">
              <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs mb-8 block">
                Kunshan Manufacturing Proof
              </span>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary leading-[1.02] mb-8">
                Built in Kunshan. <br />
                <em className="italic">Proven by Compliance.</em>
              </h1>
              <p className="font-body text-lg md:text-2xl text-on-surface-variant max-w-3xl leading-relaxed mb-12">
                Since 1992, KaiGui Ornament has operated in Kunshan, one of China&apos;s most
                competitive, export-oriented, and highly regulated manufacturing hubs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/partner"
                  className="bg-primary text-on-primary px-10 py-5 text-sm font-label uppercase tracking-widest shadow-2xl hover:opacity-90 active:scale-[0.99] transition-all"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/licensing"
                  className="border border-outline-variant px-10 py-5 text-sm font-label uppercase tracking-widest hover:bg-surface-container-low transition-all"
                >
                  View Capabilities
                </Link>
              </div>
            </div>
          </div>

          {/* Technical detail ornament */}
          <div className="absolute bottom-12 right-12 hidden lg:block">
            <div className="font-label text-[10px] text-outline uppercase tracking-widest leading-loose text-right">
              Operating Since 1992<br />
              Kunshan Development Zone<br />
              31° 23′ 31″ N / 120° 57′ 04″ E
            </div>
          </div>
        </section>

        {/* ── Kunshan Proof Section ── */}
        <section className="py-28 md:py-36 bg-surface-container-low">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
              <div className="lg:col-span-4">
                <span className="font-label text-secondary uppercase tracking-[0.2em] text-xs">
                  Industrial Context
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary mt-5 leading-tight">
                  Kunshan is not an ordinary industrial city.
                </h2>
              </div>

              <div className="lg:col-span-8">
                <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-4xl">
                  In 2025, Kunshan&apos;s GDP was estimated at around RMB 560 billion, with its
                  total industrial output above designated size exceeding RMB 1.3 trillion and total
                  import and export volume reaching approximately RMB 824.8 billion. The city has
                  also ranked among China&apos;s strongest county-level economies for more than two
                  decades.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20 mt-16">
              {KUNSHAN_METRICS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-surface-container-lowest px-8 py-10 min-h-[160px] flex flex-col justify-between"
                >
                  <span className="font-headline text-4xl md:text-5xl text-primary">{value}</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mt-8">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-lowest">
                  <img
                    alt="KaiGui precision manufacturing floor in Kunshan"
                    src="/images/kunshan-production-campus.png"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-primary/80 to-transparent">
                    <span className="font-label text-on-primary text-[10px] uppercase tracking-widest">
                      Kunshan Production Campus
                    </span>
                    <p className="text-on-primary font-headline italic text-2xl mt-2">
                      Operating through a high-compliance industrial threshold.
                    </p>
                  </div>
                </div>
                <div className="relative mt-5 aspect-[3/2] overflow-hidden bg-surface-container-lowest">
                  <img
                    alt="Kunshan city, Jiangsu, China"
                    src="/images/kunshan.jpg"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.15]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-primary/75 to-transparent">
                    <span className="font-label text-on-primary text-[10px] uppercase tracking-widest">
                      Kunshan City, Jiangsu, China
                    </span>
                    <p className="text-on-primary font-body text-sm leading-relaxed mt-2 max-w-sm">
                      The regional manufacturing hub surrounding KaiGui&apos;s production campus.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-14">
                <div className="border-t border-outline-variant/30 pt-8">
                  <h3 className="font-headline text-3xl text-primary mb-5">
                    Foreign-invested manufacturing density
                  </h3>
                  <p className="font-body text-on-surface-variant text-lg leading-relaxed">
                    Kunshan has attracted a dense concentration of foreign-invested enterprises,
                    advanced manufacturing projects, and Fortune Global 500 companies. Public reports
                    show that Kunshan is home to nearly 10,000 foreign-invested projects from more
                    than 80 countries and regions, with total foreign investment exceeding USD 120
                    billion. It has also attracted 48 Fortune Global 500 companies, which have
                    established more than 100 projects in the city.
                  </p>
                </div>

                <div className="border-t border-outline-variant/30 pt-8">
                  <h3 className="font-headline text-3xl text-primary mb-5">
                    High entry threshold
                  </h3>
                  <p className="font-body text-on-surface-variant text-lg leading-relaxed">
                    This creates a business environment where only capable, disciplined, and compliant
                    manufacturers can survive long term. Industrial investment in Kunshan carries a
                    high entry threshold. Public land-use standards generally require new industrial
                    projects to reach an investment intensity of approximately RMB 6 million per mu,
                    and up to RMB 6.5 million per mu in higher-level development zones. For a 15-mu
                    industrial site, this represents an estimated fixed-asset investment threshold of
                    roughly RMB 90 million to RMB 97.5 million.
                  </p>
                </div>

                <div className="border-t border-outline-variant/30 pt-8">
                  <h3 className="font-headline text-3xl text-primary mb-5">
                    Electroplating raises the bar further
                  </h3>
                  <p className="font-body text-on-surface-variant text-lg leading-relaxed">
                    For an electroplating factory, the barrier is even higher. Beyond capital
                    investment, electroplating requires environmental permits, wastewater treatment
                    capability, discharge control, chemical management, and continuous regulatory
                    compliance.
                  </p>
                </div>

                <div className="bg-primary text-on-primary px-8 md:px-10 py-10">
                  <h3 className="font-headline text-3xl md:text-4xl mb-6">
                    Long-term operation is the evidence.
                  </h3>
                  <p className="font-body text-on-primary-container text-lg leading-relaxed">
                    KaiGui&apos;s ability to operate in Kunshan for more than three decades is proof
                    of more than manufacturing capacity. It is proof of compliance, resilience,
                    environmental responsibility, and long-term supply chain reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical Capabilities: Asymmetric Bento Grid ── */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-12">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <span className="font-label text-secondary uppercase tracking-[0.2em] text-xs">Atelier Standards</span>
              <h2 className="font-headline text-5xl text-primary mt-4">Technical Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Hard Enamel — wide */}
              <Link
                href="/hard-enamel"
                className="md:col-span-2 bg-surface-container-lowest p-12 flex flex-col justify-between border-l border-surface-container-high transition-all hover:bg-white group"
              >
                <div>
                  <span className="font-label text-[10px] text-outline-variant mb-4 block">01 / FINISHING</span>
                  <h3 className="font-headline text-3xl mb-6">Hard Enamel Craft</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-loose max-w-md">
                    Our signature cloisonné-style finish. Polished to a mirror-smooth surface where
                    metal and pigment exist in perfect alignment.
                  </p>
                </div>
                <div className="mt-12 flex items-end justify-between">
                  <div className="text-xs font-label text-secondary uppercase tracking-widest">Explore →</div>
                  <span className="material-symbols-outlined text-4xl text-surface-container-highest">shutter_speed</span>
                </div>
              </Link>

              {/* Die Casting — dark */}
              <Link
                href="/die-struck"
                className="bg-primary text-on-primary p-12 flex flex-col justify-between group"
              >
                <div>
                  <span className="font-label text-[10px] text-on-primary/40 mb-4 block">02 / FORMING</span>
                  <h3 className="font-headline text-3xl mb-6">Die Casting</h3>
                  <p className="font-body text-on-primary/70 text-sm leading-loose">
                    High-pressure zinc alloy casting for complex 3D geometries and structural integrity.
                  </p>
                </div>
                <div className="mt-8 border-t border-on-primary/10 pt-8">
                  <ul className="font-label text-[11px] uppercase tracking-widest space-y-3">
                    <li>±0.05mm Precision</li>
                    <li>Custom Tooling</li>
                    <li>High Volume Scale</li>
                  </ul>
                </div>
              </Link>

              {/* Color Match */}
              <Link
                href="/soft-enamel"
                className="bg-surface-container-low p-12 flex flex-col justify-between group"
              >
                <div>
                  <span className="font-label text-[10px] text-outline-variant mb-4 block">03 / CHROMATICS</span>
                  <h3 className="font-headline text-2xl mb-6">Color Match</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-loose">
                    Exacting Pantone® matching systems utilizing spectral analysis for absolute brand
                    consistency.
                  </p>
                </div>
                <div className="mt-12">
                  <div className="flex space-x-1">
                    <div className="w-full h-8 bg-secondary" />
                    <div className="w-full h-8 bg-primary" />
                    <div className="w-full h-8 bg-outline" />
                    <div className="w-full h-8 bg-surface-variant" />
                  </div>
                </div>
              </Link>

              {/* Metallurgical Alchemy — wide */}
              <Link
                href="/hard-enamel"
                className="md:col-span-2 bg-surface-container-highest/30 p-12 relative overflow-hidden group"
              >
                <div className="relative z-10 flex h-full items-center">
                  <div className="w-1/2">
                    <span className="font-label text-[10px] text-outline-variant mb-4 block">04 / METALLURGY</span>
                    <h3 className="font-headline text-3xl mb-4">Metallurgical Alchemy</h3>
                    <p className="font-body text-on-surface-variant text-sm">
                      Beyond standard plating. We offer physical vapor deposition (PVD) and custom
                      patinas for timeless aesthetics.
                    </p>
                    <div className="mt-8 font-label text-[10px] uppercase tracking-widest text-secondary">
                      Explore Materials →
                    </div>
                  </div>
                </div>
                <div
                  className="absolute right-0 top-0 h-full w-1/2 grayscale opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-l from-surface-container-high"
                  aria-hidden="true"
                />
              </Link>

            </div>
          </div>
        </section>

        {/* ── CTA: Secure Your Production Slot ── */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-12">
            <div className="bg-primary-container p-16 md:p-24 relative overflow-hidden">
              {/* Radial glow */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <span className="font-label text-secondary-fixed-dim uppercase tracking-[0.4em] text-xs mb-8 block">
                  Production Schedule Q4 2024
                </span>
                <h2 className="font-headline text-5xl md:text-6xl text-white mb-8">
                  Secure Your Production Slot
                </h2>
                <p className="font-body text-on-primary-container text-lg mb-12 leading-relaxed">
                  Our capacity for high-precision bespoke projects is limited. Inquire today to
                  initiate your technical review and reserve factory floor time for the upcoming season.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-secondary px-10 py-4 font-label text-xs uppercase tracking-widest text-on-secondary transition-opacity hover:opacity-90"
                >
                  Contact Sales
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
