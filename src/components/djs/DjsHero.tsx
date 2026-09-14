import Link from "next/link";
import { DJ_GENRES } from "@/lib/djs-data";

export default function DjsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground pt-28 pb-16 lg:pt-36 lg:pb-20 transition-colors duration-200">
      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="max-w-[620px]">
          {/* Signature Script Title */}
          <p className="font-signature text-[45px] sm:text-[60px] md:text-[70px] leading-[1] text-foreground select-none">
            Our Djs
          </p>

          {/* Main Display Headline */}
          <h1 className="mt-2 font-display text-[30px] sm:text-[42px] md:text-[50px] font-normal leading-[1.18] text-foreground">
            One roster, every sound you need
          </h1>

          {/* Subtitle Copy */}
          <p className="mt-4 sm:mt-5 font-sans text-[15px] sm:text-[18px] leading-[26px] sm:leading-[30px] text-muted">
            From multi-genre party anthems to house, bashment, afrobeats and
            Punjabi we match the DJ to your crowd, your city and your brief.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-black font-display text-[16px] font-medium text-white shadow-md transition-transform hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book My DJ
            </Link>
            <Link
              href="/events"
              className="inline-flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-hairline bg-surface font-display text-[16px] font-medium text-foreground transition-colors hover:bg-surface-2 active:scale-[0.98]"
            >
              Our Events
            </Link>
          </div>
        </div>

        {/* Genre Tags Cloud */}
        <div className="mt-10 sm:mt-16 lg:mt-20 flex flex-wrap items-center gap-2 sm:gap-3 max-w-[1280px]">
          {DJ_GENRES.map((genre) => (
            <span
              key={genre}
              className="inline-flex items-center rounded-full border border-hairline bg-surface px-3 sm:px-[14px] py-1.5 sm:py-[7px] font-sans text-[13px] sm:text-[16px] leading-[16px] text-foreground transition-colors hover:border-brand-light/40 hover:bg-surface-2"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
