import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function HistoryPage() {
  return (
    <div className="bg-background text-primary font-body min-h-screen selection:bg-secondary-fixed">
      <SiteNav />

      <main className="pt-32 pb-24">
        {/* Back */}
        <div className="max-w-4xl mx-auto px-12 mb-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to About
          </Link>
        </div>

        {/* Editorial Header */}
        <header className="max-w-4xl mx-auto px-12 mb-24">
          <span className="font-label text-secondary uppercase tracking-[0.3em] text-sm block mb-4">
            Archives &amp; Heritage
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight mb-8 tracking-tighter">
            A Legacy of <br />
            <span className="italic font-normal">Pure Form.</span>
          </h1>
          <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl">
            Tracing the evolution of KaiGui from its foundation in artisan metalwork and Taiwanese
            electroplating to the Kunshan manufacturing hub it is today.
          </p>
        </header>

        {/* The Foundation */}
        <section className="max-w-4xl mx-auto px-12 mb-32">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3">
              <div className="sticky top-40">
                <h2 className="text-3xl font-headline font-bold mb-4">The Foundation</h2>
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
                  Taiwan — Early Years
                </span>
                <div className="mt-8 h-px w-12 bg-secondary/30" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-on-surface-variant leading-relaxed font-body text-lg space-y-6">
                <p className="first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary first-letter:leading-none">
                  Before Kunshan, there was Taiwan. KaiGui&apos;s story began with the previous generation of
                  the Lee family, whose work was deeply rooted in metal finishing and related craftsmanship.
                  Over the years, the family developed solid expertise in badges, coins, keychains, and
                  various custom metal gift products, with long-term experience in production, quality
                  control, and plating.
                </p>
                <p>
                  It was during this era that our commitment to material honesty was born. Every component
                  was measured by hand, every tolerance verified by sight and touch. We believed then, as we
                  do now, that the soul of a product resides in the purity of its construction.
                </p>
                <div className="my-12 relative h-[400px] bg-surface-container-low overflow-hidden rounded-sm">
                  <img
                    alt="Early electroplating facility"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDmsullQuITUOvx14f64z7ZG1Xckxo9t6jCaa-dLjZSbYXJoJrM6ejeYWHt9do2U1ndukva6LQCN2JDIqfp44F-VdUFolUzY6mdMa7trz-CHrE9h8MDDu9Cdh2kE606yh6wWd-cyK8SAVH3Y_lAXD9JXqFC1s_TLqnaoNLzqqbX0PNPCjpwMsEWw1h4hn5zDyXFyZy44cEuD73MHksUJBajftyCG3f3_KjMqhW1OWmMQ3uTzMvZiVP_8IV-yPSCM4jeXw0B4GRMjs"
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                  <div className="absolute bottom-6 left-6 bg-surface-container-lowest/80 backdrop-blur-md p-4 max-w-xs">
                    <p className="font-label text-[10px] uppercase tracking-tighter text-primary">
                      Fig 01. The Electroplating Era
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Move to Kunshan */}
        <section className="bg-surface-container-low py-32 mb-32">
          <div className="max-w-4xl mx-auto px-12">
            <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
              <div className="w-full md:w-1/3 text-right">
                <div className="sticky top-40">
                  <h2 className="text-3xl font-headline font-bold mb-4">The Move to Kunshan</h2>
                  <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
                    1990s — Present
                  </span>
                  <div className="mt-8 h-px w-12 bg-secondary/30 ml-auto" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="text-on-surface-variant leading-relaxed font-body text-lg space-y-6">
                  <p>
                    As the industry evolved and the need for larger production space and upgraded manufacturing
                    capabilities became increasingly important, Mr. Lee and Nancy Jan made a major decision in
                    the 1990s: they moved operations to mainland China and established a factory in Kunshan.
                  </p>
                  <div className="grid grid-cols-2 gap-4 my-12">
                    <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded-sm">
                      <img
                        alt="Kunshan manufacturing district"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJMvedxAtouj6slOyaZdguLNZohk7KTDSg4PrnHY9hDf-mBmGVSrcnAIMvPX76-pl23JfNx9zwuy1dgwxIwITWOdYFLJXWN-MARNkKSZ1z8uEz2tsaUzolCG8t3RpMUNYHWpw4oG4h-blCpN7wepoxptf_4AmnLpT6gdrp5CZhZMf_9HRKkv8NlnKBrAv8wKZNKVNGdrmKeI95nuLhP1sfnQ44ps-oN4KrbgL8TUsWLThapbKVqoxHKUzRX5y9uCYBGnSeOFpjg8k"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded-sm mt-12">
                      <img
                        alt="Gold plating detail"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR0xbvwhQ92UCbhIH6VZe35fcjhLh_5SuQx9vbVKkXW_EObyDD6JmYS9UFbNvetDbl8WYa1HAKMHZVa2rOZ5MBz9RiXruF3HlMTXLQIGISvFQAecC6PhFdICaYP84eLAnVw9R_114KKXqyg9c8H-3RsET9OKRh7OvILt53G0TYfE-_9AOHFuMaI4_5OAIh-zzQTRSWeRgYWt-ddHoDLqUp6yJQaGnlRsy5NKWvODy8zc7PN1thV1BhV6wFbYDKcJIZT-YsBJfsAjw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p>
                    Located between Shanghai and Suzhou, Kunshan is one of the key manufacturing hubs in the
                    Yangtze River Delta and is well known for its strict environmental standards, manufacturing
                    regulations, and supply chain efficiency. This marked the beginning of KaiGui Ornament&apos;s
                    in-house plating and manufacturing operation as we know it today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built from Manufacturing */}
        <section className="max-w-4xl mx-auto px-12">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3">
              <div className="sticky top-40">
                <h2 className="text-3xl font-headline font-bold mb-4">Built from Manufacturing</h2>
                <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
                  The Factory Difference
                </span>
                <div className="mt-8 h-px w-12 bg-secondary/30" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-on-surface-variant leading-relaxed font-body text-lg space-y-8">
                <p>
                  What makes KaiGui different from a typical trading company is simple: we are a factory.
                  We understand every step of the manufacturing process and what truly matters behind a good
                  product — material selection, stamping, die casting, coloring, plating, packaging, quality
                  control, and the many small details that determine the final result.
                </p>
                <div className="p-12 bg-primary text-on-primary rounded-sm mb-12 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-headline text-2xl italic mb-4">
                      &ldquo;Plating is not only about appearance.&rdquo;
                    </h3>
                    <p className="text-on-primary-container max-w-sm">
                      It also affects durability, rust resistance, texture, and overall product quality. Our
                      in-house plating gives us control no trading company can match.
                    </p>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-secondary opacity-20 blur-3xl rounded-full" />
                </div>
                <p>
                  Today, KaiGui continues to move forward with manufacturing at its core, integrity as its
                  foundation, and long-term partnership as its goal. From one generation to the next, KaiGui
                  represents more than a factory — it represents an understanding of craftsmanship, a
                  commitment to quality, and a serious respect for every promise made to our customers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
