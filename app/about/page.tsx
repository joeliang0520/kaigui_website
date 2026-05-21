import Link from "next/link";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export default function AboutPage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body antialiased overflow-x-hidden">
      <SiteNav />

      <main className="max-w-[1920px] mx-auto px-6 md:px-12 py-16 pt-32">

        {/* ── Hero Asymmetry ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-7">
            <span className="font-label text-secondary text-xs uppercase tracking-[0.3em] block mb-6">
              Established 1984
            </span>
            <h1 className="font-headline text-6xl md:text-8xl text-primary leading-tight italic mb-8">
              The Art of <br />Technical Mastery
            </h1>
            <p className="max-w-xl text-lg text-on-surface-variant leading-relaxed">
              A vertically integrated atelier where craftsmanship meets precision manufacturing.
              From Kunshan&apos;s industrial heart — half a century of enamel mastery, built one pin
              at a time.
            </p>
          </div>

          <div className="lg:col-span-5 h-[400px] bg-surface-container-low overflow-hidden relative group">
            <img
              src="/images/about-hero-facility.png"
              alt="KaiGui manufacturing facility"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-primary/5" />
          </div>
        </section>

        {/* ── Our Story — Bento ── */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="md:col-span-2 bg-surface-container-lowest p-12 flex flex-col justify-between border-l-2 border-secondary/20">
              <div>
                <h2 className="font-headline text-4xl text-primary mb-6">Our Story</h2>
                <p className="text-on-surface-variant leading-loose mb-6">
                  Born in a modest mold-making studio in Taiwan, KaiGui Ornament has evolved into a
                  vertically integrated precision manufacturer, now headquartered in the Kunshan
                  Development Zone — the beating heart of China&apos;s industrial corridor between
                  Shanghai and Suzhou.
                </p>
                <p className="text-on-surface-variant leading-loose">
                  We believe that efficiency should never come at the cost of elegance. Our legacy is
                  built on the philosophy that every pin leaving our workshop is a testament to 50+
                  years of metallurgical mastery poured into a miniature canvas.
                </p>
              </div>
              <Link
                href="/about/history"
                className="mt-10 flex items-center space-x-4 text-primary group"
              >
                <span className="font-label uppercase tracking-widest text-xs font-bold">
                  Read More
                </span>
                <span className="h-[1px] w-12 bg-secondary group-hover:w-20 transition-all duration-300" />
              </Link>
            </div>

            <div className="bg-surface-container-low min-h-[400px] relative overflow-hidden">
              <img
                src="/images/about-heritage-workshop.png"
                alt="KaiGui heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/10 p-6 border border-white/20">
                <span className="font-label text-white text-[10px] uppercase tracking-widest">
                  Heritage Series
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ── The Visionaries ── */}
        <section className="mb-32">
          <div className="flex justify-between items-baseline mb-16">
            <h2 className="font-headline text-4xl text-primary">The Visionaries</h2>
            <div className="h-[1px] flex-grow mx-12 bg-outline-variant/20" />
            <Link
              href="/about/founders"
              className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
            >
              Meet the Founders
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">

            {/* Founder — Mr. Lee */}
            <div className="md:col-span-1 bg-surface-container p-8">
              <div className="aspect-square bg-surface-container-lowest mb-6 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-outline/40">person</span>
              </div>
              <span className="font-label text-[10px] text-secondary uppercase tracking-[0.2em] mb-2 block">
                Co-Founder
              </span>
              <h3 className="font-headline text-xl text-primary">Mr. Lee</h3>
              <p className="text-sm text-on-surface-variant mt-4 mb-6 leading-relaxed">
                Pioneer of precision die-casting and the technical foundations of KaiGui&apos;s
                manufacturing excellence.
              </p>
              <Link
                href="/about/founders"
                className="text-[11px] font-label uppercase font-bold text-primary tracking-tighter hover:text-secondary transition-colors"
              >
                Read More
              </Link>
            </div>

            {/* Center quote card */}
            <div className="md:col-span-2 bg-surface-container-high p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 opacity-5">
                <span className="material-symbols-outlined text-[300px]">architecture</span>
              </div>
              <div className="relative z-10 max-w-sm">
                <h3 className="font-headline text-3xl text-primary mb-6 italic">
                  Engineering a direct line between the factory floor and the world&apos;s most
                  exacting brands.
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  Our leadership brings together four decades of cross-disciplinary expertise in
                  metallurgy, enamel chemistry, and global brand partnerships.
                </p>
                <Link
                  href="/about/founders"
                  className="inline-block bg-primary text-on-primary px-8 py-3 text-xs font-label uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Full Founders&apos; Story
                </Link>
              </div>
            </div>

            {/* Founder — Nancy Jan */}
            <div className="md:col-span-1 bg-surface-container p-8">
              <div className="aspect-square bg-surface-container-lowest mb-6 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-outline/40">person</span>
              </div>
              <span className="font-label text-[10px] text-secondary uppercase tracking-[0.2em] mb-2 block">
                Co-Founder
              </span>
              <h3 className="font-headline text-xl text-primary">Nancy Jan</h3>
              <p className="text-sm text-on-surface-variant mt-4 mb-6 leading-relaxed">
                Visionary behind KaiGui&apos;s quality systems and global compliance standards —
                BSCI and ISO certified under her leadership.
              </p>
              <Link
                href="/about/founders"
                className="text-[11px] font-label uppercase font-bold text-primary tracking-tighter hover:text-secondary transition-colors"
              >
                Read More
              </Link>
            </div>

          </div>
        </section>

        {/* ── Message from Tom — Glassmorphism ── */}
        <section className="relative py-24 mb-16">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/about-tom-message-background.png"
              alt=""
              aria-hidden
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-2xl bg-white/40 border border-white/50 p-12 md:p-24 shadow-2xl">
            <div className="text-center">
              <span className="font-label text-secondary text-xs uppercase tracking-widest block mb-12">
                A Personal Note
              </span>
              <h2 className="font-headline text-5xl text-primary italic mb-12 leading-tight">
                &ldquo;Integrity is the mold from which all our success is cast.&rdquo;
              </h2>
              <div className="w-16 h-[2px] bg-secondary mx-auto mb-12" />
              <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-2xl mx-auto mb-12">
                As the second generation leading KaiGui, my focus remains on bridging traditional
                craftsmanship with future-forward innovation. We are not just manufacturing pins —
                we are building a legacy of trust, precision, and enduring quality that brands
                around the world can count on.
              </p>
              <div className="flex flex-col items-center">
                <p className="text-primary font-headline text-2xl mb-1 italic">Tom</p>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Second Generation — Lead &amp; Operations
                </p>
              </div>
              <Link
                href="/about/second-generation"
                className="mt-16 inline-block text-primary font-label text-xs uppercase font-bold tracking-widest underline decoration-secondary underline-offset-8 hover:text-secondary transition-colors"
              >
                Read the full message
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
