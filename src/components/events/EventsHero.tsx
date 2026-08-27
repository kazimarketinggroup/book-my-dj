import Image from "next/image";
import Link from "next/link";
import { eventsHero } from "@/lib/events-data";

export default function EventsHero() {
  return (
    <section className="hero-screen relative isolate overflow-hidden">
      <Image
        src={eventsHero.image}
        alt={eventsHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Left-weighted scrim so the copy stays readable over the crowd */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-black/85 via-black/55 to-black/20"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-background to-transparent"
      />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 2xl:px-16">
        <h1 className="max-w-2xl font-display fluid-hero font-semibold text-white">
          {eventsHero.title[0]}
          <br />
          {eventsHero.title[1]}
        </h1>

        <p className="mt-6 max-w-lg fluid-body leading-relaxed text-zinc-300">
          {eventsHero.blurb}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#book"
            className="btn-brand rounded-lg px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get Quote
          </Link>
          <Link
            href="#event-types"
            className="rounded-lg border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            Our Events
          </Link>
        </div>
      </div>
    </section>
  );
}
