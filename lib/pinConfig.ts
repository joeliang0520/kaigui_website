export type PinStyle =
  | "hard_enamel"
  | "soft_enamel"
  | "die_struck"
  | "3d_mold"
  | "laser_cut"
  | "acrylic";

export const STYLE_SLUGS: Record<PinStyle, string> = {
  hard_enamel: "hard-enamel",
  soft_enamel: "soft-enamel",
  die_struck: "die-struck",
  "3d_mold": "3d-mold",
  laser_cut: "laser-cut",
  acrylic: "acrylic",
};

export const SLUG_TO_STYLE: Record<string, PinStyle> = {
  "hard-enamel": "hard_enamel",
  "soft-enamel": "soft_enamel",
  "die-struck": "die_struck",
  "3d-mold": "3d_mold",
  "laser-cut": "laser_cut",
  acrylic: "acrylic",
};

export const PIN_STYLES: { id: PinStyle; label: string; slug: string }[] = [
  { id: "hard_enamel", label: "Hard Enamel Pin", slug: "hard-enamel" },
  { id: "soft_enamel", label: "Soft Enamel Pin", slug: "soft-enamel" },
  { id: "die_struck", label: "Die Struck Pin", slug: "die-struck" },
  { id: "3d_mold", label: "3D Mold Pin", slug: "3d-mold" },
  { id: "laser_cut", label: "Laser-Cut Pin", slug: "laser-cut" },
  { id: "acrylic", label: "Acrylic Pin", slug: "acrylic" },
];

export type PinShape = "rectangle" | "square" | "circle" | "custom";

export const PIN_SHAPES: { id: PinShape; label: string }[] = [
  { id: "rectangle", label: "Rectangle" },
  { id: "square", label: "Square" },
  { id: "circle", label: "Circle" },
  { id: "custom", label: "Custom Shape" },
];

export const SIZES_CM = [
  { value: 1.27, label: "1.3 cm", valueIn: 0.5, valueMm: 12.7, popular: false },
  { value: 1.9, label: "1.9 cm", valueIn: 0.75, valueMm: 19.1, popular: false },
  { value: 2.54, label: "2.5 cm", valueIn: 1, valueMm: 25.4, popular: true },
  { value: 3.18, label: "3.2 cm", valueIn: 1.25, valueMm: 31.8, popular: true },
  { value: 3.81, label: "3.8 cm", valueIn: 1.5, valueMm: 38.1, popular: true },
  { value: 4.45, label: "4.5 cm", valueIn: 1.75, valueMm: 44.5, popular: false },
  { value: 5.08, label: "5.1 cm", valueIn: 2, valueMm: 50.8, popular: false },
  { value: 5.72, label: "5.7 cm", valueIn: 2.25, valueMm: 57.2, popular: false },
  { value: 6.35, label: "6.4 cm", valueIn: 2.5, valueMm: 63.5, popular: false },
  { value: 6.99, label: "7.0 cm", valueIn: 2.75, valueMm: 69.9, popular: false },
  { value: 7.62, label: "7.6 cm", valueIn: 3, valueMm: 76.2, popular: false },
];

/** Preset rectangle sizes: width × height (cm) */
export const RECTANGLE_PRESETS = [
  { width: 2.54, height: 3.18, label: "1″ × 1.25″", popular: true },
  { width: 2.54, height: 3.81, label: "1″ × 1.5″", popular: true },
  { width: 3.18, height: 3.81, label: "1.25″ × 1.5″", popular: true },
  { width: 2.54, height: 5.08, label: "1″ × 2″", popular: false },
  { width: 3.81, height: 5.08, label: "1.5″ × 2″", popular: false },
];

export const PLATING_OPTIONS = [
  { id: "gold", label: "Gold" },
  { id: "silver", label: "Silver" },
  { id: "nickel", label: "Nickel" },
  { id: "black_nickel", label: "Black Nickel" },
  { id: "copper", label: "Copper" },
  { id: "antique_gold", label: "Antique Gold" },
  { id: "antique_silver", label: "Antique Silver" },
  { id: "antique_copper", label: "Antique Copper" },
  { id: "dyed_black", label: "Dyed Black" },
];

export const EFFECT_OPTIONS = [
  { id: "glow", label: "Glow in the Dark" },
  { id: "glitter", label: "Glitter Color" },
  { id: "rhinestones", label: "Rhinestones" },
  { id: "transparent", label: "Transparent Color" },
  { id: "pearlescent", label: "Pearlescent Color" },
];

export const ATTACHMENT_OPTIONS = [
  { id: "rubber_clutch", label: "Rubber Clutch" },
  { id: "two_rubber_clutch", label: "2× Rubber Clutch" },
  { id: "deluxe_clutch", label: "Deluxe Clutch" },
  { id: "two_deluxe_clutch", label: "2× Deluxe Clutch" },
  { id: "military_clutch", label: "Military Clutch" },
  { id: "two_military_clutch", label: "2× Military Clutch" },
  { id: "safety_pin", label: "Safety Pin" },
  { id: "magnet_back", label: "Magnet Back" },
  { id: "two_magnet_back", label: "2× Magnet Back" },
  { id: "no_backing", label: "No Backing" },
];

export const BACK_SIDE_OPTIONS = [
  { id: "plain_back", label: "Plain Back" },
  { id: "back_stamp", label: "Back Stamp" },
  { id: "laser_engraving", label: "Laser Engraving" },
];

export const PACKAGING_OPTIONS = [
  { id: "thin_poly_bag", label: "Thin Poly Bag" },
  { id: "thick_poly_bag", label: "Thick Poly Bag" },
  { id: "plastic_box", label: "Plastic Box" },
  { id: "paper_box", label: "Paper Box" },
  { id: "velvet_pouch", label: "Velvet Pouch" },
  { id: "backcard", label: "Backing Card" },
];

export const PLATING_COLORS: Record<string, string> = {
  gold: "#D4AF37",
  silver: "#C0C0C0",
  nickel: "#A8A8A8",
  black_nickel: "#2C2C2C",
  copper: "#B87333",
  antique_gold: "#B8860B",
  antique_silver: "#8B8B8B",
  antique_copper: "#8B4513",
  dyed_black: "#1A1A1A",
};

export type PinPart = "face" | "rim" | "back" | "side" | "attachment";

export const PART_LABELS: Record<PinPart, string> = {
  face: "Face",
  rim: "Rim",
  back: "Back",
  side: "Side",
  attachment: "Attachment",
};

export const ENAMEL_COLORS = [
  { id: "enamel_red", label: "Red", color: "#CC2222" },
  { id: "enamel_orange", label: "Orange", color: "#E06820" },
  { id: "enamel_yellow", label: "Yellow", color: "#DDB800" },
  { id: "enamel_green", label: "Green", color: "#1E8A2E" },
  { id: "enamel_teal", label: "Teal", color: "#1A7A6A" },
  { id: "enamel_blue", label: "Blue", color: "#1B4FCC" },
  { id: "enamel_purple", label: "Purple", color: "#6A1FCC" },
  { id: "enamel_pink", label: "Pink", color: "#CC2277" },
  { id: "enamel_white", label: "White", color: "#F0F0F0" },
  { id: "enamel_black", label: "Black", color: "#222222" },
];
