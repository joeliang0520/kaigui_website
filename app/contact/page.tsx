import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SalesInquiryForm } from "@/components/marketing/SalesInquiryForm";
import {
  FACTORY_ADDRESS,
  SALES_EMAIL,
  SALES_PHONE_DISPLAY,
  SALES_PHONE_TEL,
} from "@/lib/contactInfo";

export const metadata: Metadata = {
  title: "Contact Sales | KaiGui Ornament",
  description:
    "Send a sales inquiry to KaiGui Ornament for custom lapel pins, metal gifts, licensing-sensitive production, sampling, and manufacturing support.",
};

const CONTACT_CARDS = [
  {
    icon: "mail",
    label: "Email",
    title: SALES_EMAIL,
    href: `mailto:${SALES_EMAIL}`,
  },
  {
    icon: "call",
    label: "Phone",
    title: SALES_PHONE_DISPLAY,
    href: `tel:${SALES_PHONE_TEL}`,
  },
  {
    icon: "location_on",
    label: "Factory",
    title: FACTORY_ADDRESS,
    href: "https://www.google.com/maps/search/?api=1&query=88%20KaiGui%20Road%20KunShan%20City%20JiangSu%20Province%20215300%20China",
  },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { email?: string };
}) {
  const initialEmail = typeof searchParams?.email === "string" ? searchParams.email : "";

  return (
    <div className="bg-background text-on-surface min-h-screen font-body selection:bg-secondary-container selection:text-on-secondary-container">
      <SiteNav />

      <main className="min-h-screen pt-24">
        <section className="relative px-12 py-24 md:py-32 bg-surface-container-low overflow-hidden">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
                Sales Inquiry
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8">
                Start a Manufacturing <span className="italic text-secondary">Conversation.</span>
              </h1>
              <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
                Share your product scope, artwork status, quantity, timeline, and contact details.
                KaiGui can review custom lapel pins, metal gifts, licensed programs, sampling needs,
                and confidentiality-sensitive manufacturing requests.
              </p>
            </div>
            <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/20 p-8">
              <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
                Direct Contact
              </p>
              <div className="space-y-4">
                <Link
                  href={`mailto:${SALES_EMAIL}`}
                  className="flex items-center gap-3 font-label text-sm text-primary hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  {SALES_EMAIL}
                </Link>
                <Link
                  href={`tel:${SALES_PHONE_TEL}`}
                  className="flex items-center gap-3 font-label text-sm text-primary hover:text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-secondary">call</span>
                  {SALES_PHONE_DISPLAY}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-12 py-20 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/20">
            {CONTACT_CARDS.map(({ icon, label, title, href }) => (
              <Link
                key={label}
                href={href}
                className="bg-surface-bright p-8 min-h-[180px] flex flex-col justify-between hover:bg-surface-container-lowest transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                    {label}
                  </span>
                  <span className="material-symbols-outlined text-secondary">{icon}</span>
                </div>
                <p className="font-headline text-xl text-primary leading-snug mt-10">{title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-12 pb-28 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-label text-secondary text-xs uppercase tracking-[0.2em] mb-4 block">
              Project Brief
            </span>
            <h2 className="font-headline text-4xl text-primary mb-6">
              Tell us what you need to make.
            </h2>
            <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
              <p>
                Include material, size, plating, color, packaging, delivery region, and whether the
                project involves licensed marks or confidential artwork.
              </p>
              <p>
                For fastest review, include your target quantity, desired delivery window, and
                preferred contact method.
              </p>
              <p>
                Attach design files, mockups, or references — JPG, PNG, PDF, AI, EPS, PSD, SVG, or
                ZIP — and our team will review them alongside the brief.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <SalesInquiryForm initialEmail={initialEmail} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
