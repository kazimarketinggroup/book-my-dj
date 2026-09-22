"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HeroCard } from "@/lib/home-data";

type HeroCardItemProps = {
  card: HeroCard;
  aspectClass: string;
  sizes: string;
  priority?: boolean;
  borderClass?: string;
  shapeRoundedClass?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function HeroCardItem({
  card,
  aspectClass,
  sizes,
  priority = false,
  borderClass = "border border-hairline",
  shapeRoundedClass = "rounded-[16.6px]",
  className = "",
  children,
}: HeroCardItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be prevented if unmuted or policy blocks
      });
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${card.title}: ${isPlaying ? "Pause preview video" : "Play preview video"}`}
      onMouseEnter={startPlayback}
      onMouseLeave={stopPlayback}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      className={`group cursor-pointer select-none outline-none ${className}`}
    >
      {/* Video & Image Shape Container */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden ${shapeRoundedClass} ${borderClass} shadow-md shadow-black/10 bg-zinc-950 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.015]`}
      >
        {/* Still Image: Always rendered and sticks underneath */}
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Video: Plays inside the shape on hover or click */}
        {card.video && (
          <video
            ref={videoRef}
            src={card.video}
            playsInline
            muted
            loop
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Subtle Preview / Live Status Badge in Shape Corner */}
        <div
          className={`absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 rounded-full px-2.5 py-1 backdrop-blur-md transition-all duration-300 ${
            isPlaying
              ? "bg-black/75 text-[#FE396C] border border-[#FE396C]/40 shadow-lg shadow-[#FE396C]/20 opacity-100"
              : "bg-black/50 text-white/90 border border-white/20 opacity-0 group-hover:opacity-100"
          }`}
        >
          {isPlaying ? (
            <>
              <span className="flex items-end gap-[2px] h-3 w-3" aria-hidden="true">
                <span className="w-[2.5px] h-3 bg-[#FE396C] rounded-full animate-pulse" />
                <span className="w-[2.5px] h-1.5 bg-[#FE396C] rounded-full animate-pulse [animation-delay:150ms]" />
                <span className="w-[2.5px] h-3.5 bg-[#FE396C] rounded-full animate-pulse [animation-delay:300ms]" />
              </span>
              <span className="text-[9px] font-semibold text-white uppercase tracking-wider">Live</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-[9px] font-medium text-white/90 uppercase tracking-wider">Play</span>
            </>
          )}
        </div>
      </div>

      {/* External Badge or extra elements passed as children */}
      {children}
    </div>
  );
}
