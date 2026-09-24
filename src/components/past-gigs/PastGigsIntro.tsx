"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { pastGigsHero, pastGigsQuote } from "@/lib/past-gigs-data";

export default function PastGigsIntro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-background py-10 sm:py-14 lg:pt-16 lg:pb-12 text-foreground">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/BMDJ/Past Gig.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/BMDJ/Past Gig.mp4" type="video/mp4" />
      </video>
      {/* Overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/80 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:gap-12">

          {/* Left Text Column */}
          <div className="max-w-[675px]">
            {/* Title */}
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-normal tracking-tight leading-[1.18] sm:leading-[1.2] lg:leading-[60px] text-foreground">
              {pastGigsHero.title[0]}
              <br className="hidden sm:inline" />{" "}
              {pastGigsHero.title[1]}
            </h1>

            {/* Blurb */}
            <p className="mt-6 sm:mt-8 max-w-[587px] font-sans text-[16px] sm:text-[18px] leading-[25px] text-muted">
              {pastGigsHero.blurb}
            </p>

            {/* Buttons */}
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

          {/* Right Hero Photo (matching Figma 269:774: 439px x 402px) */}
          <div className="relative mx-auto w-full max-w-[440px] lg:justify-self-end">
            <div className="relative w-full aspect-[439/402] rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] overflow-hidden shadow-xl border border-black/5 bg-card">
              <Image
                src="/images/pastgigs/hero-photo.png"
                alt="Two DJs performing behind the decks at an event"
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 440px, 439px"
                className="object-cover"
              />
            </div>
          </div>

        </div>

        {/* Featured Case Study Card */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-[15px] bg-surface shadow-sm border border-hairline">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[419px]">
            {/* Left Media with Play Button */}
            <div
              role="button"
              tabIndex={0}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              onClick={togglePlay}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  togglePlay();
                }
              }}
              className="relative h-[280px] sm:h-[350px] lg:h-full w-full overflow-hidden bg-black group cursor-pointer select-none"
            >
              {pastGigsQuote.video ? (
                <video
                  ref={videoRef}
                  src={pastGigsQuote.video}
                  poster={pastGigsQuote.image}
                  playsInline
                  loop
                  muted={isMuted}
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={pastGigsQuote.image}
                  alt={pastGigsQuote.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}

              {/* Play Button Overlay when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-xs transition-transform hover:scale-110 shadow-xl">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-6 w-6 translate-x-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Floating Controls */}
              {pastGigsQuote.video && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 fill-current translate-x-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right Quote */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-14">
              <blockquote className="max-w-[437px]">
                <p className="font-display text-[18px] sm:text-[20px] font-normal leading-[30px] text-foreground">
                  &ldquo;{pastGigsQuote.quote}&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
