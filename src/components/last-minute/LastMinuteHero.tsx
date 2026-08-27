import Image from "next/image";
import Link from "next/link";
import { lastMinuteHero } from "@/lib/last-minute-data";

export default function LastMinuteHero() {
  return (
    <section className="hero-screen relative isolate overflow-hidden">
      <Image
        src={lastMinuteHero.image}
        alt={lastMinuteHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Flat scrim only - no bottom fade, so the image runs to the edge. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20 2xl:px-16">
        <h1 className="mx-auto max-w-2xl font-display fluid-hero font-semibold text-white">
          {lastMinuteHero.title[0]}
          <br />
          {lastMinuteHero.title[1]}
        </h1>

        <p className="mx-auto mt-5 max-w-xl fluid-body leading-relaxed text-zinc-300">
          {lastMinuteHero.blurb}
        </p>

        <Link
          href="#how-it-works"
          className="btn-brand mt-8 inline-block rounded-lg px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {lastMinuteHero.cta}
        </Link>
      </div>
    </section>
  );
}
