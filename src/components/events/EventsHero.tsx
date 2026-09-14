import Link from "next/link";
import { eventsHero } from "@/lib/events-data";

export default function EventsHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
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
            className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-black font-display text-[16px] font-medium text-white shadow-md transition-opacity hover:opacity-90"
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
