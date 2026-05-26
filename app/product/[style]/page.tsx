import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";
import { ProductGallery } from "@/components/marketing/ProductGallery";
import { PIN_STYLES, SLUG_TO_STYLE } from "@/lib/pinConfig";
import { PRODUCT_DETAILS } from "@/lib/productCatalog";

export function generateStaticParams() {
  return PIN_STYLES.map((style) => ({ style: style.slug }));
}

export default function ProductDetailPage({ params }: { params: { style: string } }) {
  const styleId = SLUG_TO_STYLE[params.style];

  if (!styleId) {
    notFound();
  }

  const style = PIN_STYLES.find((item) => item.id === styleId)!;
  const detail = PRODUCT_DETAILS[styleId];

  return (
    <div className="bg-background text-on-surface min-h-screen font-body antialiased">
      <SiteNav />

      <main className="pt-32 pb-24">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Products
          </Link>
        </div>

        <section className="max-w-[1920px] mx-auto px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-6">
            <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-5">
              Product Detail
            </span>
            <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight">
              {style.label}
            </h1>
            <p className="mt-8 text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              {detail.overview}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${style.slug}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-8 py-4 font-label text-xs uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90"
              >
                Start designing
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <Link
                href="/partner"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-outline-variant px-8 py-4 font-label text-xs uppercase tracking-widest text-primary transition-colors hover:bg-surface-container-low"
              >
                Request quote
                <span className="material-symbols-outlined text-base">mail</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
              <img
                src={detail.imageSrc}
                alt={detail.imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-20">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20">
            <div className="bg-surface-container-lowest p-8 md:p-10">
              <h2 className="font-headline text-2xl text-primary mb-8">Best For</h2>
              <ul className="space-y-5 text-on-surface-variant">
                {detail.bestFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary text-base leading-6">
                      check
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 md:p-10">
              <h2 className="font-headline text-2xl text-primary mb-8">Production Notes</h2>
              <ul className="space-y-5 text-on-surface-variant">
                {detail.productionNotes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="material-symbols-outlined text-secondary text-base leading-6">
                      manufacturing
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface-container-lowest p-8 md:p-10">
              <h2 className="font-headline text-2xl text-primary mb-8">Finish Options</h2>
              <div className="flex flex-wrap gap-3">
                {detail.finishOptions.map((item) => (
                  <span
                    key={item}
                    className="border border-outline-variant/40 px-4 py-2 font-label text-[10px] uppercase tracking-widest text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1920px] mx-auto px-6 md:px-12 py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7 mb-12">
            <div>
              <span className="font-label text-secondary text-xs uppercase tracking-[0.2em]">
                Gallery
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mt-4">
                Real World Product References
              </h2>
            </div>
          </div>

          <ProductGallery productLabel={style.label} styleSlug={style.slug} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
