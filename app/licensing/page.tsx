import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { CertificateImage } from "@/components/marketing/CertificateImage";

const COMPLIANCE_CARDS = [
  {
    id: "plating-control",
    icon: "science",
    title: "In-House Plating Control",
    body: "KaiGui manages electroplating and surface finishing inside its own certified facility, giving customers tighter control over appearance, corrosion resistance, wear performance, and production consistency.",
    metaLabel: "Capability",
    metaValue: "Decorative + Functional Plating",
  },
  {
    id: "legal-manufacturing-basis",
    icon: "verified_user",
    title: "Legal Manufacturing Basis",
    body: "In China, factories must hold both a pollutant discharge permit and an electroplating operation license to legally perform electroplating. KaiGui holds both documents.",
    metaLabel: "Required License Stack",
    metaValue: "Pollutant Permit + Plating License",
  },
];

const ENVIRONMENTAL_ACCOUNTABILITY_IMAGES = [
  {
    src: "/images/factory/廢氣塔(楼顶）.png",
    alt: "Rooftop exhaust tower supporting KaiGui electroplating air-emission control",
    label: "Rooftop Exhaust Tower",
  },
  {
    src: "/images/factory/廢水處理（2）.png",
    alt: "Wastewater treatment equipment supporting KaiGui electroplating operations",
    label: "Wastewater Treatment Area",
  },
];

const PLATING_GROUPS = [
  {
    icon: "workspace_premium",
    title: "Precious & Decorative Finishes",
    items: [
      "Gold plating",
      "Silver plating",
      "Tin plating",
      "Bronze / brass plating",
      "Matte gold (fog gold)",
    ],
  },
  {
    icon: "layers",
    title: "Nickel, Chrome & Technical Systems",
    items: [
      "Chrome plating",
      "Black nickel",
      "Electroless nickel (chemical nickel)",
      "Semi-bright / matte nickel",
    ],
  },
  {
    icon: "palette",
    title: "Antique & Textured Series",
    items: [
      "Antique gold",
      "Antique silver",
      "Antique copper",
      "Antique red copper",
      "Satin and textured matte series",
    ],
  },
  {
    icon: "shield",
    title: "Protective & OEM Programs",
    items: [
      "Electrophoretic coating (E-coating)",
      "Corrosion-resistant plating",
      "Wear-protection plating",
      "OEM electroplating services",
    ],
  },
];

