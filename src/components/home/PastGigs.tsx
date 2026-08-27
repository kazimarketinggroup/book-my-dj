"use client";

import { useState } from "react";
import Image from "next/image";
import { gigs } from "@/lib/home-data";

export default function PastGigs() {
  const [active, setActive] = useState(0);
  const featured = gigs[active];

  return (
    <section id="past-gigs" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          Our Past Gigs
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1.3fr] lg:gap-5">
          {/* Featured panel - reflects the selected gig */}
          <article
            aria-live="polite"
            className="h-full overflow-hidden rounded-[22px] border border-hairline bg-surface p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-4"
          >
            <div className="grid h-full gap-4 sm:grid-cols-[1.15fr_1fr] sm:items-stretch">
              <div className="order-2 text-left sm:order-1 sm:self-center">
                <h3 className="font-display text-[15px] font-semibold text-foreground sm:text-[18px]">
                  {featured.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                  {featured.detail}
                </p>
              </div>
              <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[18px] sm:order-2 sm:aspect-auto sm:h-full sm:min-h-80">
                <Image
                  key={featured.image}
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  className="object-cover"
                />
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
                  className={`flex w-full items-center gap-4 rounded-[20px] border p-3 text-left transition-colors sm:p-4 ${
                    isActive
                      ? "border-[#d483ff]/50 bg-surface shadow-[0_0_0_1px_rgba(212,131,255,0.18)]"
                      : "border-hairline bg-surface hover:border-foreground/25"
                  }`}
                >
                  <div className="relative aspect-square w-22 shrink-0 overflow-hidden rounded-[14px] sm:w-24">
                    <Image
                      src={gig.image}
                      alt={gig.alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="font-display text-[15px] font-semibold text-foreground sm:text-[18px]">
                      {gig.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
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
