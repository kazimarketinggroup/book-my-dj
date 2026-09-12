"use client";

import { useState } from "react";
import Image from "next/image";
import { gigs } from "@/lib/home-data";

export default function PastGigs() {
  const [active, setActive] = useState(0);
  const featured = gigs[active];

  return (
    <section id="past-gigs" className="scroll-mt-20 py-10 lg:py-16 bg-background transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
          Our Past Gigs
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Featured panel */}
          <article
            aria-live="polite"
            className="flex flex-col justify-between overflow-hidden rounded-[15px] border border-hairline bg-surface-2 p-6 shadow-xl sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="flex-1 text-left">
              <h3 className="font-sans text-[20px] sm:text-[24px] font-normal leading-[30px] text-foreground">
                {featured.title}
              </h3>
              <p className="mt-4 font-sans text-[14px] sm:text-[16px] leading-[26px] text-muted">
                {featured.detail}
              </p>
            </div>
            
            {/* Featured Image with Play Button */}
            <div className="relative mt-4 aspect-[289/494] w-full max-w-[260px] shrink-0 overflow-hidden rounded-[15px] sm:mt-0 sm:h-[450px]">
              <Image
                key={featured.image}
                src={featured.image}
                alt={featured.alt}
                fill
                sizes="(max-width: 640px) 90vw, 300px"
                className="object-cover"
              />
              {/* Polygon 2 Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black/50 backdrop-blur-xs transition-transform hover:scale-110">
                  <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6 translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </article>

          {/* Selectable gig list */}
          <div className="flex flex-col gap-4">
            {gigs.map((gig, i) => {
              const isActive = i === active;
              return (
                <button
                  key={gig.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex w-full items-center gap-5 rounded-[15px] border border-hairline bg-surface-2 p-4 text-left shadow-sm transition-all ${
                    isActive
                      ? "ring-2 ring-brand shadow-lg shadow-brand/20"
                      : "hover:bg-surface"
                  }`}
                >
                  {/* Thumbnail: Rectangle 15 in Figma: 158px x 142px */}
                  <div className="relative h-[110px] w-[120px] sm:h-[130px] sm:w-[145px] shrink-0 overflow-hidden rounded-[15px]">
                    <Image
                      src={gig.image}
                      alt={gig.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="font-sans text-[18px] sm:text-[22px] font-medium leading-tight text-foreground">
                      {gig.title}
                    </h3>
                    <p className="mt-2 font-sans text-[14px] sm:text-[15px] leading-snug text-muted">
                      {gig.blurb}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
