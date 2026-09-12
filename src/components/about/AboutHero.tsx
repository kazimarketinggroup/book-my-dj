import Image from "next/image";
import Link from "next/link";
import { aboutHero, stats } from "@/lib/about-data";

export default function AboutHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] flex-col justify-between overflow-hidden bg-black text-white">
      {/* Background DJ hands mixer shot */}
      <Image
        src={aboutHero.image}
        alt={aboutHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-40 mix-blend-luminosity"
      />

      {/* Top gradient from Figma (Rectangle 18: h-175px linear-gradient(180deg, #000000 0%, rgba(0,0,0,0) 100%)) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-black to-transparent"
      />

      {/* Bottom gradient from Figma (Rectangle 17: h-415px linear-gradient(0deg, #000000 0%, rgba(0,0,0,0) 100%)) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[415px] bg-gradient-to-t from-black via-black/75 to-transparent"
      />

      {/* Central Content Area (Group 165 in Figma) */}
      <div className="flex flex-1 items-center py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 text-center sm:px-10 lg:px-16">
          {/* Headline (Chivo 400, 50px, line-height 60px) */}
          <h1 className="mx-auto max-w-[567px] font-display text-[36px] font-normal leading-[44px] text-white sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[60px]">
            {aboutHero.title}
          </h1>

          {/* Subtitle (Inter 400, 18px, line-height 30px) */}
          <p className="mx-auto mt-6 max-w-[675px] font-sans text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] text-white">
            {aboutHero.blurb}
          </p>

          {/* Action Buttons (Group 4: 171px x 40px, rounded 5px) */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
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
      </div>

      {/* Stats Strip Box (Rectangle 38 / Group 198 in Figma: 996px x 123px, rounded 20px) */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[996px] rounded-[20px] border border-[#910870]/40 bg-[rgba(57,57,57,0.5)] px-6 py-6 shadow-2xl backdrop-blur-md sm:px-10 sm:py-7">
          <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-4 items-center">
            {stats.map((s) => (
              <div key={s.label} className="text-left px-2 sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[26px] sm:text-[32px] lg:text-[34.4px] font-semibold leading-[46px] tracking-[-0.69px] text-[#F9F8FB]">
                    {s.value}
                  </span>
                  <span className="block font-sans text-[12px] sm:text-[15px] lg:text-[17.2px] leading-[23px] tracking-[2.41px] text-[#ACA9B3] uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

