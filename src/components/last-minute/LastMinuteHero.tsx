import Image from "next/image";
import Link from "next/link";
import { lastMinuteHero } from "@/lib/last-minute-data";

export default function LastMinuteHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Background starry sky + DJs performing shot */}
      <Image
        src={lastMinuteHero.image}
        alt={lastMinuteHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-25 dark:opacity-60"
      />

      {/* Top gradient fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-background to-transparent"
      />

      {/* Center ambient purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_25%,rgba(168,14,130,0.2),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_25%,rgba(168,14,130,0.4),transparent_65%)]"
      />

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[320px] bg-gradient-to-t from-background via-background/80 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <h1 className="mx-auto max-w-[726px] font-display text-[36px] font-normal leading-[44px] text-foreground sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[60px]">
          {lastMinuteHero.title[0]}
          <br />
          {lastMinuteHero.title[1]}
        </h1>

        <p className="mx-auto mt-6 max-w-[675px] font-sans text-[16px] leading-[28px] text-muted sm:text-[18px] sm:leading-[30px]">
          {lastMinuteHero.blurb}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="#book"
            className="flex h-[40px] w-[203px] items-center justify-center rounded-[5px] border border-white/20 bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] font-display text-[16px] font-medium text-white shadow-lg transition-opacity hover:opacity-90"
          >
            {lastMinuteHero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
