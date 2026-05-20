import { notFound } from "next/navigation";
import { SLUG_TO_STYLE, PIN_STYLES } from "@/lib/pinConfig";

export function generateStaticParams() {
  return PIN_STYLES.map((s) => ({ style: s.slug }));
}

export default function StylePage({ params }: { params: { style: string } }) {
  const style = SLUG_TO_STYLE[params.style];

  if (!style) {
    notFound();
  }

  const styleInfo = PIN_STYLES.find((s) => s.id === style)!;
  const src = `/pin-designer/index.html?style=${encodeURIComponent(styleInfo.label)}`;

  return (
    <iframe
      src={src}
      title={`${styleInfo.label} — 3D Pin Customizer`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
