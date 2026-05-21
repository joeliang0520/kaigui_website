import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function SecondGenerationPage() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
      <SiteNav />

      <main className="pt-32 pb-24">
        {/* Back */}
        <div className="max-w-6xl mx-auto px-12 mb-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to About
          </Link>
        </div>

        {/* Editorial Header */}
        <header className="max-w-6xl mx-auto px-12 mb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="font-label text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              ARCHIVE NO. 002 // MANIFESTO
            </div>
            <h1 className="text-6xl md:text-8xl text-primary leading-tight font-light font-headline">
              A Message from <br />
              <i className="font-headline italic">Tom.</i>
            </h1>
          </div>
          <div className="md:col-span-4 border-l border-outline-variant/20 pl-8 pb-4">
            <p className="font-label text-[10px] leading-relaxed text-on-surface-variant uppercase tracking-widest">
              LOCATION: KUNSHAN ATELIER<br />
              AUTHOR: TOM, SECOND GENERATION<br />
              EDUCATION: U OF TORONTO, OISE, M.A.
            </p>
          </div>
        </header>

        {/* Asymmetric Content */}
        <section className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Imagery Column */}
            <div className="md:col-span-5 space-y-12">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden group">
                <img
                  src="/images/tom-portrait.png"
                  alt="KaiGui manufacturing precision"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-8 bg-surface-container-lowest border border-outline-variant/10 shadow-sm">
                <span className="material-symbols-outlined text-secondary mb-4 block">
                  precision_manufacturing
                </span>
                <h3 className="font-headline text-xl mb-4 italic">A Factory Upbringing</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Since childhood, Tom has watched the machines run day after day. Many of KaiGui&apos;s
                  outstanding employees are people he has known since he was young — a bond that defines
                  how he leads.
                </p>
              </div>
            </div>

            {/* Manifesto Column */}
            <div className="md:col-span-7">
              <div className="prose prose-lg max-w-none">
                <p className="font-headline text-3xl leading-snug text-primary mb-12 first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-secondary">
                  My father used to say that a machine is only as good as the hands that calibrated it.
                  Growing up at KaiGui, I learned that the machine should also inspire the hands.
                </p>
                <div className="space-y-8 text-on-surface-variant leading-relaxed text-lg">
                  <p>
                    Hello, my name is Tom, and I am the second generation of KaiGui Ornament Co., Ltd.
                    When I was only five months old, my parents brought me from Taiwan to mainland China,
                    where I grew up surrounded by the factory environment.
                  </p>
                  <p>
                    For me, KaiGui is not only a family business — it is also a part of my childhood, my
                    personal history, and my understanding of how real work and real value are built over
                    time.
                  </p>
                  <blockquote className="border-l-4 border-secondary pl-8 my-12 italic text-2xl font-headline text-primary py-4">
                    &ldquo;Precision is not just about the measurement of the part, but the clarity of
                    the vision.&rdquo;
                  </blockquote>
                  <p>
                    Growing up in the factory taught me an important lesson: nothing meaningful is achieved
                    in a single step. Success comes from patience, discipline, and the accumulation of small
                    efforts over time. I see the same principle in our products.
                  </p>
                  <p>
                    After graduating from the University of Toronto, OISE, with a Master&apos;s degree, I told
                    my parents that I wanted to begin learning KaiGui&apos;s business and participate in trade
                    shows. My decision came from both passion and responsibility.
                  </p>
                  <p>
                    I believe that after decades of hard work, my parents have built a very strong foundation
                    for KaiGui. My goal is to continue building on that foundation, improve the company step
                    by step, and bring KaiGui to more potential markets around the world.
                  </p>
                  <p>
                    Most importantly, I want to sincerely thank everyone who has supported KaiGui along the
                    way. Without the trust of our customers, partners, and long-term relationships, KaiGui
                    would not be where it is today.
                  </p>
                </div>
                <div className="mt-16 pt-8 border-t border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <p className="font-label text-xs font-bold uppercase tracking-widest text-primary">Tom</p>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">
                      Second Generation, KaiGui Ornament
                    </p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <span className="w-12 h-[1px] bg-secondary block" />
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      shield_lock
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs / Workshop Detail */}
        <section className="mt-32 bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="font-label text-[10px] text-secondary font-bold uppercase tracking-widest">
                Company Gauge 01
              </div>
              <div className="h-32 flex items-end space-x-1">
                <div className="w-2 bg-primary h-[80%]" />
                <div className="w-2 bg-primary h-[60%]" />
                <div className="w-2 bg-secondary h-[95%]" />
                <div className="w-2 bg-primary h-[40%]" />
                <div className="w-2 bg-primary h-[70%]" />
              </div>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface">
                Growth Index: Steady
              </p>
            </div>
            <div className="space-y-4">
              <div className="font-label text-[10px] text-secondary font-bold uppercase tracking-widest">
                Experience
              </div>
              <div className="font-headline text-4xl text-primary">50+</div>
              <p className="font-label text-xs text-on-surface-variant">
                Combined years of family manufacturing expertise.
              </p>
            </div>
            <div className="space-y-4">
              <div className="font-label text-[10px] text-secondary font-bold uppercase tracking-widest">
                Material Tones
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface border border-outline-variant" />
                <div className="w-8 h-8 rounded-full bg-surface-container" />
                <div className="w-8 h-8 rounded-full bg-primary" />
                <div className="w-8 h-8 rounded-full bg-secondary" />
              </div>
              <p className="font-label text-xs text-on-surface-variant">
                Gold, Nickel, Silver, Black Nickel &amp; Antique finishes.
              </p>
            </div>
            <div className="space-y-4">
              <div className="font-label text-[10px] text-secondary font-bold uppercase tracking-widest">
                Next Generation
              </div>
              <div className="p-4 bg-surface-container-lowest border border-outline-variant/10">
                <span className="material-symbols-outlined text-primary text-4xl">architecture</span>
              </div>
              <p className="font-label text-xs text-on-surface-variant">
                Building on tradition, reaching toward the future.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
