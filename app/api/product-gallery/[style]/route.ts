import { existsSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { PIN_STYLES } from "@/lib/pinConfig";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

function toPublicImagePath(styleSlug: string, filename: string) {
  return `/images/gallary/${encodeURIComponent(styleSlug)}/${encodeURIComponent(filename)}`;
}

function toOptimizedImagePath(styleSlug: string, filename: string) {
  const optimizedFilename = `${path.basename(filename, path.extname(filename))}.webp`;
  const optimizedPath = path.join(
    process.cwd(),
    "public",
    "images",
    "gallary",
    "optimized",
    styleSlug,
    optimizedFilename,
  );

  if (!existsSync(optimizedPath)) {
    return toPublicImagePath(styleSlug, filename);
  }

  return `/images/gallary/optimized/${encodeURIComponent(styleSlug)}/${encodeURIComponent(optimizedFilename)}`;
}

function parseNonNegativeInteger(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return undefined;
  }

  return parsed;
}

export async function GET(
  request: Request,
  { params }: { params: { style: string } },
) {
  const style = PIN_STYLES.find((item) => item.slug === params.style);

  if (!style) {
    return NextResponse.json(
      { images: [], total: 0, hasMore: false },
      { status: 404 },
    );
  }

  const { searchParams } = new URL(request.url);
  const offset = parseNonNegativeInteger(searchParams.get("offset")) ?? 0;
  const limit = parseNonNegativeInteger(searchParams.get("limit"));

  const galleryDir = path.join(
    process.cwd(),
    "public",
    "images",
    "gallary",
    style.slug,
  );

  try {
    const files = await readdir(galleryDir, { withFileTypes: true });
    const allImages = files
      .filter((file) => file.isFile())
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file.name).toLowerCase()))
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      .map((file, index) => ({
        src: toOptimizedImagePath(style.slug, file.name),
        alt: `${style.label} gallery example ${index + 1}`,
        caption: `Sample ${String(index + 1).padStart(2, "0")}`,
        filename: file.name,
      }));
    const images =
      typeof limit === "number"
        ? allImages.slice(offset, offset + limit)
        : allImages.slice(offset);

    return NextResponse.json(
      {
        images,
        total: allImages.length,
        hasMore: offset + images.length < allImages.length,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { images: [], total: 0, hasMore: false },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
