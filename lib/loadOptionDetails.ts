import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface OptionDetail {
  name: string;
  description: string;
  /** Extended description for the detail popup. Falls back to description if not set. */
  detailDescription?: string;
}

type OptionType = "plating" | "effects" | "attachment" | "backSide" | "packaging";

const CONTENT_DIR = path.join(process.cwd(), "content/options");

function loadOptionDetail(
  optionType: OptionType,
  optionId: string
): OptionDetail {
  const filePath = path.join(CONTENT_DIR, optionType, `${optionId}.md`);
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const description = (data.description as string) ?? "Placeholder description.";
    const detailDescription =
      (data.detailDescription as string) || content.trim() || description;
    return {
      name: (data.name as string) ?? optionId,
      description,
      detailDescription: detailDescription || description,
    };
  } catch {
    return {
      name: optionId.replace(/_/g, " "),
      description: "Placeholder description. Edit the MD file to customize.",
      detailDescription: "Placeholder description. Edit the MD file to customize.",
    };
  }
}

export function getAllOptionDetails(): Record<
  OptionType,
  Record<string, OptionDetail>
> {
  const types: OptionType[] = [
    "plating",
    "effects",
    "attachment",
    "backSide",
    "packaging",
  ];
  const result: Record<string, Record<string, OptionDetail>> = {};

  for (const optionType of types) {
    const dir = path.join(CONTENT_DIR, optionType);
    if (!fs.existsSync(dir)) {
      result[optionType] = {};
      continue;
    }
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    result[optionType] = {};
    for (const file of files) {
      const optionId = file.replace(".md", "");
      result[optionType][optionId] = loadOptionDetail(optionType, optionId);
    }
  }

  return result as Record<OptionType, Record<string, OptionDetail>>;
}

export type OptionDetailsMap = Record<
  OptionType,
  Record<string, OptionDetail>
>;
