import Image from "next/image";
import Link from "next/link";
import { lastMinuteHero } from "@/lib/last-minute-data";

export default function LastMinuteHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-black text-white">
      {/* Background starry sky + DJs performing shot */}
      <Image
        src={lastMinuteHero.image}
        alt={lastMinuteHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Top gradient fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-black to-transparent"
      />

      {/* Bottom gradient fade (Figma: Rectangle 17 - 532px) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[532px] bg-gradient-to-t from-black via-black/80 to-transparent"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <h1 className="mx-auto max-w-[726px] font-display text-[36px] font-normal leading-[44px] text-white sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[60px]">
          {lastMinuteHero.title[0]}
          <br />
          {lastMinuteHero.title[1]}
        </h1>

        <p className="mx-auto mt-6 max-w-[675px] font-sans text-[16px] leading-[28px] text-white sm:text-[18px] sm:leading-[30px]">
          {lastMinuteHero.blurb}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="#book"
            className="flex h-[40px] w-[203px] items-center justify-center rounded-[5px] border border-white/30 bg-gradient-to-r from-[rgba(145,8,112,0.8)] via-[rgba(36,8,30,0.8)] to-[rgba(82,5,119,0.8)] font-display text-[16px] font-medium text-white shadow-lg transition-opacity hover:opacity-90"
          >
            {lastMinuteHero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
