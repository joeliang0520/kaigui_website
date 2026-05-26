"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type FactoryWalkthroughImage = {
  src: string;
  alt: string;
  caption: string;
  sourceName: string;
};

export type FactoryWalkthroughLayout =
  | "arrival"
  | "feature"
  | "rolling"
  | "split"
  | "inspection"
  | "compliance";

export type FactoryWalkthroughSection = {
  id: string;
  titleEn: string;
  kicker: string;
  headline: string;
  body: string[];
  facts: string[];
  layout: FactoryWalkthroughLayout;
  images: FactoryWalkthroughImage[];
};

type FactoryWalkthroughProps = {
  sections: FactoryWalkthroughSection[];
};

function FactoryImageFigure({
  image,
  className = "",
  imageClassName = "",
  eager = false,
  revealIndex = 0,
}: {
  image: FactoryWalkthroughImage;
  className?: string;
  imageClassName?: string;
  eager?: boolean;
  revealIndex?: number;
}) {
  return (
    <figure
      data-factory-reveal
      style={{ "--factory-reveal-index": revealIndex } as CSSProperties}
      className={`factory-story-tile group relative overflow-hidden bg-surface-container-low ${className}`}
    >
      <div className={`overflow-hidden bg-surface-container ${imageClassName}`}>
        <img
          src={image.src}
          alt={image.alt}
          className="factory-story-image h-full w-full object-cover"
          loading={eager ? "eager" : "lazy"}
        />
      </div>
      <figcaption className="factory-story-caption absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 py-3 text-xs leading-relaxed text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-sm">
        {image.caption}
      </figcaption>
    </figure>
  );
}

const MOSAIC_LG_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

const MOSAIC_SM_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

function pickMosaicCols(count: number, max: number): number {
  for (let cols = max; cols >= 2; cols--) {
    if (count % cols === 0) return cols;
  }
  return max;
}

function MosaicImages({
  images,
  startIndex = 0,
}: {
  images: FactoryWalkthroughImage[];
  startIndex?: number;
}) {
  if (images.length === 0) {
    return null;
  }

  const lgColsClass = MOSAIC_LG_COLS[pickMosaicCols(images.length, 4)];
  const smColsClass = MOSAIC_SM_COLS[pickMosaicCols(images.length, 3)];

  return (
    <div className={`mt-2 grid grid-cols-2 gap-2 ${smColsClass} ${lgColsClass}`}>
      {images.map((image, index) => (
        <FactoryImageFigure
          key={image.src}
          image={image}
          imageClassName="aspect-[4/3]"
          revealIndex={startIndex + index}
        />
      ))}
    </div>
  );
}

