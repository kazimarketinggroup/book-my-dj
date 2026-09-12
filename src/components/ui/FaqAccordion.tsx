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
    <section id={id} className="scroll-mt-20 py-12 lg:py-20 bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[400px_1fr] lg:gap-16 items-start">
          <h2 className="font-display text-[30px] sm:text-[36px] lg:text-[40px] font-normal leading-tight sm:leading-[50px] text-foreground">
            {heading}
          </h2>

          <ul className="divide-y divide-hairline border-t border-b border-hairline">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="py-2">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-panel-${i}`}
                      className="flex w-full items-center gap-5 py-4 text-left transition-colors"
                    >
                      {/* Square toggle button */}
                      <span
                        aria-hidden
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] transition-colors ${
                          isOpen
                            ? "bg-foreground text-background"
                            : "bg-surface-3 text-muted hover:text-foreground"
                        }`}
                      >
                        {isOpen ? (
                          <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor">
                            <rect width="12" height="2" rx="1" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M6 1v10M1 6h10"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="font-sans text-[16px] sm:text-[18px] font-normal leading-[26px] text-foreground">
                        {item.q}
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows animates height cleanly */}
                  <div
                    id={`${id}-panel-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-12 font-sans text-[15px] sm:text-[17px] leading-[28px] text-muted">
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