export default function LicensingPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <SiteNav />

      <main className="min-h-screen pt-24">

        {/* ── Hero ── */}
        <section className="relative px-6 md:px-12 py-24 md:py-36 overflow-hidden bg-surface-container-low">
          <img
            alt=""
            aria-hidden
            src="/images/licensing-electroplating-process.png"
            className="absolute inset-0 h-full w-full object-cover object-center grayscale-[0.1] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/78 via-background/60 to-background/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/5" />

          <div className="relative z-10 max-w-[1440px] mx-auto">
            <div className="max-w-3xl">
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
              <div className="mt-12 inline-block bg-white/70 backdrop-blur-xl border border-white/50 p-6 max-w-[240px]">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-outline-variant/20">
            {COMPLIANCE_CARDS.map(({ id, icon, title, body, metaLabel, metaValue }) => (
              <div
                id={id}
                key={title}
                className="scroll-mt-32 bg-surface-bright p-12 flex flex-col justify-between group hover:bg-surface-container-lowest transition-colors"
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

          <div
            id="environmental-accountability"
            className="scroll-mt-32 mt-8 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-surface-bright border border-outline-variant/10"
          >
            <div className="lg:col-span-4 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-secondary text-3xl mb-7 block">
                  eco
                </span>
                <span className="font-label text-secondary text-[10px] uppercase tracking-[0.25em] block mb-5">
                  Environmental Accountability
                </span>
                <h3 className="font-headline text-3xl md:text-4xl text-primary leading-tight mb-6">
                  Environmental controls belong beside plating capability.
                </h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  Electroplating requires wastewater treatment, discharge monitoring, chemical
                  handling, exhaust treatment, and documented environmental controls. KaiGui keeps
                  those systems inside the same licensed production base that manages metal
                  finishing.
                </p>
              </div>
              <div className="mt-8 border-t border-outline-variant/20 pt-6">
                <span className="font-label text-[10px] uppercase tracking-widest text-primary/40 block">
                  Controlled Area
                </span>
                <p className="font-label text-sm text-primary">
                  Wastewater + Exhaust Management
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 bg-surface-container-low p-3 md:p-4">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                <div className="xl:col-span-7 space-y-4">
                  {ENVIRONMENTAL_ACCOUNTABILITY_IMAGES.map(({ src, alt, label }) => (
                    <figure
                      key={src}
                      className="overflow-hidden bg-surface-container-lowest"
                    >
                      <div className="h-[260px] md:h-[320px] overflow-hidden bg-surface-container-low">
                        <img src={src} alt={alt} className="h-full w-full object-cover" />
                      </div>
                      <figcaption className="bg-white px-5 py-4 font-label text-[10px] uppercase tracking-[0.2em] text-primary">
                        {label}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <div className="xl:col-span-5 bg-surface-container-lowest p-6 md:p-8 flex flex-col justify-center">
                  <span className="font-label text-[10px] text-secondary uppercase tracking-[0.25em] mb-4 block">
                    Environmental Control License
                  </span>
                  <h4 className="font-headline text-2xl text-primary mb-5">
                    Documented control for wastewater and exhaust systems.
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                    The environmental control credential sits with the exhaust tower and wastewater
                    treatment visuals so customers can connect the document to the physical systems
                    behind plating compliance.
                  </p>
                  <div className="max-w-[260px]">
                    <CertificateImage
                      src="/images/factory-tour-environmental-control.png"
                      alt="KaiGui Environmental Control license display"
                      aspectClass="aspect-[4/5]"
                      hoverLabel="VIEW LICENSE"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Plating Service Scope ── */}
        <section id="surface-finishing-scope" className="scroll-mt-32 px-12 pb-24 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
                Surface Finishing Scope
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight">
                KaiGui Plating Services
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-4xl">
                KaiGui offers a comprehensive range of in-house plating, electroplating, and surface
                finishing capabilities for decorative appearance, contract manufacturing
                specifications, and functional performance requirements.
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PLATING_GROUPS.map(({ icon, title, items }) => (
              <div
                key={title}
                className="bg-surface-container-lowest border border-outline-variant/10 p-7 min-h-[300px] flex flex-col"
              >
                <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">
                  {icon}
                </span>
                <h3 className="font-headline text-xl text-primary mb-6">{title}</h3>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="max-w-full break-words border border-outline-variant/30 bg-surface-bright px-3 py-2 font-label text-[10px] uppercase tracking-wider text-primary leading-relaxed"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certified Credentials Bento ── */}
        <section id="certified-credentials" className="scroll-mt-32 px-12 py-24 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-6">
                <h2 className="font-headline text-4xl text-primary mb-4">Certified Credentials</h2>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  Authenticated Licensing Documents — KunShan Kaigui Ornament Co., Ltd.
                </p>
              </div>
              <div className="lg:col-span-6 bg-surface-container-lowest border border-outline-variant/10 p-8">
                <span className="font-label text-secondary text-[10px] uppercase tracking-[0.25em] block mb-4">
                  One of the hardest license stacks to obtain in China
                </span>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                  In China, a factory must hold both a Pollutant Discharge Permit
                  (排污许可证) and an Electroplating Operation License (电镀证) in order to
                  legally perform electroplating. KunShan Kaigui Ornament Co., Ltd. obtains
                  both, helping customers meet environmental obligations and product-compliance
                  standards through a properly licensed manufacturing base.
                </p>
              </div>
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
                    It is the environmental foundation for legal electroplating production.
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
                    Specialized certification for electroplating operations, precious metal electrolytes,
                    surface finishing workflows, and electrochemical machinery management. Registration
                    No. 320583000.
                  </p>
                </div>
                <CertificateImage
                  src="/images/electroplating-compliance-certificate.png"
                  alt="Suzhou Electroplating Enterprise Compliance Certificate"
                  aspectClass="aspect-square"
                  hoverLabel="PREVIEW"
                />
              </div>

              {/* Quality Control License */}
              <div className="md:col-span-12 bg-surface-container-lowest p-8 border border-outline-variant/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4">
                  <CertificateImage
                    src="/images/factory-tour-quality-control.png"
                    alt="KaiGui Quality Control license display"
                    aspectClass="aspect-[4/5]"
                    hoverLabel="VIEW LICENSE"
                  />
                </div>
                <div className="lg:col-span-8">
                  <span className="font-label text-[10px] text-secondary tracking-widest uppercase mb-2 block">
                    Quality System Credential
                  </span>
                  <h4 className="font-headline text-3xl text-primary mb-5">
                    Quality Control License
                  </h4>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed max-w-3xl">
                    Quality control now sits directly with KaiGui&apos;s certified credentials so the
                    inspection system is presented as part of the documented production standard,
                    alongside the pollutant discharge permit and electroplating operation license.
                    Batch checks, sample comparison, and final surface review help keep custom pins
                    aligned with the approved design before shipment.
                  </p>
                </div>
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
