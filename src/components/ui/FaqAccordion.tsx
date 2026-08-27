"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * Two-column FAQ: heading on the left, accordion on the right. The first item
 * opens by default; clicking an open item closes it.
 */
export default function FaqAccordion({
  heading,
  items,
  id = "faq",
}: {
  heading: React.ReactNode;
  items: FaqItem[];
  id?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            {heading}
          </h2>

          <ul>
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-hairline">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-panel-${i}`}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span
                        aria-hidden
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-xs ${
                          isOpen
                            ? "bg-foreground text-background"
                            : "text-brand-light"
                        }`}
                      >
                        {isOpen ? "–" : "+"}
                      </span>
                      <span className="text-sm font-medium text-foreground sm:text-[15px]">
                        {item.q}
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows trick animates height without a fixed pixel value */}
                  <div
                    id={`${id}-panel-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-9 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
