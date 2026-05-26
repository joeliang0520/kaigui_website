import { existsSync, readdirSync } from "fs";
import path from "path";
import Link from "next/link";
import {
  FactoryWalkthrough,
  type FactoryWalkthroughImage,
  type FactoryWalkthroughSection,
} from "@/components/marketing/FactoryWalkthrough";
import { FactoryTourVideo } from "@/components/marketing/FactoryTourVideo";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

export const dynamic = "force-dynamic";

type FactorySectionDefinition = Omit<FactoryWalkthroughSection, "images"> & {
  matches: (fileName: string) => boolean;
};

type CaptionRule = {
  terms: string[];
  caption: string;
};

const FACTORY_IMAGE_DIR = path.join(process.cwd(), "public/images/factory");
const FACTORY_OPTIMIZED_DIR = path.join(FACTORY_IMAGE_DIR, "optimized");
const SOURCE_IMAGE_PATTERN = /\.(png|jpe?g)$/i;
const COLLATOR = new Intl.Collator("zh-Hans-CN", {
  numeric: true,
  sensitivity: "base",
});

function containsAny(fileName: string, terms: string[]) {
  return terms.some((term) => fileName.includes(term));
}

function isEnvironmental(fileName: string) {
  return containsAny(fileName, [
    "廢水",
    "废水",
    "汙水",
    "污水",
    "廢氣",
    "废气",
    "危險品",
    "危险品",
    "蒸汽",
  ]);
}

function isBuildingEnvironment(fileName: string) {
  return containsAny(fileName, [
    "門面",
    "门面",
    "廠房",
    "厂房",
    "樓",
    "楼",
    "布局",
    "間隔",
    "间隔",
  ]);
}

