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

              {/* Action Buttons */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/events"
                  className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-black font-display text-[16px] font-medium text-white shadow-md transition-all hover:bg-zinc-800 active:scale-[0.98]"
                >
                  Our Events
                </Link>
              </div>
            </div>

            {/* Right Floating DJ Cards Collage (Exact Figma Coordinates & 3px Borders) */}
            <div className="relative mx-auto w-full max-w-[550px] sm:max-w-[620px] lg:max-w-[660px] lg:w-[660px] xl:max-w-[700px] xl:w-[700px] lg:justify-self-end">
              {/* Mobile fallback: grid */}
              <div className="grid grid-cols-2 gap-3.5 sm:hidden">
                {heroCards.map((card) => (
                  <HeroCardItem
                    key={card.title}
                    card={card}
                    aspectClass="aspect-[4/3]"
                    sizes="50vw"
                    borderClass="border-0"
                    shapeRoundedClass="rounded-t-[14px]"
                    className="overflow-hidden rounded-[16.6px] border border-hairline shadow-lg bg-card"
                  >
                    <div className="p-2.5 bg-surface-2/95">
                      <p className="font-display text-[10.5px] font-semibold text-foreground">{card.title}</p>
                      <p className="font-sans text-[9.5px] text-muted">{card.caption}</p>
                    </div>
                  </HeroCardItem>
                ))}
              </div>

              {/* Desktop / Tablet Collage matching exact Figma bounds */}
              <div className="hidden sm:block relative h-[530px] lg:h-[570px] xl:h-[610px] w-full">
                {/* Card 4 (Top-Left): Rectangle 4 (Landscape, 265px x 155px) */}
                <div className="absolute left-0 top-[20%] w-[50%] z-20">
                  <HeroCardItem
                    card={heroCards[0]}
                    aspectClass="aspect-[265/155]"
                    sizes="35vw"
                    priority
                  >
                    {/* Badge: left +46px, -28px above top in Figma */}
                    <div className="absolute -top-4 left-6 z-30 flex flex-col justify-center rounded-[8px] border border-hairline bg-surface-2/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[10.5px] font-semibold leading-tight text-foreground whitespace-nowrap">
                        {heroCards[0].title}
                      </p>
                      <p className="font-sans text-[9.5px] leading-tight text-muted whitespace-nowrap mt-0.5">
                        {heroCards[0].caption}
                      </p>
                    </div>
                  </HeroCardItem>
                </div>

                {/* Card 1 (Top-Right): Rectangle 1 (Portrait, 151px x 220px) */}
                <div className="absolute right-0 top-1 w-[29.5%] z-10">
                  <HeroCardItem
                    card={heroCards[1]}
                    aspectClass="aspect-[151/220]"
                    sizes="25vw"
                    priority
                  >
                    {/* Badge: overlapping lower-right */}
                    <div className="absolute bottom-6 -right-5 z-30 flex flex-col justify-center rounded-[8px] border border-hairline bg-surface-2/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[10.5px] font-semibold leading-tight text-foreground whitespace-nowrap">
                        {heroCards[1].title}
                      </p>
                      <p className="font-sans text-[9.5px] leading-tight text-muted whitespace-nowrap mt-0.5">
                        {heroCards[1].caption}
                      </p>
                    </div>
                  </HeroCardItem>
                </div>

                {/* Card 2 (Bottom-Left): Rectangle 2 (Portrait, 151px x 220px) */}
                <div className="absolute left-[20%] top-[54%] w-[29.5%] z-30">
                  <HeroCardItem
                    card={heroCards[2]}
                    aspectClass="aspect-[151/220]"
                    sizes="25vw"
                  >
                    {/* Badge: overlapping lower-left */}
                    <div className="absolute bottom-6 -left-8 z-40 flex flex-col justify-center rounded-[8px] border border-hairline bg-surface-2/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[10.5px] font-semibold leading-tight text-foreground whitespace-nowrap">
                        {heroCards[2].title}
                      </p>
                      <p className="font-sans text-[9.5px] leading-tight text-muted whitespace-nowrap mt-0.5">
                        {heroCards[2].caption}
                      </p>
                    </div>
                  </HeroCardItem>
                </div>

                {/* Card 3 (Bottom-Right): Rectangle 3 (Landscape, 265px x 155px) */}
                <div className="absolute right-0 top-[46%] w-[50%] z-20">
                  <HeroCardItem
                    card={heroCards[3]}
                    aspectClass="aspect-[265/155]"
                    sizes="35vw"
                  >
                    {/* Badge: bottom */}
                    <div className="absolute bottom-2 left-6 z-30 flex flex-col justify-center rounded-[8px] border border-hairline bg-surface-2/95 px-3.5 py-1.5 shadow-xl backdrop-blur-md pointer-events-none">
                      <p className="font-display text-[10.5px] font-semibold leading-tight text-foreground whitespace-nowrap">
                        {heroCards[3].title}
                      </p>
                      <p className="font-sans text-[9.5px] leading-tight text-muted whitespace-nowrap mt-0.5">
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