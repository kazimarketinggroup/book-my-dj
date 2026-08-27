"use client";

import { useState } from "react";
import Image from "next/image";
import type { EventDetail } from "@/lib/event-detail-data";

export default function DetailHero({ detail }: { detail: EventDetail }) {
  const [sent, setSent] = useState(false);
  const { hero, title } = detail;

  return (
    <section className="hero-screen relative isolate overflow-hidden">
      <Image
        src={hero.image}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/45" />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20 2xl:px-16">
        <h1 className="font-display fluid-hero font-semibold text-white">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-xl fluid-body text-zinc-200">
          {hero.headline}
        </p>

        <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-zinc-400 sm:text-sm">
          {hero.blurb[0]}
          <br className="hidden sm:block" /> {hero.blurb[1]}
        </p>

        {/* Postcode quick-quote */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <label htmlFor="detail-postcode" className="sr-only">
              Your postcode
            </label>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="currentColor"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            <input
              id="detail-postcode"
              name="postcode"
              required
              placeholder="Your Postcode"
              className="field-motion h-11 w-full rounded-lg border border-white/15 bg-black/50 pr-3 pl-9 text-sm text-white placeholder:text-zinc-400 outline-none backdrop-blur focus:border-brand-light focus:ring-1 focus:ring-brand-light"
            />
          </div>
          <button
            type="submit"
            className="btn-brand h-11 shrink-0 rounded-lg px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
          >
            Book My DJ
          </button>
        </form>

        <p className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-300">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-3.5 w-3.5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" strokeLinecap="round" />
          </svg>
          Takes 2-3 mins
        </p>

        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-xs text-white transition-opacity duration-300 ${
            sent ? "opacity-100" : "opacity-0"
          }`}
        >
          {sent
            ? "Thanks, we'll check availability for that area and come back to you."
            : " "}
        </p>
      </div>
    </section>
  );
}