const SECTION_DEFINITIONS: FactorySectionDefinition[] = [
  {
    id: "factory-environment",
    titleZh: "工厂环境：门面 / 楼房布局",
    titleEn: "Factory Environment",
    kicker: "Arrival",
    headline: "A purpose-built manufacturing campus in Kunshan.",
    body: [
      "Our facility spans dedicated production buildings, organized by department and connected by a single operating workflow. Every stage of fabrication happens on one site — no outsourcing, no scattered subcontractors.",
      "The exterior, entrance, and building layout reflect how we work: structured, transparent, and built for buyers who want to know exactly where their order is produced.",
    ],
    facts: ["Owned production campus", "Clear department layout", "On-site workflow"],
    layout: "arrival",
    matches: (fileName) => !isEnvironmental(fileName) && isBuildingEnvironment(fileName),
  },
  {
    id: "metalworking-workshop",
    titleZh: "金工车间",
    titleEn: "Metalworking Workshop",
    kicker: "Tooling and Forming",
    headline: "In-house tooling, stamping, and die casting.",
    body: [
      "Our metalworking workshop produces the molds and shapes every order begins with. Engraving, stamping presses, and die-casting equipment translate artwork directly into precision metal blanks.",
      "Keeping tooling in-house means faster sample turnaround, tighter tolerances on raised lines and recessed fields, and full control over part geometry from the first prototype to bulk production.",
    ],
    facts: ["Mold engraving in-house", "Stamping and die casting", "Precision blank production"],
    layout: "feature",
    matches: (fileName) =>
      !isEnvironmental(fileName) &&
      containsAny(fileName, ["金工", "冲压", "沖壓", "冲床", "沖床", "刻模", "壓鑄", "压铸"]),
  },
  {
    id: "polishing-workshop",
    titleZh: "抛光车间",
    titleEn: "Polishing Workshop",
    kicker: "Surface Preparation",
    headline: "Hand-finished surfaces, ready for plating.",
    body: [
      "Every blank passes through the polishing workshop before it reaches the plating line. Skilled operators remove burrs, soften edges, and bring each piece to a uniform finish.",
      "It is detailed, hands-on work — and it is what separates a flat, dull product from one with crisp raised lines, even reflection, and a premium feel in the hand.",
    ],
    facts: ["Hand polishing", "Burr and edge removal", "Uniform pre-plating finish"],
    layout: "split",
    matches: (fileName) => containsAny(fileName, ["拋光", "抛光"]),
  },
  {
    id: "wiring-hanging-department",
    titleZh: "绑线车间",
    titleEn: "Wiring / Hanging Department",
    kicker: "Handling Control",
    headline: "Precise rack preparation for every plating batch.",
    body: [
      "Before parts enter the plating tanks, they are individually wired and racked by hand. Consistent spacing and orientation are critical to even plating coverage and protected detail work.",
      "This step prevents finish defects, eliminates touch marks, and keeps batches organized for accurate inspection downstream.",
    ],
    facts: ["Hand-wired racking", "Uniform part spacing", "Protected fine detail"],
    layout: "feature",
    matches: (fileName) => containsAny(fileName, ["绑线", "綁線", "机器螺丝", "機器螺絲"]),
  },
  {
    id: "electroplating-workshop",
    titleZh: "电镀车间",
    titleEn: "Electroplating Workshop",
    kicker: "Finish Building",
    headline: "A licensed, fully in-house electroplating operation.",
    body: [
      "Our electroplating workshop is the core of the factory. Multiple tank lines and barrel-plating systems deliver gold, silver, nickel, copper, antique, and dual-tone finishes — all produced under one roof.",
      "In-house plating is a major competitive advantage. It locks down quality, shortens lead times, and removes the risk of inconsistent finishes that come with outsourced surface treatment.",
    ],
    facts: ["Multi-line tank plating", "Barrel-plating capacity", "Full finish range in-house"],
    layout: "rolling",
    matches: (fileName) =>
      !isEnvironmental(fileName) &&
      containsAny(fileName, [
        "电镀槽",
        "电镀车间",
        "電鍍車間",
        "电镀（",
        "電鍍（",
        "滾鍍",
        "滚镀",
      ]),
  },
  {
    id: "coloring-workshop",
    titleZh: "上色车间",
    titleEn: "Coloring Workshop",
    kicker: "Enamel Color",
    headline: "Hand-filled enamel and precision curing.",
    body: [
      "Skilled colorists fill each piece by hand, matching Pantone references and brand standards across hard enamel, soft enamel, and printed designs.",
      "Dedicated curing ovens lock in color depth and durability, ensuring that even multi-color artwork with fine separations holds up over time.",
    ],
    facts: ["Hand-filled enamel", "Pantone color matching", "Controlled-temperature curing"],
    layout: "feature",
    matches: (fileName) => containsAny(fileName, ["上色", "烤箱"]),
  },
  {
    id: "packaging-department",
    titleZh: "包装车间",
    titleEn: "Packaging Department",
    kicker: "QC and Packing",
    headline: "Every order inspected piece by piece.",
    body: [
      "Our QC team reviews each finished product against the approved sample — checking color match, plating quality, attachment fit, and overall finish before anything is packed.",
      "Approved pieces are organized by order, packaged according to client specifications, and prepared for global shipment. The result: orders that arrive complete, accurate, and ready for retail or end use.",
    ],
    facts: ["Piece-by-piece QC", "Custom packaging options", "Export-ready shipment"],
    layout: "inspection",
    matches: (fileName) => containsAny(fileName, ["包装", "包裝", "QC", "品鉴", "品鑒"]),
  },
  {
    id: "environmental-facilities",
    titleZh: "环保部分：废水处理 / 废气塔 / 危险品仓库",
    titleEn: "Environmental Facilities",
    kicker: "Compliance Infrastructure",
    headline: "Licensed, audited, environmentally compliant.",
    body: [
      "On-site wastewater treatment, exhaust scrubbing towers, and certified hazardous material storage support every plating cycle. These systems are required to operate a licensed electroplating facility in China — and we maintain them ourselves.",
      "For brands, museums, and licensed programs, this matters. Working with KaiGui means partnering with a factory that meets full environmental compliance, not one that cuts corners to lower its price.",
    ],
    facts: ["On-site wastewater treatment", "Exhaust scrubbing tower", "Certified chemical storage"],
    layout: "compliance",
    matches: isEnvironmental,
  },
];

