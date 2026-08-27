import Link from "next/link";
import { eventRows } from "@/lib/events-data";
import Reveal from "@/components/ui/Reveal";

/** Three other event types, so each detail page points somewhere useful. */
export default function OtherEvents({ current }: { current: string }) {
  const others = eventRows.filter((r) => r.title !== current).slice(0, 3);

  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <Reveal>
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            Other events we cover
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {others.map((row, i) => (
            <Reveal key={row.title} as="li" delay={i * 90}>
              <Link
                href={row.href}
                className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-foreground/25 sm:p-6"
              >
                <p className="text-[11px] tracking-[0.2em] text-muted">
                  {row.no}
                </p>
                <h3 className="mt-3 font-display text-base font-semibold text-foreground sm:text-lg">
                  {row.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {row.headline}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-foreground">
                  Learn more
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
