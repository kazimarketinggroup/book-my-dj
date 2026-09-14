import Image from "next/image";
import Link from "next/link";
import { FULL_ROSTER, type RosterDj } from "@/lib/djs-data";

export default function DjsRosterGrid() {
  return (
    <section className="relative w-full bg-background text-foreground py-12 lg:py-16 transition-colors duration-200">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10">
          <div>
            <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[40px] font-normal tracking-[-0.6px] text-foreground">
              The full roster
            </h2>
            <p className="mt-1.5 sm:mt-2 font-sans text-[15px] sm:text-[18px] text-muted">
              15 resident and touring DJs covering London, the Midlands and the
              North.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex h-[40px] w-full sm:w-auto items-center justify-center rounded-[5px] bg-black px-6 font-display text-[16px] font-medium text-white shadow-md transition-transform hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98]"
          >
            Book My DJ
          </Link>
        </div>

        {/* 15 DJ Cards Grid (4 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-sm sm:max-w-none mx-auto">
          {FULL_ROSTER.map((dj) => (
            <DjCard key={dj.id} dj={dj} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DjCard({ dj }: { dj: RosterDj }) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-[15px] border border-hairline bg-surface-2 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-xl">
      {/* Top Media / Placeholder Container */}
      <div className="relative h-[216px] w-full overflow-hidden bg-surface">
        {dj.image ? (
          <>
            <Image
              src={dj.image}
              alt={dj.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 290px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Bottom soft gradient on photo */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t from-[rgba(8,6,12,0.8)] to-transparent"
            />
          </>
        ) : (
          /* Placeholder state */
          <div className="flex h-full w-full flex-col items-center justify-center bg-surface-3 p-4">
            {/* Center Circle with Icon */}
            <div className="relative flex h-[41px] w-[41px] items-center justify-center rounded-full bg-surface-2 shadow-[0px_13px_32px_-11px_rgba(254,57,108,0.75)]">
              <svg
                className="h-[18px] w-[18px] text-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            {/* Uppercase Placeholder Caption */}
            <p className="mt-3 font-sans text-[8px] uppercase tracking-[1.76px] text-muted text-center">
              {dj.placeholderLabel || `Photo — ${dj.name}`}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Content Info */}
      <div className="flex flex-1 flex-col justify-between p-[15px]">
        <div>
          {/* Name */}
          <h3 className="font-sans text-[16px] font-medium leading-[20px] text-foreground">
            {dj.name}
          </h3>

          {/* Location with Pin */}
          <div className="mt-1 flex items-center gap-1 text-muted">
            <svg
              className="h-[10px] w-[10px] shrink-0 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-sans text-[9px] leading-[12px]">
              {dj.location}
            </span>
          </div>

          {/* Genre Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {dj.genres.map((g) => (
              <span
                key={g}
                className="inline-flex items-center rounded-full border border-hairline bg-surface px-2 py-[2.5px] font-sans text-[8px] leading-[12px] text-foreground"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* View profile CTA */}
        <div className="mt-4 pt-1">
          <Link
            href={dj.href || "/contact"}
            className="group/btn inline-flex items-center gap-1 font-sans text-[10px] text-foreground transition-opacity hover:opacity-80"
          >
            <span>View profile</span>
            <svg
              className="h-[11px] w-[11px] transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
