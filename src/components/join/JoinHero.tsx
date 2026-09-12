import Image from "next/image";
import Link from "next/link";
import { joinHero, joinStats } from "@/lib/join-data";

export default function JoinHero() {
  const [back, front] = joinHero.images;

  return (
    <section className="scroll-mt-20 py-10 sm:py-14 lg:py-16 bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Left Copy */}
        <div>
          <h1 className="max-w-[620px] font-display text-[36px] sm:text-[44px] lg:text-[50px] font-normal leading-[1.18] lg:leading-[58px] text-foreground">
            {joinHero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[540px] font-sans text-[16px] sm:text-[18px] leading-[26px] text-muted">
            {joinHero.blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={joinHero.primaryCta.href}
              className="inline-flex h-[40px] items-center justify-center rounded-[5px] bg-gradient-to-r from-[#24081E] via-[#520577] to-[#910870] px-7 font-display text-[16px] font-medium text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {joinHero.primaryCta.label}
            </Link>
            <Link
              href={joinHero.secondaryCta.href}
              className="inline-flex h-[40px] items-center justify-center rounded-[5px] border border-foreground/30 bg-transparent px-7 font-display text-[16px] font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              {joinHero.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-10 sm:mt-12 flex flex-wrap items-start gap-8 sm:gap-14">
            {joinStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[22px] sm:text-[24px] font-normal text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1 block font-sans text-[13px] sm:text-[14px] text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right Two overlapping shots */}
        <div className="relative h-[360px] sm:h-[420px] lg:h-[460px] w-full max-w-[540px] lg:ml-auto">
          {/* Back left shot */}
          <div className="absolute top-0 left-0 w-[55%] h-[82%] rounded-[15px] overflow-hidden border border-hairline shadow-xl">
            <Image
              src={back.src}
              alt={back.alt}
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 300px"
              className="object-cover"
            />
          </div>
          {/* Front right shot */}
          <div className="absolute bottom-0 right-0 w-[53%] h-[85%] rounded-[15px] overflow-hidden border border-hairline shadow-xl z-10">
            <Image
              src={front.src}
              alt={front.alt}
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 300px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
