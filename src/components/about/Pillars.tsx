import { pillars, type Pillar } from "@/lib/about-data";
import Reveal from "@/components/ui/Reveal";

/**
 * Inline SVG rather than the supplied PNGs: those are white-on-transparent and
 * would vanish on the light theme. These follow currentColor instead.
 */
function PillarIcon({ name }: { name: Pillar["icon"] }) {
  const common = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "h-7 w-7",
  } as const;

  if (name === "dj") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        <path d="M12 3a9 9 0 0 1 7.6 4.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "kit") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="12" r="3" />
        <circle cx="16.5" cy="8" r="1" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="15.5" r="1.6" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 12 16 8" strokeLinecap="round" />
    </svg>
  );
}

export default function Pillars() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <h2 className="font-display fluid-h2 font-semibold text-foreground">
          The Right DJ, The Right Kit, Every Time
        </h2>
        <p className="mt-3 text-sm text-muted">
          DJ hire, sound, lighting, and last-minute cover — all under one roster.
        </p>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} as="li" delay={i * 90}>
              <div className="border-l-2 border-brand pl-5">
                <span className="text-foreground">
                  <PillarIcon name={p.icon} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
