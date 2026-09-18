"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  mixes as defaultMixes,
  djSmileySoundCloudUrl,
  djLukeLuizMixcloudUrl,
  type Mix,
} from "@/lib/home-data";
import type { DjProfile } from "@/lib/dj-data";
import Waveform from "@/components/ui/Waveform";

declare global {
  interface Window {
    SC?: {
      Widget: {
        (element: HTMLIFrameElement | string): {
          bind: (event: string, callback: (data?: any) => void) => void;
          unbind: (event: string) => void;
          load: (url: string, options?: any) => void;
          play: () => void;
          pause: () => void;
          toggle: () => void;
          seekTo: (ms: number) => void;
          setVolume: (volume: number) => void;
          getDuration: (callback: (duration: number) => void) => void;
          getPosition: (callback: (position: number) => void) => void;
          isPaused: (callback: (paused: boolean) => void) => void;
        };
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          SEEK: string;
          PLAY_PROGRESS: string;
          LOAD_PROGRESS: string;
          ERROR: string;
        };
      };
    };
    Mixcloud?: {
      PlayerWidget: (element: HTMLIFrameElement) => {
        ready: Promise<any>;
        play: () => Promise<void>;
        pause: () => Promise<void>;
        togglePlay: () => Promise<void>;
        load: (key: string, startPlaying?: boolean) => Promise<void>;
        seek: (seconds: number) => Promise<void>;
        events: {
          play: { on: (cb: () => void) => void };
          pause: { on: (cb: () => void) => void };
          ended: { on: (cb: () => void) => void };
          progress: { on: (cb: (pos: number, dur: number) => void) => void };
          buffering: { on: (cb: () => void) => void };
          error: { on: (cb: (err: any) => void) => void };
        };
      };
    };
  }
}

function SoundCloudIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.56 8.87V17h8.17c1.8 0 3.27-1.42 3.27-3.17 0-1.7-1.35-3.08-3.04-3.16-.27-2.68-2.58-4.76-5.4-4.76-1.12 0-2.16.33-3 0.96zm-1.8 1.48v6.65h.9V9.92a4.4 4.4 0 00-.9.43zm-1.8 1.05v5.6h.9v-5.78c-.32.05-.62.11-.9.18zm-1.8.44v5.16h.9v-5.32c-.32.04-.63.1-.9.16zm-1.8.27v4.89h.9v-5.03c-.32.04-.62.09-.9.14zm-1.8.5v4.39h.9v-4.52a6.3 6.3 0 00-.9.13zm-1.8 1.2v3.19h.9v-3.3c-.32.03-.62.06-.9.11zm-1.8 1.5v1.69h.9v-1.78c-.32.02-.62.05-.9.09z" />
    </svg>
  );
}

function MixcloudIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2.462 8.596l1.372 6.49h.319l1.372-6.49h2.462v6.808H6.742v-5.68l.232-.81h-.402l-1.43 6.49H2.854l-1.44-6.49h-.391l.222.81v5.68H0V8.596zM24 8.63v1.429L21.257 12 24 13.941v1.43l-3.235-2.329h-.348l-3.226 2.329v-1.43l2.734-1.94-2.733-1.942V8.63l3.225 2.338h.348zm-7.869 2.75v1.24H9.304v-1.24z" />
    </svg>
  );
}

