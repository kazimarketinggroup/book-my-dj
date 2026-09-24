import Image from "next/image";
import Link from "next/link";
import { eventsHero } from "@/lib/events-data";

const heroFlyers = [
  { src: "/images/events/hero-flyer-4.png", alt: "Smiley B2B Luke Luiz event flyer" },
  { src: "/images/events/hero-flyer-1.png", alt: "Dine & Vibes event flyer" },
  { src: "/images/events/hero-flyer-2.png", alt: "Don Korz Dawes Isolation Workout flyer" },
  { src: "/images/events/hero-flyer-3.png", alt: "Barber Boxing After Party flyer" },
];

export default function EventsHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/BMDJ/Events.jpg"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/videos/BMDJ/Events.mp4" type="video/mp4" />
      </video>
      {/* Overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/80 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:gap-12">

          {/* Left Text Column */}
          <div className="max-w-[675px]">
            <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-normal tracking-tight text-foreground leading-[1.18] sm:leading-[1.2] lg:leading-[60px]">
              {eventsHero.title[0]}
              <br className="hidden sm:inline" />
              {eventsHero.title[1]}
            </h1>

            <p className="mt-6 max-w-[540px] font-sans text-[16px] leading-[26px] text-muted sm:text-[18px] sm:leading-[30px]">
              {eventsHero.blurb}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-3.5 sm:gap-4">
              <Link
                href="/contact"
                className="flex h-[42px] w-[150px] sm:w-[170px] items-center justify-center rounded-[5px] bg-black font-display text-[15px] sm:text-[16px] font-medium text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
              >
                Book My DJ
              </Link>
              <Link
                href="#event-types"
                className="flex h-[42px] w-[150px] sm:w-[170px] items-center justify-center rounded-[5px] border border-black bg-white font-display text-[15px] sm:text-[16px] font-medium text-black transition-all hover:bg-zinc-50 active:scale-[0.98]"
              >
                Our Events
              </Link>
            </div>
          </div>

          {/* Right 2x2 Flyer Grid (matching Figma Group 35794: 450px x 441px) */}
          <div className="relative mx-auto w-full max-w-[450px] lg:justify-self-end">
            <div className="grid grid-cols-2 gap-x-[18px] sm:gap-x-[22px] gap-y-[14px] sm:gap-y-[16px]">
              {heroFlyers.map((flyer, index) => (
                <div
                  key={flyer.src}
                  className="relative aspect-square w-full overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] shadow-lg border border-black/5 bg-card transition-transform duration-300 hover:scale-[1.02]"
                >
                  <Image
                    src={flyer.src}
                    alt={flyer.alt}
                    fill
                    priority={index < 2}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 220px, 214px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
