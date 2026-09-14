"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gigs } from "@/lib/home-data";

export default function PastGigs() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const featured = gigs[active];

  // When active gig changes, pause and reset so it does NOT autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  }, [active]);

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
    <section
      id="past-gigs"
      className="scroll-mt-20 py-10 lg:py-16 bg-background transition-colors duration-200"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
          Our Past Gigs
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Featured panel */}
          <article
            aria-live="polite"
            className="flex flex-col justify-between overflow-hidden rounded-[15px] border border-hairline bg-surface-2 p-6 shadow-xl sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="flex-1 text-left">
              <h3 className="font-sans text-[20px] sm:text-[24px] font-normal leading-[30px] text-foreground">
                {featured.title}
              </h3>
              <p className="mt-4 font-sans text-[14px] sm:text-[16px] leading-[26px] text-muted">
                {featured.detail}
              </p>
            </div>

            {/* Featured Video Player */}
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
              className="relative mt-4 aspect-[289/494] w-full max-w-[260px] shrink-0 overflow-hidden rounded-[15px] sm:mt-0 sm:h-[450px] bg-black group cursor-pointer shadow-lg select-none"
            >
              <video
                ref={videoRef}
                key={featured.video}
                src={featured.video}
                poster={featured.image}
                playsInline
                loop
                muted={isMuted}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
              />

              {/* Play Overlay when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-xs transition-transform hover:scale-110 shadow-xl">
                    <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6 translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Floating Mute/Sound and Play controls */}
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
            </div>
          </article>

          {/* Selectable gig list */}
          <div className="flex flex-col gap-4">
            {gigs.map((gig, i) => {
              const isActive = i === active;
              return (
                <button
                  key={gig.title}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setIsPlaying(false);
                  }}
                  aria-pressed={isActive}
                  className={`flex w-full items-center gap-5 rounded-[15px] border p-4 text-left shadow-sm transition-all cursor-pointer ${
                    isActive
                      ? "border-black ring-1 ring-black bg-surface-2 shadow-md"
                      : "border-hairline bg-surface-2 hover:bg-surface hover:border-black/30"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-[110px] w-[120px] sm:h-[130px] sm:w-[145px] shrink-0 overflow-hidden rounded-[15px]">
                    <Image
                      src={gig.image}
                      alt={gig.alt}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-md">
                          {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="font-sans text-[18px] sm:text-[22px] font-medium leading-tight text-foreground">
                      {gig.title}
                    </h3>
                    <p className="mt-2 font-sans text-[14px] sm:text-[15px] leading-snug text-muted">
                      {gig.blurb}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
