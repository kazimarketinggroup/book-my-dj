import Link from "next/link";
import { heroCards } from "@/lib/home-data";
import EventMarquee from "@/components/home/EventMarquee";
import HeroCardItem from "@/components/home/HeroCardItem";

/**
 * Exact layout & collage positioning matching Image 1:
 * - Card 0 (Top-Left): Horizontal/Landscape -> Badge overlapping top edge
 * - Card 1 (Top-Right): Vertical/Portrait -> Badge overlapping right edge
 * - Card 2 (Bottom-Left): Vertical/Portrait -> Badge overlapping left edge
 * - Card 3 (Bottom-Right): Horizontal/Landscape -> Badge on bottom-left
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Main Hero Content Area */}
      <div className="flex flex-1 items-center py-6 lg:py-10">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:gap-12">
            
            {/* Left Text Column (Group 88) */}
            <div className="max-w-[675px]">
              {/* Headline */}
              <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-normal tracking-tight text-foreground leading-[1.18] sm:leading-[1.2] lg:leading-[60px]">
                DJs For Every{" "}
                <br className="hidden sm:inline" />
                Occasion, Nationwide
              </h1>

              {/* Sub-bullets */}
              <ul className="mt-5 sm:mt-6 space-y-3 font-sans text-[15px] sm:text-[18px] leading-[23px] sm:leading-[25px] text-foreground/90">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>From weddings to boardrooms, festivals to black-tie galas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                  <span>
                    Trusted by events managers and planners who can&apos;t afford a bad night.
                  </span>
                </li>
              </ul>

              {/* Action Buttons (matching Figma 1:1 with both Book My DJ and Our Events) */}
              <div className="mt-8 flex items-center gap-3.5 sm:gap-4">
                <Link
                  href="/contact"
                  className="flex h-[42px] w-[150px] sm:w-[170px] items-center justify-center rounded-[5px] bg-black font-display text-[15px] sm:text-[16px] font-medium text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
                >
                  Book My DJ
                </Link>
                <Link
                  href="/events"
                  className="flex h-[42px] w-[150px] sm:w-[170px] items-center justify-center rounded-[5px] border border-black bg-white font-display text-[15px] sm:text-[16px] font-medium text-black transition-all hover:bg-zinc-50 active:scale-[0.98]"
                >
                  Our Events
                </Link>
              </div>
            </div>

            {/* Right Floating DJ Cards Collage (Exact Figma Coordinates & Proportion) */}
            <div className="relative mx-auto w-full max-w-[460px] sm:max-w-[490px] lg:max-w-[500px] xl:max-w-[520px] lg:w-[500px] xl:w-[520px] lg:justify-self-end">
              {/* Mobile fallback: grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:hidden">
                {heroCards.map((card) => (
                  <HeroCardItem
                    key={card.title}
                    card={card}
                    aspectClass="aspect-[4/3]"
                    sizes="50vw"
                    borderClass="border border-white/10"
                    shapeRoundedClass="rounded-[16px]"
                    className="overflow-hidden rounded-[16px] border border-hairline shadow-sm bg-card"
                  >
                    <div className="p-2.5 bg-black/95 text-white">
                      <p className="font-display text-[10.5px] font-semibold text-white">{card.title}</p>
                      <p className="font-sans text-[9.5px] text-zinc-300">{card.caption}</p>
                    </div>
                  </HeroCardItem>
                ))}
              </div>

              {/* Desktop / Tablet Collage matching exact Figma bounds */}
              <div className="hidden sm:block relative w-full aspect-[835/764]">
                {/* Card 0 (Top-Left): Landscape (Laughing DJ) */}
                <div className="absolute left-0 top-[22.2%] w-[48.5%] z-20">
                  <HeroCardItem
                    card={heroCards[0]}
                    aspectClass="aspect-[405/236]"
                    shapeRoundedClass="rounded-[22px] sm:rounded-[26px] lg:rounded-[28px]"
                    borderClass="border-0"
                    sizes="30vw"
                    priority
                  >
                    {/* Badge: sits on top edge of card */}
                    <div className="absolute -top-4 sm:-top-5 left-[10%] sm:left-[14%] z-30 flex flex-col justify-center rounded-[12px] sm:rounded-[14px] border border-white/10 bg-black/95 px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[12px] sm:text-[13px] font-semibold leading-tight text-white whitespace-nowrap tracking-tight">
                        {heroCards[0].title}
                      </p>
                      <p className="font-sans text-[10px] sm:text-[11px] leading-tight text-zinc-200 whitespace-nowrap mt-1">
                        {heroCards[0].caption}
                      </p>
                    </div>
                  </HeroCardItem>
                </div>

                {/* Card 1 (Top-Right): Portrait (DJ in black shirt mixing) */}
                <div className="absolute left-[51.9%] top-0 w-[27.7%] z-10">
                  <HeroCardItem
                    card={heroCards[1]}
                    aspectClass="aspect-[231/337]"
                    shapeRoundedClass="rounded-[22px] sm:rounded-[26px] lg:rounded-[28px]"
                    borderClass="border-0"
                    sizes="20vw"
                    priority
                  >
                    {/* Badge: overlapping right edge */}
                    <div className="absolute top-[56%] -right-[68px] sm:-right-[80px] z-30 flex flex-col justify-center rounded-[12px] sm:rounded-[14px] border border-white/10 bg-black/95 px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[12px] sm:text-[13px] font-semibold leading-tight text-white whitespace-nowrap tracking-tight">
                        {heroCards[1].title}
                      </p>
                      <p className="font-sans text-[10px] sm:text-[11px] leading-tight text-zinc-200 whitespace-nowrap mt-1">
                        {heroCards[1].caption}
                      </p>
                    </div>
                  </HeroCardItem>
                </div>

                {/* Card 2 (Bottom-Left): Portrait (DJ at Pioneer decks, cream shirt) */}
                <div className="absolute left-[20.8%] top-[55.9%] w-[27.7%] z-20">
                  <HeroCardItem
                    card={heroCards[2]}
                    aspectClass="aspect-[231/337]"
                    shapeRoundedClass="rounded-[22px] sm:rounded-[26px] lg:rounded-[28px]"
                    borderClass="border-0"
                    sizes="20vw"
                    priority
                  >
                    {/* Badge: overlapping lower-left edge */}
                    <div className="absolute bottom-5 -left-[74px] sm:-left-[86px] z-30 flex flex-col justify-center rounded-[12px] sm:rounded-[14px] border border-white/10 bg-black/95 px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[12px] sm:text-[13px] font-semibold leading-tight text-white whitespace-nowrap tracking-tight">
                        {heroCards[2].title}
                      </p>
                      <p className="font-sans text-[10px] sm:text-[11px] leading-tight text-zinc-200 whitespace-nowrap mt-1">
                        {heroCards[2].caption}
                      </p>
                    </div>
                  </HeroCardItem>
                </div>

                {/* Card 3 (Bottom-Right): Landscape (Laptop DJ) */}
                <div className="absolute left-[51.5%] top-[47.4%] w-[48.5%] z-20">
                  <HeroCardItem
                    card={heroCards[3]}
                    aspectClass="aspect-[405/236]"
                    shapeRoundedClass="rounded-[22px] sm:rounded-[26px] lg:rounded-[28px]"
                    borderClass="border-0"
                    sizes="30vw"
                    priority
                  >
                    {/* Badge: overlapping bottom edge */}
                    <div className="absolute -bottom-3.5 sm:-bottom-4 right-6 sm:right-10 z-30 flex flex-col justify-center rounded-[12px] sm:rounded-[14px] border border-white/10 bg-black/95 px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[12px] sm:text-[13px] font-semibold leading-tight text-white whitespace-nowrap tracking-tight">
                        {heroCards[3].title}
                      </p>
                      <p className="font-sans text-[10px] sm:text-[11px] leading-tight text-zinc-200 whitespace-nowrap mt-1">
                        {heroCards[3].caption}
                      </p>
                    </div>
                  </HeroCardItem>
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