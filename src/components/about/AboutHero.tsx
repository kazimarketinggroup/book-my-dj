import Image from "next/image";
import Link from "next/link";
import { aboutHero, stats } from "@/lib/about-data";

export default function AboutHero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-5rem)] flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-200">
      {/* Background DJ hands mixer shot */}
      <Image
        src={aboutHero.image}
        alt={aboutHero.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-25 dark:opacity-40 mix-blend-luminosity"
      />

      {/* Top gradient fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[175px] bg-gradient-to-b from-background to-transparent"
      />

      {/* Central ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_25%,rgba(168,14,130,0.18),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_25%,rgba(168,14,130,0.4),transparent_65%)]"
      />

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[415px] bg-gradient-to-t from-background via-background/75 to-transparent"
      />

      {/* Central Content Area */}
      <div className="flex flex-1 items-center py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-6 text-center sm:px-10 lg:px-16">
          {/* Headline */}
          <h1 className="mx-auto max-w-[567px] font-display text-[36px] font-normal leading-[44px] text-foreground sm:text-[44px] sm:leading-[52px] lg:text-[50px] lg:leading-[60px]">
            {aboutHero.title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-[675px] font-sans text-[16px] sm:text-[18px] leading-[28px] sm:leading-[30px] text-muted">
            {aboutHero.blurb}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#910870] via-[#520577] to-[#24081E] font-display text-[16px] font-medium text-white shadow-lg shadow-purple-950/40 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Book My DJ
            </Link>
            <Link
              href="/events"
              className="flex h-[40px] w-[171px] items-center justify-center rounded-[5px] border border-foreground/30 bg-transparent font-display text-[16px] font-medium text-foreground backdrop-blur transition-all hover:bg-foreground/5 active:scale-[0.98]"
            >
              Our Events
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Strip Box */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[996px] rounded-[20px] border border-slate-200/90 dark:border-hairline bg-white dark:bg-surface/80 px-6 py-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] dark:shadow-xl backdrop-blur-md sm:px-10 sm:py-7">
          <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-4 items-center">
            {stats.map((s) => (
              <div key={s.label} className="text-left px-2 sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-[26px] sm:text-[32px] lg:text-[34.4px] font-semibold leading-[46px] tracking-[-0.69px] text-foreground">
                    {s.value}
                  </span>
                  <span className="block font-sans text-[12px] sm:text-[15px] lg:text-[17.2px] leading-[23px] tracking-[2.41px] text-muted uppercase">
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

