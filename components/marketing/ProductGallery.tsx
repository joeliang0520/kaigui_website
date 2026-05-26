"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type RuntimeGalleryImage = {
  src: string;
  alt: string;
  caption: string;
  filename: string;
};

type ProductGalleryProps = {
  productLabel: string;
  styleSlug: string;
};

const INITIAL_VISIBLE_COUNT = 4;
const LOAD_MORE_COUNT = 4;

export function ProductGallery({ productLabel, styleSlug }: ProductGalleryProps) {
  const [images, setImages] = useState<RuntimeGalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const [selectedImage, setSelectedImage] = useState<RuntimeGalleryImage | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setIsLoadingMore(false);
    setError("");
    setLoadMoreError("");
    setTotalCount(0);

    fetch(
      `/api/product-gallery/${encodeURIComponent(styleSlug)}?offset=0&limit=${INITIAL_VISIBLE_COUNT}&t=${Date.now()}`,
      {
        cache: "no-store",
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gallery request failed");
        }

        return response.json() as Promise<{
          images?: RuntimeGalleryImage[];
          total?: number;
        }>;
      })
      .then((data) => {
        setImages(Array.isArray(data.images) ? data.images : []);
        setTotalCount(typeof data.total === "number" ? data.total : 0);
      })
      .catch((requestError: Error) => {
        if (requestError.name !== "AbortError") {
          setError("Gallery images are not available right now.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [styleSlug]);

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const remainingCount = Math.max(totalCount - images.length, 0);
  const hasMoreImages = remainingCount > 0;

  function loadRemainingImages() {
    if (isLoadingMore || !hasMoreImages) {
      return;
    }

    setIsLoadingMore(true);
    setLoadMoreError("");

    fetch(
      `/api/product-gallery/${encodeURIComponent(styleSlug)}?offset=${images.length}&limit=${LOAD_MORE_COUNT}&t=${Date.now()}`,
      { cache: "no-store" },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gallery request failed");
        }

        return response.json() as Promise<{
          images?: RuntimeGalleryImage[];
          total?: number;
        }>;
      })
      .then((data) => {
        const nextImages = Array.isArray(data.images) ? data.images : [];

        setImages((currentImages) => {
          const existing = new Set(currentImages.map((image) => image.src));
          const uniqueNextImages = nextImages.filter((image) => !existing.has(image.src));

          return [...currentImages, ...uniqueNextImages];
        });

        if (typeof data.total === "number") {
          setTotalCount(data.total);
        }
      })
      .catch(() => {
        setLoadMoreError("Could not load the rest of the gallery. Please try again.");
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: INITIAL_VISIBLE_COUNT }).map((_, index) => (
          <div
            key={index}
            className="min-h-[280px] overflow-hidden border border-outline-variant/10 bg-surface-container-lowest"
          >
            <div className="product-gallery-skeleton aspect-[4/3] bg-surface-container-low" />
            <div className="h-14 bg-surface-container-lowest" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-outline-variant/20 bg-surface-container-lowest p-8 text-on-surface-variant">
        {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="border border-outline-variant/20 bg-surface-container-lowest p-8 text-on-surface-variant">
        No gallery images have been added for {productLabel} yet.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {images.map((image, index) => (
          <figure
            key={image.src}
            role="button"
            tabIndex={0}
            aria-label={`Open ${image.caption} image`}
            onClick={() => setSelectedImage(image)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedImage(image);
              }
            }}
            className="product-gallery-card group relative isolate cursor-zoom-in overflow-hidden border border-outline-variant/10 bg-surface-container-lowest outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            style={{ "--gallery-index": index % LOAD_MORE_COUNT } as CSSProperties}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
              <img
                src={image.src}
                alt={image.alt}
                className="product-gallery-image absolute inset-0 h-full w-full object-cover"
                loading={index < INITIAL_VISIBLE_COUNT ? "eager" : "lazy"}
              />
            </div>
            <figcaption className="p-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              <span>{image.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {isLoadingMore ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: Math.min(remainingCount || LOAD_MORE_COUNT, LOAD_MORE_COUNT) }).map((_, index) => (
            <div
              key={index}
              className="min-h-[280px] overflow-hidden border border-outline-variant/10 bg-surface-container-lowest"
            >
              <div className="product-gallery-skeleton aspect-[4/3] bg-surface-container-low" />
              <div className="flex h-14 items-center px-5">
                <span className="h-2 w-24 bg-surface-container" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {loadMoreError ? (
        <p className="mt-6 text-center text-sm text-error">{loadMoreError}</p>
      ) : null}

      {hasMoreImages ? (
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={loadRemainingImages}
            disabled={isLoadingMore}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-outline-variant bg-surface-container-lowest px-8 py-4 font-label text-xs uppercase tracking-widest text-primary hover:border-secondary hover:bg-surface-container-low disabled:cursor-wait disabled:opacity-70"
          >
            {isLoadingMore ? "Loading gallery" : "See more"}
            {isLoadingMore ? (
              <span className="product-gallery-spinner" aria-hidden="true" />
            ) : (
              <span className="material-symbols-outlined text-base">expand_more</span>
            )}
          </button>
        </div>
      ) : null}

      {selectedImage && isMounted
        ? createPortal(
            <div
              className="product-gallery-overlay fixed inset-0 z-[80] flex items-center justify-center bg-primary/90 p-3 md:p-8"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedImage.caption} full image`}
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="product-gallery-lightbox relative flex max-h-[calc(100vh-2rem)] w-full max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden md:max-w-5xl"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Close image"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-surface-container-lowest text-primary shadow-xl transition-colors hover:bg-secondary hover:text-on-secondary"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
                <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/20">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[calc(100vh-7rem)] max-w-full object-contain"
                  />
                </div>
                <div className="shrink-0 bg-surface-container-lowest px-5 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {selectedImage.caption}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
