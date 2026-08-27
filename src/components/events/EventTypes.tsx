"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { eventRows, EVENTS_IMG } from "@/lib/events-data";
import EventIcon from "@/components/events/EventIcon";

/** Distance from the viewport top where cards pin (clears the sticky navbar). */
const PIN_TOP = 96;
/** Height each pinned card leaves visible behind the one stacking over it. */
const PEEK = 14;
/**
 * Scroll distance between one card pinning and the next. Larger = slower, so
 * there's time to read each card while it's active.
 */
const STEP = 520;
/** Shorter runway after the final card, so the stack doesn't end in a big gap. */
const TAIL = 24;

/** Re-render if the user flips their reduced-motion preference. */
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Scroll-stacking list. Every card is `sticky` at the same offset, so as the
 * page scrolls each one slides up and pins over the previous - the first card
 * ends up at the bottom of the stack. The card nearest the pin line is "active"
 * (photo backdrop, full blurb, Get Quote); card 0 starts active on load.
 *
 * Falls back to a plain static list when the user prefers reduced motion.
 */
export default function EventTypes() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  /**
   * Reduced-motion is read from the DOM rather than held in state, so the
   * stacked layout is applied by CSS on the very first render (no flash) and
   * without a setState-in-effect cascade.
   */
  const stacking = useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  useEffect(() => {
    if (!stacking) return;

    /*
     * The deepest card that has reached its own pin position wins. The
     * threshold must be per-card: every card pins at `PIN_TOP + i * PEEK`, so a
     * single fixed line above the later offsets would leave those cards
     * permanently inactive.
     */
    const onScroll = () => {
      let next = 0;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const pinned = PIN_TOP + i * PEEK;
        if (el.getBoundingClientRect().top <= pinned + 2) next = i;
      });
      setActive(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [stacking]);

  return (
    <section id="event-types" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <ul className={stacking ? "" : "space-y-4"}>
          {eventRows.map((row, i) => {
            const isActive = i === active;
            return (
              <li
                key={row.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={stacking ? "sticky" : ""}
                style={
                  stacking
                    ? {
                        // Each card sits a few px lower so the stack edge shows.
                        top: `${PIN_TOP + i * PEEK}px`,
                        zIndex: i + 1,
                        /*
                         * Scroll runway before the next card pins over this
                         * one. The last card gets a shorter tail: it needs some
                         * room to stay pinned while active (sticky only holds a
                         * child inside its parent's box), but a full STEP would
                         * leave an obvious empty gap below the stack.
                         */
                        marginBottom:
                          i === eventRows.length - 1 ? `${TAIL}px` : `${STEP}px`,
                      }
                    : undefined
                }
              >
                <article
                  data-active={isActive || undefined}
                  className="group relative isolate overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_-8px_30px_rgba(0,0,0,0.35)] transition-colors duration-300 data-active:border-white/12"
                >
                  {/* Photo backdrop - fades in when this card becomes active */}
                  <Image
                    src={`${EVENTS_IMG}/3d-music-related-scene 1.png`}
                    alt=""
                    aria-hidden
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="-z-10 object-cover object-center opacity-0 transition-opacity duration-500 group-data-active:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-black/72 opacity-0 transition-opacity duration-500 group-data-active:opacity-100"
                  />
                  {/* Opaque base so stacked cards never show through each other */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-20 bg-surface"
                  />

                  <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-6">
                    {/* Left: icon, number, title */}
                    <div>
                      <span className="text-foreground transition-colors duration-300 group-data-active:text-white">
                        <EventIcon name={row.icon} />
                      </span>
                      <p className="mt-8 text-[11px] tracking-[0.2em] text-muted transition-colors duration-300 group-data-active:text-zinc-400">
                        {row.no}
                      </p>
                      <h2 className="mt-2 font-display text-lg font-medium text-foreground transition-colors duration-300 group-data-active:text-white sm:text-xl">
                        {row.title}
                      </h2>

                      {/* Get Quote reveals with the rest */}
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-data-active:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <Link
                            href="/contact"
                            className="mt-6 inline-block translate-y-2 rounded-md bg-white px-6 py-2.5 text-xs font-semibold text-black opacity-0 transition-all duration-500 ease-out group-data-active:translate-y-0 group-data-active:opacity-100 hover:bg-zinc-200"
                          >
                            Get Quote
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right: copy */}
                    <div className="lg:pt-1">
                      <p className="text-sm font-medium text-foreground transition-colors duration-300 group-data-active:text-white sm:text-[15px]">
                        {row.headline}
                      </p>

                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-data-active:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-data-active:text-zinc-300">
                            {row.blurb}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={row.href}
                        className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors duration-300 group-data-active:text-white hover:underline"
                      >
                        Learn More
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 transition-transform duration-300 group-data-active:translate-x-1"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
