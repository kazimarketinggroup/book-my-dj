"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const genreRow1 = [
  "Multi-genre",
  "Commercial",
  "Party Anthems",
  "Motown",
  "Soul",
  "Old School R&B",
  "R&B",
  "Hip-Hop",
];

const genreRow2 = [
  "Bashment / Reggae",
  "House",
  "Afrobeats",
  "Funky",
  "Garage",
];

export default function DjsHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
      });
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/BMDJ/list-of-dj.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/BMDJ/list-of-dj.mp4" type="video/mp4" />
        <source src="/videos/BMDJ/List%20of%20DJ.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay so the moving white wave lines remain clearly visible */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/20 backdrop-blur-[0.5px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">

          {/* Script Title ("Our Djs") */}
          <p className="font-signature text-[54px] sm:text-[68px] md:text-[78px] leading-[1] text-foreground select-none">
            Our Djs
          </p>

          {/* Main Display Headline */}
          <h1 className="mt-1 font-display text-[32px] sm:text-[44px] md:text-[50px] font-normal leading-[1.18] sm:leading-[1.2] text-foreground tracking-tight max-w-[620px]">
            One roster, every sound you need
          </h1>

          {/* Subtitle Blurb */}
          <p className="mt-4 sm:mt-5 max-w-[560px] font-sans text-[15px] sm:text-[17px] leading-[26px] sm:leading-[28px] text-muted">
            From multi-genre party anthems to house, bashment, afrobeats and
            Punjabi we match the DJ to your crowd, your city and your brief.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/contact"
              className="flex h-[42px] w-[150px] sm:w-[170px] items-center justify-center rounded-[5px] bg-black font-display text-[15px] sm:text-[16px] font-medium text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
            >
              Book My DJ
            </Link>
            <Link
              href="/events"
              className="flex h-[42px] w-[150px] sm:w-[170px] items-center justify-center rounded-[5px] border border-black bg-white font-display text-[15px] sm:text-[16px] font-medium text-black transition-all hover:bg-zinc-50 active:scale-[0.98]"
            >
              Our Events
            </Link>
          </div>

          {/* Genre Badges / Filter Pills matching Figma Group 35792 & 35793 */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center gap-2.5 sm:gap-3 w-full max-w-[980px]">
            {/* Row 1 */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {genreRow1.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#1a1a1a] px-3.5 sm:px-4 py-1.5 font-sans text-[13px] sm:text-[14px] font-normal text-white shadow-xs transition-colors hover:bg-black select-none"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {genreRow2.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center justify-center rounded-[6px] bg-[#1a1a1a] px-3.5 sm:px-4 py-1.5 font-sans text-[13px] sm:text-[14px] font-normal text-white shadow-xs transition-colors hover:bg-black select-none"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
