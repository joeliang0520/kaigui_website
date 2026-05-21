import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { ContactForm } from "@/components/marketing/ContactForm";

export default function Home() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body">
      <SiteNav />

      <main className="pt-24">

        {/* ── Hero ── */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-surface">
          {/* Cinematic background image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <img
              alt="Precision metal manufacturing facility"
              src="/images/facility-hero.png"
              className="w-full h-full object-cover object-center grayscale opacity-30"
            />
          </div>

          <div className="container mx-auto px-12 py-24 relative z-20">
            <div className="max-w-5xl">
              <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs mb-6 block">
                Direct-to-Factory Excellence
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8">
                Built in Kunshan. <br />
                <em className="italic">Proven by Compliance.</em>
              </h1>
              <div className="font-body text-base md:text-lg text-on-surface-variant max-w-4xl leading-relaxed mb-12 space-y-5">
                <p>
                  Since 1992, KaiGui Ornament has operated in Kunshan, one of China&apos;s most
                  competitive, export-oriented, and highly regulated manufacturing hubs.
                </p>
                <p>
                  Kunshan is not an ordinary industrial city. In 2025, Kunshan&apos;s GDP was estimated
                  at around RMB 560 billion, with its total industrial output above designated size
                  exceeding RMB 1.3 trillion and total import and export volume reaching approximately
                  RMB 824.8 billion. The city has also ranked among China&apos;s strongest county-level
                  economies for more than two decades.
                </p>
                <p>
                  Kunshan has attracted a dense concentration of foreign-invested enterprises,
                  advanced manufacturing projects, and Fortune Global 500 companies. Public reports
                  show that Kunshan is home to nearly 10,000 foreign-invested projects from more than
                  80 countries and regions, with total foreign investment exceeding USD 120 billion.
                  It has also attracted 48 Fortune Global 500 companies, which have established more
                  than 100 projects in the city.
                </p>
                <p>
                  This creates a business environment where only capable, disciplined, and compliant
                  manufacturers can survive long term. Industrial investment in Kunshan carries a high
                  entry threshold. Public land-use standards generally require new industrial projects
                  to reach an investment intensity of approximately RMB 6 million per mu, and up to
                  RMB 6.5 million per mu in higher-level development zones. For a 15-mu industrial
                  site, this represents an estimated fixed-asset investment threshold of roughly RMB
                  90 million to RMB 97.5 million.
                </p>
                <p>
                  For an electroplating factory, the barrier is even higher. Beyond capital
                  investment, electroplating requires environmental permits, wastewater treatment
                  capability, discharge control, chemical management, and continuous regulatory
                  compliance.
                </p>
                <p>
                  KaiGui&apos;s ability to operate in Kunshan for more than three decades is proof of
                  more than manufacturing capacity. It is proof of compliance, resilience,
                  environmental responsibility, and long-term supply chain reliability.
                </p>
              </div>
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
              Establishment No. 1992<br />
              Kunshan Development Zone<br />
              31° 23′ 31″ N / 120° 57′ 04″ E
            </div>
          </div>
        </section>

        {/* ── Kunshan Manufacturing Hub ── */}
        <section className="py-32 bg-surface-container-low">
          <div className="container mx-auto px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              <div className="lg:col-span-5">
                <h2 className="font-headline text-5xl text-primary mb-8 leading-tight">
                  Kunshan Manufacturing Hub
                </h2>
                <p className="font-body text-on-surface-variant mb-12 text-lg leading-relaxed">
                  Our flagship facility represents the pinnacle of modern ornament production. We
                  don&apos;t just manufacture; we engineer precision components that carry your brand&apos;s
                  identity across the globe.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center rounded-sm">
                      <span className="material-symbols-outlined text-secondary">verified</span>
                    </div>
                    <div>
                      <h4 className="font-label font-bold text-sm uppercase tracking-wider">ISO 14001:2015</h4>
                      <p className="text-xs text-on-surface-variant font-body">Global environment system in place.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center rounded-sm">
                      <span className="material-symbols-outlined text-secondary">precision_manufacturing</span>
                    </div>
                    <div>
                      <h4 className="font-label font-bold text-sm uppercase tracking-wider">ISO 9001:2015</h4>
                      <p className="text-xs text-on-surface-variant font-body">Global quality management systems in place.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center rounded-sm">
                      <span className="material-symbols-outlined text-secondary">layers</span>
                    </div>
                    <div>
                      <h4 className="font-label font-bold text-sm uppercase tracking-wider">In-House Plating</h4>
                      <p className="text-xs text-on-surface-variant font-body">Proprietary electroplating tanks for gold, silver, nickel.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center rounded-sm">
                      <span className="material-symbols-outlined text-secondary">history_edu</span>
                    </div>
                    <div>
                      <h4 className="font-label font-bold text-sm uppercase tracking-wider">50+ Years Expertise</h4>
                      <p className="text-xs text-on-surface-variant font-body">Half a century of metallurgical engineering heritage.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-sm overflow-hidden group shadow-2xl">
                  <img
                    alt="KaiGui Facility"
                    src="/images/facility-hero.png"
                    className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/80 to-transparent">
                    <span className="font-label text-on-primary text-[10px] uppercase tracking-widest">
                      Main Production Campus
                    </span>
                    <p className="text-on-primary font-headline italic mt-1">45,000 SQM Floor Space</p>
                  </div>
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
                <ContactForm />
              </div>

              {/* Right ornament */}
              <div className="hidden xl:block absolute right-24 bottom-24">
                <div className="border border-on-primary-container/20 p-8">
                  <span className="material-symbols-outlined text-secondary text-5xl mb-4 block">calendar_month</span>
                  <div className="font-label text-[10px] text-on-primary-container uppercase tracking-widest">
                    Current Status
                  </div>
                  <div className="text-white font-headline text-xl mt-1">Accepting Nov/Dec Orders</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
