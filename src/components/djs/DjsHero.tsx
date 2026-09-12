import Image from "next/image";
import Link from "next/link";
import { DJ_GENRES } from "@/lib/djs-data";

export default function DjsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black pt-28 pb-16 lg:pt-36 lg:pb-20">
      {/* Background DJ Hero Image */}
      <div className="absolute inset-0 h-[650px] sm:h-[775px] w-full pointer-events-none">
        <Image
          src="/images/djs/11033_1_187_99.jpg"
          alt="Cyberpunk DJ illustration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-50 mix-blend-screen"
        />
        {/* Top gradient */}
        <div className="absolute inset-x-0 top-0 h-[194px] bg-gradient-to-b from-black via-black/80 to-transparent" />
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-[450px] bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="max-w-[620px]">
          {/* Signature Script Title */}
          <p className="font-signature text-[50px] sm:text-[65px] md:text-[70px] leading-[1] text-white select-none">
            Our Djs
          </p>

          {/* Main Display Headline */}
          <h1 className="mt-2 font-display text-[36px] sm:text-[45px] md:text-[50px] font-normal leading-[1.15] text-white">
            One roster, every sound you need
          </h1>

          {/* Subtitle Copy */}
          <p className="mt-5 font-sans text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] text-white/90">
            From multi-genre party anthems to house, bashment, afrobeats and
            Punjabi we match the DJ to your crowd, your city and your brief.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] font-display text-[16px] font-medium text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Book My DJ
            </Link>
            <Link
              href="/events"
              className="inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-white font-display text-[16px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Our Events
            </Link>
          </div>
        </div>

        {/* Genre Tags Cloud */}
        <div className="mt-14 sm:mt-20 flex flex-wrap items-center gap-2.5 sm:gap-3 max-w-[1280px]">
          {DJ_GENRES.map((genre) => (
            <span
              key={genre}
              className="inline-flex items-center rounded-full border border-[rgba(42,39,49,0.7)] bg-[#211D27] px-[14px] py-[7px] font-sans text-[14px] sm:text-[16px] leading-[16px] text-[#F9F8FB] transition-colors hover:border-white/30 hover:bg-[#2b2633]"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