const CAPTION_RULES: CaptionRule[] = [
  { terms: ["電鍍廠房_汙水處理"], caption: "Electroplating building connected to wastewater treatment infrastructure" },
  { terms: ["廢水處理_危險品倉庫"], caption: "Wastewater treatment area beside hazardous materials storage" },
  { terms: ["廢水處理_金工車間"], caption: "Wastewater treatment equipment located near the metalworking shop" },
  { terms: ["蒸汽"], caption: "Steam record inspection and environmental monitoring point" },
  { terms: ["廢氣塔", "废气塔"], caption: "Rooftop exhaust treatment tower for factory emissions control" },
  { terms: ["廢水處理", "废水处理"], caption: "Wastewater treatment system equipment for plating operations" },
  { terms: ["危險品", "危险品"], caption: "Hazardous materials storage area for controlled factory chemicals" },
  { terms: ["主電鍍樓"], caption: "Main electroplating building exterior on the factory campus" },
  { terms: ["電鍍廠房"], caption: "Electroplating building exterior within the factory layout" },
  { terms: ["門面", "门面"], caption: "Main factory entrance where the walkthrough begins" },
  { terms: ["廠房間隔", "厂房间隔"], caption: "Interior factory spacing and department layout" },
  { terms: ["电镀槽", "電鍍槽"], caption: "Electroplating tank line used to build consistent metal finishes" },
  { terms: ["滾鍍", "滚镀"], caption: "Barrel-plating equipment for batch finishing smaller parts" },
  { terms: ["电镀车间", "電鍍車間"], caption: "Electroplating workshop production line and tank area" },
  { terms: ["电镀（", "電鍍（"], caption: "Electroplating process station for controlled surface finishing" },
  { terms: ["上色车间", "上色車間"], caption: "Coloring workshop workstations for enamel application" },
  { terms: ["上色"], caption: "Enamel color application station for recessed design areas" },
  { terms: ["烤箱"], caption: "Curing oven area supporting enamel color work" },
  { terms: ["绑线", "綁線"], caption: "Wiring and hanging workstation for controlled batch handling" },
  { terms: ["机器螺丝", "機器螺絲"], caption: "Machine screw fastening used to keep products aligned during handling" },
  { terms: ["拋光", "抛光"], caption: "Polishing workshop surface finishing station" },
  { terms: ["金工车间", "金工車間"], caption: "Metalworking workshop equipment line for formed metal parts" },
  { terms: ["冲床", "沖床"], caption: "Press machine forming metal blanks before finishing" },
  { terms: ["冲压", "沖壓"], caption: "Stamping press area for shaping metal blanks" },
  { terms: ["刻模"], caption: "Mold engraving and tooling station for custom artwork" },
  { terms: ["壓鑄", "压铸"], caption: "Die-casting station for metal components" },
  { terms: ["包装", "包裝"], caption: "Packaging department workbench for organizing finished orders" },
  { terms: ["QC"], caption: "Quality control inspection area for finished pieces" },
  { terms: ["品鉴", "品鑒"], caption: "Finished product review and sample checking table" },
];

const CLIENT_LOGOS = [
  {
    src: "/images/factory-tour-client-psa-bdp.jpg",
    alt: "PSA BDP",
    name: "PSA BDP",
  },
  {
    src: "/images/factory-tour-client-elgin.jpeg",
    alt: "Elgin Military Museum",
    name: "Elgin Military Museum",
  },
  {
    src: "/images/factory-tour-client-aga-khan.png",
    alt: "Aga Khan Museum",
    name: "Aga Khan Museum",
  },
  {
    src: "/images/factory-tour-client-mark.png",
    alt: "Eagle Emblems",
    name: "Eagle Emblems",
  },
  {
    src: "/images/factory-tour-client-foxconn.png",
    alt: "Foxconn",
    name: "Foxconn",
  },
];

function makePublicPath(folder: "factory" | "factory/optimized", fileName: string) {
  return `/images/${folder}/${encodeURIComponent(fileName)}`;
}

function withViewNumber(caption: string, fileName: string) {
  const numberMatch = fileName.match(/[（(](\d+)[）)]|照片(\d+)/);
  const number = numberMatch?.[1] ?? numberMatch?.[2];

  return number ? `${caption}, view ${number}` : caption;
}

function makeEnglishCaption(fileName: string) {
  const rule = CAPTION_RULES.find(({ terms }) => containsAny(fileName, terms));

  if (!rule) {
    return "Factory production area photographed from the shop floor";
  }

  return withViewNumber(rule.caption, fileName);
}

function makeFactoryImage(fileName: string): FactoryWalkthroughImage {
  const sourceBaseName = fileName.replace(/\.[^.]+$/, "");
  const optimizedFileName = `${sourceBaseName}.webp`;
  const optimizedPath = path.join(FACTORY_OPTIMIZED_DIR, optimizedFileName);
  const src = existsSync(optimizedPath)
    ? makePublicPath("factory/optimized", optimizedFileName)
    : makePublicPath("factory", fileName);
  const caption = makeEnglishCaption(fileName);

  return {
    src,
    alt: `KaiGui factory photo: ${caption}`,
    caption,
    sourceName: fileName,
  };
}

function getFactoryImageFiles() {
  if (!existsSync(FACTORY_IMAGE_DIR)) {
    return [];
  }

  return readdirSync(FACTORY_IMAGE_DIR)
    .filter((fileName) => SOURCE_IMAGE_PATTERN.test(fileName))
    .sort((left, right) => COLLATOR.compare(left, right));
}

