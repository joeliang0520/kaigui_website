"use client";

import { useState } from "react";

type FactoryTourVideoProps = {
  posterSrc: string;
  videoSrc: string;
};

export function FactoryTourVideo({ posterSrc, videoSrc }: FactoryTourVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-video overflow-hidden bg-primary shadow-2xl">
        <video
          className="h-full w-full object-cover"
          controls
          autoPlay
          poster={posterSrc}
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10">
      <div className="relative aspect-video overflow-hidden bg-surface-container-low">
        <img
          src={posterSrc}
          alt="Factory tour video preview"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-secondary mb-3">
            Factory Tour Video
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            Watch the walkthrough first, then browse the production departments below by process.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-7 py-4 font-label text-xs uppercase tracking-widest text-on-primary hover:opacity-90"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            play_arrow
          </span>
          Watch Tour
        </button>
      </div>
    </div>
  );
}
