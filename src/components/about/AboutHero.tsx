"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { aboutHero, stats, ABOUT_IMG } from "@/lib/about-data";

export default function AboutHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled gracefully
      });
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/BMDJ/About.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/BMDJ/About.mp4" type="video/mp4" />
      </video>
      {/* Light subtle overlay so the silk wave motion is clearly visible */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/20 bg-gradient-to-r from-white/35 via-white/10 to-transparent" />

      {/* Main Hero Content Area */}
      <div className="relative z-10 flex flex-1 items-center py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:gap-12">

            {/* Left Text Column */}
            <div className="max-w-[675px]">
              {/* Headline */}
              <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-normal tracking-tight text-foreground leading-[1.18] sm:leading-[1.2] lg:leading-[60px]">
                {aboutHero.title}
              </h1>

              {/* Blurb */}
              <p className="mt-6 max-w-[540px] font-sans text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] text-muted">
                {aboutHero.blurb}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center gap-3.5 sm:gap-4">
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
            </div>

            {/* Right Photo Display — Staggered Side-by-Side (matching Figma 547px x 362px) */}
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-[547px] lg:justify-self-end">
              {/* Mobile: 2-column staggered grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:hidden items-start">
                <div className="overflow-hidden rounded-[18px] border border-black/5 shadow-md bg-card aspect-[254/283] relative">
                  <Image
                    src={`${ABOUT_IMG}/hero-smiley-laptop.png`}
                    alt="DJ Smiley behind the decks"
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[18px] border border-black/5 shadow-md bg-card aspect-[254/283] relative mt-6">
                  <Image
                    src={`${ABOUT_IMG}/hero-team-club.png`}
                    alt="BMDJ team at event"
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Desktop / Tablet: staggered side-by-side matching Figma coordinates */}
              <div className="hidden sm:block relative w-full aspect-[547/362]">
                {/* Left card (DJ Smiley at decks) - [34682, 5193, 254x283] */}
                <div className="absolute left-0 top-0 w-[46.4%] aspect-[254/283]">
                  <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] overflow-hidden shadow-xl border border-black/5 bg-card">
                    <Image
                      src={`${ABOUT_IMG}/hero-smiley-laptop.png`}
                      alt="DJ Smiley behind the decks"
                      fill
                      priority
                      sizes="(max-width: 1024px) 240px, 260px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Right card (BMDJ team at club) - [34975, 5272, 254x283] */}
                <div className="absolute left-[53.6%] top-[21.8%] w-[46.4%] aspect-[254/283]">
                  <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] overflow-hidden shadow-xl border border-black/5 bg-card">
                    <Image
                      src={`${ABOUT_IMG}/hero-team-club.png`}
                      alt="BMDJ team at event"
                      fill
                      priority
                      sizes="(max-width: 1024px) 240px, 260px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Strip Box */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[996px] rounded-[20px] border border-slate-200/90 bg-white px-6 py-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-10 sm:py-7">
          <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-4 items-center">
            {stats.map((s) => (
              <div key={s.label} className="text-left px-2 sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[26px] sm:text-[32px] lg:text-[34.4px] font-semibold leading-[46px] tracking-[-0.69px] text-foreground">
                    {s.value}
                  </span>
                  <span className="block font-sans text-[12px] sm:text-[15px] lg:text-[17.2px] leading-[23px] tracking-[2.41px] text-muted uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
