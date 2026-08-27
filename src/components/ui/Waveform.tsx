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
}: {
  bars?: number;
  className?: string;
  playing?: boolean;
  progress?: number;
}) {
  const filledUpTo = Math.round(progress * bars);

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${bars * 3} 24`}
      preserveAspectRatio="none"
      className={className}
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
