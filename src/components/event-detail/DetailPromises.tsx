import type { EventDetail } from "@/lib/event-detail-data";
import Reveal from "@/components/ui/Reveal";

function Tick() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-surface-2 text-foreground">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export default function DetailPromises({ detail }: { detail: EventDetail }) {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 text-center sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <Reveal>
          <h2 className="font-display text-2xl leading-tight font-semibold text-foreground sm:text-3xl">
            {detail.promiseHeading[0]}
            <br />
            {detail.promiseHeading[1]}
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-4 text-left md:grid-cols-3 lg:gap-5">
          {detail.promises.map((p, i) => (
            <Reveal key={p.title} as="li" delay={i * 90}>
              <div className="h-full rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
                <Tick />
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
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
