import type { PinStyle } from "@/lib/pinConfig";

export type ProductGalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ProductDetail = {
  summary: string;
  imageSrc: string;
  imageAlt: string;
  overview: string;
  bestFor: string[];
  productionNotes: string[];
  finishOptions: string[];
  gallery: ProductGalleryImage[];
};

export const PRODUCT_DETAILS: Record<PinStyle, ProductDetail> = {
  hard_enamel: {
    summary:
      "Smooth, polished enamel pins with raised metal borders and a jewelry-like finish.",
    imageSrc: "/images/product-hard-enamel.png",
    imageAlt:
      "Close up of a luxury gold-plated hard enamel pin with deep navy and gold details",
    overview:
      "Hard enamel is built for brands that want a refined, premium surface. Color is filled, cured, and polished level with the metal lines, creating a smooth face that feels substantial in hand.",
    bestFor: [
      "Premium brand merchandise",
      "Corporate recognition pieces",
      "Collector pins with crisp color fields",
    ],
    productionNotes: [
      "Polished surface with level enamel and metal",
      "Excellent durability for repeated handling",
      "Best with clean artwork and defined color regions",
    ],
    finishOptions: ["Gold", "Silver", "Nickel", "Black nickel", "Antique finishes"],
    gallery: [
      {
        src: "/images/product-hard-enamel-gallery-1.png",
        alt: "Hard enamel lapel pin with polished gold plating",
        caption: "Polished gold plating",
      },
      {
        src: "/images/product-hard-enamel-gallery-2.png",
        alt: "Hard enamel pin with deep color fill",
        caption: "Level enamel color",
      },
      {
        src: "/images/product-hard-enamel-gallery-3.png",
        alt: "Hard enamel pin displayed with backing card",
        caption: "Retail-ready presentation",
      },
    ],
  },
  soft_enamel: {
    summary:
      "Classic pins with recessed color, raised metal lines, and strong dimensional texture.",
    imageSrc: "/images/product-soft-enamel.png",
    imageAlt:
      "Detailed macro view of soft enamel pin with recessed color panels and raised metal borders",
    overview:
      "Soft enamel keeps the metal ridges raised above the color fill, giving the piece tactile definition and a traditional collectible-pin character.",
    bestFor: [
      "Event pins and club pins",
      "Illustrated artwork with bold outlines",
      "High-volume promotional programs",
    ],
    productionNotes: [
      "Raised metal creates a dimensional outline",
      "Works well with vibrant spot colors",
      "Optional epoxy dome can add a glossy protective layer",
    ],
    finishOptions: ["Gold", "Silver", "Copper", "Black nickel", "Dyed black"],
    gallery: [
      {
        src: "/images/product-soft-enamel-gallery-1.png",
        alt: "Soft enamel pin with raised metal detail",
        caption: "Raised metal ridges",
      },
      {
        src: "/images/product-soft-enamel-gallery-2.png",
        alt: "Soft enamel badge with bright color panels",
        caption: "Bright recessed color",
      },
      {
        src: "/images/product-soft-enamel-gallery-3.png",
        alt: "Soft enamel pins arranged for packaging",
        caption: "Production-ready batches",
      },
    ],
  },
  die_struck: {
    summary:
      "Metal-only pins using relief, plating contrast, and surface texture instead of color fill.",
    imageSrc: "/images/product-die-struck.png",
    imageAlt: "Minimalist antique silver die struck metal pin on clean white linen background",
    overview:
      "Die struck pins are shaped directly from metal, then finished with plating, polishing, sandblasting, or antiquing. The result is understated and architectural.",
    bestFor: [
      "Formal recognition pins",
      "Minimalist logo marks",
      "Textured metal keepsakes",
    ],
    productionNotes: [
      "No enamel fill required",
      "Relief depth carries the design",
      "Antique finishes make fine details more visible",
    ],
    finishOptions: ["Polished gold", "Antique silver", "Antique copper", "Dual-tone metal"],
    gallery: [
      {
        src: "/images/product-die-struck-gallery-1.png",
        alt: "Die struck pin with antique silver finish",
        caption: "Antique silver relief",
      },
      {
        src: "/images/product-die-struck-gallery-2.png",
        alt: "Die struck logo pin with polished highlights",
        caption: "Polished highlights",
      },
      {
        src: "/images/product-die-struck-gallery-3.png",
        alt: "Die struck metal pins arranged on a table",
        caption: "Metal-only production",
      },
    ],
  },
  "3d_mold": {
    summary:
      "Sculptural pins and dimensional ornaments built with cast forms and raised relief.",
    imageSrc: "/images/product-3d-mold.png",
    imageAlt: "Dimensional molded metal pin with sculptural raised relief",
    overview:
      "3D mold pins use custom tooling to create depth, curves, and relief that standard flat enamel pieces cannot achieve. They are suited for mascot shapes, figurative work, and dimensional emblems.",
    bestFor: [
      "Mascot and character pins",
      "Relief sculptures",
      "Dimensional brand emblems",
    ],
    productionNotes: [
      "Custom mold captures raised and recessed forms",
      "Works with plating, enamel accents, or antique finishing",
      "Good for complex silhouettes and sculpted surfaces",
    ],
    finishOptions: ["Gold", "Nickel", "Antique bronze", "Painted details", "Mixed enamel accents"],
    gallery: [
      {
        src: "/images/product-3d-mold-gallery-1.png",
        alt: "3D molded pin with raised sculptural form",
        caption: "Raised sculptural form",
      },
      {
        src: "/images/product-3d-mold-gallery-2.png",
        alt: "3D molded metal ornament with curved surface",
        caption: "Curved relief surface",
      },
      {
        src: "/images/product-3d-mold-gallery-3.png",
        alt: "3D molded pins with antique finish",
        caption: "Antique dimensional finish",
      },
    ],
  },
  laser_cut: {
    summary:
      "Precise edge-cut pins for sharp silhouettes, open shapes, and clean technical geometry.",
    imageSrc: "/images/product-laser-cut.png",
    imageAlt: "Laser-cut pin with crisp custom outline and clean metal edges",
    overview:
      "Laser-cut pins are designed around accurate outlines and clean edges. They are useful when the silhouette matters as much as the face artwork.",
    bestFor: [
      "Sharp custom silhouettes",
      "Cutout artwork and open shapes",
      "Modern flat graphics",
    ],
    productionNotes: [
      "Laser profile creates crisp outer edges",
      "Pairs well with printed or enamel surfaces",
      "Good for small batches and technical outlines",
    ],
    finishOptions: ["Polished metal", "Printed color", "Clear acrylic", "Dyed black", "Brushed effects"],
    gallery: [
      {
        src: "/images/product-laser-cut-gallery-1.png",
        alt: "Laser-cut pin with precise custom outline",
        caption: "Precise custom outline",
      },
      {
        src: "/images/product-laser-cut-gallery-2.png",
        alt: "Laser-cut badge with sharp internal cutout",
        caption: "Internal cutout detail",
      },
      {
        src: "/images/product-laser-cut-gallery-3.png",
        alt: "Laser-cut products arranged in a small batch",
        caption: "Clean batch production",
      },
    ],
  },
  acrylic: {
    summary:
      "Lightweight acrylic pins with glossy surfaces, digital color, and modern transparency.",
    imageSrc: "/images/product-acrylic.png",
    imageAlt:
      "Abstract translucent colorful acrylic shapes catching light with sharp clean edges",
    overview:
      "Acrylic pins are lightweight, bright, and flexible for artwork with gradients, full-color printing, or transparent effects. They are a practical choice for expressive, graphic-heavy designs.",
    bestFor: [
      "Full-color illustrated artwork",
      "Transparent or layered visual effects",
      "Lightweight merchandise runs",
    ],
    productionNotes: [
      "Digital print supports gradients and fine color detail",
      "Glossy acrylic face creates a clean modern look",
      "Works well for playful or highly detailed artwork",
    ],
    finishOptions: ["Clear acrylic", "Frosted acrylic", "Double-sided print", "Color acrylic", "Printed backing"],
    gallery: [
      {
        src: "/images/product-acrylic-gallery-1.png",
        alt: "Acrylic pin with transparent edge and full-color print",
        caption: "Transparent acrylic edge",
      },
      {
        src: "/images/product-acrylic-gallery-2.png",
        alt: "Acrylic pins with bright illustrated artwork",
        caption: "Full-color print",
      },
      {
        src: "/images/product-acrylic-gallery-3.png",
        alt: "Acrylic pin products arranged for display",
        caption: "Lightweight display set",
      },
    ],
  },
};
