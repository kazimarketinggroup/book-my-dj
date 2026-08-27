import Image from "next/image";
import Link from "next/link";
import { heroCards, IMG } from "@/lib/home-data";
import Waveform from "@/components/ui/Waveform";

/**
 * Exact layout & caption positioning matching Image 2:
 * - Card 0 (Top-Left): Horizontal/Landscape -> Caption inside top-left
 * - Card 1 (Top-Right): Vertical/Portrait -> Caption floating outside left
 * - Card 2 (Bottom-Left): Vertical/Portrait -> Caption floating outside left
 * - Card 3 (Bottom-Right): Horizontal/Landscape -> Caption inside bottom-left
 */
const cardStyles = [
  {
    // Top-Left (Corporate Event DJ)
    container: "lg:absolute lg:top-[6%] lg:left-[15%] lg:w-[38%]",
    aspect: "aspect-[16/10]",
    caption: "top-2 left-2 max-w-[170px]",
  },
  {
    // Top-Right (Every Occasion)
    container: "lg:absolute lg:top-[8%] lg:right-[5%] lg:w-[28%]",
    aspect: "aspect-[4/5]",
    caption: "bottom-3 left-2 max-w-[160px] lg:bottom-auto lg:top-[40%] lg:-left-8",
  },
  {
    // Bottom-Left (Pro Sound & Lighting)
    container: "lg:absolute lg:bottom-[8%] lg:left-[12%] lg:w-[28%]",
    aspect: "aspect-[4/5]",
    caption: "bottom-3 left-2 max-w-[170px] lg:-left-8",
  },
  {
    // Bottom-Right (Last Minute Booking)
    container: "lg:absolute lg:bottom-[6%] lg:right-[3%] lg:w-[38%]",
    aspect: "aspect-[16/10]",
    caption: "bottom-3 left-3 max-w-[170px]",
  },
];

export default function Hero() {
  return (
    <section className="hero-screen relative isolate overflow-hidden bg-black text-white">
      {/* Background crowd shot */}
      <Image
        src={`${IMG}/11033 1.png`}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-30 mix-blend-luminosity"
      />

      {/* Background Glows */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(145,8,112,0.28),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black to-transparent"
      />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-4">
          
          {/* Left Text Column */}
          <div className="max-w-xl">
            {/* Audio Waveform Tag */}
            <div className="inline-flex items-center gap-3 rounded-full border border-brand/35 bg-brand-deep/70 p-1.5 pr-4 backdrop-blur-md">
              <button
                type="button"
                aria-label="Play sample"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 translate-x-0.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <Waveform className="h-4 w-24 text-white/80 sm:w-28" bars={24} />
              <span className="text-xs text-zinc-300 tabular-nums">0:16</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 fluid-hero font-normal tracking-tight text-white">
              DJs For Every
              <br />
              Occasion, Nationwide
            </h1>

            {/* Sub-bullets */}
            <ul className="mt-6 space-y-3 fluid-body text-zinc-300">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>From weddings to boardrooms, festivals to black-tie galas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  Trusted by events managers and planners who can&apos;t afford a bad night.
                </span>
              </li>
            </ul>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="btn-brand rounded-lg px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/40 transition-opacity hover:opacity-90"
              >
                Book My DJ
              </Link>
              <Link
                href="/events"
                className="rounded-lg border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Our Events
              </Link>
            </div>
          </div>

          {/* Right Floating Canvas Collage */}
          <div className="grid grid-cols-2 gap-0 sm:gap-0 lg:relative lg:block lg:h-[360px] lg:w-[500px] lg:justify-self-end lg:gap-0 xl:h-[390px] xl:w-[520px]">
            {heroCards.map((card, i) => {
              const style = cardStyles[i] || cardStyles[0];
              return (
                <div key={card.title} className={style.container}>
                  <figure className="relative rounded-2xl border border-white/10 bg-zinc-900/40 p-0 shadow-2xl backdrop-blur-xs">
                    <div className={`relative w-full overflow-hidden rounded-[10px] ${style.aspect}`}>
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 30vw"
                        className="object-cover"
                      />
                    </div>

                    {/* Dark Caption Pill */}
                    <figcaption
                      className={`absolute z-10 rounded-xl border border-white/10 bg-black/85 p-2.5 shadow-xl backdrop-blur-md ${style.caption}`}
                    >
                      <p className="text-[11px] font-semibold leading-tight text-white">
                        {card.title}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-snug text-zinc-400">
                        {card.caption}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}