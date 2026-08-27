import Image from "next/image";
import Link from "next/link";
import { joinHero, joinStats } from "@/lib/join-data";

export default function JoinHero() {
  const [back, front] = joinHero.images;

  return (
    <section className="scroll-mt-20">
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-14 2xl:px-16">
        {/* Copy */}
        <div>
          <h1 className="max-w-lg font-display fluid-hero-lg font-semibold text-foreground">
            {joinHero.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-5 max-w-md fluid-body leading-relaxed text-muted">
            {joinHero.blurb}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={joinHero.primaryCta.href}
              className="btn-brand rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0"
            >
              {joinHero.primaryCta.label}
            </Link>
            <Link
              href={joinHero.secondaryCta.href}
              className="rounded-lg border border-hairline px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              {joinHero.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 sm:max-w-lg sm:gap-6">
            {joinStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-lg font-semibold text-foreground sm:text-xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/*
          Two overlapping shots. On lg the back sits top-left and the front
          drops lower-right over it; offsets + heights are kept inside the
          container height so neither card clips at the section edge.
          Below lg they fall back to a plain 2-up.
        */}
        <div className="grid grid-cols-2 gap-4 lg:relative lg:block lg:h-88">
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-hairline lg:absolute lg:top-0 lg:left-0 lg:aspect-auto lg:h-64 lg:w-[58%]">
            <Image
              src={back.src}
              alt={back.alt}
              fill
              priority
              sizes="(max-width: 1024px) 45vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-hairline lg:absolute lg:top-18 lg:right-0 lg:aspect-auto lg:h-64 lg:w-[40%]">
            <Image
              src={front.src}
              alt={front.alt}
              fill
              priority
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
