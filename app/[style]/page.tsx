import { notFound } from "next/navigation";
import { SLUG_TO_STYLE, PIN_STYLES } from "@/lib/pinConfig";
import { PinCustomizer } from "@/components/PinCustomizer";
import { GameStyleCustomizer } from "@/components/GameStyleCustomizer";
import { StylePageInitializer } from "@/components/StylePageInitializer";
import { getAllOptionDetails } from "@/lib/loadOptionDetails";

export function generateStaticParams() {
  return PIN_STYLES.map((s) => ({ style: s.slug }));
}

export default async function StylePage({
  params,
  searchParams,
}: {
  params: { style: string };
  searchParams?: { mode?: string };
}) {
  const slug = params.style;
  const style = SLUG_TO_STYLE[slug];

  if (!style) {
    notFound();
  }

  const styleInfo = PIN_STYLES.find((s) => s.id === style);
  const optionDetails = getAllOptionDetails();
  const isClassicMode = searchParams?.mode === "classic";

  return (
    <div style={isClassicMode ? undefined : { background: "#faf9f7", minHeight: "100vh" }}>
      <StylePageInitializer style={style} />
      {isClassicMode ? (
        <PinCustomizer
          style={style}
          styleLabel={styleInfo?.label ?? slug}
          hideStep1
          optionDetails={optionDetails}
        />
      ) : (
        <GameStyleCustomizer
          style={style}
          styleLabel={styleInfo?.label ?? slug}
          optionDetails={optionDetails}
        />
      )}
    </div>
  );
}
