"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { mixes as defaultMixes, type Mix } from "@/lib/home-data";
import Waveform from "@/components/ui/Waveform";

/** "2:28:15" -> seconds */
function toSeconds(hms: string) {
  const parts = hms.split(":").map(Number);
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

export default function LatestMixes({ mixes = defaultMixes }: { mixes?: Mix[] } = {}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<number | null>(null);

  // Depend on the duration string, not the array identity: a caller passing an
  // inline array would otherwise restart the clock on every render.
  const playingDuration = playing === null ? "" : mixes[playing].duration;

  // Simulated playback clock - there are no real audio files wired up yet.
  useEffect(() => {
    if (playing === null) return;
    const total = toSeconds(playingDuration);
    timer.current = window.setInterval(() => {
      setElapsed((e) => (e + 1 >= total ? 0 : e + 1));
    }, 1000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, playingDuration]);

  const select = (i: number) => {
    setActive(i);
    if (playing !== null && playing !== i) {
      setPlaying(null);
      setElapsed(0);
    }
  };

  const togglePlay = (i: number) => {
    setActive(i);
    if (playing === i) {
      setPlaying(null);
    } else {
      setPlaying(i);
      setElapsed(0);
    }
  };

  const clock = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
  };

  return (
    <section id="resources" className="scroll-mt-20 py-12 lg:py-16 bg-background transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
          Latest Sets &amp; Mixes
        </h2>
        <p className="mt-2 font-sans text-[16px] sm:text-[18px] leading-[25px] text-muted">
          Hear the sound before you book it.
        </p>

        <ul className="mt-8 space-y-4">
          {mixes.map((mix, i) => {
            const isActive = i === active;
            const isPlaying = playing === i;
            const total = toSeconds(mix.duration);
            const progress = isPlaying ? elapsed / total : 0;

            return (
              <li
                key={mix.title}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(i);
                  }
                }}
                className={`flex cursor-pointer flex-col gap-4 rounded-[15px] border border-hairline bg-surface-2 p-4 transition-all outline-none sm:p-5 lg:flex-row lg:items-center lg:gap-6 shadow-sm hover:shadow-md ${
                  isActive
                    ? "ring-2 ring-brand shadow-lg shadow-brand/20"
                    : "hover:bg-surface"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-5">
                  {/* Thumbnail: Rectangle 25 in Figma: 110px x 108px, rounded 15px */}
                  <div className="relative h-[80px] w-[80px] sm:h-[108px] sm:w-[110px] shrink-0 overflow-hidden rounded-[15px]">
                    <Image
                      src={mix.cover}
                      alt={mix.alt}
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[16px] sm:text-[18px] font-normal text-muted">
                      {mix.artist}
                    </p>
                    <h3 className="mt-1 font-display text-[16px] sm:text-[20px] font-medium text-foreground truncate">
                      {mix.title}
                    </h3>
                  </div>
                </div>

                {/* Player Capsule (Figma: 405px x 64px, rounded 10px, gradient) */}
                <div className="flex h-[64px] items-center gap-4 rounded-[10px] border border-hairline bg-surface/80 px-4 sm:px-5 lg:w-[405px] lg:shrink-0 shadow-inner">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(i);
                    }}
                    aria-label={`${isPlaying ? "Pause" : "Play"} ${mix.title}`}
                    aria-pressed={isPlaying}
                    className="flex h-7 w-7 shrink-0 items-center justify-center text-foreground transition-transform hover:scale-110 active:scale-95"
                  >
                    {isPlaying ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <Waveform
                    className="h-6 min-w-0 flex-1 text-brand dark:text-brand-light"
                    bars={36}
                    playing={isPlaying}
                    progress={progress}
                  />

                  <span className="shrink-0 font-sans text-[16px] font-normal text-foreground tabular-nums">
                    {isPlaying ? clock(elapsed) : mix.duration}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
