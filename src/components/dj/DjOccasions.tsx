import type { DjProfile } from "@/lib/dj-data";
import Reveal from "@/components/ui/Reveal";

function Disc() {
  return (
    <span
      aria-hidden
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-2 text-foreground"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        className="h-3 w-3"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export default function DjOccasions({ dj }: { dj: DjProfile }) {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-2xl leading-tight font-semibold text-foreground sm:text-3xl">
              The right set for any occasion.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {dj.occasionBlurb}
            </p>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {dj.occasions.map((o, i) => (
              <Reveal key={o} as="li" delay={i * 60}>
                <div className="flex items-center gap-3 rounded-lg border border-hairline bg-surface px-4 py-3">
                  <Disc />
                  <span className="text-sm text-foreground">{o}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
