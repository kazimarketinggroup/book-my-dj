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
    <section id="resources" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          Latest Sets &amp; Mixes
        </h2>
        <p className="mt-3 text-sm text-muted">
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
                className={`flex cursor-pointer flex-col gap-4 rounded-[20px] border bg-surface p-3 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-light sm:p-4 lg:flex-row lg:items-center lg:gap-6 ${
                  isActive
                    ? "border-[#d483ff]/50 shadow-[0_0_0_1px_rgba(212,131,255,0.18)]"
                    : "border-hairline hover:border-foreground/25"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-lg sm:w-16">
                    <Image
                      src={mix.cover}
                      alt={mix.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">{mix.artist}</p>
                    <h3 className="mt-1 truncate fluid-body font-medium text-foreground">
                      {mix.title}
                    </h3>
                  </div>
                </div>

                {/* Player */}
                <div className="flex items-center gap-3 rounded-lg bg-surface-3 px-3 py-2.5 lg:w-[34%] lg:shrink-0 2xl:w-[30%]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(i);
                    }}
                    aria-label={`${isPlaying ? "Pause" : "Play"} ${mix.title}`}
                    aria-pressed={isPlaying}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isPlaying
                        ? "btn-brand text-white"
                        : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                    }`}
                  >
                    {isPlaying ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <Waveform
                    className="h-6 min-w-0 flex-1 text-zinc-500"
                    bars={40}
                    playing={isPlaying}
                    progress={progress}
                  />

                  <span className="shrink-0 text-xs text-muted tabular-nums">
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
