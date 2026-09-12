import Image from "next/image";
import Link from "next/link";
import { eventsHero } from "@/lib/events-data";

export default function EventsHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-black text-white">
      {/* Background crowd + smoke jets shot */}
      <Image
        src={eventsHero.image}
        alt={eventsHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Top gradient fade from navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-black to-transparent"
      />

      {/* Left-side dark scrim for high contrast readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/50 to-transparent"
      />

      {/* Bottom fade into black page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[350px] bg-gradient-to-t from-black via-black/80 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <h1 className="max-w-2xl font-display text-[36px] font-normal leading-[44px] text-white sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[60px]">
          {eventsHero.title[0]}
          <br />
          {eventsHero.title[1]}
        </h1>

        <p className="mt-6 max-w-[540px] font-sans text-[16px] leading-[26px] text-white sm:text-[18px] sm:leading-[30px]">
          {eventsHero.blurb}
        </p>

        {/* Action Buttons: exact 171px x 40px, rounded 5px */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] font-display text-[16px] font-medium text-white shadow-lg shadow-purple-950/40 transition-opacity hover:opacity-90"
          >
            Book My DJ
          </Link>
          <Link
            href="#event-types"
            className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-white bg-transparent font-display text-[16px] font-medium text-white transition-colors hover:bg-white/10"
          >
            Our Events
          </Link>
        </div>
      </div>
    </section>
  );
}
