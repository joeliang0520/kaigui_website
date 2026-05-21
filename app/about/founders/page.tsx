import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function FoundersPage() {
  return (
    <div className="bg-surface font-body text-on-background min-h-screen selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <SiteNav />

      <main className="pt-32 pb-24 overflow-x-hidden">
        {/* Back */}
        <div className="max-w-[1920px] mx-auto px-12 mb-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to About
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-[1920px] mx-auto px-12 mb-32">
          <div className="flex flex-col md:flex-row gap-16 items-end">
            <div className="md:w-1/2">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.3em] mb-6 block">
                The Architects of Precision
              </span>
              <h1 className="font-headline text-7xl md:text-8xl text-primary leading-none mb-8">
                The Founders&apos;<br />
                <span className="italic text-secondary">Aura.</span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed">
                KaiGui was founded by Mr. Lee and Nancy Jan — a partnership forged from
                decades of hands-on experience in metal finishing, foreign trade, and the gift industry.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-sm">
                <img
                  src="/images/founders-hero.png"
                  alt="Precision Craftsmanship"
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
              </div>
              <div
                className="absolute -bottom-8 -left-8 p-8 border border-outline-variant/10 shadow-2xl max-w-sm"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              >
                <p className="font-label text-xs uppercase tracking-widest text-secondary mb-2">Core Philosophy</p>
                <p className="font-headline italic text-lg text-primary">
                  &ldquo;If something is right, it is worth staying committed and keeping going.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mr. Lee Section */}
        <section className="max-w-[1920px] mx-auto px-12 mb-40">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-center">
            <div className="relative group">
              <div className="bg-primary-container p-1 rounded-sm overflow-hidden">
                <img
                  alt="Mr. Lee"
                  src="/images/founder-mr-lee.png"
                  className="w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-700 aspect-[3/4] object-cover rounded-sm"
                />
              </div>
              <div className="absolute top-4 right-4 bg-secondary px-4 py-1">
                <span className="font-label text-[10px] text-on-secondary uppercase tracking-widest">
                  Technical Director
                </span>
              </div>
            </div>
            <div>
              <h2 className="font-headline text-5xl text-primary mb-8">
                Mr. Lee{" "}
                <span className="text-secondary font-label text-base align-top ml-4 tracking-tighter">
                  — The Engine
                </span>
              </h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg max-w-2xl">
                <p>
                  In the early years in Taiwan, Mr. Lee operated two electroplating factories,
                  specializing in plating support for Nancy&apos;s product business. His deep technical
                  knowledge and practical experience in plating provided strong support to KaiGui&apos;s
                  manufacturing foundation.
                </p>
                <p>
                  Mr. Lee&apos;s approach is rooted in material honesty. He believes that the integrity
                  of a product starts at the molecular level. As the industry evolved, he made the bold
                  decision to move operations to Kunshan, China — establishing KaiGui&apos;s in-house
                  plating and manufacturing operation.
                </p>
                <div className="pt-8 border-t border-outline-variant/20 flex gap-12">
                  <div>
                    <p className="font-label text-primary font-bold text-2xl">50+</p>
                    <p className="font-label text-xs uppercase tracking-widest text-secondary">
                      Years Experience
                    </p>
                  </div>
                  <div>
                    <p className="font-label text-primary font-bold text-2xl">2</p>
                    <p className="font-label text-xs uppercase tracking-widest text-secondary">
                      Plating Factories
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nancy Jan Section */}
        <section className="max-w-[1920px] mx-auto px-12 mb-40">
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="md:w-5/12 relative">
              <div className="bg-surface-container-high p-1 rounded-sm overflow-hidden">
                <img
                  alt="Nancy Jan"
                  src="/images/founder-nancy-jan.png"
                  className="w-full grayscale contrast-110 hover:grayscale-0 transition-all duration-700 aspect-[3/4] object-cover rounded-sm"
                />
              </div>
              <div className="absolute -top-4 -left-4 bg-primary px-4 py-1">
                <span className="font-label text-[10px] text-on-primary uppercase tracking-widest">
                  Managing Director
                </span>
              </div>
            </div>
            <div className="md:w-7/12">
              <h2 className="font-headline text-5xl text-primary mb-8">
                Nancy Jan{" "}
                <span className="text-secondary font-label text-base align-top ml-4 tracking-tighter">
                  — The Vision
                </span>
              </h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg max-w-2xl">
                <p>
                  Nancy&apos;s journey in foreign trade and the gift industry began in her twenties.
                  Starting as a salesperson, she learned the business step by step through hands-on
                  experience, continuous learning, and years of participation in trade shows and customer
                  development.
                </p>
                <p>
                  Although Nancy did not begin with a strong English foundation, she was never afraid to
                  move forward. With determination, courage, and years of industry experience, she
                  gradually built the foundation of what KaiGui is today.
                </p>
                <div className="pt-8 grid grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary">public</span>
                    <div>
                      <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-1">
                        Global Reach
                      </p>
                      <p className="text-sm">30+ countries served across multiple continents.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary">handshake</span>
                    <div>
                      <p className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-1">
                        Long-Term Trust
                      </p>
                      <p className="text-sm">Customers who have partnered with KaiGui for decades.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Atelier Bento */}
        <section className="max-w-[1920px] mx-auto px-12 mb-24">
          <div className="mb-16">
            <h3 className="font-headline text-4xl text-primary mb-4">The Manufacturing Atelier</h3>
            <div className="h-px w-24 bg-secondary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Large Feature */}
            <div className="md:col-span-2 md:row-span-2 bg-primary-container p-12 flex flex-col justify-between rounded-sm">
              <div>
                <span className="font-label text-on-primary-fixed-variant text-[10px] uppercase tracking-[0.4em] mb-4 block">
                  Core Capability
                </span>
                <h4 className="font-headline text-3xl text-on-primary mb-6">
                  In-House Plating Systems
                </h4>
                <p className="text-on-primary-container leading-relaxed">
                  Our own plating qualifications and practical production experience allow us to maintain
                  stronger control over sampling, mass production, and quality consistency — from gold and
                  nickel to black nickel and antique finishes.
                </p>
              </div>
              <div className="mt-12 flex items-center justify-between">
                <span className="material-symbols-outlined text-secondary text-5xl">layers</span>
                <div className="text-right">
                  <p className="font-label text-xs uppercase text-on-primary-container">Quality Rating</p>
                  <p className="font-label text-2xl text-on-primary">Grade A+</p>
                </div>
              </div>
            </div>
            {/* Small Items */}
            <div className="bg-surface-container-low p-8 rounded-sm hover:bg-surface-container-high transition-colors group">
              <span className="material-symbols-outlined text-secondary mb-4 group-hover:scale-110 transition-transform">
                precision_manufacturing
              </span>
              <h5 className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-3">
                Die Striking
              </h5>
              <p className="text-sm text-on-surface-variant">
                Hard and soft enamel, die struck, and laser-cut production.
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-sm hover:bg-surface-container-high transition-colors group">
              <span className="material-symbols-outlined text-secondary mb-4 group-hover:scale-110 transition-transform">
                verified
              </span>
              <h5 className="font-label text-xs uppercase tracking-widest text-primary font-bold mb-3">
                QC at Every Stage
              </h5>
              <p className="text-sm text-on-surface-variant">
                Material selection, stamping, coloring, packaging — we oversee it all.
              </p>
            </div>
            <div className="md:col-span-2 bg-surface-container-highest/30 p-8 rounded-sm flex items-center justify-between border border-outline-variant/10">
              <div className="max-w-xs">
                <h5 className="font-headline text-xl text-primary mb-2">Direct-to-Factory Partnership</h5>
                <p className="text-sm text-on-surface-variant">
                  Skip the middleman. Work directly with the Kunshan facility that controls the full
                  production pipeline.
                </p>
              </div>
              <Link
                href="/product"
                className="bg-secondary text-on-secondary px-6 py-2 text-xs font-label uppercase tracking-widest rounded-sm hover:bg-secondary/90 transition-colors whitespace-nowrap"
              >
                View Products
              </Link>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="max-w-3xl mx-auto px-12 text-center my-32">
          <span className="material-symbols-outlined text-outline-variant text-4xl mb-8 block">
            format_quote
          </span>
          <blockquote className="font-headline italic text-3xl text-primary leading-snug mb-8">
            &ldquo;Our mission is simple: to build products that carry the weight of their maker&apos;s
            integrity. At KaiGui, craftsmanship is not a metric — it is a promise.&rdquo;
          </blockquote>
          <cite className="font-label text-xs uppercase tracking-[0.3em] text-secondary not-italic">
            — Nancy Jan &amp; Mr. Lee
          </cite>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
