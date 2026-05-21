import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { CertificateImage } from "@/components/marketing/CertificateImage";

const COMPLIANCE_CARDS = [
  {
    icon: "science",
    title: "The Art of Electroplating",
    body: "Our electroplating techniques use electrical current to molecularly bond gold, silver, or nickel to a base metal. Beyond aesthetics, precision plating determines the final look, feel, and longevity of every product.",
    metaLabel: "Technical Standard",
    metaValue: "ISO 9001:2015 REFINED",
  },
  {
    icon: "eco",
    title: "Environmental Stewardship",
    body: "Our in-house advanced wastewater treatment facility cycles through multiple neutralization phases, ensuring 100% of discharged water meets or exceeds ultra-strict local environmental standards.",
    metaLabel: "Eco Metric",
    metaValue: "98% WASTE RECLAMATION",
  },
  {
    icon: "verified_user",
    title: "Legal Transparency",
    body: "Electroplating is one of the most heavily regulated manufacturing processes in China. KaiGui holds the required plating and pollutant discharge permits, allowing us to manage plating quality, wastewater treatment, and compliance control within our own facility.",
    metaLabel: "Audit Frequency",
    metaValue: "Quarterly Third-Party Compliance Review",
  },
];

export default function LicensingPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <SiteNav />

      <main className="min-h-screen pt-24">

        {/* ── Hero ── */}
        <section className="relative px-12 py-24 md:py-32 overflow-hidden bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
                Regulatory Framework
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8">
                Precision Under <br />
                <span className="italic text-secondary">Strict Compliance.</span>
              </h1>
              <p className="font-body text-on-surface-variant text-lg max-w-xl leading-relaxed">
                At KaiGui Ornament, compliance isn&apos;t a checkbox — it&apos;s the foundation of our craft.
                We balance precision manufacturing with rigorous environmental and legal standards
                from our Kunshan facility.
              </p>
            </div>
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] bg-surface-container-lowest rounded-sm overflow-hidden shadow-sm">
                <img
                  alt="Electroplating Process"
                  src="/images/licensing-electroplating-process.png"
                  className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 p-6 max-w-[240px]"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(198,198,204,0.15)",
                }}
              >
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">
                  Facility Status
                </p>
                <p className="font-headline italic text-primary text-xl">Fully Certified 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Compliance Grid ── */}
        <section className="px-12 py-24 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20">
            {COMPLIANCE_CARDS.map(({ icon, title, body, metaLabel, metaValue }) => (
              <div
                key={title}
                className="bg-surface-bright p-12 flex flex-col justify-between group hover:bg-surface-container-lowest transition-colors"
              >
                <div>
                  <span className="material-symbols-outlined text-secondary text-3xl mb-8 block">
                    {icon}
                  </span>
                  <h3 className="font-headline text-2xl text-primary mb-4">{title}</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed">{body}</p>
                </div>
                <div className="mt-12">
                  <span className="font-label text-[10px] uppercase tracking-widest text-primary/40 block">
                    {metaLabel}
                  </span>
                  <p className="font-label text-sm text-primary">{metaValue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certified Credentials Bento ── */}
        <section className="px-12 py-24 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16">
              <h2 className="font-headline text-4xl text-primary mb-4">Certified Credentials</h2>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Authenticated Licensing Documents — KunShan Kaigui Ornament Co., Ltd.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Main: Pollutant Discharge Permit */}
              <div className="md:col-span-8 bg-surface-container-lowest p-8 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/10">
                <div className="w-full md:w-1/3">
                  <CertificateImage
                    src="/images/pollutant-discharge-permit.png"
                    alt="KaiGui Pollutant Discharge Permit"
                    aspectClass="aspect-[3/4]"
                    hoverLabel="VIEW DOCUMENT"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-label text-[10px] text-secondary tracking-widest uppercase mb-2 block">
                    Document No. CN-775-A19 · 排污许可证
                  </span>
                  <h4 className="font-headline text-2xl text-primary mb-4">Pollutant Discharge Permit</h4>
                  <p className="font-body text-on-surface-variant text-sm mb-6 leading-relaxed">
                    Issued by the local Ecology and Environment authority, this permit authorizes
                    KaiGui&apos;s regulated discharge activities and confirms that our wastewater, air
                    emissions, and related production outputs are managed under approved environmental
                    standards, monitoring requirements, and compliance controls across our Kunshan facility.
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary font-label text-[10px] tracking-wider uppercase">
                      Active
                    </span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                      Valid Thru 3031
                    </span>
                  </div>
                </div>
              </div>

              {/* Electroplating Operation License */}
              <div className="md:col-span-4 bg-surface-container-lowest p-8 flex flex-col border border-outline-variant/10">
                <div className="flex-1 mb-8">
                  <span className="font-label text-[10px] text-secondary tracking-widest uppercase mb-2 block">
                    Document No. EPL-002-PR · 电镀证
                  </span>
                  <h4 className="font-headline text-2xl text-primary mb-4">
                    Electroplating Operation License
                  </h4>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                    Specialized certification for handling precious metal electrolytes and electrochemical
                    machinery operations. Registration No. 320583000.
                  </p>
                </div>
                <CertificateImage
                  src="/images/electroplating-compliance-certificate.png"
                  alt="Suzhou Electroplating Enterprise Compliance Certificate"
                  aspectClass="aspect-square"
                  hoverLabel="PREVIEW"
                />
              </div>

              {/* Safety Protocol */}
              <div className="md:col-span-6 bg-surface-container-lowest p-8 border border-outline-variant/10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary">shield_with_heart</span>
                  </div>
                  <h5 className="font-headline text-lg text-primary">Safety Protocol Certification</h5>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  Annual occupational health and safety verification for chemical workshop technicians
                  and electroplating operators at our Kunshan facility, ensuring safe handling of
                  chemicals, compliant electroplating operations, and proper on-site safety procedures.
                </p>
              </div>

              {/* Global Export License */}
              <div className="md:col-span-6 bg-surface-container-lowest p-8 border border-outline-variant/10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary">public</span>
                  </div>
                  <h5 className="font-headline text-lg text-primary">Global Export License</h5>
                </div>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  KAIGUI has long-standing export experience, supplying electroplated metal products
                  and premium hardware components to clients across North America, Europe, and
                  Asia-Pacific. Our export operations support international documentation, customs
                  coordination, and shipment requirements for global clients.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Quote Callout ── */}
        <section className="py-24 px-12 text-center bg-surface-bright">
          <div className="max-w-3xl mx-auto">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-8 block">
              Zero Compromise
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight mb-8 italic">
              &ldquo;Beauty is only sustainable when it is built on a foundation of integrity.&rdquo;
            </h2>
            <div className="h-px w-24 bg-outline-variant/30 mx-auto mb-12" />
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/hard-enamel"
                className="px-10 py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Start Designing
              </Link>
              <Link
                href="/about"
                className="px-10 py-4 border border-outline-variant text-primary font-label text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
