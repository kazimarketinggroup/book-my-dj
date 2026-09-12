import Image from "next/image";
import Link from "next/link";
import { heroCards, IMG } from "@/lib/home-data";
import Waveform from "@/components/ui/Waveform";
import EventMarquee from "@/components/home/EventMarquee";

/**
 * Exact layout & collage positioning matching Image 1:
 * - Card 0 (Top-Left): Horizontal/Landscape -> Badge overlapping top edge
 * - Card 1 (Top-Right): Vertical/Portrait -> Badge overlapping right edge
 * - Card 2 (Bottom-Left): Vertical/Portrait -> Badge overlapping left edge
 * - Card 3 (Bottom-Right): Horizontal/Landscape -> Badge on bottom-left
 */
const cardStyles = [
  {
    // Top-Left (Corporate Event DJ) - Landscape
    container: "lg:absolute lg:top-[12%] lg:left-0 lg:w-[50%] z-20",
    aspect: "aspect-[16/10]",
    caption: "top-2 left-2 lg:-top-3.5 lg:left-4",
  },
  {
    // Top-Right (Every Occasion) - Portrait
    container: "lg:absolute lg:top-0 lg:right-0 lg:w-[42%] z-10",
    aspect: "aspect-[4/5]",
    caption: "bottom-2 right-2 lg:bottom-12 lg:-right-3",
  },
  {
    // Bottom-Left (Pro Sound & Lighting) - Portrait
    container: "lg:absolute lg:bottom-2 lg:left-[20%] lg:w-[42%] z-30",
    aspect: "aspect-[4/5]",
    caption: "bottom-2 left-2 lg:bottom-6 lg:-left-8",
  },
  {
    // Bottom-Right (Last Minute Booking) - Landscape
    container: "lg:absolute lg:bottom-[7%] lg:right-0 lg:w-[50%] z-20",
    aspect: "aspect-[16/10]",
    caption: "bottom-2 left-2 lg:bottom-3 lg:left-4",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden bg-black text-white">
      {/* Background crowd shot */}
      <Image
        src={`${IMG}/11033 1.png`}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-50"
      />

      {/* Center-top purple stage lighting glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_15%,rgba(168,14,130,0.45),transparent_65%)]"
      />

      {/* Top gradient (Rectangle 18 in Figma: linear-gradient(0deg, #000000 0%, rgba(0,0,0,0) 100%) matrix(1,0,0,-1,0,0)) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-black to-transparent"
      />

      {/* Left-side dark vignette for razor-sharp text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/45 to-transparent"
      />

      {/* Bottom fade into marquee bar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/80 to-transparent"
      />

      {/* Main Hero Content Area */}
      <div className="flex flex-1 items-center py-6 lg:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            
            {/* Left Text Column (Group 88) */}
            <div className="max-w-[675px]">
              {/* Audio Waveform Tag (Figma: 281px x 64px, rounded 15px) */}
              <div className="inline-flex h-[64px] w-auto sm:w-[281px] items-center gap-3.5 rounded-[15px] border border-white/15 bg-gradient-to-r from-[rgba(36,8,30,0.2)] via-[rgba(82,5,119,0.2)] to-[rgba(145,8,112,0.2)] px-4 shadow-xl backdrop-blur-md">
                <button
                  type="button"
                  aria-label="Play sample"
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-white transition-transform hover:scale-110 active:scale-95"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 fill-white"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <Waveform className="h-6 w-28 text-white sm:w-32" bars={26} />
                <span className="font-sans text-[16px] font-normal text-white tabular-nums">0:16</span>
              </div>

              {/* Headline (Figma: Chivo, 400, 50px, line-height 60px) */}
              <h1 className="mt-6 sm:mt-7 font-display text-[30px] sm:text-[44px] lg:text-[50px] font-normal tracking-tight text-white leading-[1.18] sm:leading-[1.2] lg:leading-[60px]">
                DJs For Every{" "}
                <br className="hidden sm:inline" />
                Occasion, Nationwide
              </h1>

              {/* Sub-bullets (Figma: Inter, 400, 18px, line-height 25px) */}
              <ul className="mt-5 sm:mt-6 space-y-3 font-sans text-[15px] sm:text-[18px] leading-[23px] sm:leading-[25px] text-white">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  <span>From weddings to boardrooms, festivals to black-tie galas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  <span>
                    Trusted by events managers and planners who can&apos;t afford a bad night.
                  </span>
                </li>
              </ul>

              {/* Action Buttons (Figma: Group 4, 171px x 40px, rounded 5px) */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] font-display text-[16px] font-medium text-white shadow-lg shadow-purple-950/40 transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  Book My DJ
                </Link>
                <Link
                  href="/events"
                  className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-white bg-transparent font-display text-[16px] font-medium text-white backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  Our Events
                </Link>
              </div>
            </div>

            {/* Right Floating DJ Cards Collage (Exact Figma Coordinates & 3px Borders) */}
            <div className="relative mx-auto w-full max-w-[550px] sm:h-[500px] lg:h-[500px] lg:w-[550px] lg:justify-self-end">
              {/* Mobile fallback: grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:hidden">
                {heroCards.map((card) => (
                  <div key={card.title} className="relative overflow-hidden rounded-[16.6px] border-[2px] border-white/20">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={card.src} alt={card.alt} fill sizes="50vw" className="object-cover" />
                    </div>
                    <div className="p-2 bg-[rgba(36,36,36,0.9)]">
                      <p className="font-display text-[9px] font-semibold text-white">{card.title}</p>
                      <p className="font-sans text-[8px] text-zinc-300">{card.caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop / Tablet Collage matching exact Figma bounds */}
              <div className="hidden sm:block relative h-[500px] w-full">
                {/* Card 4 (Top-Left): Rectangle 4 (Landscape, 265px x 155px) */}
                <div className="absolute left-0 top-[22%] w-[48.4%] z-20">
                  <div className="relative w-full aspect-[265/155] overflow-hidden rounded-[16.6px] border-[3px] border-white/20 shadow-2xl bg-zinc-950/60">
                    <Image src={heroCards[0].src} alt={heroCards[0].alt} fill sizes="30vw" className="object-cover" />
                  </div>
                  {/* Badge: left +46px, -28px above top in Figma */}
                  <div className="absolute -top-4 left-6 z-30 flex flex-col justify-center rounded-[6.25px] bg-[rgba(36,36,36,0.9)] px-3 py-1.5 shadow-xl backdrop-blur-md">
                    <p className="font-display text-[8.88px] font-semibold leading-tight text-white whitespace-nowrap">
                      {heroCards[0].title}
                    </p>
                    <p className="font-sans text-[7.88px] leading-tight text-zinc-300 whitespace-nowrap mt-0.5">
                      {heroCards[0].caption}
                    </p>
                  </div>
                </div>

                {/* Card 1 (Top-Right): Rectangle 1 (Portrait, 151px x 220px) */}
                <div className="absolute right-0 top-0 w-[27.6%] z-10">
                  <div className="relative w-full aspect-[151/220] overflow-hidden rounded-[16.6px] border-[3px] border-white/20 shadow-2xl bg-zinc-950/60">
                    <Image src={heroCards[1].src} alt={heroCards[1].alt} fill sizes="20vw" className="object-cover" />
                  </div>
                  {/* Badge: overlapping lower-right */}
                  <div className="absolute bottom-6 -right-6 z-30 flex flex-col justify-center rounded-[6.25px] bg-[rgba(36,36,36,0.9)] px-3 py-1.5 shadow-xl backdrop-blur-md">
                    <p className="font-display text-[8.88px] font-semibold leading-tight text-white whitespace-nowrap">
                      {heroCards[1].title}
                    </p>
                    <p className="font-sans text-[7.63px] leading-tight text-zinc-300 whitespace-nowrap mt-0.5">
                      {heroCards[1].caption}
                    </p>
                  </div>
                </div>

                {/* Card 2 (Bottom-Left): Rectangle 2 (Portrait, 151px x 220px) */}
                <div className="absolute left-[20.8%] top-[56%] w-[27.6%] z-30">
                  <div className="relative w-full aspect-[151/220] overflow-hidden rounded-[16.6px] border-[3px] border-white/20 shadow-2xl bg-zinc-950/60">
                    <Image src={heroCards[2].src} alt={heroCards[2].alt} fill sizes="20vw" className="object-cover" />
                  </div>
                  {/* Badge: overlapping lower-left */}
                  <div className="absolute bottom-6 -left-12 z-40 flex flex-col justify-center rounded-[6.25px] bg-[rgba(36,36,36,0.9)] px-3 py-1.5 shadow-xl backdrop-blur-md">
                    <p className="font-display text-[8.88px] font-semibold leading-tight text-white whitespace-nowrap">
                      {heroCards[2].title}
                    </p>
                    <p className="font-sans text-[7.8px] leading-tight text-zinc-300 whitespace-nowrap mt-0.5">
                      {heroCards[2].caption}
                    </p>
                  </div>
                </div>

                {/* Card 3 (Bottom-Right): Rectangle 3 (Landscape, 265px x 155px) */}
                <div className="absolute right-0 top-[47.5%] w-[48.4%] z-20">
                  <div className="relative w-full aspect-[265/155] overflow-hidden rounded-[16.6px] border-[3px] border-white/20 shadow-2xl bg-zinc-950/60">
                    <Image src={heroCards[3].src} alt={heroCards[3].alt} fill sizes="30vw" className="object-cover" />
                  </div>
                  {/* Badge: bottom */}
                  <div className="absolute bottom-2 left-6 z-30 flex flex-col justify-center rounded-[6.25px] bg-[rgba(36,36,36,0.9)] px-3 py-1.5 shadow-xl backdrop-blur-md">
                    <p className="font-display text-[8.88px] font-semibold leading-tight text-white whitespace-nowrap">
                      {heroCards[3].title}
                    </p>
                    <p className="font-sans text-[7.88px] leading-tight text-zinc-300 whitespace-nowrap mt-0.5">
                      {heroCards[3].caption}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Bottom Ticker Marquee Strip (Figma: 54px high, top 753px) */}
      <EventMarquee />
    </section>
  );
}