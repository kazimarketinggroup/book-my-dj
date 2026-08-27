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
    <section id="events" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] py-10 lg:py-14">
        <div className="px-5 sm:px-8 lg:px-12 2xl:px-16">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <h2 className="font-display fluid-h2 font-semibold text-foreground">
              Events We Cover
            </h2>
            <Link
              href="/events"
              className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light"
            >
              See All Events
            </Link>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Wherever the event, whatever the brief, we&apos;ve got a DJ for it.
          </p>
        </div>

        <ul
          ref={trackRef}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocusCapture={() => (paused.current = true)}
          onBlurCapture={() => (paused.current = false)}
          className="no-scrollbar mt-8 flex gap-4 scroll-pl-5 overflow-x-auto px-5 pb-2 sm:scroll-pl-8 sm:px-8 lg:scroll-pl-12 lg:px-12 2xl:scroll-pl-16 2xl:px-16"
        >
          {eventCategories.map((event) => (
            <li
              key={event.title}
              className="group relative w-[72%] shrink-0 transition-[width] duration-500 ease-out hover:w-[82%] sm:w-[46%] sm:hover:w-[52%] md:w-[36%] md:hover:w-[42%] lg:w-[27%] lg:hover:w-[32%] xl:w-[21%] xl:hover:w-[26%] 2xl:w-[17%] 2xl:hover:w-[22%]"
            >
              {/*
                Text sits over the image. The whole block slides up on hover to
                make room for the button, which fades in from below.
              */}
              <article className="relative h-90 overflow-hidden rounded-2xl border border-hairline sm:h-100 lg:h-105">
                <Image
                  src={event.image}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 22vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                    {event.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {event.blurb}
                  </p>

                  <Link
                    href={event.href}
                    tabIndex={-1}
                    className="btn-brand mt-3 inline-block translate-y-3 rounded-md px-6 py-2.5 text-xs font-semibold text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  >
                    Get Quote
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Pagination dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: PAGES }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
