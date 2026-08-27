import type { DjProfile } from "@/lib/dj-data";
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

export default function DjGenres({ dj }: { dj: DjProfile }) {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-16">
        <Reveal>
          <h2 className="font-display fluid-h2 font-semibold text-foreground">
            Genres
          </h2>
        </Reveal>

        <Reveal delay={70}>
          <ul className="mt-6 flex flex-wrap gap-2.5 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
            {dj.genres.map((g) => (
              <li key={g}>
                <span className="inline-block rounded-md border border-hairline bg-surface-2 px-3 py-1.5 text-xs text-foreground sm:text-sm">
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-5 grid gap-4 md:grid-cols-3 lg:gap-5">
          {dj.credentials.map((c, i) => (
            <Reveal key={c.title} as="li" delay={i * 90}>
              <div className="h-full rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
                <Tick />
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.items}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