/** "2:28:15" or "55:08" -> seconds */
function toSeconds(hms: string) {
  const parts = hms.split(":").map(Number);
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

export default function LatestMixes({
  mixes = defaultMixes,
  dj,
}: {
  mixes?: Mix[];
  dj?: DjProfile;
} = {}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);

  // Determine if this DJ/section uses Mixcloud or SoundCloud
  const isMixcloud =
    dj?.slug === "luke" ||
    mixes.some((m) => Boolean(m.mixcloudKey || m.mixcloudUrl));

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<any>(null);
  const isWidgetReadyRef = useRef(false);

  const mixcloudIframeRef = useRef<HTMLIFrameElement | null>(null);
  const mixcloudWidgetRef = useRef<any>(null);
  const isMixcloudWidgetReadyRef = useRef(false);

  const pendingPlayIndex = useRef<number | null>(null);

  // Active or playing track
  const currentTrackIndex = playing !== null ? playing : active;
  const currentMix = mixes[currentTrackIndex] || mixes[0];
  const initialUrl =
    mixes[0]?.soundCloudUrl ||
    "https://soundcloud.com/d-jsmiley/tree-house-promo-mix-vocal-house-chilled-anthems-classics";

  const initialMixcloudKey =
    mixes[0]?.mixcloudKey ||
    "/DJLUKELUIZ/the-jamhouse-sunday-funday-promo-mix-010821/";

  const profileUrl = isMixcloud
    ? djLukeLuizMixcloudUrl
    : djSmileySoundCloudUrl;
  const badgeLabel = isMixcloud ? "Luke Luiz Mixcloud" : "DJ Smiley SoundCloud";
  const platformName = isMixcloud ? "Mixcloud" : "SoundCloud";

  // Clock format
  const clock = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
  };

  const attachSoundCloudEvents = useCallback((widget: any) => {
    if (!window.SC?.Widget?.Events) return;
    const Events = window.SC.Widget.Events;

    widget.bind(Events.READY, () => {
      isWidgetReadyRef.current = true;
      if (pendingPlayIndex.current !== null) {
        const idx = pendingPlayIndex.current;
        pendingPlayIndex.current = null;
        const target = mixes[idx];
        if (target?.soundCloudUrl) {
          widget.load(target.soundCloudUrl, {
            auto_play: true,
            callback: () => {
              setIsBuffering(false);
              setIsPlaying(true);
            },
          });
        }
      }
    });

    widget.bind(Events.PLAY, () => {
      setIsPlaying(true);
      setIsBuffering(false);
    });

    widget.bind(Events.PAUSE, () => {
      setIsPlaying(false);
    });

    widget.bind(
      Events.PLAY_PROGRESS,
      (data: { currentPosition: number; relativePosition: number }) => {
        if (data && typeof data.currentPosition === "number") {
          setElapsed(Math.floor(data.currentPosition / 1000));
          setProgress(data.relativePosition || 0);
        }
      }
    );

    widget.bind(Events.FINISH, () => {
      setIsPlaying(false);
      setPlaying(null);
      setElapsed(0);
      setProgress(0);
    });

    widget.bind(Events.ERROR, () => {
      setIsBuffering(false);
    });
  }, [mixes]);

  // Load the appropriate player Widget API script
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isMixcloud) {
      const initMixcloud = () => {
        if (mixcloudIframeRef.current && window.Mixcloud?.PlayerWidget) {
          try {
            const mcWidget = window.Mixcloud.PlayerWidget(mixcloudIframeRef.current);
            mcWidget.ready.then(() => {
              isMixcloudWidgetReadyRef.current = true;
              mixcloudWidgetRef.current = mcWidget;
              if (pendingPlayIndex.current !== null) {
                const idx = pendingPlayIndex.current;
                pendingPlayIndex.current = null;
                const target = mixes[idx];
                const key = target?.mixcloudKey || target?.mixcloudUrl;
                if (key) {
                  mcWidget.load(key, true).then(() => {
                    setIsBuffering(false);
                    setIsPlaying(true);
                  });
                }
              }
            });

            mcWidget.events.play.on(() => {
              setIsPlaying(true);
              setIsBuffering(false);
            });

            mcWidget.events.pause.on(() => {
              setIsPlaying(false);
            });

            mcWidget.events.ended.on(() => {
              setIsPlaying(false);
              setPlaying(null);
              setElapsed(0);
              setProgress(0);
            });

            mcWidget.events.progress.on((pos: number, dur: number) => {
              if (typeof pos === "number") {
                setElapsed(Math.floor(pos));
                if (dur > 0) setProgress(pos / dur);
              }
            });

            mcWidget.events.buffering.on(() => {
              setIsBuffering(true);
            });

            mcWidget.events.error.on(() => {
              setIsBuffering(false);
            });
          } catch {
            // ignore initialization error
          }
        }
      };

      if (window.Mixcloud?.PlayerWidget) {
        initMixcloud();
        return;
      }

      const scriptSrc = "https://widget.mixcloud.com/media/js/widgetApi.js";
      let script = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = () => initMixcloud();
        document.body.appendChild(script);
      } else {
        script.addEventListener("load", initMixcloud);
      }

      return () => {
        if (script) {
          script.removeEventListener("load", initMixcloud);
        }
      };
    }

    // Otherwise SoundCloud
    const initSoundCloud = () => {
      if (iframeRef.current && window.SC?.Widget) {
        try {
          const widget = window.SC.Widget(iframeRef.current);
          widgetRef.current = widget;
          attachSoundCloudEvents(widget);
        } catch {
          // ignore initialization error
        }
      }
    };

    if (window.SC?.Widget) {
      initSoundCloud();
      return;
    }

    const scriptSrc = "https://w.soundcloud.com/player/api.js";
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${scriptSrc}"]`
    );
    if (!script) {
      script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => initSoundCloud();
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", initSoundCloud);
    }

    return () => {
      if (script) {
        script.removeEventListener("load", initSoundCloud);
      }
    };
  }, [isMixcloud, attachSoundCloudEvents, mixes]);

  const select = (i: number) => {
    setActive(i);
  };

  const togglePlay = (i: number) => {
    setActive(i);
    const targetMix = mixes[i];
    if (!targetMix) return;

    if (isMixcloud) {
      // Pausing current track
      if (playing === i && isPlaying) {
        mixcloudWidgetRef.current?.pause();
        setIsPlaying(false);
        return;
      }

      // Resuming current track
      if (playing === i && !isPlaying) {
        mixcloudWidgetRef.current?.play();
        setIsPlaying(true);
        return;
      }

      // Switching to a new track
      setPlaying(i);
      setElapsed(0);
      setProgress(0);
      setIsBuffering(true);
      setShowMiniPlayer(true);

      const targetKey = targetMix.mixcloudKey || targetMix.mixcloudUrl;
      if (isMixcloudWidgetReadyRef.current && mixcloudWidgetRef.current && targetKey) {
        mixcloudWidgetRef.current
          .load(targetKey, true)
          .then(() => {
            setIsBuffering(false);
            setIsPlaying(true);
          })
          .catch(() => {
            setIsBuffering(false);
          });
      } else {
        pendingPlayIndex.current = i;
      }
      return;
    }

    // Pausing the current track (SoundCloud)
    if (playing === i && isPlaying) {
      widgetRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    // Resuming the current track (SoundCloud)
    if (playing === i && !isPlaying) {
      widgetRef.current?.play();
      setIsPlaying(true);
      return;
    }

    // Switching to a new track (SoundCloud)
    setPlaying(i);
    setElapsed(0);
    setProgress(0);
    setIsBuffering(true);
    setShowMiniPlayer(true);

    if (isWidgetReadyRef.current && widgetRef.current) {
      const targetUrl = targetMix.soundCloudUrl || djSmileySoundCloudUrl;
      widgetRef.current.load(targetUrl, {
        auto_play: true,
        callback: () => {
          setIsBuffering(false);
          setIsPlaying(true);
        },
      });
    } else {
      pendingPlayIndex.current = i;
    }
  };

  const handleSeek = (ratio: number, mixIndex: number) => {
    const targetMix = mixes[mixIndex];
    if (!targetMix) return;
    const total = toSeconds(targetMix.duration);

    if (isMixcloud) {
      const targetSec = Math.round(ratio * total);
      setElapsed(targetSec);
      setProgress(ratio);

      if (playing === mixIndex && mixcloudWidgetRef.current) {
        mixcloudWidgetRef.current.seek(targetSec);
      } else {
        setActive(mixIndex);
        setPlaying(mixIndex);
        setIsBuffering(true);
        setShowMiniPlayer(true);

        const targetKey = targetMix.mixcloudKey || targetMix.mixcloudUrl;
        if (isMixcloudWidgetReadyRef.current && mixcloudWidgetRef.current && targetKey) {
          mixcloudWidgetRef.current.load(targetKey, true).then(() => {
            mixcloudWidgetRef.current?.seek(targetSec);
            setIsBuffering(false);
            setIsPlaying(true);
          });
        }
      }
      return;
    }

    const targetMs = Math.round(ratio * total * 1000);
    setElapsed(Math.round(ratio * total));
    setProgress(ratio);

    if (playing === mixIndex && widgetRef.current) {
      widgetRef.current.seekTo(targetMs);
    } else {
      setActive(mixIndex);
      setPlaying(mixIndex);
      setIsBuffering(true);
      setShowMiniPlayer(true);

      const targetUrl = targetMix.soundCloudUrl || djSmileySoundCloudUrl;
      if (isWidgetReadyRef.current && widgetRef.current) {
        widgetRef.current.load(targetUrl, {
          auto_play: true,
          callback: () => {
            widgetRef.current?.seekTo(targetMs);
            setIsBuffering(false);
            setIsPlaying(true);
          },
        });
      }
    }
  };

  return (
    <section
      id="resources"
      className="scroll-mt-20 py-12 lg:py-16 bg-background transition-colors duration-200 relative"
    >
      {/* Managed Player Widget iframes (mounted off-screen for audio playback) */}
      {isMixcloud ? (
        <div
          className="absolute -top-[9999px] -left-[9999px] w-[300px] h-[60px] opacity-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <iframe
            ref={mixcloudIframeRef}
            id="mc-widget-player"
            title="Mixcloud Player"
            allow="autoplay; encrypted-media"
            src={`https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
              initialMixcloudKey
            )}&hide_cover=1&mini=1&light=1&autoplay=false`}
            className="w-full h-[60px]"
          />
        </div>
      ) : (
        <div
          className="absolute -top-[9999px] -left-[9999px] w-[300px] h-[166px] opacity-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <iframe
            ref={iframeRef}
            id="sc-widget-player"
            title="DJ Smiley SoundCloud Player"
            allow="autoplay; encrypted-media"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
              currentMix?.soundCloudUrl || initialUrl
            )}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
            className="w-full h-[166px]"
          />
        </div>
      )}

      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header with Profile link & badge */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${badgeLabel} profile`}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all group ${
                  isMixcloud
                    ? "bg-[#5000ff]/10 text-[#5000ff] border border-[#5000ff]/25 hover:bg-[#5000ff]/20 dark:text-[#8a60ff] dark:border-[#8a60ff]/30"
                    : "bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/25 hover:bg-[#ff5500]/20"
                }`}
              >
                {isMixcloud ? (
                  <MixcloudIcon className="w-4 h-4 fill-current shrink-0" />
                ) : (
                  <SoundCloudIcon className="w-4 h-4 fill-current text-[#ff5500] shrink-0" />
                )}
                <span>{badgeLabel}</span>
                <svg
                  className={`w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
                    isMixcloud ? "text-[#5000ff] dark:text-[#8a60ff]" : "text-[#ff5500]"
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {isPlaying && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand/10 text-brand border border-brand/20 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-ping" />
                  Playing Audio
                </span>
              )}
            </div>

            <h2 className="font-display text-[32px] sm:text-[40px] font-normal leading-[46px] text-foreground">
              Latest Sets &amp; Mixes
            </h2>
            <p className="mt-2 font-sans text-[16px] sm:text-[18px] leading-[25px] text-muted">
              Hear the sound before you book it. Real sets streamed directly from {platformName}.
            </p>
          </div>
        </div>

        {/* Mixes List */}
        <ul className="mt-8 space-y-4">
          {mixes.map((mix, i) => {
            const isActive = i === active;
            const isCurrentlyPlaying = playing === i && isPlaying;
            const isCurrentBuffering = playing === i && isBuffering;
            const trackProgress = playing === i ? progress : 0;
            const totalSec = toSeconds(mix.duration);

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
                    ? "ring-2 ring-brand shadow-lg shadow-brand/20 bg-surface"
                    : "hover:bg-surface"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
                  {/* Thumbnail */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(i);
                    }}
                    className="group/thumb relative h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] shrink-0 overflow-hidden rounded-[15px] cursor-pointer bg-surface"
                  >
                    <Image
                      src={mix.cover}
                      alt={mix.alt}
                      fill
                      sizes="110px"
                      className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                    />
                    {/* Play hover overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                        isCurrentlyPlaying
                          ? "opacity-100"
                          : "opacity-0 group-hover/thumb:opacity-100"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-foreground shadow-lg">
                        {isCurrentlyPlaying ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 translate-x-0.5"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-[15px] sm:text-[17px] font-normal text-muted">
                        {mix.artist}
                      </p>
                      {mix.genre && (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-hairline text-muted">
                          #{mix.genre}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 font-display text-[16px] sm:text-[19px] font-medium text-foreground line-clamp-2 sm:truncate">
                      {mix.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3">
                      {mix.mixcloudUrl && (
                        <a
                          href={mix.mixcloudUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[12px] text-[#5000ff] dark:text-[#8a60ff] hover:underline font-medium"
                        >
                          <MixcloudIcon className="w-3.5 h-3.5 fill-current" />
                          <span>Mixcloud</span>
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      )}

                      {mix.soundCloudUrl && (
                        <a
                          href={mix.soundCloudUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[12px] text-[#ff5500] hover:underline"
                        >
                          <SoundCloudIcon className="w-3.5 h-3.5 fill-current" />
                          <span>SoundCloud</span>
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Player Capsule (Figma: 405px x 64px, rounded 10px, gradient) */}
                <div className="flex h-[64px] items-center gap-3 sm:gap-4 rounded-[10px] border border-hairline bg-surface/90 px-4 sm:px-5 lg:w-[420px] lg:shrink-0 shadow-inner">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(i);
                    }}
                    aria-label={`${
                      isCurrentlyPlaying ? "Pause" : "Play"
                    } ${mix.title}`}
                    aria-pressed={isCurrentlyPlaying}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-foreground hover:bg-brand/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {isCurrentBuffering ? (
                      <div className="h-4 w-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    ) : isCurrentlyPlaying ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 fill-current text-brand"
                      >
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                      </svg>
                    ) : (
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 fill-current text-brand translate-x-0.5"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="min-w-0 flex-1 flex flex-col justify-center">
                    <Waveform
                      className="h-6 w-full text-brand"
                      bars={36}
                      playing={isCurrentlyPlaying}
                      progress={trackProgress}
                      onSeek={(ratio) => handleSeek(ratio, i)}
                    />
                  </div>

                  <span className="shrink-0 font-sans text-[14px] sm:text-[15px] font-normal text-foreground tabular-nums">
                    {playing === i && (isPlaying || elapsed > 0)
                      ? `${clock(elapsed)} / ${clock(totalSec)}`
                      : mix.duration}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Bottom Listen More Link Button */}
        <div className="mt-10 flex justify-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-[12px] bg-surface-2 hover:bg-surface border border-hairline text-sm sm:text-base font-semibold text-foreground hover:border-brand/40 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {isMixcloud ? (
              <MixcloudIcon className="w-5 h-5 fill-[#5000ff] dark:fill-[#8a60ff] shrink-0 transition-transform group-hover:scale-110" />
            ) : (
              <SoundCloudIcon className="w-5 h-5 fill-[#ff5500] shrink-0 transition-transform group-hover:scale-110" />
            )}
            <span>{isMixcloud ? "Listen more on Mixcloud" : "Listen more"}</span>
            <svg
              className="w-4 h-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Floating "Now Playing" bar when audio is actively playing */}
      {playing !== null && showMiniPlayer && (
        <aside
          aria-label="Now playing audio player"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-3 sm:p-4 rounded-2xl bg-surface/95 backdrop-blur-md border border-hairline shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-surface-2 border border-hairline">
              <Image
                src={currentMix.cover}
                alt={currentMix.alt}
                fill
                sizes="48px"
                className="object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-brand animate-bounce h-2" />
                    <span className="w-0.5 bg-brand animate-bounce h-3 delay-75" />
                    <span className="w-0.5 bg-brand animate-bounce h-1.5 delay-150" />
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[11px] uppercase tracking-wider font-semibold"
                  style={{ color: isMixcloud ? "#8a60ff" : "#ff5500" }}
                >
                  {isMixcloud ? "Mixcloud Stream" : "SoundCloud Stream"}
                </span>
                <span className="text-[11px] text-muted">· {currentMix.artist}</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                {currentMix.title}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-muted tabular-nums">
                <span>{clock(elapsed)}</span>
                <span>/</span>
                <span>{currentMix.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => togglePlay(currentTrackIndex)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-background hover:scale-105 transition-transform cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isBuffering ? (
                  <div className="h-3.5 w-3.5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
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
                onClick={() => setShowMiniPlayer(false)}
                className="p-1 text-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Dismiss player bar"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      )}
    </section>
  );
}
