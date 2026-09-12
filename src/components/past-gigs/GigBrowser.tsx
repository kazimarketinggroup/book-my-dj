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
  const featured = results[activeIndex] || pastGigs[0];

  const changeFilter = (next: GigCategory) => {
    setCategory(next);
    setSelected(0);
  };

  return (
    <section id="past-gigs" className="scroll-mt-20 bg-black py-10 lg:py-16 text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header: Title + Search Pill */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[50px] text-white">
            Past Gigs
          </h2>

          <div className="relative w-full sm:w-[400px]">
            <label htmlFor="gig-search" className="sr-only">
              Search past gigs
            </label>
            <div className="flex h-[44px] w-full items-center rounded-full border border-white/50 bg-transparent px-4 gap-3 transition-all focus-within:border-white focus-within:ring-1 focus-within:ring-white">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0 text-white/50"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                id="gig-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder="Search"
                className="w-full bg-transparent font-sans text-[15px] text-white placeholder:text-white/50 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3-Part Layout matching Figma Group 189 */}
        <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 xl:gap-8">
          {/* 1. Left Category Nav */}
          <nav aria-label="Gig categories" className="w-full lg:w-[150px] shrink-0">
            <ul className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:block lg:space-y-6 lg:overflow-visible lg:pb-0">
              {gigCategories.map((c) => {
                const on = c === category;
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => changeFilter(c)}
                      aria-current={on}
                      className={`whitespace-nowrap font-sans text-[17px] leading-[30px] transition-colors text-left block w-full ${
                        on
                          ? "font-medium text-white"
                          : "font-normal text-white/80 hover:text-white"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Vertical Divider Line (Figma Line 3: 472px) */}
          <div
            aria-hidden
            className="hidden lg:block w-[1px] h-[472px] bg-white/20 shrink-0"
          />

          {/* 2. Middle Featured Active Gig Card (Figma Group 187: 606px x 518px) */}
          {featured ? (
            <article
              aria-live="polite"
              className="flex-1 w-full lg:max-w-[606px] h-auto lg:h-[518px] overflow-hidden rounded-[14.5px] bg-[#161616] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
            >
              {/* Text Left: 262px */}
              <div className="flex-1 min-w-0 text-left sm:max-w-[270px]">
                <h3 className="font-sans text-[22px] sm:text-[24px] font-normal leading-[30px] text-white">
                  {featured.title}
                </h3>
                <p className="mt-5 font-sans text-[15px] sm:text-[16px] leading-[26px] text-zinc-300">
                  {featured.detail}
                </p>
              </div>

              {/* Tall Portrait Image Right (Figma Rectangle 13: 268px x 481px) */}
              <div className="relative aspect-[268/481] w-full sm:w-[268px] sm:h-[481px] shrink-0 overflow-hidden rounded-[14.5px]">
                <Image
                  key={featured.image}
                  src={featured.image}
                  alt={featured.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, 268px"
                  className="object-cover"
                />
              </div>
            </article>
          ) : (
            <p className="text-base text-zinc-400 py-12 text-center flex-1">
              No gigs match that search.
            </p>
          )}

          {/* 3. Right Selectable Gig List (Figma Group 62: 439px x 516.8px) */}
          <ul className="w-full lg:w-[439px] shrink-0 flex flex-col gap-[10px]">
            {results.slice(0, 3).map((gig, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={gig.title}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={isActive}
                    className={`w-full h-[165.6px] rounded-[15px] bg-[#161616] p-3.5 sm:p-4 text-left transition-all flex items-center gap-4.5 ${
                      isActive
                        ? "border border-[#910870] shadow-lg shadow-purple-950/20"
                        : "border border-transparent hover:bg-[#1c1c1c]"
                    }`}
                  >
                    {/* Thumbnail (Figma Rectangle 15: 158px x 142px) */}
                    <div className="relative w-[140px] sm:w-[158px] h-[130px] sm:h-[142px] shrink-0 overflow-hidden rounded-[15px]">
                      <Image
                        src={gig.image}
                        alt={gig.alt}
                        fill
                        sizes="158px"
                        className="object-cover"
                      />
                    </div>
                    {/* Content (Figma: 229px x 93px) */}
                    <div className="min-w-0 flex-1 text-left">
                      <h4 className="font-sans text-[20px] sm:text-[23px] font-normal leading-[28px] text-white line-clamp-2">
                        {gig.title}
                      </h4>
                      <p className="mt-2 font-sans text-[14px] sm:text-[15px] leading-[22px] text-zinc-400 line-clamp-2">
                        {gig.blurb}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
