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
  titleZh: string;
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

  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
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
            className="group relative w-[260px] shrink-0 overflow-hidden bg-surface-container-lowest md:w-[340px]"
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
          <div className="bg-primary p-6 text-on-primary lg:col-span-4 lg:min-h-[206px] lg:flex lg:flex-col lg:justify-center">
            <p className="font-label text-[10px] uppercase tracking-[0.25em] text-on-primary-container mb-3">
              Tour Context
            </p>
            <p className="text-sm text-on-primary/80 leading-relaxed">
              The walkthrough starts at the campus. Every department, building, and environmental
              system you see lives on this one site.
            </p>
          </div>
        </div>
        <MosaicImages images={rest} startIndex={2} />
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
    const restImages = section.images.slice(1);
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        <FactoryImageFigure
          image={primary}
          className="lg:col-span-8"
          imageClassName="aspect-[16/10] min-h-[360px] lg:h-full"
          eager={isFirstSection}
          revealIndex={0}
        />
        <div className="grid grid-cols-2 gap-2 lg:col-span-4 lg:grid-cols-1">
          {restImages.slice(0, 2).map((image, index) => (
            <FactoryImageFigure
              key={image.src}
              image={image}
              imageClassName="aspect-[4/3]"
              revealIndex={index + 1}
            />
          ))}
        </div>
        <div className="lg:col-span-12">
          <MosaicImages images={restImages.slice(2)} startIndex={3} />
        </div>
      </div>
    );
  }

  if (section.layout === "compliance") {
    const restImages = section.images.slice(1);
    return (
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        <FactoryImageFigure
          image={primary}
          className="lg:col-span-8"
          imageClassName="aspect-[16/9] min-h-[340px] lg:h-full"
          eager={isFirstSection}
          revealIndex={0}
        />
        <div className="bg-surface-container-high p-7 lg:col-span-4 lg:flex lg:flex-col lg:justify-center">
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-secondary mb-4">
            Why It Matters
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Environmental infrastructure is part of the production system. Wastewater treatment,
            exhaust scrubbing, and certified chemical storage all sit on the same operating campus.
          </p>
        </div>
        <div className="lg:col-span-12">
          <MosaicImages images={restImages} startIndex={1} />
        </div>
      </div>
    );
  }

  const secondaryImages = section.images.slice(1, 3);
  const remainingImages = section.images.slice(3);

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
      </div>
      <MosaicImages images={remainingImages} startIndex={3} />
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
                <p className="mt-4 text-xl font-semibold text-primary">{section.titleZh}</p>
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
