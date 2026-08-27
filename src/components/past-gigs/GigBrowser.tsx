"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { gigCategories, pastGigs, type GigCategory } from "@/lib/past-gigs-data";

export default function GigBrowser() {
  const [category, setCategory] = useState<GigCategory>("All Gigs");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pastGigs.filter((g) => {
      const inCategory = category === "All Gigs" || g.category === category;
      const inQuery =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.blurb.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [category, query]);

  // Keep the selection valid when filters shrink the list.
  const activeIndex = selected < results.length ? selected : 0;
  const featured = results[activeIndex];

  const changeFilter = (next: GigCategory) => {
    setCategory(next);
    setSelected(0);
  };

  return (
    <section id="past-gigs" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            Past Gigs
          </h2>

          <div className="relative w-full sm:w-72">
            <label htmlFor="gig-search" className="sr-only">
              Search past gigs
            </label>
            <input
              id="gig-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              placeholder="Search"
              className="h-10 w-full rounded-full border border-hairline bg-surface pr-4 pl-10 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-brand-light focus:ring-1 focus:ring-brand-light"
            />
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)_minmax(0,1.2fr)]">
          {/* Category filters */}
          <nav aria-label="Gig categories" className="min-w-0 lg:self-start">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-4 lg:overflow-visible lg:border-l lg:border-hairline lg:pb-0">
              {gigCategories.map((c) => {
                const on = c === category;
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => changeFilter(c)}
                      aria-current={on}
                      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors lg:-ml-px lg:block lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-1 lg:text-left ${
                        on
                          ? "border-brand-light bg-surface text-foreground lg:bg-transparent"
                          : "border-hairline text-muted hover:text-foreground lg:border-transparent"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {featured ? (
            <>
              {/*
                Featured gig. Fixed height on desktop so it doesn't stretch to
                match however many results the filter returns.
              */}
              <article
                aria-live="polite"
                className="overflow-hidden rounded-2xl border border-hairline bg-surface p-4 sm:p-5 lg:h-71"
              >
                <div className="grid h-full gap-4 sm:grid-cols-[1.05fr_1fr] sm:items-center">
                  <div className="order-2 text-left sm:order-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {featured.detail}
                    </p>
                  </div>
                  <div className="relative order-1 aspect-3/4 w-full overflow-hidden rounded-xl sm:order-2 sm:h-full">
                    <Image
                      key={featured.image}
                      src={featured.image}
                      alt={featured.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>

              {/* Selectable list — scrolls if the filter returns a lot */}
              <ul className="no-scrollbar flex flex-col gap-3 lg:h-71 lg:overflow-y-auto">
                {results.map((gig, i) => {
                  const on = i === activeIndex;
                  return (
                    <li key={gig.title}>
                      <button
                        type="button"
                        onClick={() => setSelected(i)}
                        aria-pressed={on}
                        className={`flex w-full items-center gap-3 rounded-2xl border bg-surface p-2.5 text-left transition-colors ${
                          on
                            ? "border-[#d483ff]/60 shadow-[0_0_0_1px_rgba(212,131,255,0.18)]"
                            : "border-hairline hover:border-foreground/25"
                        }`}
                      >
                        <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={gig.image}
                            alt={gig.alt}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-[15px] font-semibold text-foreground">
                            {gig.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {gig.blurb}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted lg:col-span-2">
              No gigs match that search. Try a different term or category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
