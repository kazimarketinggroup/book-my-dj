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
    <section id="event-types" className="scroll-mt-20 py-12 lg:py-16 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <ul className={stacking ? "" : "space-y-6"}>
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
                        marginBottom:
                          i === eventRows.length - 1 ? `${TAIL}px` : `${STEP}px`,
                      }
                    : undefined
                }
              >
                <article
                  data-active={isActive || undefined}
                  className="group relative isolate overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(36,36,36,0.5)] shadow-2xl backdrop-blur-md transition-all duration-300"
                >
                  {/* Photo backdrop - crowd silhouette from Figma */}
                  <Image
                    src={`${EVENTS_IMG}/3d-music-related-scene 1.png`}
                    alt=""
                    aria-hidden
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className="-z-10 object-cover object-center opacity-30 mix-blend-luminosity"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/85"
                  />

                  <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12 lg:p-12 items-center">
                    {/* Left: icon, number, title, Book My DJ button */}
                    <div>
                      <div className="text-white">
                        <EventIcon name={row.icon} />
                      </div>
                      <p className="mt-6 font-mono text-[13px] sm:text-[14px] text-zinc-400">
                        {row.no}
                      </p>
                      <h3 className="mt-2 font-display text-[28px] sm:text-[34px] lg:text-[38px] font-normal leading-tight text-white">
                        {row.title}
                      </h3>

                      <Link
                        href="/contact"
                        className="mt-8 inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-[#E5E5E5] font-display text-[16px] font-medium text-black transition-colors hover:bg-white shadow-md"
                      >
                        Book My DJ
                      </Link>
                    </div>

                    {/* Right: headline, blurb, Learn More link */}
                    <div>
                      <h4 className="font-sans text-[18px] sm:text-[20px] lg:text-[22px] font-normal leading-[28px] sm:leading-[32px] text-white">
                        {row.headline}
                      </h4>

                      <p className="mt-4 font-sans text-[15px] sm:text-[16px] leading-[26px] text-[#ACA9B3] max-w-[500px]">
                        {row.blurb}
                      </p>

                      <Link
                        href={row.href}
                        className="mt-6 inline-flex items-center gap-1.5 font-sans text-[15px] sm:text-[16px] font-normal text-white transition-opacity hover:opacity-80"
                      >
                        <span>Learn More</span>
                        <span aria-hidden>&rarr;</span>
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
