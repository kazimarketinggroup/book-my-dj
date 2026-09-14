import Link from "next/link";
import { lastMinuteHero } from "@/lib/last-minute-data";

export default function LastMinuteHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
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
            className="flex h-[40px] w-[203px] items-center justify-center rounded-[5px] bg-black font-display text-[16px] font-medium text-white shadow-md transition-opacity hover:opacity-90"
          >
            {lastMinuteHero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