function getFactorySections(): FactoryWalkthroughSection[] {
  const files = getFactoryImageFiles();
  const groupedImages = new Map<string, FactoryWalkthroughImage[]>(
    SECTION_DEFINITIONS.map((section) => [section.id, []]),
  );

  files.forEach((fileName) => {
    const matchedSection =
      SECTION_DEFINITIONS.find((section) => section.matches(fileName)) ??
      SECTION_DEFINITIONS[SECTION_DEFINITIONS.length - 1];

    groupedImages.get(matchedSection.id)?.push(makeFactoryImage(fileName));
  });

  return SECTION_DEFINITIONS.map((section) => ({
    id: section.id,
    titleZh: section.titleZh,
    titleEn: section.titleEn,
    kicker: section.kicker,
    headline: section.headline,
    body: section.body,
    facts: section.facts,
    layout: section.layout,
    images: groupedImages.get(section.id) ?? [],
  }));
}

export default function FactoryTourPage() {
  const factorySections = getFactorySections();
  const heroImage =
    factorySections.find((section) => section.id === "factory-environment")?.images[0]?.src ??
    "/images/factory-tour-facility-exterior.jpg";

  return (
    <div className="min-h-screen bg-background text-on-background font-body antialiased overflow-x-hidden">
      <SiteNav />

      <main className="pt-24">
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5">
              <Link
                href="/about"
                className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
              >
                Back to About
              </Link>
              <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mt-10 mb-5">
                
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight mb-8">
                Inside <span className="italic text-secondary">KaiGui&apos;s Kunshan Factory.</span>
              </h1>
              <p className="font-headline text-2xl md:text-3xl text-primary italic mb-8 leading-snug">
                A full-service custom metal manufacturing facility — built, owned, and operated by us.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Tooling, stamping, polishing, in-house electroplating, hand-filled enamel, QC, and
                packaging — every stage of production happens on one campus, under one team, with
                full environmental compliance.
              </p>
            </div>

            <figure className="lg:col-span-7 min-h-[480px] overflow-hidden bg-surface-container-low">
              <img
                src={heroImage}
                alt="KaiGui factory entrance and production campus"
                className="h-full min-h-[480px] w-full object-cover"
              />
            </figure>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <article className="lg:col-span-12 bg-surface-container-lowest border border-outline-variant/10 p-8 md:p-12">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-6">
                Factory Capability Overview
              </span>

              <h2 className="font-headline text-3xl md:text-5xl text-primary mb-8">
                One factory. Every step of production.
              </h2>

              <div className="space-y-6 text-on-surface-variant leading-loose">
                <p>
                  KaiGui is a vertically integrated custom metal manufacturer. We design tooling,
                  cast and stamp metal, polish, electroplate, hand-fill enamel, inspect, and pack —
                  all inside our own facility in Kunshan, China.
                </p>

                <p>
                  This structure is what allows us to serve distributors, licensed brands, museums,
                  and global sourcing partners with consistent quality, predictable lead times, and
                  direct accountability at every stage.
                </p>

                <p>
                  Below is an open look inside the workshops, equipment, and environmental
                  infrastructure that make our production possible. What you see in the photos is
                  exactly what produces your order.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-surface-container-low px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-5">
                Video Walkthrough
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight mb-7">
                See the factory in motion.
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                A short walkthrough of the KaiGui production floor — from the main entrance through
                the active workshops. For partners who can&apos;t visit Kunshan in person, this is
                the closest look at where your products are made.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FactoryTourVideo
                posterSrc="/images/factory-tour-video-poster.jpg"
                videoSrc="/videos/factory-tour.mp4"
              />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
              <div className="lg:col-span-5">
                <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-5">
                  Inside the Workshops
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight">
                  Step inside every workshop.
                </h2>
              </div>
              <p className="lg:col-span-7 text-on-surface-variant text-lg leading-relaxed">
                A department-by-department look at the equipment, people, and infrastructure behind
                every KaiGui order — from raw metal forming through finished, packed products. No
                stock imagery, no third-party facilities. This is our factory.
              </p>
            </div>

            <FactoryWalkthrough sections={factorySections} />
          </div>
        </section>

        <section className="bg-surface-container-low px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <div>
                <span className="font-label text-secondary text-xs uppercase tracking-[0.25em] block mb-5">
                  Our Clients
                </span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary">
                  Trusted by brands worldwide.
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex justify-center bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Contact Sales
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-outline-variant/20">
              {CLIENT_LOGOS.map(({ src, alt, name }) => (
                <div
                  key={src}
                  className="bg-surface-container-lowest min-h-[150px] flex flex-col items-center justify-center p-6"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                  />
                  <span className="mt-5 text-center font-label text-[10px] uppercase tracking-wider text-on-surface-variant">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