function RollingImages({
  images,
  eager,
}: {
  images: FactoryWalkthroughImage[];
  eager: boolean;
}) {
  const loopImages = images.length > 0 ? [...images, ...images] : [];

  return (
    <div className="factory-story-marquee overflow-hidden bg-surface-container-low py-3">
      <div className="factory-story-marquee-track flex w-max gap-2 px-2">
        {loopImages.map((image, index) => (
          <figure
            key={`${image.src}-${index}`}
            className="group relative w-[340px] shrink-0 overflow-hidden bg-surface-container-lowest md:w-[480px]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="factory-story-image h-full w-full object-cover"
                loading={eager && index < 2 ? "eager" : "lazy"}
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 py-3 text-xs leading-relaxed text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-sm">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function renderMediaLayout(section: FactoryWalkthroughSection, isFirstSection: boolean) {
  const [primary, secondary, ...rest] = section.images;

  if (!primary) {
    return (
      <div className="border border-outline-variant/20 bg-surface-container-low p-8 text-on-surface-variant">
        Photos for this workshop have not been added yet.
      </div>
    );
  }

  if (section.layout === "arrival") {
    const [thirdImage, fourthImage, ...remainingArrivalImages] = rest;
    return (
      <div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
          <FactoryImageFigure
            image={primary}
            className="lg:col-span-8 lg:row-span-2"
            imageClassName="aspect-[16/10] min-h-[420px] lg:h-full"
            eager={isFirstSection}
            revealIndex={0}
          />
          {secondary ? (
            <FactoryImageFigure
              image={secondary}
              className="lg:col-span-4"
              imageClassName="aspect-[4/3] lg:min-h-[206px]"
              revealIndex={1}
            />
          ) : null}
          {thirdImage ? (
            <FactoryImageFigure
              image={thirdImage}
              className="lg:col-span-2"
              imageClassName="aspect-[4/3] lg:min-h-[206px]"
              revealIndex={2}
            />
          ) : null}
          {fourthImage ? (
            <FactoryImageFigure
              image={fourthImage}
              className="lg:col-span-2"
              imageClassName="aspect-[4/3] lg:min-h-[206px]"
              revealIndex={3}
            />
          ) : null}
        </div>
        <MosaicImages images={remainingArrivalImages} startIndex={4} />
      </div>
    );
  }

  if (section.layout === "rolling") {
    return <RollingImages images={section.images} eager={isFirstSection} />;
  }

  if (section.layout === "split") {
    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {section.images.map((image, index) => (
          <FactoryImageFigure
            key={image.src}
            image={image}
            imageClassName="aspect-[4/3] md:min-h-[360px]"
            eager={isFirstSection && index === 0}
            revealIndex={index}
          />
        ))}
      </div>
    );
  }

  if (section.layout === "inspection") {
    const rightImages = section.images.slice(1, 4);
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        <FactoryImageFigure
          image={primary}
          className="lg:col-span-8 lg:row-span-3"
          imageClassName="aspect-[4/3] min-h-[360px] lg:absolute lg:inset-0 lg:aspect-auto lg:min-h-0"
          eager={isFirstSection}
          revealIndex={0}
        />
        {rightImages.map((image, index) => (
          <FactoryImageFigure
            key={image.src}
            image={image}
            className="lg:col-span-4"
            imageClassName="aspect-[16/9]"
            revealIndex={index + 1}
          />
        ))}
      </div>
    );
  }

  if (section.layout === "compliance") {
    const exhaustImageIndex = section.images.findIndex(
      (image) => image.sourceName.includes("廢氣塔") || image.sourceName.includes("废气塔"),
    );
    const exhaustImage = exhaustImageIndex >= 0 ? section.images[exhaustImageIndex] : null;
    const nonExhaustImages = section.images.filter((_, index) => index !== exhaustImageIndex);
    const [primaryImage, ...restImages] = nonExhaustImages;

    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        <FactoryImageFigure
          image={primaryImage ?? primary}
          className="lg:col-span-8"
          imageClassName="aspect-[16/9] min-h-[340px] lg:h-full"
          eager={isFirstSection}
          revealIndex={0}
        />
        <div className="flex flex-col gap-2 lg:col-span-4">
          <div className="bg-surface-container-high p-7 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
            <p className="font-label text-[12px] uppercase tracking-[0.25em] text-secondary mb-4">
        
            </p>
            <p className="text-l text-on-surface-variant leading-relaxed">
              “For us, environmental care is not an add-on. It is part of how the factory
              operates every day. Wastewater treatment, exhaust scrubbing, and certified
              chemical storage are all managed on the same campus to help ensure cleaner,
              safer, and more responsible production.”
            </p>
            <p className="mt-4 text-sm font-medium text-on-surface">
              — Tom, Second-Generation Factory Leader
            </p>
          </div>
          {exhaustImage ? (
            <FactoryImageFigure
              image={exhaustImage}
              className="w-full lg:flex-1"
              imageClassName="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[170px]"
              revealIndex={1}
            />
          ) : null}
        </div>
        <div className="lg:col-span-12">
          <MosaicImages images={restImages} startIndex={2} />
        </div>
      </div>
    );
  }

  const showQuoteSlot = section.id === "coloring-workshop";
  const secondaryImages = showQuoteSlot
    ? section.images.slice(1, 2)
    : section.images.slice(1, 3);
  const remainingImages = showQuoteSlot
    ? section.images.slice(2)
    : section.images.slice(3);

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        <FactoryImageFigure
          image={primary}
          className="lg:col-span-7 lg:row-span-2"
          imageClassName="aspect-[4/3] min-h-[380px] lg:h-full"
          eager={isFirstSection}
          revealIndex={0}
        />
        {secondaryImages.map((image, index) => (
          <FactoryImageFigure
            key={image.src}
            image={image}
            className="lg:col-span-5"
            imageClassName="aspect-[16/9] lg:min-h-[186px]"
            revealIndex={index + 1}
          />
        ))}
        {showQuoteSlot ? (
          <figure className="relative flex flex-col justify-center gap-4 bg-primary p-7 text-on-primary lg:col-span-5 lg:min-h-[186px]">
            <span
              aria-hidden="true"
              className="font-headline text-5xl italic leading-none text-on-primary/40"
            >
              &ldquo;
            </span>
            <blockquote className="space-y-3 text-sm leading-relaxed text-on-primary/90">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>
          </figure>
        ) : null}
      </div>
      <MosaicImages images={remainingImages} startIndex={secondaryImages.length + 1} />
    </div>
  );
}

export function FactoryWalkthrough({ sections }: FactoryWalkthroughProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll<HTMLElement>("[data-factory-reveal]").forEach((element) => {
        element.dataset.revealed = "true";
      });
      root
        .querySelectorAll<HTMLElement>(".factory-story-section")
        .forEach((element) => (element.dataset.revealed = "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    root
      .querySelectorAll<HTMLElement>("[data-factory-reveal], .factory-story-section")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="space-y-20 md:space-y-28">
      {sections.map((section, sectionIndex) => {
        return (
          <article
            key={section.id}
            id={section.id}
            className="factory-story-section scroll-mt-28 border-t border-outline-variant/20 pt-12 md:pt-16"
          >
            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-4">
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-secondary mb-5">
                  Stop {String(sectionIndex + 1).padStart(2, "0")} / {section.kicker}
                </p>
                <h3 className="font-headline text-4xl leading-tight text-primary md:text-5xl">
                  {section.titleEn}
                </h3>
              </div>
              <div className="lg:col-span-8">
                <h4 className="font-headline text-3xl leading-tight text-primary md:text-4xl">
                  {section.headline}
                </h4>
                <div className="mt-6 grid gap-5 text-on-surface-variant md:grid-cols-2">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {renderMediaLayout(section, sectionIndex === 0)}
          </article>
        );
      })}
    </div>
  );
}
