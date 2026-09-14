"use client";

/**
 * Audio waveform. Heights come from a fixed sine-based sequence so server and
 * client render identically (no hydration mismatch from Math.random).
 *
 * `progress` (0-1) fills bars up to that point in the brand colour.
 * `playing` animates the bars so the row reads as actively playing.
 */
export default function Waveform({
  bars = 32,
  className = "",
  playing = false,
  progress = 0,
  onSeek,
}: {
  bars?: number;
  className?: string;
  playing?: boolean;
  progress?: number;
  onSeek?: (progress: number) => void;
}) {
  const filledUpTo = Math.round(progress * bars);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio);
  };

  return (
    <svg
      aria-label="Track waveform and seek bar"
      role={onSeek ? "slider" : "img"}
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      viewBox={`0 0 ${bars * 3} 24`}
      preserveAspectRatio="none"
      onClick={handleClick}
      className={`${className} ${onSeek ? "cursor-pointer select-none" : ""}`}
    >
      {Array.from({ length: bars }, (_, i) => {
        // Rounded: raw Math.sin output differs in the last float digit between
        // Node and the browser, which trips React's hydration check.
        const h = Math.round((6 + Math.abs(Math.sin(i * 1.7)) * 16) * 100) / 100;
        const y = Math.round(((24 - h) / 2) * 100) / 100;
        const played = i < filledUpTo;
        return (
          <rect
            key={i}
            x={i * 3}
            y={y}
            width={1.5}
            height={h}
            rx={0.75}
            fill={played ? "var(--brand-1)" : "currentColor"}
            className={playing ? "wave-bar" : undefined}
            style={
              playing
                ? { animationDelay: `${(i % 12) * 70}ms`, transformOrigin: "center" }
                : undefined
            }
          />
        );
      })}
    </svg>
  );
}
