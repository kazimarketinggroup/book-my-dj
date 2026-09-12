import Image from "next/image";
import Link from "next/link";
import { pastGigsHero, pastGigsQuote } from "@/lib/past-gigs-data";

export default function PastGigsIntro() {
  return (
    <section className="scroll-mt-20 bg-gradient-to-b from-[#101010] to-black py-10 sm:py-14 lg:pt-16 lg:pb-12 text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Title */}
        <h1 className="max-w-[690px] font-display text-[36px] sm:text-[44px] lg:text-[50px] font-normal leading-[1.2] lg:leading-[60px] text-white">
          {pastGigsHero.title[0]}
          <br className="hidden sm:inline" />{" "}
          {pastGigsHero.title[1]}
        </h1>

        {/* Blurb */}
        <p className="mt-6 sm:mt-8 max-w-[587px] font-sans text-[16px] sm:text-[18px] leading-[25px] text-white">
          {pastGigsHero.blurb}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-white/80 font-display text-[16px] font-medium text-black transition-colors hover:bg-white"
          >
            Book My DJ
          </Link>
          <Link
            href="/events"
            className="inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-white bg-transparent font-display text-[16px] font-medium text-white transition-colors hover:bg-white/10"
          >
            Our Events
          </Link>
        </div>

        {/* Featured Case Study Card */}
        <div className="mt-12 sm:mt-16 overflow-hidden rounded-[15px] bg-[#171717] shadow-[0px_0px_25px_3px_rgba(0,0,0,0.25)] border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[419px]">
            {/* Left Image with Play Button */}
            <div className="relative h-[280px] sm:h-[350px] lg:h-full w-full overflow-hidden">
              <Image
                src={pastGigsQuote.image}
                alt={pastGigsQuote.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[rgba(18,18,18,0.4)] backdrop-blur-xs border border-white/10 transition-transform hover:scale-110 cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="h-6 w-6 translate-x-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Quote */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-14">
              <blockquote className="max-w-[437px]">
                <p className="font-display text-[18px] sm:text-[20px] font-normal leading-[30px] text-white">
                  &ldquo;{pastGigsQuote.quote}&rdquo;
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
