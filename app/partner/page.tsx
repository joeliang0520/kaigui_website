import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const COMMITMENTS = [
  "Confidential handling of sensitive designs and trademarks",
  "NDA support before detailed project discussion",
  "Controlled access to artwork and production files",
  "No unauthorized subcontracting or outsourcing",
  "Supplier screening and production capability review",
  "Traceability and documentation support",
  "No public display of confidential products without written approval",
];

const PROCESS = [
  "Initial project discussion",
  "NDA and confidentiality review",
  "Product and compliance requirement review",
  "Supplier or production capability assessment",
  "Sampling and approval",
  "Controlled production and shipment",
];

export default function PartnerPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <SiteNav />

      <main className="min-h-screen pt-24">

        {/* ── Hero ── */}
        <section className="relative px-12 py-24 md:py-32 overflow-hidden bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto">
            <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
              Manufacturing Partnership
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8">
              Partner with <span className="italic text-secondary">Us.</span>
            </h1>
            <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
              Trusted manufacturing support for licensed, confidential, and
              compliance-sensitive products.
            </p>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="px-12 py-24 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-headline text-3xl text-primary leading-tight">
                More than standard production.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 font-body text-on-surface-variant leading-relaxed">
              <p>
                At KAIGUI, we work with brand owners, licensees, distributors, and corporate clients
                who require more than standard production. Many projects involve sensitive artwork,
                licensed trademarks, internal recognition programs, or products that cannot be
                publicly disclosed.
              </p>
              <p>
                We understand that confidentiality is not only a legal obligation, but also an
                essential part of protecting our clients&apos; brand value, business relationships,
                and supply chain integrity.
              </p>
              <p>
                Our team can support projects that require controlled handling of artwork, supplier
                screening, factory communication, documentation preparation, traceability support,
                and audit-readiness coordination. We do not simply connect clients with factories —
                we understand how factories work.
              </p>
              <p>
                With decades of experience in metal gifts, badges, challenge coins, keychains, and
                electroplating-related production, KAIGUI is able to help clients turn brand
                requirements into manufacturable, controlled, and consistent products.
              </p>
              <p>
                For confidential or licensed projects, we are able to work under NDA and follow
                agreed restrictions regarding artwork, trademarks, production files, subcontracting,
                and public disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* ── Our Commitment ── */}
        <section className="px-12 py-24 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
                Standards
              </span>
              <h2 className="font-headline text-4xl text-primary">Our Commitment</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20">
              {COMMITMENTS.map((item) => (
                <div key={item} className="bg-surface-bright p-8 flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-xl shrink-0">
                    check_circle
                  </span>
                  <p className="font-body text-on-surface text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How We Work ── */}
        <section className="px-12 py-24 max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
              Process
            </span>
            <h2 className="font-headline text-4xl text-primary">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROCESS.map((step, i) => (
              <div
                key={step}
                className="bg-surface-container-lowest p-8 border border-outline-variant/10 flex flex-col"
              >
                <span className="font-headline text-3xl text-secondary mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-on-surface text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="py-24 px-12 text-center bg-surface-bright">
          <div className="max-w-3xl mx-auto">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-8 block">
              Confidential by Design
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary leading-tight mb-12">
              If your project requires discretion, compliance, and reliable manufacturing control,
              we would be pleased to discuss how we can support you.
            </h2>
            <div className="h-px w-24 bg-outline-variant/30 mx-auto mb-12" />
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Contact Sales
              </Link>
              <Link
                href="/licensing"
                className="px-10 py-4 border border-outline-variant text-primary font-label text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors"
              >
                View Capabilities
              </Link>
              <Link
                href="/product"
                className="px-10 py-4 border border-outline-variant text-primary font-label text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
