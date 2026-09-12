"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { eventCategories } from "@/lib/home-data";

const PAGES = 7;
/** px per second the track drifts when idle. */
const SPEED = 40;

export default function EventsWeCover() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  /** Set while a click-scroll animation runs, so the drift doesn't fight it. */
  const seeking = useRef(false);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(ratio * (PAGES - 1)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Continuous drift. Wraps back to the start on reaching the end.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!paused.current && !seeking.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          const next = el.scrollLeft + SPEED * dt;
          el.scrollLeft = next >= max - 1 ? 0 : next;
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    seeking.current = true;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (PAGES - 1)) * max, behavior: "smooth" });
    window.setTimeout(() => {
      seeking.current = false;
    }, 600);
  };

  return (
    <section id="events" className="scroll-mt-20 py-12 lg:py-16 bg-background transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
                Events We Cover
              </h2>
              <p className="mt-2 font-sans text-[16px] sm:text-[18px] leading-[25px] text-muted">
                Wherever the event, whatever the brief, we&apos;ve got a DJ for it.
              </p>
            </div>
            <Link
              href="/events"
              className="flex h-[41px] items-center justify-center rounded-[6.5px] bg-gradient-to-r from-[#24081e] via-[#520577] to-[#910870] px-6 font-display text-[15px] font-medium text-white shadow-lg transition-opacity hover:opacity-90"
            >
              See All Events
            </Link>
          </div>
        </div>

        <ul
          ref={trackRef}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocusCapture={() => (paused.current = true)}
          onBlurCapture={() => (paused.current = false)}
          className="no-scrollbar mt-10 flex gap-6 scroll-pl-6 overflow-x-auto px-6 pb-4 sm:scroll-pl-10 sm:px-10 lg:scroll-pl-16 lg:px-16"
        >
          {eventCategories.map((event, i) => (
            <li
              key={event.title}
              className={`shrink-0 transition-all duration-300 ${
                i === 0
                  ? "w-[340px] sm:w-[420px] lg:w-[452px]"
                  : "w-[260px] sm:w-[280px] lg:w-[294px]"
              }`}
            >
              <article className="group relative h-[452px] w-full overflow-hidden rounded-[15px] border border-hairline bg-card shadow-2xl">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 640px) 300px, 452px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient from Figma: linear-gradient(0deg, #000000 70.67%, rgba(0, 0, 0, 0) 100%) */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-black via-black/80 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display text-[22px] sm:text-[25px] font-medium leading-[35px] text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 font-sans text-[15px] sm:text-[18px] leading-[26px] text-white/90">
                    {event.blurb}
                  </p>

                  <Link
                    href={event.href}
                    className="mt-5 inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#24081E] via-[#520577] to-[#910870] font-display text-[16px] font-medium text-white shadow-lg transition-all hover:brightness-110"
                  >
                    Book My DJ
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Pagination indicator matching Figma Group 71 Tablist */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {Array.from({ length: PAGES }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? "h-2 w-8 bg-foreground"
                  : "h-2 w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
