import Image from "next/image";
import Link from "next/link";
import { eventsHero } from "@/lib/events-data";

export default function EventsHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Background crowd + smoke jets shot */}
      <Image
        src={eventsHero.image}
        alt={eventsHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-30 dark:opacity-100"
      />

      {/* Top gradient fade from navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-background to-transparent"
      />

      {/* Left-side scrim for high contrast readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/60 to-transparent dark:from-black/85 dark:via-black/50 dark:to-transparent"
      />

      {/* Bottom fade into page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[350px] bg-gradient-to-t from-background via-background/80 to-transparent dark:from-black dark:via-black/80 dark:to-transparent"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <h1 className="max-w-2xl font-display text-[36px] font-normal leading-[44px] text-foreground sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[60px]">
          {eventsHero.title[0]}
          <br />
          {eventsHero.title[1]}
        </h1>

        <p className="mt-6 max-w-[540px] font-sans text-[16px] leading-[26px] text-muted sm:text-[18px] sm:leading-[30px]">
          {eventsHero.blurb}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] font-display text-[16px] font-medium text-white shadow-lg shadow-purple-950/40 transition-opacity hover:opacity-90"
          >
            Book My DJ
          </Link>
          <Link
            href="#event-types"
            className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-hairline bg-surface font-display text-[16px] font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Our Events
          </Link>
        </div>
      </div>
    </section>
  );
}
